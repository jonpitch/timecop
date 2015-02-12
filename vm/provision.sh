#!/usr/bin/env bash

##################################
# Initial cleanup
##################################

# TODO make configurable?

# cleanup logs
#cd /srv/workspace/vm
#truncate -s 0 *.log
#cd /srv/workspace/vm/apache2
#truncate -s 0 *.log

# Redirect STDERR to STDOUT to logs
#echo 'Diverting output to logs/provision.log'
#>| /srv/workspace/vagrant/logs/provision.log
#exec 1>> /srv/workspace/vagrant/logs/provision.log 2>&1

##################################
# Box Update
##################################

add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) universe"
apt-get -y update
apt-get -y dist-upgrade
apt-get -y install curl
apt-get -y install git
apt-get -y install nodejs
apt-get -y install npm

##################################
# PHP & Composer Dependencies
##################################

cd /srv/workspace/api

apt-get -y install php5 apache2 php5-cli php5-curl libapache2-mod-php5 php5-pgsql

# Composer
if [ ! -e composer.phar ]; then
    curl -sS 'https://getcomposer.org/installer' | php
fi

php composer.phar self-update --no-interaction
php composer.phar update --no-interaction

##################################
# PostgreSQL
##################################

cd /srv/workspace/api

# Setup database
sh ../vm/resources/db_setup.sh

# Run migrations
vendor/doctrine/doctrine-module/bin/doctrine-module --no-interaction migrations:migrate

##################################
# NPM, Bower, Grunt, Ember
##################################

# Link Node
if [ ! -e /usr/bin/node ]; then
  ln -s /usr/bin/nodejs /usr/bin/node
fi

# Setup web app
cd /srv/workspace/web

## Tools
npm install -g bower

## Dependencies
bower install --allow-root
npm install
npm install --save-dev broccoli
npm install -g broccoli-cli
npm install -g ember-cli

## Build the latest application
broccoli build dist

##################################
# Apache
##################################

# Apache Setup
if [ ! -e /var/www/timecop.com ]; then
  ln -s /srv/workspace/ /var/www/timecop.com
fi

cp -f /srv/workspace/vm/resources/timecop.com.conf \
      /etc/apache2/sites-available/timecop.com.conf
cp -f /srv/workspace/vm/resources/apache_envvars /etc/apache2/envvars

a2enmod php5
a2enmod rewrite
a2ensite timecop.com.conf
a2dissite 000-default.conf
service apache2 stop
service apache2 start

##################################
# Cleanup
##################################

# remove unnecessary packages
apt-get -y autoremove
