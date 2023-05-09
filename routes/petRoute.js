import express from "express";
import { getAllPets, addPet, updatePet, deletePet, getPet } from './../controllers/petController.js';


const router = express.Router();

router.get('/', getAllPets).post('/', addPet);

router.patch('/:id', updatePet).delete('/:id', deletePet).get('/:id', getPet);

export default router;
