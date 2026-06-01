import "../styles/GamePage.css";

function GamePage() {
    return (
        <div className="game-page">
            <div className="game-ui">
                
                {/* TOP UI - Player Status */}
                <div className="top-bar">
                    <div className="player-info-card">
                        <div className="player-avatar">
                            {/* Тут Буде іконка/зображення для аватару */}
                        </div>

                        <div className="player-stats-container">
                            <div className="player-meta">
                                <h2 className="player-name">Knight</h2>
                                <span className="player-level">Lvl. 1</span>
                            </div>

                            <div className="status-bars">
                                <div className="bar-wrapper">
                                    <div className="bar-label">HP</div>
                                    <div className="bar health-bar">
                                        <div className="bar-fill health-fill" style={{ width: '80%' }}></div>
                                    </div>
                                </div>

                                <div className="bar-wrapper">
                                    <div className="bar-label">MP</div>
                                    <div className="bar mana-bar">
                                        <div className="bar-fill mana-fill" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HOTBAR - Action Slots */}
                <div className="hotbar-container">
                    <div className="hotbar">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="slot">
                                <span className="slot-key">{num}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GamePage;
