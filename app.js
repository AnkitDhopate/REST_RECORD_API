const express = require("express");
const app = express();
const Record = require("./models/record");
require("./db/conn");

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

// Creating User
app.post("/create", async (req, res) => {
  try {
    const user = new Record(req.body);

    const createRecord = await user.save();
    res.status(201).send(createRecord);
  } catch (error) {
    res.send(res.status(400).send(e));
  }
});

//Getting users
app.get("/api", async (req, res) => {
  try {
    const api = await Record.find();
    res.status(201).send(api);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Getting individual user
app.get("/api/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const indAPI = await Record.findById(_id);
    if (!indAPI) {
      res.status(404).send("error");
    } else {
      res.status(201).send(indAPI);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Updating user
app.patch("/update/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateRecord = await Record.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteRecord = await Record.findByIdAndDelete(_id);

    if (!req.params.id) {
      return res.status(400).send();
    }
    res.status(201).send(deleteRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Connected at port ${port}`);
});
