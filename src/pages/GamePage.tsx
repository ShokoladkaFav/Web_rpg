import "../styles/GamePage.css";

function GamePage() {
    return (
        <div className="game-page">

            <div className="game-overlay">

                {/* TOP UI */}
                <div className="top-bar">

                    <div className="player-info">

                        <div className="player-avatar"></div>

                        <div className="player-stats">

                            <h2>Knight</h2>

                            <div className="health-bar">
                                <div className="health-fill"></div>
                            </div>

                            <div className="mana-bar">
                                <div className="mana-fill"></div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* HOTBAR */}
                <div className="hotbar">

                    <div className="slot">1</div>
                    <div className="slot">2</div>
                    <div className="slot">3</div>
                    <div className="slot">4</div>
                    <div className="slot">5</div>

                </div>

            </div>

        </div>
    );
}

export default GamePage;