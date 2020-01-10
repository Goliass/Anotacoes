# Anotações

Projeto pessoal de aplicação web para anotações (ideias, lembretes, compras?) offline.

Projeto também com o objetivo de colocar em prática / relembrar tecnologias, frameworks, conceitos, etc. da área de desenvolvimento de software que estou estudando: JavaScript/ECMAScript, PWAs (Progressive Web Apps), [Node.js](https://nodejs.org) / [Express](https://expressjs.com/), [Bootstrap](https://getbootstrap.com).

Em um futuro não muito distante espero melhorá-lo, aplicar correções e incluir novas funcionalidades.

## Testes (manuais)

  * "Simulação de dispositivo" no desktop (através das ferramentas do desenvolvedor do navegador)
    * Sistema operacional: Ubuntu (Linux)
    * Larguras entre 320px (maioria dos testes) e 1366px
    * Navegadores: 
      * Chromium 79.0.3945.79
      * Firefox 71.0

  * Dispositivos em si
    * Tablet
      * Sistema operacional: Android
      * Navegadores: 
        * Chrome 79.0.3945.93
        * Firefox 68.3.0
          * Obs.: a opção/ícone "Exportar anotações (backup)" não funcionou com a app instalada/adicionada à tela inicial
    * Celular
      * Sistema operacional: Android
      * Navegadores:
        * Chrome 79.0.3945.93
        * Firefox 68.3.0
          * Obs.: a opção/ícone "Exportar anotações (backup)" não funcionou com a app instalada/adicionada à tela inicial

## Como executar (uma das formas) este projeto (sistema operacional Ubuntu/Linux)
  * Download do projeto
    * opções "Clone or download" e "[Download ZIP](https://github.com/Goliass/Anotacoes/archive/master.zip)".
    
  * Execução do servidor (terminal) (após extração do projeto / arquivo ZIP)

      * [se não estiver instalado] Instalar o gerenciador de pacotes [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
        ```bash
        $ sudo npm install npm -g 
        ```

      * Acessar o diretório do servidor:
        ```bash
        $ cd server
        ```
      
      * Instalar as dependências (pacotes) utilizados pelo projeto:
        ```bash
        $ sudo npm install
        ```

      * Executar o servidor:
        ```bash
        $ npm start
        ```
        ou
        ```bash
        $ npm run dev
        ```
        Se o servidor executar corretamente, uma das mensagens exibidas no terminal deverá ser parecida com *'Server running on port [porta]...'*.

  * Acesso à aplicação
    * do mesmo dispositivo do projeto (onde o servidor está executando):
      * no navegador, considerar a url *http://localhost:[porta]*, ex.: http://localhost:3000.  
      *porta* = número da porta exibida na mensagem  *'Server running on port [porta]...'* (ver acima).  

        **Obs.**: considerar os navegadores dos testes, na mesma versão ou nas versões posteriores.

    * de um dispositivo diferente ao do projeto (tablet, celular):
      * no dispositivo do projeto (onde o servidor está executando):
        * fazer o download / instalação do [ngrok](https://ngrok.com/download).
        
        * em um novo terminal e do diretório onde o ngrok está instalado, executar:
          ```bash
          $ ngrok http [porta]
          ```
          *porta* = número da porta exibida na mensagem  *'Server running on port [porta]...'* (ver acima).  

      * agora no dispositivo em si (tablet, celular):
        * no navegador, considerar a url exibida pelo ngrok em execução no terminal, ex.: *https://demo.ngrok.io/*.  
        
          **Obs.**: considerar os navegadores dos testes, na mesma versão ou nas versões posteriores.

## Agradecimentos / fontes de estudo (entre outros)

  * [Alura](https://www.alura.com.br/)
  * [MDN Web Docs (Mozilla)](https://developer.mozilla.org)
  * [W3Schools](https://www.w3schools.com)
  * [Google Lighthouse tool](https://developers.google.com/web/tools/lighthouse/)
  * [Node.js](https://nodejs.org)
  * [BrazilJS](https://braziljs.org/)
  * [Wes Bos / JavaScript 30](https://javascript30.com/)
  * [Bootstrap](https://getbootstrap.com/)
  * [ngrok](https://ngrok.com/)

## Autor(es)
[Elías Sauthier](https://github.com/Goliass)

## Licença
[Licença MIT](LICENSE.txt)

Esta licença não se aplica aos ícones e imagens deste projeto:
  - [Iconify](https://iconify.design)
    - [Elusive Icons](http://elusiveicons.com/license/)
    - [WebHosting Hub Glyphs](https://www.webhostinghub.com/glyphs/)
    - [Font Awesome Free Icons](https://fontawesome.com/license/free)
  - [Pixabay](https://pixabay.com/) 
    - [Pettycon](https://pixabay.com/users/pettycon-3307648/)

--- 
