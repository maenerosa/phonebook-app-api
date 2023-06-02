import Person from "../models/Person.js";

async function getPersons(_, res) {
  const persons = await Person.find({});

  return res.status(200).json(persons);
}

async function getPerson(req, res, next) {
  try {
    const id = req.params.id;
    const person = await Person.findById(id);

    if (person) return res.json(person);

    return res.status(404).json({ error: "Person not found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function createPerson(req, res) {
  const { name, number } = req.body;

  const person = new Person({
    name,
    number,
  });

  const savedPerson = await person.save();

  return res.status(201).json(savedPerson);
}

async function updatePerson(req, res) {
  const id = req.params.id;
  const { name, number } = req.body;

  const person = {
    name,
    number,
  };

  const updatedPerson = await Person.findByIdAndUpdate(id, person, {
    new: true,
  });

  res.json(updatedPerson);
}

async function deletePerson(req, res) {
  const id = req.params.id;

  await Person.findByIdAndDelete(id);
  res.status(204).end();
}

export default {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
