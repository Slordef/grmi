FROM ubuntu:20.04

ARG GITHUB_RUNNER_ALLOW_RUNASROOT
ARG GITHUB_REPOSITORY_URL
ARG GITHUB_RUNNER_TOKEN
ARG GITHUB_RUNNER_NAME
ARG GITHUB_RUNNER_LABELS
ARG GITHUB_RUNNER_VERSION
ARG GITHUB_RUNNER_CHECKSUMS

ENV DEBIAN_FRONTEND=noninteractive
ENV RUNNER_ALLOW_RUNASROOT=1
ENV PATH="/root/.local/bin:/root/.poetry/bin:/root/.profile:$PATH"

#RUN apt clean
RUN apt update
RUN apt install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update
RUN apt install -y \
    curl \
    wget \
    git \
    docker.io \
    docker-compose \
    python3.10 \
    python3-pip \
    python3-setuptools \
    python3-venv
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install 20.12.0
RUN python3 -m pip install pipx

RUN mkdir -p /home/runner
WORKDIR /home/runner

RUN curl -o actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz -L https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz
RUN echo "${GITHUB_RUNNER_CHECKSUMS}  actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz" | shasum -a 256 -c

RUN tar xzf ./actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz

RUN ./bin/installdependencies.sh

RUN rm -f ./actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz

CMD ./config.sh --url $GITHUB_REPOSITORY_URL --token $GITHUB_RUNNER_TOKEN --name $GITHUB_RUNNER_NAME --labels $GITHUB_RUNNER_LABELS --ephemeral && ./run.sh
