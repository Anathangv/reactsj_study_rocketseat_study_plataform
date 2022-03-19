import React from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/images/back.png';
import logo2 from '../../assets/images/logo2.jpg';

import './styles.css';

interface PageHeaderProps{
  title: string;
  description?: string
}

const PageHeadder: React.FC<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={back} alt="voltar" />
                </Link>
                <img src={logo2} alt="proffy" />
            </div>
            
            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description && <p>{props.description}</p> }

                {props.children}
            </div>
        </header>
    );
}

export default PageHeadder;