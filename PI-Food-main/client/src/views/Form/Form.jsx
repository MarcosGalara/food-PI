import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postRecipes, getAllDiets } from "../../redux/actions";
import validate from "../../validation/validation.js";
import './Form.css'


//NECESITO REPLANTEAR LAS VALIDACIONES YA QUE NO FUNCIONAN BIEN

const Form = () => {
    
    //HOOKS
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
    let navigate = useNavigate();
    
    //STATES
    const [form, setForm] = useState({
        name: "",
        dishSummary: "",
        diets: [],
        image: "",
        healthScore: "",
        steps: "",
    })

    const [errors, setErrors] = useState({})
    const [count, setCount] = useState(0)
    
    //EFFECTS
    useEffect(() => {
        dispatch(getAllDiets())
    },[dispatch])
    
    //FUNCTIONS
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

    const handlerCheck = (e) => {
        if(e.target.checked){
            setForm({
                ...form,
                diets: [...form.diets, e.target.value],
            })
        }else if(!e.target.checked){
            setForm({
                ...form,
                diets: form.diets.filter(diet => diet !== e.target.value)
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
                <button className="button">Return</button>
            </Link>
            <h1 id="title">Create your own Recipe</h1>
            <form onSubmit={(e) =>submitHandler(e)} className="Formulario">
                <div className="inputs">
                    <div>
                        <label>Name: </label>
                        <input 
                            type="text" 
                            value={form.name} 
                            onChange={(e) =>changeHandler(e)} 
                            name="name" 
                            placeholder="Write Recipe name..."/>
                        {errors.name && <strong>{errors.name}</strong>}
                    </div>

                    <div>
                        <label>Summary: </label>
                        <input 
                            type="text" 
                            value={form.dishSummary} 
                            onChange={(e) =>changeHandler(e)} 
                            name="dishSummary" 
                            placeholder="Detail your Recipe..."/>
                        {errors.dishSummary && <strong>{errors.dishSummary}</strong>}
                    </div>

                    <div>
                        <label>Health Score: </label>
                        <input 
                            id="score"
                            type="number" 
                            value={form.healthScore} 
                            onChange={(e) =>changeHandler(e)} 
                            name="healthScore" 
                            />
                        {errors.healthScore && <strong>{errors.healthScore}</strong>}
                    </div>

                    
                    <div>
                        <label>Image: </label>
                        <input 
                            type="url" 
                            value={form.image} 
                            onChange={(e) =>changeHandler(e)} 
                            name="image"
                            placeholder="Put image..."/>
                        {errors.image && <strong>{errors.image}</strong>}
                    </div>
                    <div>
                        <label>Steps: </label>
                        <textarea 
                            type="text" 
                            value={form.steps.step} 
                            onChange={(e) =>changeHandler(e)} 
                            name="steps"
                            placeholder="Put yours steps..."/>
                        {errors.steps && <strong>{errors.steps}</strong>}
                    </div>
                </div>
                
                <div className="dietsType">
                    <div>
                    <label>Diets: </label>
                            <div className="options">
                                {diets.map((e) => (
                                    <div>
                                        <label>{e.name}</label>
                                        <input
                                        type="checkbox"
                                        value={e.name}
                                        name={e.name}
                                        onChange={(e) => handlerCheck(e)}
                                        disabled={form.diets.length >= 3? true : false}
                                        />
                                        {errors.diets && <strong>{errors.diets}</strong>}
                                        
                                    </div>
                                ))}
                            </div>
                    </div>
                    <button
                        disabled={errors.name || errors.dishSummary || errors.healthScore || errors.steps || errors.image || errors.diets}
                        type="submit"
                        className="button"
                    >Create Recipe</button>
                </div>

            </form>
        </div>
    )
}

export default Form;