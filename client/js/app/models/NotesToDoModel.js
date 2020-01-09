class NotesToDoModel extends NotesModel {

  update(description="", key=-1) {
    const index = this._notes.findIndex(note => note.key === key);
    if (isValidArrayIndex(index)) {
      this._notes[index].description = description;
    }
  }
}