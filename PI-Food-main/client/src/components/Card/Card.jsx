import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({image, name, diets, id}) => {
        return(
            <div className='container'>
                <div className='card'>
                    <div className='card'>
                        <img src={image} alt='image not found'></img>
                        <h4>{name}</h4>
                        <p>{diets}</p>
                        <Link to={"/detail/" + id}>
                            <button className='btn'>View Recipe</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}


    export default Card;