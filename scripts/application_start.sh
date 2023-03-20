#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/cicd-frontend/deploy.log

echo 'pm2 restart frontend' >> /home/ec2-user/cicd-frontend/deploy.log
pm2 restart frontend >> /home/ec2-user/cicd-frontend/deploy.log
