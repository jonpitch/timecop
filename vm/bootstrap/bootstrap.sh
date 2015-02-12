#!/usr/bin/env bash
#
# Bootstrap vagrant environment.
#  - Update packages
#  - Install virtualbox and vagrant
#  - Install vagrant plugins
#  - Start vagrant machine

if [[ "${EUID}" -ne 0 ]]; then
  echo 'Please run as root'
  exit
fi

if [[ ! -e ".vagrant" ]]; then
  echo 'Updating and installing necessary packages'
  apt-get -y update
  apt-get -y install virtualbox
  apt-get -y install vagrant

  vagrant plugin install vagrant-vbguest
  vagrant plugin install vagrant-hostmanager
fi

cd ../

sudo -u "${SUDO_USER}" vagrant up && vagrant reload --provision
sudo -k
