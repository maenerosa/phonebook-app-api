const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
let persons = [
  {
    id: 1,
    name: "Ellen Mae Nerosa",
    number: "+639506102901",
  },
  {
    id: 2,
    name: "Mae Gonzales",
    number: "+639506965434",
  },
  {
    id: 3,
    name: "Mikko Canuzo",
    number: "+63987675467",
  },
  {
    id: 4,
    name: "Bean Sprout",
    number: "+63980909087",
  },
  {
    id: 5,
    name: "Mister Villanueva",
    number: "+63923456789",
  },
];

function generateId() {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;

  return maxId + 1;
}

app.get("/api/persons", (_req, res) => {
  res.status(200).json(persons);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  const person = {
    id: generateId(),
    name,
    number,
  };

  persons = persons.concat(person);

  res.status(201).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
