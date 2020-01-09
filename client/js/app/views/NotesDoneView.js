class NotesDoneView {

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

  remove(key) {
    let element = this._element.querySelector(`[key="${key}"]`);

    if (element) {
      element.remove();
    }
  }

  template(note) {
    return `
      <input type="image" id="notesDone__add" class="icon done mx-1 col-1 col-sm-1 col-md-1 col-lg-1" src="/img/add-icon.svg" alt="Adicionar anotação"></input>        
      <div id="notesDone__description" class="notes__description mx-1 text-break col col-sm col-md col-lg">${note.description}</div> 
      <input type="image" id="notesDone__delete" class="icon mx-1 col-1 col-sm-1 col-md-1 col-lg-1" src="/img/del-icon.svg" alt="Excluir anotação"></input>
    `;
  }

  empty() {
    this._element.innerHTML = "";
  }
}