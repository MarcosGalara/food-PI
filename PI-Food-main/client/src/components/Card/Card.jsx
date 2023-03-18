import style from './Card.module.css';

const Card = ({image, name, diets, id}) => {
    return(
        <div className={style.card}>
            <h3>Name:{name}</h3>
            <h5>Diets:{diets}</h5>
            <img src={image} alt='img not found' width="280px" height="200px"></img>
        </div>
    )
}

export default Card;