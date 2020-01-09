function importAsJSObject(jsonFiles) {
  return new Promise((resolve, reject) => {
    if (!(jsonFiles instanceof FileList)) {
      reject('O arquivo selecionado deve ser do tipo json (ex.: arquivo.json)');
    }
  
    let jsonFile = jsonFiles[0];

    if (!jsonFile) { // user didn't select any file
      resolve('');
    }
    
    if (jsonFile.type.toLowerCase() != 'application/json') {
      reject('O arquivo selecionado deve ser do tipo json (ex.: arquivo.json)');
    }

    if (jsonFile.size == 0) {
      reject('O arquivo selecionado está vazio. Favor selecionar outro');
    }

    resolve(jsonFile);
  })
  .then(jsonFile => {
    return jsonFile 
      ? jsonFile 
        .text()
        .then(text => {return JSON.parse(text)})
      : '';

  })
  .catch(error => {
    console.log(error);
    throw new Error(error);
  })  
}