import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getRecipes,
    filterRecipesByDiet,
    } from "../../redux/actions.js";
import Paginado from "../../components/Paginado/Paginado.jsx";
import { Link  } from "react-router-dom";
import Card from "../../components/Card/Card.jsx";



const Home = () => {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.users)
    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage; // 9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) // cambia mi numero de pagina
    }
    //cuando se monta, hago el dispatch
    //  useEffect()   -   useDispatch()

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])


    const handleChange = (event) =>{
        event.preventDefault();
        dispatch(getRecipes());
    }

    //FALTA REVISAR EL BACK PORQUE NO ME LO ESTA FILTRANDO
    //los value del select por diet tiene que coincidir con los que traigo por back
    const handleFilterDiet = (event) => {
        dispatch(filterRecipesByDiet(event.target.value))
    }
    return(
        <div>
            <div>
                <button onClick={(e) => {
                    handleChange(e);
                }}>Refresh</button>

                <Link to="/form">
                    <button>Create new recipe</button>
                </Link>
            </div>
            <div>
                <select>
                    <option value="ASC">A - Z</option>
                    <option value="DESC">Z - A</option>
                </select>
                <select>
                    <option value="Higher Score">Highest Score</option>
                    <option value="Lower Score">Lowest Score</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="created">Created</option>
                    <option value="api">From API</option>
                </select>
                <select onClick={(e)=> handleFilterDiet(e)}>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
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
                                image={e.image}
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