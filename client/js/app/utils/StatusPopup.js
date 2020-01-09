// Settings initially (they may have been modified) applied to use this class / show a "status popup":
//   - HTML: 
//     <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center" id="statusPopupContainer">
//       <div id="statusPopups" class="d-flex flex-column
//       align-items-center">
//       </div>
//     </div>

//   - CSS: 
//     #statusPopups {
//       position: fixed; 
//       margin-top: 0.5rem;
//       min-width: 70%;
//       z-index: 2000; /* to overlap the z-indexes >= 1000 of Bootstrap */
//     }

//     .toast {
//       background-color: whitesmoke;
//       min-height: 3rem;
//     }

//   - JavaScript:
//     const statusPopup = new StatusPopup('statusPopups');

//     statusPopup.show(`Some message here!`);
class StatusPopup {
  constructor(popupId='', standardDelay=3000) {
    if (!popupId) {
      throw new Error('Invalid element ID');
    }
    
    this._elPopups = document.querySelector(`#${popupId}`);
    if (!this._elPopups) {
      throw new Error(`ID '${popupId}' was not found in the DOM`);
    }

    this._standardDelay = standardDelay;
  }

  show(message='', specificDelay=0) {
    const elNewPopup = this._create(message);
    this._elPopups.prepend(elNewPopup);

    const delay = specificDelay > 0 ? specificDelay : this._standardDelay;

    $(elNewPopup).toast({delay: delay});
    $(elNewPopup).toast('show');

    this._removeAfterHidden(elNewPopup);
  }

  _create(message='') {
    const id = `statusPopup${Date.now()}`; // to set a unique id
    const classes = ['toast']; // Bootstrap popup class
    const attributes = [ 
      // Bootstrap toast properties
      createHtmlAttributeObject('role', 'status'),
      createHtmlAttributeObject('aria-live', 'polite'),
      createHtmlAttributeObject('aria-atomic', 'true')
    ];
  
    const elNewPopup = createElement('div', classes, attributes, "", id);
    elNewPopup.innerHTML = this._bodyTemplate(message);
  
    return elNewPopup;
  }

  _bodyTemplate(message='') {
    return `
      <div class="toast-body d-flex">
        <span>${message}</span>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
  }

  // remove the popup from the DOM when it has finished being hidden from the user
  _removeAfterHidden(elPopup) {
    $(elPopup).on('hidden.bs.toast', // Bootstrap event
      function () {
        if (elPopup.parentNode) {
          elPopup.parentNode.removeChild(elPopup);
      }
    });
  }
}