import express from 'express';
import mongoose from 'mongoose';

import Tutorial from '../models/tutorial.models';

// GET tutorials
export const getTutorials = async (req, res) => {
    try {
        // Find tutorial based on schema provided
        const Tutorials = await Tutorial.find();
        res.status(200);

        // Transform response into json format
        res.json(Tutorials);
    } catch (err) {
        console.log(err);
        res.status(404);
        res.json({ message: err });
    }
}

// POST tutorials
export const createTutorial = async (req, res) => {
    const tutorial = req.body;
    const newTutorial = new Tutorial(tutorial);
    
    try {
        await newTutorial.save();
        res.status(201);
        res.json(newTutorial);

    } catch (err) {
        res.status(409);
        res.json({ message: err.message});
    }
}

// GET tutorial by ID
export const getTutorial = async (req, res) => {
    const { id } = req.params;

    try {
        const tutorial = await Tutorial.findById(id);
        res.status(200);
        res.json(tutorial);

    } catch (err) {
        res.status(404);
        res.json({ "message": err.message});
    
    }
}

// PUT tutorial
export const updateTutorial = async (req, res) => {
    const { id } = req.params;
    const { title, description, published } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No Tutorial with id: ${id}`);
        }

        const updatedTutorial = { title, description, published, _id: id };

        await Tutorial.findByIdAndUpdate(id, updateTutorial, { new: true });

        res.status(200);
        res.json(updateTutorial);
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}

// DELETE tutorial
export const deleteTutorial = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No Tutorial with id: ${id}`);
        }

        await Tutorial.findByIdAndDelete(id);
        res.status(200);
        res.json({ "message": "Tutorial Deleted Successfully" });
    } catch (error) {
        res.status(404);
        res.json({ "message": error.message });
    }
}