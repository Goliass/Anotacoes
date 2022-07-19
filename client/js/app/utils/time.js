
/**
 * Time difference in seconds between two dates
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns difference in seconds
 */
function timeDifferenceInSeconds(startDate = new Date(), endDate = new Date()) {
  return (endDate - startDate) / 1000;
}

/**
 * Checks if the value matches a long press/click
 * @param {Number} startDate 
 * @returns {boolean} value corresponds or not to a long press/click
 */
function isLongPress(secondsPressed) {
  return (secondsPressed > 0.5);
}