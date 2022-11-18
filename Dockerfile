FROM node:14.14.0-alpine

RUN apk add --update --no-cache tzdata openssl nfs-utils tzdata postgresql-dev

WORKDIR /grpcapp

RUN apk add --no-cache \
  libstdc++ \
  libx11 \
  libxrender \
  libxext \
  libssl1.1 \
  ca-certificates \
  fontconfig \
  freetype \
  ttf-dejavu \
  ttf-droid \
  ttf-freefont \
  ttf-liberation \
  ttf-ubuntu-font-family \
  && apk add --no-cache --virtual .build-deps \
  msttcorefonts-installer \
  # \
  # Install microsoft fonts
  && fc-cache -f \
  \
  # Clean up when done
  && rm -rf /tmp/* \
  && apk del .build-deps

ENV TZ=America/Sao_Paulo

ENV NODE_ENV=production

COPY ["package.json", "./"]
COPY ["package-lock.json", "./"]

RUN apk add --update --no-cache --virtual build-dependencies \
  g++ \
  make \
  python \
  && npm install \
  && apk del build-dependencies

RUN apk add bash

EXPOSE ${PORT}

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start"]
