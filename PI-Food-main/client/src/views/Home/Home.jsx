import CardsContainer from "../../components/CardsContainer/CardsContainer.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions.js";


const Home = () => {

    //cuando se monta, hago el dispatch
    //  useEffect()   -   useDispatch()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])

    return(
        <>
        <h1>Estoy en Home</h1>
        <CardsContainer />
        </>
    )
}

export default Home;