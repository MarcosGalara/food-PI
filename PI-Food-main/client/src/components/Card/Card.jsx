import style from './Card.module.css';

const Card = (props) => {
    return(
        <div className={style.card}>
            <p>{props.image}</p>
            <p>Name:{props.name}</p>
            <p>Diets:{props.diets}</p>
        </div>
    )
}

export default Card;