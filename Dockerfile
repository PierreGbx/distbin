FROM debian:jessie

# install gosu

RUN apt-get update --fix-missing && apt-get -y --no-install-recommends install \
    ca-certificates \
    curl \
    sudo

RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
RUN curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.10/gosu-$(dpkg --print-architecture)" \
    && curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.10/gosu-$(dpkg --print-architecture).asc" \
    && gpg --verify /usr/local/bin/gosu.asc \
    && rm /usr/local/bin/gosu.asc \
    && chmod +x /usr/local/bin/gosu

# install and configure authbind
RUN apt-get install -y authbind git && \
    touch /etc/authbind/byport/443 && \
    touch /etc/authbind/byport/80 && \
    chmod -R 755 /etc/authbind/byport/

# install node.js 8
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# clean up after apt-get
RUN rm -rf /var/lib/apt/lists/* && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Change the working directory.
WORKDIR /home/distbin/app

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install --ignore-scripts

# Copy project directory.
COPY . ./

RUN npm run build

# distbin will store data as files in this directory
VOLUME /distbin-db

# read by ./bin/server
ENV DB_DIR=/distbin-db

ENV PORT=80
EXPOSE 80

COPY ./etc/docker/entrypoint.sh /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["npm", "start"]
