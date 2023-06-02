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

async function createPerson(req, res, next) {
  try {
    const { name, number } = req.body;
    const personExists = await Person.findOne({ name });

    if (personExists)
      return res.status(404).json({ error: "Person already exists" });

    if (name === "" || number === "")
      return res.status(404).json({ error: "Name and number are required" });

    const person = new Person({
      name,
      number,
    });

    const savedPerson = await person.save();

    return res.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
}

async function updatePerson(req, res, next) {
  const id = req.params.id;
  const { name, number } = req.body;

  const person = {
    name,
    number,
  };

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
    });

    return res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
}

async function deletePerson(req, res, next) {
  try {
    const id = req.params.id;
    const person = await Person.findByIdAndDelete(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export default {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
