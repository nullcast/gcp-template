FROM node:10.16.0-alpine
ENV NODE_ENV="production"
ENV PORT=8080

# install yarn
WORKDIR /src
RUN apk update && \
  apk add git && \
  apk add --no-cache curl && \
  curl -o- -L https://yarnpkg.com/install.sh | sh

ENV PATH $HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH

COPY . .
RUN yarn install -W
WORKDIR /src/serverside/sandbox
RUN yarn tsoa:init
EXPOSE 8080
CMD [ "yarn", "start" ]
