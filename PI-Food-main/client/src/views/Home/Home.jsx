import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getRecipes,
    filterRecipesByDiet,
    filterCreated,
    orderByName,
    orderByScore,
    } from "../../redux/actions.js";
import Paginado from "../../components/Paginado/Paginado.jsx";
import { Link  } from "react-router-dom";
import Card from "../../components/Card/Card.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";



const Home = () => {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes)
    // ---------------------------PAGINADO-------------------------------------
    const [orden, setOrden] = useState("asc")
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage; // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) // cambia mi numero de pagina
    }

    const handlerFilterDiet = (e) => {
        dispatch(filterRecipesByDiet(e.target.value))
        setCurrentPage(1);
    }

    const handlerFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    }

    const handlerSortByName = (e) => {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`${e.target.value}`)
    }

    const handlerSortByScore = (e) => {
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(`${e.target.value}`)
    } 
    //--------------------------------------------------------------------------------------------
    //cuando se monta, hago el dispatch
    //  useEffect()   -   useDispatch()

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])
    

    const handleRefresh = (event) =>{
        event.preventDefault();
        dispatch(getRecipes());
        
    }

    return(
        <div>
            <div>
                <SearchBar />
                <button onClick={(e) => {
                    handleRefresh(e);
                }}>Refresh</button>

                <Link to="/form">
                    <button>Create new recipe</button>
                </Link>

            </div>
            <div>
                <select onChange={(e) => handlerSortByName(e)}>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>
                <select onChange={(e) => handlerSortByScore(e)}>
                    <option value="Higher Score">Highest Score</option>
                    <option value="Lower Score">Lowest Score</option>
                </select>
                <select onChange={(e) => handlerFilterCreated(e)} >
                    <option value="All">All</option>
                    <option value="created">Created</option>
                    <option value="api">From API</option>
                </select>
                <select onChange={(e)=> handlerFilterDiet(e)}>
                    <option value="All">All Diets</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap friendly">Low Fodmap</option>
                    <option value="whole 30">Whole 30</option>
                </select>
            </div>
            <div>
                <Paginado 
                recipesPerPage = { recipesPerPage }
                allRecipes = {allRecipes.length}
                paginado = {paginado}
                />
            </div>
            <div>
                {currentRecipes?.map((e) => {
                    return(
                        <div>
                            <Card 
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                image={e.image
                                    ? e.image 
                                    : <img src="https://domf5oio6qrcr.cloudfront.net/medialibrary/10878/5e9a62cd-37c3-4f12-ac08-4d4e0a71fafa.jpg"/>}
                                diets={e.diets}
                            />
                        </div>
                    )
                })}
            </div>
            <div>
                <Paginado 
                recipesPerPage = { recipesPerPage }
                allRecipes = {allRecipes.length}
                paginado = {paginado}
                />
            </div>
            
        </div>

    )
}

export default Home;