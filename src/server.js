require ('dotenv').config();
const app = require('./app');
const { PORT, NODE_ENV } = require('./config');


app.listen(PORT, () => {
  console.log(`Server in ${NODE_ENV} listening at http://localhost:${PORT}`);
});