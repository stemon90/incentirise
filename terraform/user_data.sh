#!/bin/bash
set -e

# Install Docker
dnf update -y
dnf install -y docker git aws-cli
systemctl enable docker
systemctl start docker

# Install Docker Compose
curl -SL https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Add ec2-user to docker group
usermod -aG docker ec2-user

# Clone the repo
cd /home/ec2-user
git clone https://github.com/stemon90/incentirise.git
cd incentirise

# Fix ownership so ec2-user can git pull later
chown -R ec2-user:ec2-user /home/ec2-user/incentirise

# Fetch secrets from AWS Secrets Manager
SECRET=$(aws secretsmanager get-secret-value \
  --secret-id incentirise/env \
  --region us-east-1 \
  --query SecretString \
  --output text)

# Parse secrets
DB_PASSWORD=$(echo $SECRET | python3 -c "import sys,json; print(json.load(sys.stdin)['DB_PASSWORD'])")
VITE_API_URL=$(echo $SECRET | python3 -c "import sys,json; print(json.load(sys.stdin)['VITE_API_URL'])")
JWT_SECRET=$(echo $SECRET | python3 -c "import sys,json; print(json.load(sys.stdin)['JWT_SECRET'])")
RDS_ENDPOINT=$(echo $SECRET | python3 -c "import sys,json; print(json.load(sys.stdin)['RDS_ENDPOINT'])")

# Write .env file
cat > .env <<ENVEOF
DB_PASSWORD=${DB_PASSWORD}
VITE_API_URL=${VITE_API_URL}
JWT_SECRET=${JWT_SECRET}
RDS_ENDPOINT=${RDS_ENDPOINT}
DATABASE_URL=postgresql://stevenuser:${DB_PASSWORD}@${RDS_ENDPOINT}:5432/incentirise?sslmode=require
NODE_TLS_REJECT_UNAUTHORIZED=0
ENVEOF

# Start the app
docker-compose up -d --build