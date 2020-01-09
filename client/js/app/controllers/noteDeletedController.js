function noteDeleted(description) {
  let note = {};
  note.description = description;

  return NotesDAO
    .addRecordIDB(note, notesDeletedStore)
    .then((key) => {
      note.key = key;

      notesDeletedModel.add(note);
      notesDeletedView.add(note);
    })
    .catch(error => {
      throw new Error(error);
    });
}