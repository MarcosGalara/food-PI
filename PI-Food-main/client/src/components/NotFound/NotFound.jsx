import React from 'react';
import './NotFound.modules.css';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    <div>
        <div>
            <div>
                <span>Error 404</span>
            </div>
            <div>
                <p>
                You entered an address that does not correspond to the recipe you are looking for.
                <br />
                Touch the button to return to the available recipes
                </p>
            </div>
        </div>
    </div>
}

export default NotFound;