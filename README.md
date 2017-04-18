# sAPO-BackOffice-Frontend

Aplicación web desarrollada con el lenguaje AngularJS para el curso Taller de Sistemas de Información 2 del año 2015 de la Facultad de Ingeniería de Uruguay.
La misma se comunica con su respectivo backend, [sapoREST](https://github.com/etorrano/sapoREST) (desarrollado en JavaEE), mediante el protocolo REST.

![Alt text](/demo/backDashboardMovimientos.png?raw=true)

Se pueden ver más ejemplos de las funcionalidades de la aplicación en la carpeta [demo](https://github.com/etorrano/sAPO-BackOffice-Frontend/tree/master/demo)

Éste proyecto fue generado con [yo angular generator](https://github.com/yeoman/generator-angular)
versión 0.12.1.

## Descripción del problema a resolver en el curso

El proyecto consitía en realizar una plataforma genérica de sistemas de inventarios, que pueda ser instanciada desde la nube, para servir a múltiples instituciones que deseen hacer uso de la misma. La idea general es que se puedan administrar almacenes virtuales, con eventualmente páginas (URLS) distintas para que cada usuario pueda mostrar sus productos y administrarlos. Un ejemplo de almacen virtual puede ser un supermercado en el cual existen distintos productos con distintas categorías a las cuales pueden pertenecer, entre otros (Por más información, consultar la [letra](https://github.com/etorrano/sAPO-BackOffice-Frontend/tree/master/demo/letra.pdf) del problema).
Para ésto se desarrolló un módulo de Front Office y otro de Back Office. La presente aplicación corresponde al frontend del Back Office mientras que [TSI2-AngularFront](https://github.com/etorrano/TSI2-AngularFront) corresponde al frontend del Front Office y [sapoAndroid](https://github.com/etorrano/SAPo-Android) a su versión móvil. Por último se disponde del backend [sapoREST](https://github.com/etorrano/sapoREST) para los tres módulos.

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

