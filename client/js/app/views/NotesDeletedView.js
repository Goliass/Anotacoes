class NotesDeletedView {

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
      <input type="image" id="notesDeleted__restore" class="icon mx-1 col-1 col-sm-1 col-md-1 col-lg-1" src="/img/restore-icon.svg" alt="Mover anotação para as anotações 'adicionadas'"></input>
      <div id="notesDeleted__description" class="notes__description mx-1 text-break col col-sm col-md col-lg">${note.description}</div> 
      <input type="image" id="notesDeleted__vanish" class="icon mx-1 col-1 col-sm-1 col-md-1 col-lg-1" src="/img/vanish-icon.svg" alt="Excluir anotação permanentemente"></input>
    `;
  }

  empty() {
    this._element.innerHTML = "";
  }
}