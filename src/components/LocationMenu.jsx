import "../styles/LocationMenu.css";

function LocationMenu({ onClose, currentLocationId, onSelectSubLocation }) {
    const settlementSubLocations = {
        "start_village": [
            { id: "forest", name: "Ліс", icon: "🌲" },
            { id: "lake", name: "Озеро", icon: "🌊" },
            { id: "beach", name: "Пляж", icon: "🏖️" },
            { id: "north_forest", name: "Північний ліс", icon: "🌳" },
            { id: "abvol_rock", name: "Скеля 'Абволь'", icon: "⛰️" }
        ],
        "village2": [
            { id: "main_square", name: "Головна площа", icon: "⚖️" },
            { id: "old_well", name: "Стара криниця", icon: "🕳️" }
        ],
        "capital": [
            { id: "castle_gate", name: "Брама замку", icon: "🏰" },
            { id: "market", name: "Ринок", icon: "🛍️" },
            { id: "arena", name: "Арена", icon: "⚔️" }
        ]
    };

    const currentSubLocations = settlementSubLocations[currentLocationId] || [];

    const handleSubLocationMove = (name) => {
        onSelectSubLocation(name);
        onClose();
    };

    return (
        <div className="location-menu-panel">
            <header className="location-header">
                <span className="location-title">📍 Переміщення</span>
                <button className="close-small-btn" onClick={onClose}>×</button>
            </header>
            
            <div className="location-content">
                {currentSubLocations.length > 0 ? (
                    <div className="location-list">
                        {currentSubLocations.map((loc) => (
                            <button 
                                key={loc.id} 
                                className="sub-location-btn"
                                onClick={() => handleSubLocationMove(loc.name)}
                            >
                                <span className="sub-loc-icon">{loc.icon}</span>
                                <span className="sub-loc-name">{loc.name}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="empty-locations">
                        <p>Тут немає відомих місць</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationMenu;
