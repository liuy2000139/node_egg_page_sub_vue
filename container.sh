#!/bin/bash

CONTAINER=vue-build3

if docker ps -a --filter="name=$CONTAINER" --format='{{.ID}}' ; then
  docker rm -f "$CONTAINER"
else
  echo "Container $CONTAINER does not exist"
fi
