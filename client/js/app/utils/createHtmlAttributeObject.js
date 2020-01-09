// returns a 'html attribute' object, to be used as parameter in the function 'createElement', eg.:
  // to represent the attribute key="2" in html, for eg <div key="2">:
    // createHtmlAttributeObject('key', 2) will return {name: "key", value: 2}
function createHtmlAttributeObject(name="", value="") {
  return {"name": name, "value": value};
}