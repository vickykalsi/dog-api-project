import express from "express";
import axios from "axios";

//in order to use __dirname
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

//in order to use favicon
import path from "node:path";
import favicon from "serve-favicon";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(favicon(path.join(__dirname, 'public', 'images/dog.svg')));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    const breeds = response.data.message;
    res.render("home.ejs", { breeds });
  }
  catch (error) {
    console.error(`cant fetch data from dog api due to ${error}`);
  }
})

app.post("/images", async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.breed != "") {
      const response = await axios.get("https://dog.ceo/api/breed/" + req.body.breed + "/images/");
      res.render("collection.ejs", { collections: response.data.message });
    }
    else
      res.redirect("/");
  }
  catch (error) {
    console.error(`cant fetch data from dog api due to ${error}`);
  }
})

app.listen(port, (req, res) => {
  console.log(`server is listening at port 3000`);
})