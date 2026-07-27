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
import AlmanacModal from "../components/AlmanacModal.jsx";
import CraftingModal from "../components/CraftingModal.jsx";
import { CoinsDisplay } from "../utils/currency.jsx";
import { TimeDisplay, advanceTime, getTimePeriod } from "../utils/timeSystem.jsx";

function GamePage() {
    const navigate = useNavigate();
    
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
    const [isSettlementMenuOpen, setIsSettlementMenuOpen] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
    const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
    const [isAlmanacOpen, setIsAlmanacOpen] = useState(false);
    const [isCraftOpen, setIsCraftOpen] = useState(false);
    
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
                copper: 150,
                day: 1,
                hour: 8,
                minute: 0,
                ...parsed // Перекриваємо дефолтні значення тими, що є в збереженні
            };
            
            setCharacter(migratedCharacter);
        } else {
            navigate("/create");
        }
    }, [navigate]);

    const updateLocation = (newId, newName) => {
        // Подорож між поселеннями на карті займає 2 години (120 хвилин)
        const timeAdvancedChar = advanceTime(character, 120);
        const updated = { ...timeAdvancedChar, locationId: newId, locationName: newName, subLocationName: "Центр" };
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

    const toggleMove = () => { setIsLocationMenuOpen(!isLocationMenuOpen); setIsMapOpen(false); setIsSettlementMenuOpen(false); setIsEquipmentOpen(false); setIsAlmanacOpen(false); setIsCraftOpen(false); };
    const toggleTravel = () => { setIsMapOpen(!isMapOpen); setIsLocationMenuOpen(false); setIsSettlementMenuOpen(false); setIsEquipmentOpen(false); setIsAlmanacOpen(false); setIsCraftOpen(false); };
    const toggleSettlement = () => { setIsSettlementMenuOpen(!isSettlementMenuOpen); setIsMapOpen(false); setIsLocationMenuOpen(false); setIsEquipmentOpen(false); setIsAlmanacOpen(false); setIsCraftOpen(false); };
    const toggleEquipment = () => { setIsEquipmentOpen(!isEquipmentOpen); setIsMapOpen(false); setIsLocationMenuOpen(false); setIsSettlementMenuOpen(false); setIsAlmanacOpen(false); setIsCraftOpen(false); };
    const toggleAlmanac = () => { setIsAlmanacOpen(!isAlmanacOpen); setIsMapOpen(false); setIsLocationMenuOpen(false); setIsSettlementMenuOpen(false); setIsEquipmentOpen(false); setIsCraftOpen(false); };
    const toggleCraft = () => { setIsCraftOpen(!isCraftOpen); setIsMapOpen(false); setIsLocationMenuOpen(false); setIsSettlementMenuOpen(false); setIsEquipmentOpen(false); setIsAlmanacOpen(false); };

    if (!character) return null;

    const period = getTimePeriod(character.hour ?? 8);

    return (
        <div className={`game-page ${period.skyClass}`} style={{ backgroundImage: period.bgGradient }}>
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
                                    <div className="level-location-row" style={{ flexWrap: "wrap", gap: "6px" }}>
                                        <span className="player-level">Lvl. {character.level}</span>
                                        <span className="player-location-tag">📍 {character.locationName}</span>
                                        <span className="player-money-tag" style={{ background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)", display: "inline-flex", alignItems: "center" }}>
                                            <CoinsDisplay totalCopper={character.copper || 0} size="small" />
                                        </span>
                                        <TimeDisplay character={character} size="small" />
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
                        onAlmanacClick={toggleAlmanac} isAlmanacOpen={isAlmanacOpen}
                        onCraftClick={toggleCraft} isCraftOpen={isCraftOpen}
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
                </div>

                {isEquipmentOpen && (
                    <EquipmentWindow 
                        character={character} 
                        onClose={() => setIsEquipmentOpen(false)} 
                        onUpdateCharacter={(updated) => {
                            setCharacter(updated);
                            localStorage.setItem("player_character", JSON.stringify(updated));
                        }}
                    />
                )}

                {isAlmanacOpen && (
                    <AlmanacModal onClose={() => setIsAlmanacOpen(false)} />
                )}

                {isCraftOpen && (
                    <CraftingModal onClose={() => setIsCraftOpen(false)} />
                )}

                {isMapOpen && <GameMap onClose={() => setIsMapOpen(false)} playerLocationId={character.locationId} onSelectLocation={updateLocation} />}
                {isStatsOpen && <PlayerStatsModal character={character} onClose={() => setIsStatsOpen(false)} />}
                {isActionWindowOpen && (
                    <ActionWindow 
                        subLocation={activeSubLocation} 
                        onClose={() => setIsActionWindowOpen(false)} 
                        character={character}
                        onUpdateCharacter={(updated) => {
                            setCharacter(updated);
                            localStorage.setItem("player_character", JSON.stringify(updated));
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default GamePage;