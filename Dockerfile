FROM daocloud.io/nginx:1.11-alpine
MAINTAINER hejunwei

COPY . /usr/share/nginx/html

expose 8008

