import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "../../redux/actions";
import { useEffect } from "react";


const Detail = () => {

    //HOOKS
    const dispatch = useDispatch();
    const { id } =  useParams();

    //useEffect
    useEffect(()=>{
        dispatch(getRecipeById(id))
    },[dispatch])

    
    const myRecipe = useSelector((state) => state.userDetail)


    return(
        <div>
            {myRecipe ? (
                <div>
                    <h1>{myRecipe.name}</h1>
                    <img src={
                        myRecipe.image
                            ? myRecipe.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4HpoRPTJOzhxICKYaw98tmmJsujNaW4MHhg&usqp=CAU"
                    }
                    alt="img not found"
                    width="280px"
                    height="200px"
                    />
                    <h2>
                        Score:{" "}
                        {myRecipe.healthScore}
                    </h2>
                    <h2>
                        Diets:{" "}
                        {!myRecipe.createdInDb
                        ? myRecipe.diets + " "
                        : myRecipe.diets.map((e) => e.name + " ")}
                    </h2>
                    <p>Summary</p>
                    <div>{myRecipe.dishSummary}</div>

                    <p>STEPS</p>

                    <div>{myRecipe.steps}</div>
                </div>
            ) : <p>Loading...</p> 
            }
            <Link to="/home">
                <button id="buttonReturn">Return</button>
            </Link> 
        </div>
    )

}
export default Detail;