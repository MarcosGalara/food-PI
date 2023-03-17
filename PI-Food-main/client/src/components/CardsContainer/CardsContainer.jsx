import Card from "../Card/Card.jsx";
import style from "./CardsContainer.module.css";
import { useSelector } from 'react-redux';

const CardsContainer = () => {
    
    const users = useSelector(state => state.users);
    
    return(
        <div className={style.container}>
            {
                users.map(user => {
                    return <Card 
                        name={user.name}
                        image={user.image}
                        dishSummary={user.dishSummary}
                        healthScore={user.healthScore}
                        steps={user.steps}
                        diets={user.diets}
                    />
                    
                })
            }
        </div>
    )
}

export default CardsContainer;