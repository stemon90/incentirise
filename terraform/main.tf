terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket       = "incentirise-terraform-state"
    key          = "terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}

provider "aws" {
  region = var.aws_region
}

# ── Security Groups ───────────────────────────────────────────────────────────

resource "aws_security_group" "backend" {
  name        = "incentirise-backend-sg-tf"
  description = "Security group for IncentiRise backend"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db" {
  name        = "incentirise-db-sg-tf"
  description = "Security group for IncentiRise database"

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.backend.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "alb" {
  name        = "incentirise-alb-sg-tf"
  description = "Security group for IncentiRise ALB"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ── RDS ───────────────────────────────────────────────────────────────────────

resource "aws_db_instance" "postgres" {
  identifier              = "incentirise-db-tf"
  engine                  = "postgres"
  engine_version          = "16"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  db_name                 = "incentirise"
  username                = "stevenuser"
  password                = var.db_password
  vpc_security_group_ids  = [aws_security_group.db.id]
  publicly_accessible     = false
  skip_final_snapshot     = true
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
}

# ── EC2 ───────────────────────────────────────────────────────────────────────

resource "aws_instance" "backend" {
  ami             = var.ami_id
  instance_type   = "t2.micro"
  key_name        = var.key_name
  security_groups = [aws_security_group.backend.name]

  user_data = base64encode(file("${path.module}/user_data.sh"))

  tags = {
    Name = "incentirise-backend-tf"
  }
}

# ── Data Sources ──────────────────────────────────────────────────────────────

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# ── ACM Certificate ───────────────────────────────────────────────────────────

resource "aws_acm_certificate" "incentirise" {
  domain_name               = "incentirise.com"
  subject_alternative_names = ["*.incentirise.com"]
  validation_method         = "DNS"

  lifecycle {
    prevent_destroy = true
  }
}

# ── ALB ───────────────────────────────────────────────────────────────────────

resource "aws_lb" "backend" {
  name               = "incentirise-alb-tf"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = data.aws_subnets.default.ids
}

resource "aws_lb_target_group" "backend" {
  name     = "incentirise-tg-tf"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/health"
    port                = "3000"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 30
    timeout             = 5
    matcher             = "200"
  }
}

resource "aws_lb_target_group" "frontend" {
  name     = "incentirise-frontend-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/health"
    port                = "3000"
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 30
    timeout             = 5
    matcher             = "200"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.backend.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.backend.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.incentirise.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}

# ── Launch Template ───────────────────────────────────────────────────────────

resource "aws_launch_template" "backend" {
  name_prefix   = "incentirise-lt-"
  image_id      = var.ami_id
  instance_type = "t2.micro"
  key_name      = var.key_name

  iam_instance_profile {
    name = "incentirise-ec2-profile"
  }

  vpc_security_group_ids = [aws_security_group.backend.id]

  user_data = base64encode(file("${path.module}/user_data.sh"))

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "incentirise-backend-tf"
    }
  }
}

# ── Auto Scaling Group ────────────────────────────────────────────────────────

resource "aws_autoscaling_group" "backend" {
  name                = "incentirise-asg-tf"
  min_size            = 1
  desired_capacity    = 1
  max_size            = 3
  vpc_zone_identifier = data.aws_subnets.default.ids
  target_group_arns   = [aws_lb_target_group.frontend.arn]

  launch_template {
    id      = aws_launch_template.backend.id
    version = "$Latest"
  }

  health_check_type         = "ELB"
  health_check_grace_period = 600

  tag {
    key                 = "Name"
    value               = "incentirise-asg-node"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_policy" "scale_out" {
  name                   = "incentirise-scale-out"
  autoscaling_group_name = aws_autoscaling_group.backend.name
  policy_type            = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 70.0
  }
}

# ── Route 53 ─────────────────────────────────────────────────────────────────

resource "aws_route53_zone" "incentirise" {
  name = "incentirise.com"
}

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.incentirise.zone_id
  name    = "incentirise.com"
  type    = "A"

  alias {
    name                   = aws_lb.backend.dns_name
    zone_id                = aws_lb.backend.zone_id
    evaluate_target_health = true
  }
}
