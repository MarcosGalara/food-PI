import { 
    FILTER_BY_DIET,
    GET_RECIPES, 
    GET_RECIPE_ID, 
    GET_DIETS, 
    POST_RECIPES, 
    GET_RECIPE_NAME,
    FILTER_BY_CREATED,
} from "./types.js";


const initialState ={
    recipes: [],
    filterRecipes: [],
    userDetail: [],
    diets: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filterRecipes: action.payload
            };

        case GET_RECIPE_ID:
            return {
                ...state,
                userDetail: action.payload,
            }

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        case POST_RECIPES:
            return{
                ...state
            }

        case GET_RECIPE_NAME:
            return{
                ...state,
                recipes: action.payload
            }
        
        case FILTER_BY_DIET:
            const allRecipes = state.filterRecipes;

            const dietsFiltered = action.payload === "All" 
            ? allRecipes : allRecipes.filter((el) => 
                el.diets.includes(action.payload)
            )
            return{
                ...state,
                recipes: dietsFiltered
            }
        
        case FILTER_BY_CREATED:
            const allRecipesAux = state.filterRecipes;
            const createdFilter = action.payload === "created"
            ? allRecipesAux.filter(el => el.createdInDb)
            : allRecipesAux.filter(el => !el.createdInDb)
            return{
                ...state,
                recipes: action.payload === "All" 
                ? state.filterRecipes
                : createdFilter
            }

        default:
            return { ...state };
    }
};

export default rootReducer;