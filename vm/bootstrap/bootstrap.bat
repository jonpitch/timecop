# Bootstrap vagrant environment.
#  - Install virtualbox and vagrant
#  - Install vagrant plugins
#  - Start vagrant machine

@ECHO OFF

SETLOCAL

  IF NOT EXIST G:\ (
    NET USE G: Shared Drive
  )

  Start /wait G:\ft\git.exe
  Start /wait G:\ft\virtual_box.exe
  Start /wait G:\ft\vagrant.exe

  cd ../

  vagrant plugin install vagrant-vbguest
  vagrant plugin install vagrant-hostmanager

  vagrant up && vagrant reload --provision

ENDLOCAL
