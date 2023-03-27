import React from 'react';
import style from './NotFound.modules.css';
import error404 from '../../assets/img/Sin título.jpg'


//QUEDA PENDIENTE TERMINARLO

const NotFound = () => {
    <div className={style.container}>
        
        <h1 className={style.notfound}>Recipe Not Found!</h1>
        <img  className={style.img}src={error404} alt="imagen" />
    </div>
}

export default NotFound;