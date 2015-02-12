#!/usr/bin/env bash
#
# Bootstrap vagrant environment.
#  - Update packages
#  - Install virtualbox and vagrant
#  - Install vagrant plugins
#  - Start vagrant machine

if test ! $(which brew); then
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

brew update

brew install git
brew install virtualbox
brew install vagrant

brew cleanup

cd ../

vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-hostmanager

vagrant up && vagrant reload --provision
