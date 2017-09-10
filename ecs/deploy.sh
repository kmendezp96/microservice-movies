#!/usr/bin/env bash

###################################
### ECS Deployment Setup Script ###
###################################


# config

set -e
JQ="jq --raw-output --exit-status"

ECS_REGION="us-east-1"
ECS_CLUSTER="review"
VPC_ID="vpc-0f6d6f76"
LOAD_BALANCER_ARN="arn:aws:elasticloadbalancing:us-east-1:046505967931:loadbalancer/app/ecs/13e936f9fca7fa49"
SAMPLE_TARGET_GROUP_ARN="arn:aws:elasticloadbalancing:us-east-1:046505967931:listener/app/ecs/13e936f9fca7fa49/9b29b63d41927a83"

# helpers

configure_aws_cli() {
  echo "Configuring AWS..."
  aws --version
  aws configure set default.region $ECS_REGION
  aws configure set default.output json
  echo "AWS configured!"
}

get_cluster() {
  echo "Finding cluster..."
  if [[ $(aws ecs describe-clusters --cluster $ECS_CLUSTER | $JQ ".clusters[0].status") == 'ACTIVE' ]]; then
      echo "Cluster found!"
  else
      echo "Error finding cluster."
      return 1
  fi
}


# main

configure_aws_cli
get_cluster