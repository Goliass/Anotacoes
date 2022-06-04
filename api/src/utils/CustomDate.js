class CustomDate {

  static currentTime() {
    return new Date().toTimeString().slice(0, 8);
  }
}

module.exports = CustomDate;