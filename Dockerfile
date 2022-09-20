#！/bin/bash
FROM nginx
EXPOSE 80
#作者
MAINTAINER JuneQQQ <1243134432@qq.com>
# 应用构建成功后的文件被复制到镜像内
COPY /dist /usr/share/nginx/html
# 覆盖nginx配置文件
RUN rm -rf /etc/nginx/nginx.conf
COPY /dist/nginx.conf /etc/nginx/nginx.conf
#启动容器时的进程
ENTRYPOINT nginx -g "daemon off;"
