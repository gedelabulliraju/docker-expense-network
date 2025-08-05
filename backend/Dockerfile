FROM node:20.19.4-alpine3.22
EXPOSE 8080
ENV DB_HOST="mysql"
RUN adduser -S expense
RUN addgroup -S expense
USER expense:expense
RUN mkdir /opt/server
WORKDIR /opt/server
RUN chown -R expense:expense /opt/server
COPY package.json .
COPY *.js .
RUN npm install
RUN user expense
CMD ["node", "index.js"]
# FROM node:20
# EXPOSE 8080
# ENV DB_HOST="mysql"
# RUN mkdir /opt/server
# WORKDIR /opt/server
# COPY package.json .
# COPY *.js .
# RUN npm install
# CMD ["node", "index.js"]