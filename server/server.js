const app = require('./src/config/express');
const CustomDate = require('./src/utils/CustomDate');

const argPort = parseInt(process.argv[2]);
let port = 3000;

if (argPort && !isNaN(argPort)) {
  port = argPort;
}

app.listen(port, () => {
  console.log(`Server running on port ${port} - ${CustomDate.currentTime()}`);
});