FROM nginx
MAINTAINER massinger <massinger@139.com>

COPY  index.html  /usr/share/nginx/html
COPY assets         /usr/share/nginx/html/assets
COPY README.md        /usr/share/nginx/html/README.md





