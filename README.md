# Apps-III-sinf
Códigos utilizados no mini-curso de desenvolvimento mobile do III Seminário de Informática do IFES campus Cachoeiro de Itapemirim.

## Instalação do Apache Cordova 

Instale o node.js, npm para poder instalar o cordova.

```bash
$ sudo apt install nodejs-legacy npm 
```

Utilize o npm para instalar o cordova.

```bash
$ sudo npm install -g cordova
```

## Crie o projeto do seu aplicativo

Para criar um projeto cordova execute o comando `cordova create <nome da pasta> <endereço do pacote> <nome do aplicativo>`. 

Por exemplo, para criar uma pasta chamada "MeuApp" com o codigo do projeto, com endereço de pacote do projeto "com.meuapp" e com o applicativo com nome "MeuApp" execute o comando abaixo:

```bash
$ cordova create MeuApp com.meuapp MeuApp
```


## Adicione uma plataforma de desenvolvimento
O cordova permite o desenvolvimento de apps com varias plataformas(Android,Blackberry 10, iOS, OSX, Ubuntu, Windows, WP8). 

Para adicionar uma plataforma de desenvolvimento para o seu projeto digite o comando `cordova platform add <nome da plataforma>`.

Por exemplo, para adiiconar a plataforma android execute o seguinte comando "dentro da pasta" do seu projeto:
```bash
$ cordova platform add android
```

Cada plataforma tem seus próprios requisitos de instalação. Para que o cordova funcione corretamente verifique se tudo esta instalado corretamente digitando o comando abaixo:
```bash
$ cordova requirements
```

Se o comando exibir alguma mensagem de erro em cor vermelha ou amarela, significa que a plataforma não esta corretamente instalada. 

Para instalar ela corretamente execute os procedimentos para instalar os componentes da sua plataforma conforme a documentação do Apache Cordova explica nesse site https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html. 

No minicurso utilizamos a plataforma Android e instalamos os componentes Java e android home com os seguintes comandos:

```bash
$ sudo apt install gradle default-jdk adb 
```
## Compile o seu aplicativo

Para compilar o seu aplicativo basta executar o comando abaixo:
```bash
$ cordova build
```
## Instale o seu aplicativo no seu smartphone

Para instalar o aplicativo no seu smarphone primeiro habilite seu smartphone no modo desenvolvedor e a depuração usb:

1. Veja este site (http://www.techtudo.com.br/dicas-e-tutoriais/noticia/2014/10/como-ativar-o-modo-desenvolvedor-no-android.html) para saber como habilitar o modo desenvolvedor 

2. Veja este outro site (https://www.androidpit.com.br/como-ativar-depuracao-usb-android) para saber como ativar a depuração usb.

Uma vez que tenha habilitado essas duas opções vc pode enviar o aplicativo para o seu smartphone através do cabo usb atraves do seguinte comando:

```bash 
$ cordova run android
```
se vc estiver usando apenas uma única plataforma não precisa informar o nome dela e o comando fica mais curto:
```bash 
$ cordova run   
```

Caso não consiga enviar o aplicativo para o seu smartphone, verifique se o seu computador reconheceu e autorizou o seu smartphone pelo cabo usb. Para fazer isso execute o comando :
```bash
$ adb devices 
```
No linux para instalar o comando adb basta executa o comando `sudo apt install adb`. Se vc estiver usando windows veja como usar o adb seguindo as informaçoes desse site (https://pplware.sapo.pt/smartphones-tablets/android/como-usar-o-android-debug-bridge-adb/).

## Sites Úteis

Abaixo segue alguns sites úteis que podem ajudar no desenvolvimento de aplicativos com Apache Cordova:
1. Documentação Oficial do Apache Cordova: https://cordova.apache.org
2. Documentação da plataforma Android(onde vc pode baixar o android studio o platform tools pra instalar o android-home): https://developer.android.com/studio/index.html
3. Site do framework Angular.js: https://angularjs.org
4. Site do framework Angular Mobile UI: http://mobileangularui.com
5. Site de tutorias sobre programação web: https://www.w3schools.com
6. Canal do youtube com curso sobre programação web para iniciantes: https://www.youtube.com/watch?v=iZ1ucWosOww



