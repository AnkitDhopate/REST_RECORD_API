const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

mongoose
  .connect(
    `mongodb+srv://AnkitDhopate:${process.env.MONGO_DB_ATLAS}@cluster0.cdik6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected !");
  })
  .catch((e) => {
    console.log("Error " + e);
  });
