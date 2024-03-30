FROM docker

RUN apk add --update --no-cache curl nodejs npm

WORKDIR /app

COPY ./app-docker/build/process.sh ./

COPY ./package.json ./
COPY ./build ./build
COPY ./docker ./docker

RUN npm install --omit=dev --ignore-scripts

ENTRYPOINT ["./process.sh"]
CMD ["npm", "start"]