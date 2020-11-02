#!/bin/bash

# Clear .env file
> .env

# Create .env from array of variables
for i in $1
 
do
  echo "Enter $i value"
  read varInput
  echo "$i=$varInput" >> .env
done

