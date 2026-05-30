#!/bin/bash
set -e

# Install Docker
dnf update -y
dnf install -y docker git aws-cli
systemctl enable docker
systemctl start docker

# Install Docker Compose
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Add ec2-user to docker group
usermod -aG docker ec2-user

# Clone the repo
cd /home/ec2-user
git clone https://github.com/stemon90/incentirise.git
cd incentirise

# Fetch secrets from AWS Secrets Manager
SECRET=$(aws secretsmanager get-secret-value \
  --secret-id incentirise/env \
  --region us-east-1 \
  --query SecretString \
  --output tex