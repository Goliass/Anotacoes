/* GLOSSARY:

"el" in var names = to identify vars related to html ELements
*/

/* DECLARATIONS, INITIALIZATIONS, ETC */
// const form = document.querySelector(".conteudo_form");
const elNotesButtons = document.querySelector("#notesButtons");

const elSearchButton = document.querySelector("#searchButton");

const elFormNote = document.querySelector("#formNote");

const elFormNoteInputDescription = document.querySelector("#formNote__inputDescription");

const elFormNoteInputEmpty = document.querySelector("#formNote__inputEmpty");

const elNotesContent = document.querySelector("#notesContent");

const elNotesToDo = document.querySelector("#notesToDo");
const notesToDoView = new NotesToDoView(elNotesToDo);

const elNotesToDoButton = document.querySelector("#notesToDoButton");

const elNotesDone = document.querySelector("#notesDone");
const notesDoneView = new NotesDoneView(elNotesDone);

const elNotesDeleted = document.querySelector("#notesDeleted");
const notesDeletedView = new NotesDeletedView(elNotesDeleted);

const elHelpButton = document.querySelector("#helpButton");
const elHelpModalBody = document.querySelector(".helpModal__body");

const elBackup = document.querySelector("#backup");
const elImport = document.querySelector("#import");

let elNoteEdit;

const notesToDoModel = new NotesToDoModel();

let notesDoneModel = new NotesModel();
let notesDeletedModel = new NotesModel();

let icons = [];
let isEditing = false;

const varNames = {
  notesToDoModel: "notesToDo",
  notesDoneModel: "notesDone",
  notesDeletedModel: "notesDeleted"
};

const statusPopup = new StatusPopup('statusPopups');

/* FUNCTIONS */
function _init() {
  elNotesToDoButton.classList.add('active');
  elNotesToDo.classList.add("active");

  notesToDoModel.empty();
  notesToDoView.empty();
  loadNotesToDo()
    .then(() => {
      display(notesToDoModel.notes, notesToDoView);
    });

  notesDoneModel.empty();
  notesDoneView.empty();
  loadNotesDone()
    .then(() => {
      display(notesDoneModel.notes, notesDoneView);
    });

  notesDeletedModel.empty();
  notesDeletedView.empty();
  loadNotesDeleted()
    .then(() => {
      display(notesDeletedModel.notes, notesDeletedView);
    });
} 

function loadNotesToDo() {
  return NotesDAO
    .loadRecordsIDB(notesToDoStore)
    .then(notesToDoIDB => {
      notesToDoIDB.forEach(noteToDoIDB => {
        notesToDoModel.add(noteToDoIDB);
      });
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
} 

function addNote(description) {
  let note = {};
  note.description = description;

  return NotesDAO
    .addRecordIDB(note, notesToDoStore)
    .then((key) => {
      note.key = key;

      notesToDoModel.add(note);
      notesToDoView.add(note);
    })
    .catch(error => {
      console.log(error);
      throw new Error('Erro ao adicionar a anotação. Favor tentar novamente');
    }); 
}

function updateNote(description, key) {
  let note = {};
  note.key = key;
  note.description = description;

  return NotesDAO
    .updateRecordIDB({description}, note.key, notesToDoStore)
    .then(() => {
      notesToDoModel.update(note.description, note.key);
      notesToDoView.update(note);
    })
    .catch(error => alert(error)); 
}

function removeNoteToDo(key, store) {
  return NotesDAO
    .removeRecordIDB(key, store)
    .then(() => {
      notesToDoModel.remove(key);
      notesToDoView.remove(key);
    })
    .catch(error => {
      throw new Error(error);
    }); 
}

function removeNoteDone(key, store) {
  return NotesDAO
    .removeRecordIDB(key, store)
    .then(() => {
      notesDoneModel.remove(key);
      notesDoneView.remove(key);
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
}

function removeNoteDeleted(key, store) {
  return NotesDAO
    .removeRecordIDB(key, store)
    .then(() => {
      notesDeletedModel.remove(key);
      notesDeletedView.remove(key);
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
}

function loadNotesDone() {
  return NotesDAO
    .loadRecordsIDB(notesDoneStore)
    .then(notesDoneIDB => {
      notesDoneIDB.forEach(noteDoneIDB => {
        notesDoneModel.add(noteDoneIDB);
      });
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
}

function loadNotesDeleted() {
  return NotesDAO
    .loadRecordsIDB(notesDeletedStore)
    .then(notesDeletedIDB => {
      notesDeletedIDB.forEach(noteDeletedIDB => {
        notesDeletedModel.add(noteDeletedIDB);
      });
    })
    .catch(error => {
      console.log(error);
      alert(error);
    });
}

function display(notes, notesView) {
  notes.forEach(note => notesView.add(note));
}

function loadIconsHelp() {
  // selection of icons directory and alternative text description ('alt' attribute) of the icon/image. 
  const allIcons = Array.from(document.querySelectorAll(".icon"));
  let icons = allIcons.reduce((accumulator, currentValue) => { 
    if (!accumulator.includes(`${currentValue.src}=${currentValue.alt}`)) {
      accumulator.push(`${currentValue.src}=${currentValue.alt}`);
    }
    return accumulator
  }, []);

  let iconsHelp = "";
  icons.forEach(icon => {
    let arr = icon.split('=');
    iconsHelp = iconsHelp + `<li class="list-group-item"><img src="${arr[0]}" alt="Ícone" class="help-icon"> ${arr[1]}</li>`;
  })
  
  elHelpModalBody.innerHTML = iconsHelp;
}

function searchMatches(description, notes) {
  const regExp = new RegExp(description, "gi");

  const notesMatches = notes.filter(note => {
    return note.description.match(regExp);
  })

  return notesMatches;
}

/* "EXECUTION ITSELF" */
_init();

elHelpButton.addEventListener('click', function() {
  loadIconsHelp();
});

elNotesButtons.addEventListener('click', function(evt) {
  let target = evt.target;

  if (['notesToDoButton__icon', 'notesDoneButton__icon', 'notesDeletedButton__icon']
  .includes(target.id)) {
    // if the target is a child, replace the target with the parent (button)
    target = target.parentNode;
  }

  if (['notesToDoButton', 'notesDoneButton', 'notesDeletedButton']
  .includes(target.id)) {

    // select the notes element (represented by dataset) matching the clicked button
    const elTargetNotes = document.querySelector(`${target.dataset.target_notes}`);

    if (elTargetNotes) {

      // undo the highlight of "active"/clicked buttons
      const activeNotesButtons = elNotesButtons.querySelectorAll('.active');
      activeNotesButtons.forEach(button => button.classList.remove('active'));

      // hide currently displayed notes
      let activeNotesContent = elNotesContent.querySelectorAll(".active");  
      activeNotesContent.forEach(content => content.classList.remove('active'));

      // highlight the clicked button
      target.classList.add('active');
      // display the notes matching the clicked button
      elTargetNotes.classList.add('active');
    }
  }
});

elSearchButton.addEventListener('click', function() {
  let description = elFormNoteInputDescription.value;

  let notesToDoMatches = searchMatches(description, notesToDoModel.notes);
  let notesDoneMatches = searchMatches(description, notesDoneModel.notes);
  let notesDeletedMatches = searchMatches(description, notesDeletedModel.notes);

  notesToDoView.empty();
  notesDoneView.empty();
  notesDeletedView.empty();

  if (notesToDoMatches.length > 0) {
    display(notesToDoMatches, notesToDoView);
  } else {
    statusPopup.show("Nenhuma anotação encontrada nas anotações 'adicionadas'", 10000);
  }

  if (notesDoneMatches.length > 0) {
    display(notesDoneMatches, notesDoneView);
  } else {
    statusPopup.show("Nenhuma anotação encontrada nas anotações 'verificadas'", 10000);
  }

  if (notesDeletedMatches.length > 0) {
    display(notesDeletedMatches, notesDeletedView);
  } else {
    statusPopup.show("Nenhuma anotação encontrada nas anotações 'excluídas'", 10000);
  }
});

elFormNoteInputEmpty.addEventListener('click', (evt) => {
  elFormNoteInputDescription.value = "";
  elFormNoteInputDescription.focus();
});

elFormNote.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  try {
    if (isEditing) {
      let key = parseInt(elNoteEdit.getAttribute("key"));
      updateNote(elFormNoteInputDescription.value, key)
        .then(() => {
          statusPopup.show(`Anotação atualizada`);
          elFormNoteInputDescription.value = "";
        })
      isEditing = false;
    } else {
      addNote(elFormNoteInputDescription.value)
        .then(() => {
          statusPopup.show(`Anotação '${elFormNoteInputDescription.value}' adicionada`);
          elFormNoteInputDescription.value = "";
        })
    }

    elFormNoteInputDescription.focus();
  }
  catch(error) {
    alert("Erro ao adicionar / atualizar a anotação. Favor tentar novamente, obrigado!");
  }
});

elNotesToDo.addEventListener("click", (evt) => {
  let target = evt.target;

  let note = {};
  note.key = 0;
  note.description = "";

  if (target.id == "notesToDo__done") {
    let elNote = target.parentNode;

    note.key = parseInt(elNote.getAttribute("key"));
    note.description = notesToDoModel.getDescription(note.key);

    noteDone(note.description)
      .then(() => {
        removeNoteToDo(note.key, notesToDoStore)
      })
      .then(() => {
        statusPopup.show(`Anotação '${note.description}' marcada como 'verificada'`);
      })
      .catch(error => {
        console.log(error);
        alert("Erro ao marcar a anotação como 'verificada'. Favor tentar novamente, obrigado!");
      })

    return;
  } 

  if (target.id == "notesToDo__edit") {
    isEditing = true;

    elNoteEdit = target.parentNode;

    note.key = parseInt(elNoteEdit.getAttribute("key"));
    note.description = notesToDoModel.getDescription(note.key);

    if (note.description) {
      elFormNoteInputDescription.value = note.description;
        
      elFormNoteInputDescription.focus();
    }

    return;
  } 

  if (target.id == "notesToDo__delete") {
    let elNote = target.parentNode;

    note.key = parseInt(elNote.getAttribute("key"));
    note.description = notesToDoModel.getDescription(note.key);

    noteDeleted(note.description)
    .then(() => removeNoteToDo(note.key, notesToDoStore))
    .then(() => {
      statusPopup.show(`Anotação '${note.description}' excluída`);
    })
    .catch(error => {
      console.log(error);
      alert("Erro ao excluir a anotação. Favor tentar novamente, obrigado!");
    });

    return;
  }
});

elNotesDone.addEventListener("click", (evt) => {
  let target = evt.target;
  let note = {};
  note.key = 0;
  note.description = '';

  if (target.id == "notesDone__add") {
    let elNote = target.parentNode;

    note.key = parseInt(elNote.getAttribute("key"));
    note.description = notesDoneModel.getDescription(note.key);

    addNote(note.description)
      .then(() => {
        statusPopup.show(`Anotação '${note.description}' adicionada`);
      })
    return;
  } 

  if (target.id == "notesDone__delete") {
    let elNote = target.parentNode;

    note.key = parseInt(elNote.getAttribute("key"));
    note.description = notesDoneModel.getDescription(note.key);

    noteDeleted(note.description)
    .then(() => removeNoteDone(note.key, notesDoneStore))
    .then(() => {
      statusPopup.show(`Anotação '${note.description}' excluída`);
    })
    .catch(error => {
      console.log(error);
      alert("Erro ao excluir a anotação. Favor tentar novamente, obrigado!");
    });

    return;
  }
});

elNotesDeleted.addEventListener("click", (evt) => {
  let target = evt.target;
  let note = {};
  note.key = 0;
  note.description = '';
  
  if (target.id == "notesDeleted__restore") {
    let elNote = target.parentNode;

    note.key = parseInt(elNote.getAttribute("key"));
    note.description = notesDeletedModel.getDescription(note.key);

    addNote(note.description)
      .then(() => removeNoteDeleted(note.key, notesDeletedStore))
      .then(() => {
        statusPopup.show(`Anotação '${note.description}' movida para as anotações 'adicionadas'`, 5000);
      })
    return;
  } 

  if (target.id == "notesDeleted__vanish") {
    let elNote = target.parentNode;

    note.key = parseInt(elNote.getAttribute("key"));
    note.description = notesDeletedModel.getDescription(note.key);

    removeNoteDeleted(note.key, notesDeletedStore)
    .then(() => {
      statusPopup.show(`Anotação '${note.description}' excluída permanentemente`);
    })
    .catch(error => {
      console.log(error);
      alert("Erro ao excluir a anotação permanentemente. Favor tentar novamente, obrigado!");
    });

    return;
  }
});

elBackup.addEventListener("click", (evt) => {
  let notesBackup = {};

  notesBackup[varNames.notesToDoModel] = JSON.parse(JSON.stringify(notesToDoModel.notes));
  notesBackup[varNames.notesDoneModel] = JSON.parse(JSON.stringify(notesDoneModel.notes));
  notesBackup[varNames.notesDeletedModel] = JSON.parse(JSON.stringify(notesDeletedModel.notes));

  let fileName = `anotacoes_backup${Date.now()}`;

  backup(notesBackup, fileName);
});

// TODO VERIFY: the event change just fires on the first time, when choosing the same file many times :(
elImport.addEventListener("change", (evt) => {
  importAsJSObject(evt.target.files)  
    .then(importedNotes => {
      if (importedNotes) {
        let notesToDoImport = importedNotes[varNames.notesToDoModel] || [];
        let notesDoneImport = importedNotes[varNames.notesDoneModel] || [];
        let notesDeletedImport = importedNotes[varNames.notesDeletedModel] || [];
  
        if (notesToDoImport.length > 0 || notesDoneImport.length > 0 || notesDeletedImport.length > 0) {
          let description = "";
  
          let promisesNotesToDo = notesToDoImport.map(noteToDoImport => {
            // try to get the values of current backup field names, otherwise try previous (app versions) field names
            description = noteToDoImport.description || noteToDoImport.descricao;
            return addNote(description);
          });
  
          let promisesNotesDone = notesDoneImport.map(noteDoneImport => {
            description = noteDoneImport.description || noteDoneImport.descricao
            return noteDone(description);
          });
  
          let promisesNotesDeleted = notesDeletedImport.map(noteDeletedImport => {
            description = noteDeletedImport.description || noteDeletedImport.descricao;
            return noteDeleted(description);
          });
  
          let promisesImport = [].concat(promisesNotesToDo, promisesNotesDone, promisesNotesDeleted);
  
          return Promise.all(promisesImport)
            .then(() => {
              statusPopup.show('Anotações importadas com sucesso!');
            })
            .catch(error => {
              throw new Error(error);
            });
        } else {
          alert('Não foi encontrada nenhuma anotação para importar no arquivo selecionado');
        }
      }

    })
    .catch(error => {
      console.log(error);
      alert(error);
    })
});