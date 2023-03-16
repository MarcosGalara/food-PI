import style from './Card.module.css';

const Card = (props) => {
    return(
        <div className={style.card}>
            <p>Name:{props.name}</p>
            <p>{props.image}</p>
            <p>Dish Summary:{props.dishSummary}</p>
            <p>Health Score:{props.healthScore}</p>
            <p>Steps:{props.steps}</p>
            <p>Diets:{props.diets}</p>
        </div>
    )
}

export default Card;