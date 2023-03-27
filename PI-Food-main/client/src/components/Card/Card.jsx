import React from "react";
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({image, name, diets, id }) => {
    return(
        <>
            <div className='card'>
                <img src={image} alt='image not found'></img>
                <h4>{name}</h4>
                <div className='messageContainer'>
                    <p>Diets: {diets + " "}</p>
                </div>
                <div className='divBtn'>
                    <Link to={`/detail/${id}`}>
                        <button className='btn'>View Recipe</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Card;