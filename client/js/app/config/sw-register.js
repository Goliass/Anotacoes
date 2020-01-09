if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .catch(error => {
      console.log('Service worker registration failed with ' + error);
    })
} else {
  alert('Quando não houver internet, a app não funcionará ou somente parcialmente, devido à versão do navegador não ser compatível. Para ter todos os recursos da app também sem internet, favor atualizar o navegador. Obrigado!');
}