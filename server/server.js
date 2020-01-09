const port = 9092;
const CustomDate = require('./src/utils/CustomDate');

const app = require('./src/config/express');

app.listen(port, () => {
  console.log(`Server running on port ${port} - ${CustomDate.currentTime()}`);
});