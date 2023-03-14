const { Router } = require('express');

const axios = require("axios");
const { Recipe } = require("../db.js");
const { Diets } = require("../db.js");
const { API_KEY } = process.env;
const simplifyContent = require('./utils.js');

const getApiInfo = async () => {
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    let apiRecipes = await axios.get(url);
    
    apiRecipes = simplifyContent(apiRecipes.data.results);
    
    return apiRecipes;
}

const getDBinfo = async () => {

    let getAllinfo = await Recipe.findAll({
        includes:{
            model: Diets,
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

        const dietInfo = await Diets.findAll({
            where: {
                name: diets
            }
        })

        const createRecipe = await Recipe.create(recipe);
        createRecipe.addDiets(dietInfo)
        return Recipe.findAll();
    } catch (error) {
        console.log("error");
    }
}

module.exports = { 
    getApiInfo,
    getDBinfo, 
    postRecipe,
}