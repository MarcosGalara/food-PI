import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRecipes } from "../../redux/actions.js";

const Form = () => {
    
    let validateImg = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;
    const validate = (form) => {
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
    const [errors, setErrors] = useState({
        /* name: "",
        dishSummary: "",
        healthScore: "",
        image: "",
        steps: [],
        diets: [], */
    })

    const [form, setForm] = useState({
        name: "",
        dishSummary: "",
        healthScore: "",
        image: "",
        steps: [],
        diets: [],
    })

    const dispatch = useDispatch();

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

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(postRecipes(form))
        alert("You just set the new Recipe")
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <h1>CREATE RECIPE</h1>
                <div>
                    <label>Name: </label>
                    <input 
                        type="text" 
                        value={form.name} 
                        onChange={changeHandler} 
                        name="name" 
                        placeholder="Write Recipe name..."/>
                    {errors.name && <p>{errors.name}</p>}
                </div>

                <div>
                    <label>Summary: </label>
                    <input 
                        type="text" 
                        value={form.dishSummary} 
                        onChange={changeHandler} 
                        name="dishSummary" 
                        placeholder="Detail your Recipe..."/>
                    {errors.dishSummary && <p>{errors.dishSummary}</p>}
                </div>

                <div>
                    <label>Health Score: </label>
                    <input 
                        type="number" 
                        value={form.healthScore} 
                        onChange={changeHandler} 
                        name="healthScore" 
                        placeholder="Put Health Score..."/>
                    {errors.healthScore && <p>{errors.healthScore}</p>}
                </div>

                <div>
                    <label>Steps: </label>
                    <textarea 
                        type="text" 
                        value={form.steps.step} 
                        onChange={changeHandler} 
                        name="steps"
                        placeholder="Put yours steps..."/>
                    {errors.steps && <p>{errors.steps}</p>}
                </div>
                
                <div>
                    <label>Image: </label>
                    <input 
                        type="text" 
                        value={form.image} 
                        onChange={changeHandler} 
                        name="image"
                        placeholder="Put image..."/>
                    {errors.image && <p>{errors.image}</p>}
                </div>
                
                <div>
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