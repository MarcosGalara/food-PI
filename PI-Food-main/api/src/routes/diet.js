const { Router  } = require('express');
const { Diet } = require('../db.js');
const { getApiInfo } = require('../controllers/controllers.js');
const { extractDiets } = require('./utils.js');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const allDiet = await Diet.findAll();
        // si el findall devuelve array vacio, hay que traer toda la info de la api, 
        if(allDiet.length){
            return res.status(200).json(allDiet)
        }else{
            let allDietInfo = await getApiInfo();
            let diets = extractDiets(allDietInfo);
            let uniqueDiets = [];
            diets.map(e => {
                if(!uniqueDiets.includes(e)) uniqueDiets.push(e)
            })
            for (let i = 0; i < uniqueDiets.length; i++) {
                await Diet.create({
                    name: uniqueDiets[i]
                })
            }
            return res.status(200).json(uniqueDiets) 
        } 
        
    } catch (error) {
        return res.status(400).json(error.message)
    }
})
//RUTA DE PRUEBA PARA CREAR UNA NUEVA DIETA Y TESTEAR
/* router.post("/", async (req, res) =>{
    const { name } = req.body;

    try {
    const newDiet = await Diet.create({
        name
    });
    return res.status(200).json(newDiet);
    } catch (error) {
    return res.status(404).json( error.message );
    }
}) */


module.exports = router;