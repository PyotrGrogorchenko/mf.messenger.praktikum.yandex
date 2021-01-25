FROM node:14
ENV NODE_ENV production
WORKDIR /
COPY package*.json /
RUN npm ci --production
COPY dist /dist
COPY app.js /
EXPOSE 80
CMD node app.js 