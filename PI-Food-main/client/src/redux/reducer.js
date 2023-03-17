import { GET_RECIPES, GET_RECIPE_ID, GET_DIETS, POST_RECIPES, GET_RECIPE_NAME } from "./types.js";


const initialState ={
    users: [],
    userDetail: [],
    diets: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                users: action.payload};

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

        default:
            return { ...state };
    }
};

export default rootReducer;