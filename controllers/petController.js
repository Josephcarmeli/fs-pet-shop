import { sql } from '../restfulExpressServer.js';

export const getAllPets = async(req, res) => {
    const pets = await sql`SELECT * FROM pets;`;
    res.send(JSON.stringify(pets));
    };

export const addPet = async(req, res) => {
    const { age, name, type} = req.body;
    const newPet = { age, name, type};
    if (!newPet || !newPet.name || !newPet.type || !newPet.age) {
        res.status(422).send("incorrect pet data");
        return;
    }
    try {
        const result = await sql 
        `INSERT INTO pets (age, name, type) 
        Values (${age}, ${name}, ${type}) RETURNING *;`
        res.status(201).send("pet addded");
    } catch (err) {
        res.status(500).send("Error adding pet");
    }
};

export const deletePet = async (req, res) => {
  const petId = req.params.id;

  try {
    await sql`DELETE FROM pets WHERE id = ${petId}`;
    res.status(200).send("Pet deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting pet");
  }
};

  
  export const getPet = async (req, res) => {
    const petId = req.params.id;
    try {
      const result = await sql `SELECT * FROM pets WHERE id = ${petId}`;
      res.status(200).send(result);
    } catch (err) {
      console.log (err);
      res.status(500).send("Error getting pet");
    }
};



export const updatePet = async (req, res) => {
  const id = Number(req.params.id);
  const { name, age, type } = req.body;
  try {
    const result = await sql`
      UPDATE pets 
      SET name = COALESCE($1, name),
          age =  COALESCE($2, age), 
          type = COALESCE($3, type) 
      WHERE id = $4
      RETURNING *
    `[
      name,
      parseInt(age),
      type,
      id
    ];
    
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};