#!/bin/bash
sudo sh -c 'echo "vm.max_map_count = 262144" >> /etc/sysctl.conf'
sudo sysctl -p

# Create .env
./bin/helpers/create_dot_env_file.sh '
ORIGIN_URL
REPOSITORY_NAME
PRODUCTION
API_URL
'

# Change etc/sysctl.conf file, before run docker-compose up
sysctl  -w net.core.somaxconn=65535
sysctl  -w vm.overcommit_memory=1 

echo never > /sys/kernel/mm/transparent_hugepage/enabled
echo never > /sys/kernel/mm/transparent_hugepage/defrag

echo "Succesfuly! To run app type command: sudo bin/start.sh"
