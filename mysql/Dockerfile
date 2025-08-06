FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=ExpenseApp@1
RUN groupadd -g 1000 expense && \
    useradd -u 1000 -g expense -s /bin/bash -m expense && \
    mkdir -p /var/lib/mysql && \
    chown -R expense:expense /var/lib/mysql && \
    chmod -R 755 /var/lib/mysql && \
    chown -R expense:expense /etc/mysql && \
    chmod -R 755 /etc/mysql && \
    chown -R expense:expense /var/log/mysql && \
    chmod -R 755 /var/log/mysql && \
    chown -R expense:expense /var/run/mysqld && \
    chmod -R 755 /var/run/mysqld && \
    mkdir -p /var/run/mysqld && \
    chown -R expense:expense /var/run/mysqld && \
    chmod -R 755 /var/run/mysqld && \
    touch /var/run/mysqld/mysqld.pid && \
    chown -R expense:expense /var/run/mysqld/mysqld.pid
VOLUME /etc/mysql/conf.d
VOLUME /etc/mysql/mysql.conf.d
VOLUME /var/log/mysql
VOLUME /var/run/mysqld
VOLUME /var/lib/mysql
USER expense
ADD scripts/*.sql /docker-entrypoint-initdb.d/
