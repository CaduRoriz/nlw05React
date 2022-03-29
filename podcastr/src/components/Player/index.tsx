import './styles.css';

export function Player() {
    return (
        <div className = "playerContainer">
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>

            <div className = "emptyPlayer">
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className = "empty">
                <div className = "progress">
                    <span>00:00</span>
                    <div className = "slider"><div className = "emptySlider"/></div>
                    <span>00:00</span>
                </div>

                <div className = "buttons">
                    <button type="button">
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>
                    <button id="playButton" type="button">
                        <img src="/play.svg" alt="Tocar anterior"/>
                    </button>
                    <button type="button">
                        <img src="/play-next.svg" alt="Tocar próxima"/>
                    </button>
                    <button type="button">
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>


                </div>
            </footer>
        </div>
    );
}