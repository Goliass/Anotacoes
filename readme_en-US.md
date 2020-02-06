# Notes

Personal project of a web application (front-end) for offline notes (ideas, reminders, shopping list?).

Project also with the purpose of putting into practice / remember technologies, frameworks, concepts, etc. from the software development area I have been studying: JavaScript/ECMAScript, PWAs (Progressive Web Apps), [Node.js](https://nodejs.org) / [Express](https://expressjs.com/), [Bootstrap](https://getbootstrap.com).

In a not too far future I hope to improve it, apply fixes and include new features.

## Tests (manual)

  * "Device simulation" on desktop (through browser developer tools)
    * Operating system: Ubuntu (Linux)
    * Widths between 320px (most tests) and 1366px
    * Browsers: 
      * Chromium 79.0.3945.79
      * Firefox 71.0

  * Devices itself
    * Tablet
      * Operating system: Android
      * Browsers: 
        * Chrome 79.0.3945.93
        * Firefox 68.3.0
          * Obs.: the "Exportar anotações (backup)" option/icon didn't work with the app installed / added to home screen
    * Mobile phone
      * Operating system: Android
      * Browsers:
        * Chrome 79.0.3945.93
        * Firefox 68.3.0
          * Obs.: the "Exportar anotações (backup)" option/icon didn't work with the app installed / added to home screen

## How to run (one of the ways) this project (Ubuntu / Linux operating system)
  * Project download
    * "Clone or download" and "[Download ZIP](https://github.com/Goliass/Anotacoes/archive/master.zip)" options.
    
  * Server execution (terminal) (after project / ZIP file extraction)

      * [if not installed] Install the package manager [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
        ```bash
        $ sudo npm install npm -g 
        ```

      * Access the 'server' directory:
        ```bash
        $ cd server
        ```
      
      * Install the dependencies (packages) used by the server:
        ```bash
        $ sudo npm install
        ```

      * Run the server:
        ```bash
        $ npm start
        ```
        or
        ```bash
        $ npm run dev
        ```
        If the server runs correctly, one of the messages displayed on the terminal should look similar to *'Server running on port [port]...'*.

  * App access
    * from the same device of the project (where server is running):
      * in the browser, consider the url *http://localhost:[port]*, eg.: http://localhost:3000.  
      *port* = port number displayed in message *'Server running on port [port]...'* (see above).  

        **Obs.**: consider the browsers of the tests, in the same or later versions.

    * from a different device than the project (tablet, mobile phone):
      * on the device of the project (where server is running):
        * download / install [ngrok](https://ngrok.com/download).
        
        * in a new terminal and from the directory where ngrok is installed, run:
          ```bash
          $ ngrok http [port]
          ```
          *port* = port number displayed in message *'Server running on port [port]...'* (see above).

      * now on the device itself (tablet, mobile phone):
        * in the browser, consider the url displayed by ngrok running on terminal, eg.: *https://demo.ngrok.io/*.  
        
          **Obs.**: consider the browsers of the tests, in the same or later versions.

## Thanks / study sources (among others)

  * [Alura](https://www.alura.com.br/)
  * [MDN Web Docs (Mozilla)](https://developer.mozilla.org)
  * [W3Schools](https://www.w3schools.com)
  * [Google Lighthouse tool](https://developers.google.com/web/tools/lighthouse/)
  * [Node.js](https://nodejs.org)
  * [BrazilJS](https://braziljs.org/)
  * [Wes Bos / JavaScript 30](https://javascript30.com/)
  * [Bootstrap](https://getbootstrap.com/)
  * [ngrok](https://ngrok.com/)

## Author(s)
[Elías Sauthier](https://github.com/Goliass)

## License
[MIT License](LICENSE.txt)

This license does not apply to the icons and images of this project:
  - [Iconify](https://iconify.design)
    - [Elusive Icons](http://elusiveicons.com/license/)
    - [WebHosting Hub Glyphs](https://www.webhostinghub.com/glyphs/)
    - [Font Awesome Free Icons](https://fontawesome.com/license/free)
  - [Pixabay](https://pixabay.com/) 
    - [Pettycon](https://pixabay.com/users/pettycon-3307648/)

--- 
