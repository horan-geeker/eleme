FROM daocloud.io/nginx:1.11-alpine
MAINTAINER hejunwei

COPY dist/ /usr/share/nginx/html

expose 8008
