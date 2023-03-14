const { Router  } = require('express');
const { Recipe, Diet } = require('../db.js');
const { getApiInfo, getDBinfo, postRecipe } = require('./controllers.js');

const { API_KEY } = process.env;

const router = Router()

//OBTENER LA RECIPE POR QUERY O DEVOLVER TODA LA LISTA DE RECETAS
router.get('/', async (req, res) =>{
    try {
        const { name } = req.query;
        const totalApiRecipes = await getApiInfo();
        const totalDbRecipes = await getDBinfo();
        const totalRecipes = totalApiRecipes.concat(totalDbRecipes);
        res.status(200).json(totalRecipes);

        if(name){// busca el nombre de la receta que coincida con el que me pasaron por query              
            const recipeByName = await Recipe.findAll({
                where: {
                    name: {
                    [Op.iLike]: `%${name}%`// utilizar el operador iLike para una búsqueda sin distinción entre mayúsculas y minúsculas
                    }
                }
            })
            recipeByName.length ? res.status(200).json(recipeByName) : res.status(404).send('Recipe not Found')
        } else {
            // sino, devolve el total de recetass
            res.status(200).json(totalRecipes)
        }

    } catch (error) {
    res.status(404).send(error.message);
    }
})

router.get('/:idRecipe', async (req, res) =>{
    try {
        const { id } = req.params;

        const recipeById = await Recipe.findByPk(id,{
            include: [
            {
                model: Diet,
                through:{
                attributes:['name']
                },
            },
            ],
        });
        console.log(recipeById);
        if(!recipeById){
            res.status(404).json({message: 'Recipe not found'});
        } res.status(200).json(recipeById)
        
    } catch (error) {
        res.status(404).json({message: 'Internal server error'})
    }
})

router.post("/", async (req, res) =>{
    try {
        const objRecipe = req.body;
        if(!objRecipe) res.status(404).send('Missing info')
        const newRecipe = await postRecipe(objRecipe)

        res.status(200).send(newRecipe)
    } catch (error) {
        return res.status(404).json(error.message)
    }
})

module.exports = router;