const { Router  } = require('express');
const { Recipe, Diet } = require('../db.js');
const { getApiInfo, getDBinfo, postRecipe } = require('../controllers/controllers.js');

const { API_KEY } = process.env;
const axios  = require("axios");

const router = Router()

router.get('/:id', async (req, res) =>{
    try {
        const { id } = req.params;

        let findIdApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        
        return res.status(200).json(findIdApi.data)
        
    } catch (error) {
        try {

            const { id } = req.params;
            const recipeById = await Recipe.findByPk(id, { 
                include: {
                    model: Diet,
                    attributes:["name"],
                    through: { diets: [] }
                }
            });

            return res.status(200).json(recipeById)
        } catch (error) {
            return res.status(404).json({message: "Recipe not found"})
        }
        
    }
})
// 	716426
//OBTENER LA RECIPE POR QUERY O DEVOLVER TODA LA LISTA DE RECETAS
router.get('/', async (req, res) =>{
    try {
        const { name } = req.query;
        if(name){// busca el nombre de la receta que coincida con el que me pasaron por query              
            const recipeByName = await Recipe.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`// utilizar el operador iLike para una búsqueda sin distinción entre mayúsculas y minúsculas
                    }
                }
            })

            // falta buscar todas las recetas en la api, y aplicarle al array un .filter, con la condicion que incluya el nombre
            recipeByName.length ? res.status(200).json(recipeByName) : res.status(404).send('Recipe not Found')
        } else {
            // sino, devolve el total de recetass
            let totalApiRecipes = await getApiInfo();
            let totalDbRecipes = await getDBinfo();
            let totalRecipes = totalApiRecipes.concat(totalDbRecipes);
            return res.status(200).json(totalRecipes)
        }

    } catch (error) {
    return res.status(404).send(error.message);
    }
}) 


router.post("/", async (req, res) =>{
    try {
        const objRecipe = req.body;
        if(!objRecipe) res.status(404).send('Missing info')
        const newRecipe = await postRecipe(objRecipe)

        return res.status(200).send(newRecipe)
    } catch (error) {
        return res.status(404).json(error.message)
    }
})

module.exports = router;