class NotesDAO { 

  constructor() {
    throw new Error("Não é possível criar instâncias desta classe");
  }  

  static addRecordIDB(value, store) {

    return IDBDataBase.openConnection().then(connection => {
      let objectStoreRequest = connection.transaction([store], 'readwrite')
        .objectStore(store)
        .add(value);

      return objectStoreRequest;

    }).then(objectStoreRequest => {

      return new Promise((resolve, reject) => {
        objectStoreRequest.onsuccess = event => {
          let key = event.target.result
          resolve(key);
        }

        objectStoreRequest.onerror = event => {
          console.log("Não foi possível atualizar o registro (IDB)");
          reject(event.target.error);
        };
      });
    });
  } 

  static removeRecordIDB(key, store) {

    return IDBDataBase.openConnection().then(connection => {
      let objectStoreRequest = connection.transaction([store], 'readwrite')
        .objectStore(store)
        .delete(key);

      return objectStoreRequest;

    }).then(objectStoreRequest => {

      return new Promise((resolve, reject) => {
        objectStoreRequest.onsuccess = event => resolve('Registro removido com sucesso (IDB)');

        objectStoreRequest.onerror = event => {
          console.log("Não foi possível remover o registro (IDB)");
          reject(event.target.error);
        };
      });
    });
  }   

  static updateRecordIDB(value, key, store) {

    return IDBDataBase.openConnection().then(connection => {
      let objectStoreRequest = connection.transaction([store], 'readwrite')
        .objectStore(store)
        .put(value, key);

      return objectStoreRequest;

    }).then(objectStoreRequest => {

      return new Promise((resolve, reject) => {
        objectStoreRequest.onsuccess = event => {
          resolve("Registro atualizado com sucesso");
        }

        objectStoreRequest.onerror = event => {
          console.log("Não foi possível atualizar o registro (IDB)");
          reject(event.target.error);
        };
      });
    });
  } 

  static searchRecordIDB(key, store) {
    return IDBDataBase.openConnection().then(connection => {
      let objectStoreRequest = connection.transaction([store], 'readonly')
        .objectStore(store)
        .get(key)

      return objectStoreRequest;

    }).then(objectStoreRequest => {
      return new Promise((resolve, reject) => {

        objectStoreRequest.onsuccess = event => {
          let value = objectStoreRequest.result;

          resolve(value);
        };

        objectStoreRequest.onerror = event => {
          reject(event.target.error);
        };
      });
    })
  }

  static loadRecordsIDB(store) {
    let records = [];

    return IDBDataBase.openConnection().then(connection => {
      let objectStoreRequest = connection.transaction([store], 'readonly')
        .objectStore(store)
        .openCursor();

      return objectStoreRequest;    

    }).then(objectStoreRequest => {
      return new Promise((resolve, reject) => {

        objectStoreRequest.onsuccess = event => {
          var cursor = event.target.result;

          if (cursor) {
            let note = {};
            note.description = cursor.value.description;
            note.key = cursor.key;

            records.push(note);
            cursor.continue();
          }
          else {
            resolve(records);
          }          
        };

        objectStoreRequest.onerror = event => {
          reject(event.target.error);
        };
      });
    })
  }
}  