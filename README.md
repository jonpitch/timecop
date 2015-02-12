# timecop
They killed his wife ten years ago. There's still time to save her. Murder is forever... until now.

# About
A better time tracking application.

# Getting Started
* Install Virtualbox (4.3.10+) and Vagrant
```
sudo apt-get install virtualbox vagrant
```
* Install Vagrant plugins
```
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-hostmanager
```
* Start the VM
```
cd /vm
vagrant up
```
* Go grab some coffee

# Project Components
## VM
* All the vagrant resources live here

## API
* A Zend Framework 2 application intended to be a RESTful API for TimeCop
* [Doctrine Documentation](http://doctrine-orm.readthedocs.org/en/latest/)
* [ZF2 Documentation](http://framework.zend.com/manual/current/en/index.html)
* Doctrine Migrations:
  * Scaffold: `vendor/bin/doctrine-module migrations:diff`
  * Migrate: `vendor/bin/doctrine-module migrations:migrate`

## Web
* The web frontend of TimeCop - it's an [Ember](http://emberjs.com/) application
* We're using [Ember-CLI](http://www.ember-cli.com/) specifically. [But why?](http://www.ember-cli.com/#why)
* Setup local development
```
sudo apt-get update
sudo apt-get install nodejs npm
cd /path/to/project/web
npm install -g ember-cli
npm install -g bower
npm install -g phantomjs
ember server --proxy http://timecop.com/api
```
* Some basic [Ember-CLI commands](http://www.ember-cli.com/#using-ember-cli)

# Misc. Info
* Database
  * **Host** `192.168.50.4`
  * **Port** `5432`
  * **Db Name** `timecop`
  * **User** `timecop`
  * **Password** `jcvd`
* API
  * **URL** `http://timecop.com/api`
* Web
  * **Latest build** `http://timecop.com`
  * **Local build** `http://localhost:4200`
  * **Logs** `/vm/logs/apache2`
* Accessing Your VM
```
cd /path/to/vm
vagrant ssh
# mapped folder is at: /srv/workspace
```
