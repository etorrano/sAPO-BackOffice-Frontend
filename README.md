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
```
curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -
sudo apt-get install -y nodejs
```

#### npm
```
npm install -g npm
```

### Instalar Yeoman
```
npm install -g yo bower
```

### Instalar generador angularJS
```
npm install -g generator-angular
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
