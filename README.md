# sAPO-BackOffice-Frontend

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Instalar dependencias

### npm, nodejs
```
sudo apt-get install npm nodejs-legacy
```

#### Si se precisa una versión más reciente obtnerla de la siguiente manera:
##### nodejs
curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -
sudo apt-get install -y nodejs

#### npm
npm install -g npm

#Instalar Yeoman

npm install -g yo bower

#Install angularJS generator

npm install -g generator-angular

#Generate angularJS application

yo angular

#Iniciar servidor
grunt serve

#Si sale error de compass, instalar:
npm install grunt-contrib-compass --save-dev -g
gem install compass --pre

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
