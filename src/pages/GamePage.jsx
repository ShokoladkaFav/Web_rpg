import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GamePage.css";
import BAR_Navigation from "../components/BAR_Navigation.jsx";
import GameMap from "../components/GameMap.jsx";
import LocationMenu from "../components/LocationMenu.jsx";

function GamePage() {
    const navigate = useNavigate();
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("player_character");
        if (savedData) {
            setCharacter(JSON.parse(savedData));
        } else {
            // Якщо даних немає — повертаємо на створення персонажа
            navigate("/create");
        }
    }, [navigate]);

    if (!character) return null; // Тепер замість напису просто чекаємо редиректу

    return (
        <div className="game-page">
            <div className="game-ui">
                <div className="top-bar">
                    <div className="player-info-card">
                        <div className="player-avatar">
                            <img src={character.icon} alt="Avatar" style={{width: '100%', borderRadius: 'inherit'}} />
                        </div>
                        <div className="player-stats-container">
                            <div className="player-meta">
                                <h2 className="player-name">{character.nickname}</h2>
                                <span className="player-level">Lvl. {character.level}</span>
                                <span className="player-trait-tag" style={{fontSize: '10px', marginLeft: '10px', color: '#3b82f6'}}>{character.trait.name}</span>
                            </div>
                            <div className="status-bars">
                                <div className="bar health-bar">
                                    <div className="bar-fill health-fill" style={{ width: `${character.hp}%` }}></div>
                                </div>
                                <div className="bar mana-bar">
                                    <div className="bar-fill mana-fill" style={{ width: `${character.mp}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="game-content-area">
                    <BAR_Navigation 
                        onTravelClick={() => { setIsMapOpen(!isMapOpen); setIsLocationMenuOpen(false); }} 
                        isMapOpen={isMapOpen}
                        onMoveClick={() => { setIsLocationMenuOpen(!isLocationMenuOpen); setIsMapOpen(false); }}
                        isMoveOpen={isLocationMenuOpen}
                    />
                    {isLocationMenuOpen && <LocationMenu onClose={() => setIsLocationMenuOpen(false)} />}
                </div>

                {isMapOpen && <GameMap onClose={() => setIsMapOpen(false)} />}

                <div className="hotbar-container">
                    <div className="hotbar">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="slot"><span className="slot-key">{num}</span></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GamePage;
