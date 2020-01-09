if (navigator.storage && navigator.storage.persist && 
  navigator.storage.persisted) {

  navigator.storage.persisted().then(function(persisted) {
    if (persisted) {
      // console.log(".persisted - Storage can just be cleared by explicit user action");
    }
    else {
      navigator.storage.persist().then(function(persist) {
        if (persist) {
          // console.log(".persist - Storage can be cleared just by explicit user action");
        }
        else {
          console.log(".persist - Storage may be cleared by the User Agent");
        }
      });
    }
  });    
} else {
  console.log("navigator.storage - Storage may be cleared by the User Agent");    
}