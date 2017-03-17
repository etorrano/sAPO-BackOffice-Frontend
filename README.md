# sAPO-BackOffice-Frontend

Aplicación web desarrollada con el lenguaje AngularJS para el curso Taller de Sistemas de Información 2 del año 2015 de la Facultad de Ingeniería de Uruguay.

![Alt text](/img/backDashboardMovimientos.png?raw=true)

Se pueden ver más ejemplos de las funcionalidades de la aplicación en la carpeta [img](https://github.com/etorrano/sAPO-BackOffice-Frontend/tree/master/img)

Éste proyecto fue generado con [yo angular generator](https://github.com/yeoman/generator-angular)
versión 0.12.1.

## Instalar dependencias

### npm, nodejs, nodejs-dev
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

gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable --ruby
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

## Licencia

La aplicación se distribuye como Software Libre bajo los términos de la licencia GPL versión 3 o superior.

