const { Router } = require('express');

const axios = require("axios");
const { Recipe } = require("../db.js");
const { Diet } = require("../db.js");
const { API_KEY } = process.env;
const { simplifyContent } = require('../routes/utils.js');

//PASO 1: PEDIR INFO A LA API EXTERNA
const getApiInfo = async () => {
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    let apiRecipes = await axios.get(url);
    
    apiRecipes = simplifyContent(apiRecipes.data.results);
    
    return apiRecipes;
}

//PASO 2: PEDIR INFO A LA BD
const getDBinfo = async () => {

    let getAllinfo = await Recipe.findAll({
        includes:{
            model: Diet,
        }
    });
    
    return getAllinfo;
}

const postRecipe = async (objRecipe) => {
    try {
        const {  name, image, dishSummary, healthScore, steps, diets } = objRecipe;
        const recipe = {
            name,
            image,
            dishSummary,
            healthScore,
            steps,
        }
        const createRecipe = await Recipe.create(recipe);
        
        for (let i = 0; i < diets.length; i++) {
            const diet = await Diet.findAll({
                where:{
                    name: diets[i]
                }
            })
            
            await createRecipe.addDiets(diet[0].id)
        }
        return createRecipe;
    } catch (error) {
        return error;
    }
}

module.exports = { 
    getApiInfo,
    getDBinfo, 
    postRecipe,
}