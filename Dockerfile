FROM anapsix/alpine-java

MAINTAINER Jose Leon <leonj1@gmail.com>

RUN apk update && \
    apk add bash bash-doc bash-completion mysql-client nginx supervisor vim lsof less && \
    mkdir -p /run/nginx

ADD build /var/www/html
ADD nginx.conf /etc/nginx.conf
ADD default /etc/nginx/conf.d/default.conf
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD nginx_supervisor.conf /etc/supervisor/conf.d/nginx_supervisor.conf

ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]

