import React from "react";
import { Link }  from "react-router-dom";
import style from './Landing.module.css';

const Landing = () => {
    return(
        <div className={style.divContainer}>
            <img />
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}

export default Landing;