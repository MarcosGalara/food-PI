const { Router  } = require('express');
const { Diet } = require('../db.js');

const router = Router()

//RUTA DE PRUEBA PARA CREAR UNA NUEVA DIETA Y TESTEAR
router.post("/", async (req, res) =>{
    const { name } = req.body;

    try {
    const newDiet = await Diet.create({
        name
    });
    return res.status(200).json(newDiet);
    } catch (error) {
    return res.status(404).json( error.message );
    }
})

router.get('/', async (req, res) => {
    try {
        const allDiet = await Diet.findAll();

        return res.status(200).json(allDiet)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

module.exports = router;