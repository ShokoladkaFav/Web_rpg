import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GamePage.css";
import BAR_Navigation from "../components/BAR_Navigation.jsx";
import GameMap from "../components/GameMap.jsx";
import LocationMenu from "../components/LocationMenu.jsx";
import PlayerStatsModal from "../components/PlayerStatsModal.jsx";
import ActionWindow from "../components/ActionWindow.jsx"; // Новий імпорт

function GamePage() {
    const navigate = useNavigate();
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isActionWindowOpen, setIsActionWindowOpen] = useState(false); // Стан вікна дій
    
    const [character, setCharacter] = useState(null);
    const [activeSubLocation, setActiveSubLocation] = useState(null); // Об'єкт поточної під-локації

    useEffect(() => {
        const savedData = localStorage.getItem("player_character");
        if (savedData) {
            setCharacter(JSON.parse(savedData));
        } else {
            navigate("/create");
        }
    }, [navigate]);

    const updateLocation = (newId, newName) => {
        const updatedCharacter = { ...character, locationId: newId, locationName: newName, subLocationName: "Центр" };
        setCharacter(updatedCharacter);
        localStorage.setItem("player_character", JSON.stringify(updatedCharacter));
    };

    // Оновлена функція: тепер відкриває вікно дій
    const handleSelectSubLocation = (subLocObj) => {
        const updatedCharacter = { ...character, subLocationName: subLocObj.name };
        setCharacter(updatedCharacter);
        localStorage.setItem("player_character", JSON.stringify(updatedCharacter));
        
        setActiveSubLocation(subLocObj);
        setIsActionWindowOpen(true); // ВІДКРИВАЄМО ВІКНО ДІЙ
    };

    if (!character) return null;

    const xpPercentage = (character.xp / character.maxXp) * 100;

    return (
        <div className="game-page">
            <div className="game-ui">
                <div className="top-bar">
                    <div className="player-info-card">
                        <div className="player-avatar" onClick={() => setIsStatsOpen(true)}>
                            <img src={character.icon} alt="Avatar" />
                        </div>
                        <div className="player-stats-container">
                            <div className="player-meta">
                                <h2 className="player-name">{character.nickname}</h2>
                                <div className="level-xp-container">
                                    <div className="level-location-row">
                                        <span className="player-level">Lvl. {character.level}</span>
                                        <span className="player-location-tag">📍 {character.locationName}</span>
                                    </div>
                                    <div className="mini-xp-bar"><div className="mini-xp-fill" style={{ width: `${xpPercentage}%` }}></div></div>
                                </div>
                            </div>
                            <div className="status-bars-list">
                                <div className="bar"><div className="bar-fill hp" style={{width: `${character.hp}%`}}></div></div>
                                <div className="bar"><div className="bar-fill mp" style={{width: `${character.mp}%`}}></div></div>
                                <div className="bar"><div className="bar-fill food" style={{width: `${character.food}%`}}></div></div>
                                <div className="bar"><div className="bar-fill water" style={{width: `${character.water}%`}}></div></div>
                                <div className="bar"><div className="bar-fill sleep" style={{width: `${character.sleep}%`}}></div></div>
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
                    
                    {isLocationMenuOpen && (
                        <LocationMenu 
                            onClose={() => setIsLocationMenuOpen(false)} 
                            currentLocationId={character.locationId}
                            onSelectSubLocation={handleSelectSubLocation}
                        />
                    )}
                </div>

                {isMapOpen && <GameMap onClose={() => setIsMapOpen(false)} playerLocationId={character.locationId} onSelectLocation={updateLocation} />}
                {isStatsOpen && <PlayerStatsModal character={character} onClose={() => setIsStatsOpen(false)} />}
                
                {/* ВІКНО ДІЙ */}
                {isActionWindowOpen && (
                    <ActionWindow 
                        subLocation={activeSubLocation} 
                        onClose={() => setIsActionWindowOpen(false)} 
                    />
                )}

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
