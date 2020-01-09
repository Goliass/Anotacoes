// polyfill for the method Blob.text() 
// (https://developer.mozilla.org/en-US/docs/Web/API/Blob/text#Polyfill)
Object.defineProperty(Blob.prototype, 'text', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function text() {
    return new Response(this).text();
  }
});

// polyfill for ParentNode.prepend() 
// https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend#Polyfill
//
// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    console.log('here');
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);