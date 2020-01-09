function backup(object, fileName) {
  if (!object || JSON.stringify(object) == "{}") return;
  if (!fileName) fileName = `backup${Date.now()}`;

  let JSONString = JSON.stringify(object);
  _saveAsJSONFile(JSONString, fileName);
}

function _saveAsJSONFile(JSONString, fileName='backup') {
  let blobFile = new Blob([JSONString], {type : 'application/json'});  
  let url = URL.createObjectURL(blobFile);

  let a = document.createElement('a');
  a.download = `${fileName}.json`;
  a.href = url;
  
  click(a); // instead of `a.click()`, because this one doesn't work for all browsers
}

