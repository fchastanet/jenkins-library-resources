FROM node:17-alpine

# Set an arg to store the oq version that should be installed.
ARG OQ_VERSION=1.1.2

RUN set -x \
  && apk add --no-cache --virtual .build-deps \
    curl=~7 \
  \
  && apk add --no-cache \
    git \
    jq=~1.6 \
    openssh-client \
  \
  && curl -o /usr/local/bin/oq https://github.com/Blacksmoke16/oq/releases/download/v${OQ_VERSION}/oq-v${OQ_VERSION}-linux-x86_64 \
  && chmod +x /usr/local/bin/oq \  
  \
  && mkdir -p /home/node/.ssh \
  && chmod 755 /home/node/.ssh \
  && chown node: /home/node/.ssh \
  \
  && apk del .build-deps

USER node
COPY converters/* /usr/app/converters/
WORKDIR /usr/app/converters/