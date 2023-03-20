import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { recipeByName } from "../../redux/actions";

const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('')

    const handleInputChange = (e) =>{
        setName(e.target.value)
        
    }

    

    const handleSubmit = () =>{
        dispatch(recipeByName(name))
    }
    return(
        <div>
            <input type="text" placeholder="Buscar Receta..." onChange={(e) => handleInputChange(e)}  />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}

export default SearchBar;