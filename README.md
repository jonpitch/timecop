# timecop
A sample application to bootstrap a ZF2 (with Doctrine), PostgreSQL, Apache and
Ember application using Vagrant.

# Getting Started
* Install Virtualbox (4.3.10 or greater) & Vagrant
<pre>
sudo apt-get install virtualbox vagrant
</pre>

* Install Vagrant plugins
<pre>
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-hostmanager
</pre>

* Start VM
<pre>
cd /path/to/project/vagrant
vagrant up
</pre>

* Go grab some coffee

# Development Info
* Connect to VM & Workspace
<pre>
vagrant ssh
cd /srv/workspace
</pre>

* Watch for changes
<pre>
grunt watch
</pre>

* URL: timecop.com
* Database: 192.168.50.4:5432 user:timecop password:jcvd database:timecop

