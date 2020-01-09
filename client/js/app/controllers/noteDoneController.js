function noteDone(description) {
  let note = {};
  note.description = description;

  return NotesDAO
    .addRecordIDB(note, notesDoneStore)
    .then((key) => {
      note.key = key;

      notesDoneModel.add(note);
      notesDoneView.add(note);
    })
    .catch(error => {
      throw new Error(error);
    });
}