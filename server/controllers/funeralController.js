const express = require('express');
const funeralDAO = require('../daos/funeralDAO');
const anouncementDAO = require('../daos/anouncementDAO');
const relativeDAO = require('../daos/relativeDAO');
const FuneralDAO = require('../daos/funeralDAO');

const router = express.Router();

// Get all funerals
router.get('/', async (req, res) => {
    try {
        const funerals = await funeralDAO.getAllFunerals();
        res.json(funerals);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// Get a specific funeral by ID
router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const funeral = await funeralDAO.getFuneralById(id);
        if (!funeral) {
            res.status(404).json({ error: 'Funeral not found' });
        } else {
            res.json(funeral);
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});


// Get a specific anouncement by fullname
router.get('/fullname/:fullname', async (req, res) => {
    try {
        const funeralDeadFullName= req.params.fullname;
        console.log(funeralDeadFullName);
        const funeral = await FuneralDAO.getFuneralByFullName(funeralDeadFullName);
        if (funeral) {
            res.json(funeral);
        } else {
            res.status(404).json({ error: 'Funeral not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Funeral' });
    }
});

// Create a new funeral
router.post('/', async (req, res) => {
    const { body } = req;
    try {
        console.log(body);
        let bodyAnouncement = {
            spouse: "",
            childs: "",
            grandchilds: "",
            nieces: "",
            others: "",
            wreaths: ""
        }

        let bodyRelative= {
            relationdegree: "",
            fullname: "",
            fathername: "",
            mothername: "",
            birthDate: "",
            birthlocation: "",
            residence: "",
            idNumber: "",
            idPublicationDate: "",
            idAuthority: "",
            afm: "",
            doy: "",
            amka: "",
            phone: "",
            email: "",
            iban: "",
            taxisCodeUser: "",

        }
        const newAnnouncement = await anouncementDAO.createAnouncement(bodyAnouncement);
        const newRelative = await relativeDAO.createRelative(bodyRelative);

        console.log(newAnnouncement);
        console.log(newRelative);   
       
        body.anouncement = newAnnouncement._id;
        body.relative = newRelative._id;

        console.log(body);

        const newFuneral = await funeralDAO.createFuneral(body);
        res.status(201).json(newFuneral);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// Update an existing funeral
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const updatedFuneral = await funeralDAO.updateFuneralById(id, body);
        if (!updatedFuneral) {
            res.status(404).json({ error: 'Funeral not found' });
        } else {
            res.json(updatedFuneral);
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

// Delete a funeral
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFuneral = await funeralDAO.deleteFuneralById(id);
        if (!deletedFuneral) {
            res.status(404).json({ error: 'Funeral not found' });
        } else {
            res.json(deletedFuneral);
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

module.exports = router;