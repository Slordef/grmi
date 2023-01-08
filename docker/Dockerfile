FROM ubuntu:20.04

ARG GITHUB_RUNNER_ALLOW_RUNASROOT
ARG GITHUB_REPOSITORY_URL
ARG GITHUB_RUNNER_TOKEN
ARG GITHUB_RUNNER_NAME
ARG GITHUB_RUNNER_LABELS

ENV DEBIAN_FRONTEND=noninteractive
ENV GITHUB_RUNNER_VERSION=2.299.1
ENV RUNNER_ALLOW_RUNASROOT=1

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    curl \
    wget \
    git \
    docker.io \
    docker-compose \
    python3 \
    python3-pip \
    python3-setuptools

RUN mkdir -p /home/runner
WORKDIR /home/runner

RUN curl -o actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz -L https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz
RUN echo "147c14700c6cb997421b9a239c012197f11ea9854cd901ee88ead6fe73a72c74  actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz" | shasum -a 256 -c

RUN tar xzf ./actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz

RUN ./bin/installdependencies.sh

RUN rm -f ./actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz

CMD ./config.sh --url $GITHUB_REPOSITORY_URL --token $GITHUB_RUNNER_TOKEN --name $GITHUB_RUNNER_NAME --labels $GITHUB_RUNNER_LABELS --ephemeral && ./run.sh && sleep infinity