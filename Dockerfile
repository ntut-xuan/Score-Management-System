FROM ubuntu:22.04
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# setup mirror
RUN sed 's@archive.ubuntu.com@free.nchc.org.tw@' -i /etc/apt/sources.list
# apt update
RUN apt-get update
RUN apt-get install -y ssh make build-essential net-tools curl git python3-pip
# install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install nodejs
RUN node -v
RUN npm -v
# setup repository file to /etc/sms
RUN mkdir /etc/sms
COPY . /etc/sms
# install tailwindcss and react.js from npm
WORKDIR /etc/sms
RUN npm install -D tailwindcss babel-cli@6 babel-preset-react-app@3
# install python package from pip
RUN pip3 install -r requirements.txt
# expose port
EXPOSE 8080