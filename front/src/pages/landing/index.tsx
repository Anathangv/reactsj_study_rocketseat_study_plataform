import React, {useState, useEffect} from 'react';
import logoImg from '../../assets/images/logo2.jpg'
import landingImg from '../../assets/images/logo.jpg'
import btn1 from '../../assets/images/book.png'
import btn2 from '../../assets/images/television.png'

import {Link} from 'react-router-dom'

import './styles.css';
import api from '../../services/api';

function Landing(){

  const [totalConnection, setTotalConnection] = useState(0);

  useEffect(() => {
    api.get('/connections').then(response => {
      const { total } = response.data;
      setTotalConnection(total);
    })
  }, [] )

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="" />
                    <h2>Sua Plataforma de estudo online</h2>
                </div>

                <img 
                    src={landingImg}
                    alt="Pataforma de Estudos"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="study" className="study">
                        <img src={btn1} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="give-classes" className="give-classes">
                        <img src={btn2} alt="Estudar"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnection} conexões ja realizada
                </span>
            </div>
        </div>
    )
}

export default Landing;