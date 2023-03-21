import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { recipeByName } from "../../redux/actions";
import { postRecipes, getAllDiets } from "../../redux/actions";

//NECESITO REPLANTEAR LAS VALIDACIONES YA QUE NO FUNCIONAN BIEN
const validate = (form) => {
    let validateImg = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;
    const errors = {};
    if (form.name === "" || /[^a-zA-Z, ]/g.test(form.name)) {
        errors.name = "The name can not have symbols!";
    } else if (form.dishSummary?.length < 10){
        errors.dishSummary = "You need to add info to the summary";
    } else if (form.healthScore === "" || form.healthScore < 10 || form.healthScore > 100){
        errors.healthScore = "Score can't be less than 10, or be higher than 100";
    } else if (!validateImg.test(form.image)){
        errors.image = "This is not a valid URL";
    } else if (!form.steps.length) {
        errors.steps = "You need to add a step";
    } else if (!form.diets.length) {
        errors.diets = "You need to add a diet";
    }
    return errors;
}
const Form = () => {
    
    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        name: "",
        dishSummary: "",
        diets: [],
        image: "",
        healthScore: "",
        steps: "",
    })

    const dispatch = useDispatch();
    //para que cuando envie la receta creada me envie a la ruta HOME
    let navigate = useNavigate();
    const diets = useSelector((state) => state.diets)

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        setErrors(validate({
            ...form,
            [property]: value 
        }))
        setForm({ 
            ...form,
            [property]: value 
        })
    }

    useEffect(() => {
        dispatch(getAllDiets())
    },[dispatch])
    
    const handlerCheck = (e) => {
        if(e.target.checked){
            setForm({
                ...form,
                diets: [...form.diets, e.target.value],
            })
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(postRecipes(form))
        alert("You just set the new Recipe")
        setForm({
            name: "",
            dishSummary: "",
            diets: [],
            image: "",
            healthScore: "",
            steps: "",
        })
        navigate('/home')
    }


    return(
        <div>
            <Link to= '/home'>
                <button>Return</button>
            </Link>
            <h1>Create your own Recipe</h1>
            <form onSubmit={(e) =>submitHandler(e)}>
                <div>
                    <div>
                        <label>Name: </label>
                        <input 
                            type="text" 
                            value={form.name} 
                            onChange={(e) =>changeHandler(e)} 
                            name="name" 
                            placeholder="Write Recipe name..."/>
                        {errors.name && <p>{errors.name}</p>}
                    </div>

                    <div>
                        <label>Summary: </label>
                        <textarea 
                            type="text" 
                            value={form.dishSummary} 
                            onChange={(e) =>changeHandler(e)} 
                            name="dishSummary" 
                            placeholder="Detail your Recipe..."/>
                        {errors.dishSummary && <p>{errors.dishSummary}</p>}
                    </div>

                    <div>
                        <label>Health Score: </label>
                        <input 
                            id="score"
                            type="number" 
                            value={form.healthScore} 
                            onChange={(e) =>changeHandler(e)} 
                            name="healthScore" 
                            min="10"
                            max="100"
                            placeholder="Put Health Score..."/>
                        {errors.healthScore && <p>{errors.healthScore}</p>}
                    </div>

                    
                    <div>
                        <label>Image: </label>
                        <input 
                            type="url" 
                            value={form.image} 
                            onChange={(e) =>changeHandler(e)} 
                            name="image"
                            placeholder="Put image..."/>
                        {errors.image && <p>{errors.image}</p>}
                    </div>
                    <div>
                        <label>Steps: </label>
                        <textarea 
                            type="text" 
                            value={form.steps.step} 
                            onChange={(e) =>changeHandler(e)} 
                            name="steps"
                            placeholder="Put yours steps..."/>
                        {errors.steps && <p>{errors.steps}</p>}
                    </div>
                </div>
                <div>
                    <div>
                    <label>Diets: </label>
                            <div>
                                {diets.map((e) => (
                                    <div>
                                        <input
                                        type="checkbox"
                                        value={e.name}
                                        name={e.name}
                                        onChange={(e) => handlerCheck(e)}
                                        />
                                        <label>{e.name}</label>
                                    </div>
                                ))}
                            </div>
                    </div>
                    <button
                        disabled={errors.name || errors.dishSummary || errors.healthScore || errors.steps || errors.image || errors.diets}
                        type="submit"
                    >Create Recipe</button>
                </div>

            </form>
        </div>
    )
}

export default Form;