#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/buyasia/cicd-frontend/deploy.log

echo 'cd /home/ec2-user/nodejs-server-cicd' >> /home/ec2-user/buyasia/cicd-frontend/deploy.log
cd /home/ec2-user/buyasia/cicd-frontend >> /home/ec2-user/buyasia/cicd-frontend/deploy.log

echo 'npm install' >> /home/ec2-user/buyasia/cicd-frontend/deploy.log 
npm i --legacy-peer-deps >> /home/ec2-user/buyasia/cicd-frontend/deploy.log
