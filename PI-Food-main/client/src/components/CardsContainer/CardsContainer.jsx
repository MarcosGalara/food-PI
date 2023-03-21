import Card from "../Card/Card.jsx";
import style from "./CardsContainer.module.css";
import { useSelector } from 'react-redux';

const CardsContainer = () => {
    
    const recipes = useSelector(state => state.recipes);
    
    return(
        <div className={style.container}>
            {
                recipes.map(recipe => {
                    
                    return <Card 
                        id={recipe.id}
                        name={recipe.name}
                        image={recipe.image}
                        dishSummary={recipe.dishSummary}
                        healthScore={recipe.healthScore}
                        steps={recipe.steps}
                        diets={recipe.diets}
                    />
                    
                })
            }
        </div>
    )
}

export default CardsContainer;