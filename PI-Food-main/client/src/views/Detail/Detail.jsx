import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";


const Detail = () => {

    //HOOKS
    const cargando =  useSelector((state) => state.loading);
    const myRecipe = useSelector((state) => state.userDetail)
    const dispatch = useDispatch();
    const { id } =  useParams();
    
    //useEffect
    useEffect(()=>{
        dispatch(getRecipeById(id))
    },[dispatch, id])
    
    return(
        <div>
            {cargando ? (
                <Loading />
                ) : (
                    <div>
                    <div>
                        <h1>{myRecipe?.name}</h1>
                        <img src={
                            myRecipe?.image
                            ? myRecipe?.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4HpoRPTJOzhxICKYaw98tmmJsujNaW4MHhg&usqp=CAU"
                        }
                        alt="img not found"
                        width="280px"
                        height="200px"
                        />
                        <h2>
                            Score:{" "}
                            {myRecipe?.healthScore}
                        </h2>
                        <h2>
                            Diets:{" "}
                            {!myRecipe?.createdInDb
                            ? myRecipe?.diets + " "
                            : myRecipe?.diets.map((e) => e.name + " ")}
                        </h2>
                        <p>Summary</p>
                        <div>{myRecipe?.dishSummary}</div>

                        <p>STEPS</p>

                        <div>{myRecipe?.steps}</div>
                    </div>
                
                <Link to="/home">
                    <button id="buttonReturn">Return</button>
                </Link> 
            </div>
                )}
            
        </div>
                
    )

}
export default Detail;

