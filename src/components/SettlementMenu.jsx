import "../styles/SettlementMenu.css";

function SettlementMenu({ onClose, settlementName }) {
    const cityPlaces = [
        { id: "shop", name: "Крамниця скупщика", icon: "💰" },
        { id: "blacksmith", name: "Кузня", icon: "⚒️" },
        { id: "market", name: "Базар", icon: "⚖️" },
        { id: "adventurers_guild", name: "Гільдія шукачів пригод", icon: "⚔️" },
        { id: "merchants_guild", name: "Гільдія Купців", icon: "📜" },
        { id: "tavern", name: "Корчма", icon: "🍺" },
        { id: "barber", name: "Цирульник", icon: "✂️" },
        { id: "hunter", name: "Ловчий", icon: "🏹" },
    ];

    const handlePlaceClick = (placeName) => {
        alert(`Ви завітали до: ${placeName}`);
    };

    return (
        <div className="settlement-menu-panel">
            <header className="settlement-header">
                <div className="settlement-title-box">
                    <span className="settlement-icon">🏰</span>
                    <div>
                        <span className="settlement-label">Населений пункт</span>
                        <h3 className="settlement-name">{settlementName}</h3>
                    </div>
                </div>
                <button className="close-small-btn" onClick={onClose}>×</button>
            </header>
            
            <div className="settlement-content">
                <div className="places-list">
                    {cityPlaces.map((place) => (
                        <button 
                            key={place.id} 
                            className="place-btn"
                            onClick={() => handlePlaceClick(place.name)}
                        >
                            <span className="place-icon">{place.icon}</span>
                            <span className="place-name">{place.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SettlementMenu;