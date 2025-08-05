FROM node:20.19.4-alpine3.22
EXPOSE 8080
ENV DB_HOST=mysql
RUN adduser -S expense -G expense && \
    mkdir -p /opt/server && \
    chown -R expense:expense /opt/server
WORKDIR /opt/server
COPY package.json .
COPY *.js .
RUN npm install
USER expense
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