import "../styles/GamePage.css";
import BAR_Navigation from "../components/BAR_Navigation.jsx"; // Додано розширення .jsx

function GamePage() {
    return (
        <div className="game-page">
            <div className="game-ui">
                <div className="top-bar">
                    <div className="player-info-card">
                        <div className="player-avatar"></div>
                        <div className="player-stats-container">
                            <div className="player-meta">
                                <h2 className="player-name">Knight</h2>
                                <span className="player-level">Lvl. 1</span>
                            </div>
                            <div className="status-bars">
                                <div className="bar-wrapper">
                                    <div className="bar health-bar">
                                        <div className="bar-fill health-fill" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                                <div className="bar-wrapper">
                                    <div className="bar mana-bar">
                                        <div className="bar-fill mana-fill" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="game-content-area">
                    <BAR_Navigation />
                </div>

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
