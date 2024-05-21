#!/bin/bash

CONTAINER=vue-build3

if docker ps -a --filter="id=$CONTAINER" --format='{{.ID}}' | grep -q "$CONTAINER"; then
  docker rm -f "$CONTAINER"
else
  echo "Container $CONTAINER does not exist"
fi