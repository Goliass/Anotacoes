const dbName = 'notes-IDB';
const version = 6;

const notesToDoStore = 'notesToDo';
const notesDoneStore = 'notesDone';
const notesDeletedStore = 'notesDeleted';

const stores = [notesToDoStore, notesDoneStore, notesDeletedStore];

let connection = null;
let close = null; 

class IDBDataBase {
  constructor() {
    throw new Error("Não é possível criar instâncias desta classe");
  }

  static openConnection() {
    return new Promise((resolve, reject) => {
      if (connection) {
        resolve(connection);
        return;
      } else {
        let openRequestIDB = window.indexedDB.open(dbName, version); 

        openRequestIDB.onupgradeneeded = function(e) {
            // console.log('Banco criado ou alterado');
            IDBDataBase._createStores(e.target.result);
        };

        openRequestIDB.onsuccess = e => {
            // console.log('Conexão obtida com sucesso');
            connection = e.target.result;

            close = connection.close.bind(connection);
            connection.close = function() {
              throw new Error("A conexão não pode ser fechada diretamente com close()");
            }

            resolve(connection);
        };

        openRequestIDB.onerror = e => {
            console.log(e.target.error);
            reject(e.target.error.name);
        };
      }
    });
  }

  static closeConnection() {
    if (connection) {
      close();
      connection = null;
      console.log("Conexão finalizada");
    }
  }

  static _createStores(connection) {
    stores.forEach(store => {
      // Object Store deletion (if exists)
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }

      connection.createObjectStore(store, {autoIncrement: true});    
    });
  }
}