import { ORDER_BY_NAME,
        FILTER_BY_CREATED,
        FILTER_BY_DIET,
        GET_RECIPES,
        GET_RECIPE_ID,
        GET_DIETS,
        GET_RECIPE_NAME,
        ORDEN_BY_SCORE,
} from './types.js';
import axios from "axios";

// TODAS LAS RECETAS
export const getRecipes = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/recipes');
        const users = apiData.data;
        dispatch({ type: GET_RECIPES, payload: users })
    };
}

//TRAEMOS RECETA POR ID
export const getRecipeById = (id) =>{
    return async  function (dispatch) {
        const apiData = await axios.get(`http://localhost:3001/recipes/${id}`);
        const user = apiData.data;
        dispatch({ type: GET_RECIPE_ID, payload: user})
    }
}

//TODAS LAS DIETAS
export const getAllDiets = () => {
    return async function (dispatch) {
        const apiData = await axios.get('http://localhost:3001/diets');
        const diets = apiData.data;
        dispatch({ type: GET_DIETS, payload: diets })
    }
}

//CREAR RECETA
export const postRecipes = (payload) => {
    return async function () {
        const postRecipe = await axios.post('http://localhost:3001/recipes', payload)
        return postRecipe
    }
}

//QUERY RECETA / manejar errores
export const recipeByName = (name) => {
    return async function (dispatch) {
        try {
            const allRecipesByName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({ type: GET_RECIPE_NAME, payload: allRecipesByName.data })
            
        } catch (error) {
            return dispatch({ type: GET_RECIPE_NAME, payload: [] })
        }
    }
}



//FILTRADO POR TIPO DE DIETA
export const filterRecipesByDiet = (payload) => {
    return {
        type: FILTER_BY_DIET, 
        payload
    }
}

//FILTRADO POR API O CREADO
export const filterCreated = (payload) => {
    return{
        type: FILTER_BY_CREATED,
        payload
    }
}

//FILTRADO POR ORDEN ALFABETICO
export const orderByName = (payload) => {
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

//FILTRADO POR HEALTH SCORE
export const orderByScore = (payload) => {
    return{
        type: ORDEN_BY_SCORE,
        payload
    }
}