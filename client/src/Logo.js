import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';

import './Logo.css';

function Logo() {
    return ( 
        <div className="logo">
            <FontAwesomeIcon icon={faMeteor} className="logo-icon" />
            <h1 className="logo-text">AstroChat</h1>
        </div>
     );
}

export default Logo;