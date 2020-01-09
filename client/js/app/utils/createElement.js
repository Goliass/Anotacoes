/*
  ex: 
    let elem = createElement(
      'tag', 
      ['class1', 'class2'], 
      [
        createHtmlAttributeObject('name', value),
        createHtmlAttributeObject('name', value)
      ],
      'content'
    );
 */
function createElement(tag="", classes=[], attributes=[], content="", id="") {
  let element = "";

  if (tag) {
    element = document.createElement(tag);

    classes.forEach(classs => { 
      element.classList.add(classs);
    });
    
    attributes.forEach(attribute => { 
      element.setAttribute(attribute.name, attribute.value);
    });

    element.textContent = content;

    if (id) {
      element.id = id;
    }
  }
  
  return element;
}