.PHNOY: install mariadb-install db-tcp-setup

install:
	sudo apt-get update
	sudo mkdir /etc/sms/
	sudo git clone --recursive https://github.com/ntut-xuan/Score-Management-System.git /etc/sms/
	sudo chmod -R 647 /etc/sms/*
	sudo pip3 install flask
	sudo pip3 install pymysql
	sudo pip3 install flask_cors
	sudo pip3 install loguru
	sudo pip3 install flask_login
	sudo pip3 install flask_session
	sudo pip3 install asana
	sudo pip3 install python-dateutil
	sudo pip3 install pytz
	sudo pip3 install pyjwt

mariadb-install:
	sudo apt-get install mariadb-server
	
db-tcp-setup:
	sudo mysql -u root < setup.sql

db-socket-setup:
	sudo mysql -h 127.0.0.1 -u root < setup.sql
