const express = require('express');
const app = express();
const routes = require('./router');

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (req,res) => {
  res.send('hello from root path :)');
});

app.use("/api", routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
