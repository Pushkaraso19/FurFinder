import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    res.render("index.ejs", { 
      breeds: response.data.message,
      title: "FurFinder"
    });
  } catch (error) {
    console.error("Error fetching breed details:", error);
    res.status(500).send("Error fetching breed details");
  }  
});

app.get("/breed-details", async (req, res) => {
  const { breed, subBreed } = req.query;
  const response = await axios.get("https://dog.ceo/api/breeds/list/all");
  let url, breedName;
  if (breed && subBreed) {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`);
    url = response.data.message;
    breedName = `${subBreed} ${breed}`;
  } else if (breed) {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    url = response.data.message;
    breedName = breed;
  }
  console.log(`${url}`);
  res.render("index.ejs", {
    breeds: response.data.message,
    imageUrl: url,
    title: breedName,
    currentBreed: breed,
    currentSubBreed: subBreed
  })
});

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});