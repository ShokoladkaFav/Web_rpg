import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GamePage.css";
import BAR_Navigation from "../components/BAR_Navigation.jsx";
import GameMap from "../components/GameMap.jsx";
import LocationMenu from "../components/LocationMenu.jsx";
import SettlementMenu from "../components/SettlementMenu.jsx";
import PlayerStatsModal from "../components/PlayerStatsModal.jsx";
import ActionWindow from "../components/ActionWindow.jsx";
import EquipmentWindow from "../components/EquipmentWindow.jsx";

function GamePage() {
    const navigate = useNavigate();
    
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
    const [isSettlementMenuOpen, setIsSettlementMenuOpen] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
    const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
    
    const [character, setCharacter] = useState(null);
    const [activeSubLocation, setActiveSubLocation] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("player_character");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            
            // "Латка" для старого персонажа: додаємо поля, якщо їх немає
            const migratedCharacter = {
                inventory: [],
                equipment: { head: null, chest: null, legs: null, weapon: null, shield: null },
                subLocationName: "Центр",
                xp: 0,
                maxXp: 100,
                ...parsed // Перекриваємо дефолтні значення тими, що є в збереженні
            };
            
            setCharacter(migratedCharacter);
        } else {
            navigate("/create");
        }
    }, [navigate]);

    const updateLocation = (newId, newName) => {
        const updated = { ...character, locationId: newId, locationName: newName, subLocationName: "Центр" };
        setCharacter(updated);
        localStorage.setItem("player_character", JSON.stringify(updated));
    };

    const handleSelectSubLocation = (subLocObj) => {
        const updated = { ...character, subLocationName: subLocObj.name };
        setCharacter(updated);
        localStorage.setItem("player_character", JSON.stringify(updated));
        setActiveSubLocation(subLocObj);
        setIsActionWindowOpen(true);
    };

    const toggleMove = () => { setIsLocationMenuOpen(!isLocationMenuOpen); setIsMapOpen(false); setIsSettlementMenuOpen(false); setIsEquipmentOpen(false); };
    const toggleTravel = () => { setIsMapOpen(!isMapOpen); setIsLocationMenuOpen(false); setIsSettlementMenuOpen(false); setIsEquipmentOpen(false); };
    const toggleSettlement = () => { setIsSettlementMenuOpen(!isSettlementMenuOpen); setIsMapOpen(false); setIsLocationMenuOpen(false); setIsEquipmentOpen(false); };
    const toggleEquipment = () => { setIsEquipmentOpen(!isEquipmentOpen); setIsMapOpen(false); setIsLocationMenuOpen(false); setIsSettlementMenuOpen(false); };

    if (!character) return null;

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
                                    <div className="mini-xp-bar"><div className="mini-xp-fill" style={{ width: `${(character.xp/character.maxXp)*100}%` }}></div></div>
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
                        onTravelClick={toggleTravel} isMapOpen={isMapOpen}
                        onMoveClick={toggleMove} isMoveOpen={isLocationMenuOpen}
                        onSettlementClick={toggleSettlement} isSettlementOpen={isSettlementMenuOpen}
                        onEquipmentClick={toggleEquipment} isEquipmentOpen={isEquipmentOpen}
                    />
                    
                    {isLocationMenuOpen && <LocationMenu onClose={() => setIsLocationMenuOpen(false)} currentLocationId={character.locationId} onSelectSubLocation={handleSelectSubLocation} />}
                    {isSettlementMenuOpen && (
                        <SettlementMenu 
                            onClose={() => setIsSettlementMenuOpen(false)} 
                            settlementName={character.locationName} 
                            character={character}
                            onUpdateCharacter={(updated) => {
                                setCharacter(updated);
                                localStorage.setItem("player_character", JSON.stringify(updated));
                            }}
                        />
                    )}
                    {isEquipmentOpen && <EquipmentWindow character={character} onClose={() => setIsEquipmentOpen(false)} />}
                </div>

                {isMapOpen && <GameMap onClose={() => setIsMapOpen(false)} playerLocationId={character.locationId} onSelectLocation={updateLocation} />}
                {isStatsOpen && <PlayerStatsModal character={character} onClose={() => setIsStatsOpen(false)} />}
                {isActionWindowOpen && <ActionWindow subLocation={activeSubLocation} onClose={() => setIsActionWindowOpen(false)} />}
            </div>
        </div>
    );
}

export default GamePage;