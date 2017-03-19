FROM daocloud.io/nginx:1.11-alpine
MAINTAINER hejunwei

expose 8008

CMD cp -r dist/* /usr/share/nginx/html/
