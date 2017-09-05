import React from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1>The page you requested was not found</h1>
                <Link to="/"><h2>Click here to go back to MyReads</h2></Link>
            </div>
          
        </div>
    )
}

export default NotFound;