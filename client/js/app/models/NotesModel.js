class NotesModel {

  constructor() {
    this._notes = [];
  }

  add(note) {
    this._notes.push(note);
  }

  remove(key=-1) {
    const index = this._notes.findIndex(note => note.key === key);
    if (isValidArrayIndex(index)) {
      this._notes.splice(index, 1);
    }
  }

  get notes() {
    return [].concat(this._notes);
  }

  empty() {
    this._notes = [];
  }

  getDescription(key=-1) {
    const index = this._notes.findIndex(note => note.key === key);
    if (isValidArrayIndex(index)) {
      return this._notes[index].description;
    }

    return "";
  }
}