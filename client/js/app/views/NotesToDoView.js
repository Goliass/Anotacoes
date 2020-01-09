class NotesToDoView {

  constructor(element) {
    this._element = element;
  }

  add(note) {
    let element = createElement(
      'div', 
      ['row', 'align-items-center', 'my-3', 'no-gutters'], 
      [createHtmlAttributeObject('key', note.key)]
    );

    element.innerHTML = this.template(note);
    // insert the new element at the beginning (as first child)
    this._element.prepend(element);
  }

  update(note) {
    let element = this._element.querySelector(`[key="${note.key}"]`);

    if (element) {
      element.innerHTML = this.template(note);
    }
  }

  remove(key) {
    let elemento = this._element.querySelector(`[key="${key}"]`);

    if (elemento) {
      elemento.remove();
    }
  }

  template(note) {
    return `
      <input type="image" id="notesToDo__done" class="icon mx-1 col-1 col-sm-1 col-md-1 col-lg-1" src="/img/done-icon.svg" alt="Marcar a anotação como 'verificada'"></input>
      <input type="image" id="notesToDo__edit" class="icon mx-1 col-1 col-sm-1 col-md-1 col-lg-1" src="/img/edit-icon.svg" alt="Editar anotação"></input>
      <div id="notesToDo__description" class="notes__description mx-1 text-break col col-sm col-md col-lg">${note.description}</div> 
      <input type="image" id="notesToDo__delete" class="icon mx-1 col-1 col-sm-1 col-md-1 col-lg-1" src="/img/del-icon.svg" alt="Excluir anotação"></input>
    `;
  }

  empty() {
    this._element.innerHTML = "";
  }
}