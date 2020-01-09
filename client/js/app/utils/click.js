// click(a); // instead of `a.click()`, because this one doesn't work for all browsers
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    let evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                          20, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
  }
}