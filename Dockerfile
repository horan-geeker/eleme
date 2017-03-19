FROM daocloud.io/nginx:1.11-alpine
MAINTAINER hejunwei

expose 8008

CMD npm run build && cp -r dist/* /usr/share/nginx/html/
