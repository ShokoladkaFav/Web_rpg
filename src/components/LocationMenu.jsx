import "../styles/LocationMenu.css";

function LocationMenu({ onClose, currentLocationId, onSelectSubLocation }) {
    // База даних внутрішніх локацій для кожного поселення
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

    // Визначаємо список під-локацій для поточного місця перебування гравця
    const currentSubLocations = settlementSubLocations[currentLocationId] || [];

    // Функція обробки вибору локації
    const handleSubLocationMove = (loc) => {
        // Передаємо весь об'єкт {id, name, icon} у GamePage
        onSelectSubLocation(loc);
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
                                onClick={() => handleSubLocationMove(loc)}
                            >
                                <span className="sub-loc-icon">{loc.icon}</span>
                                <span className="sub-loc-name">{loc.name}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="empty-locations">
                        <p>Тут немає відомих місць для дослідження</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationMenu;