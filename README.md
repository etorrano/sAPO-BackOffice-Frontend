# sAPO-BackOffice-Frontend

Éste proyecto fue generado con [yo angular generator](https://github.com/yeoman/generator-angular)
versión 0.12.1.

## Instalar dependencias

### npm, nodejs, nodejs-dev(no recuerdo si es necesario) 
```
sudo apt-get install npm nodejs-legacy nodejs-dev
```

#### Si se precisa una versión más reciente obtenerla de la siguiente manera:
##### nodejs
```
curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -
sudo apt-get install -y nodejs
```

#### npm
```
npm install -g npm
```
#### [Ruby](https://gorails.com/setup/ubuntu/14.04) - [Compass](http://blog.acrona.com/index.php?post/2014/05/15/Installer-Fondation-et-Compass/sass-sur-Ubuntu-14.04)
```
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev

curl -L https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
rvm install 2.1.2
rvm use 2.1.2 --default
ruby -v

npm install grunt-contrib-compass --save-dev -g
gem install compass
```
En el último si no funciona agregar ```--pre``` al final

### Instalar Yeoman
```
npm install -g yo bower
```

### Instalar generador angularJS, bower, grunt
```
npm install -g grunt-cli bower generator-angular
```

## Generar aplicación angularJS
```
yo angular
```

## Compilar y ejecutar

Ejecutar `grunt` para compilar y `grunt serve` para verlo en el navegador.

### Si sale error de compass, instalar:
```
npm install grunt-contrib-compass --save-dev -g
gem install compass --pre
```

## Verificación

Con `grunt test` ejecuta los test unitarios con karma.
