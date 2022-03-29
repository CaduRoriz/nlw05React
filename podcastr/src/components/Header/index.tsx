import { mes, diaSemana, dia } from '../../Helper/dataHelper';

import './styles.css';

export function Header (){

    const currentDate = `${diaSemana()}, ${dia()} de ${mes()}`;
    
    return (
        <header className = "headerContainer">
            <img src = "/logo.svg" alt="Podcastr"/>
            <p> O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>
    );
}