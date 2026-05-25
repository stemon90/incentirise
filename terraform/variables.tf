variable "aws_region" {
  default = "us-east-1"
}

variable "db_password" {
  description = "RDS master password"
  sensitive   = true
}

variable "key_name" {
  default = "incentirise-key"
}

variable "ami_id" {
  description = "Amazon Linux 2023 AMI ID"
  default     = "ami-02b2c1b57c5105166"
}