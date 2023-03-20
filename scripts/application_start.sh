#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/cicd-frontend/deploy.log

echo 'pm2 restart frontend' >> /home/ec2-user/cicd-frontend/deploy.log
sudo pm2 restart cicd-frontend >> /home/ec2-user/cicd-frontend/deploy.log
sudo pm2 save >> /home/ec2-user/cicd-frontend/deploy.log
