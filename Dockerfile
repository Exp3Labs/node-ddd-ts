# build and config environment
FROM mhart/alpine-node:14
WORKDIR /app
COPY . .
# Install dependencies 
RUN yarn global add pm2
RUN yarn install --silent
RUN yarn build
# RUN
CMD [ "pm2-runtime", "start", "pm2.json" ]