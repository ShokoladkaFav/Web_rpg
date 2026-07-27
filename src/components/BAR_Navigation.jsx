import "../styles/BAR_Navigation.css";

function BAR_Navigation({ 
    onTravelClick, 
    isMapOpen, 
    onMoveClick, 
    isMoveOpen, 
    onSettlementClick, 
    isSettlementOpen,
    onEquipmentClick,
    isEquipmentOpen,
    onAlmanacClick,
    isAlmanacOpen,
    onCraftClick,
    isCraftOpen
}) {
    const actions = [
        { id: "move", label: "Переміститися", icon: "📍" },
        { id: "travel", label: "Подорожувати", icon: "🗺️" },
        { id: "equipment", label: "Спорядження", icon: "🎒" },
        { id: "almanac", label: "Альманах", icon: "📖" },
        { id: "craft", label: "Створити щось", icon: "🛠️" },
        { id: "settlement", label: "Зайти в населений пункт", icon: "🏰" },
    ];

    const handleActionClick = (id) => {
        if (id === "travel") onTravelClick && onTravelClick();
        else if (id === "move") onMoveClick && onMoveClick();
        else if (id === "settlement") onSettlementClick && onSettlementClick();
        else if (id === "equipment") onEquipmentClick && onEquipmentClick();
        else if (id === "almanac") onAlmanacClick && onAlmanacClick();
        else if (id === "craft") onCraftClick && onCraftClick();
    };

    return (
        <div className="navigation-bar">
            <div className="actions-panel">
                <h3 className="panel-title">Доступні дії</h3>
                <div className="actions-list">
                    {actions.map((action) => {
                        let isActive = false;
                        if (action.id === "move") isActive = isMoveOpen;
                        if (action.id === "travel") isActive = isMapOpen;
                        if (action.id === "settlement") isActive = isSettlementOpen;
                        if (action.id === "equipment") isActive = isEquipmentOpen;
                        if (action.id === "almanac") isActive = isAlmanacOpen;
                        if (action.id === "craft") isActive = isCraftOpen;
                        
                        return (
                            <button 
                                key={action.id} 
                                className={`action-item-btn ${isActive ? "active" : ""}`}
                                onClick={() => handleActionClick(action.id)}
                            >
                                <span className="action-icon">{action.icon}</span>
                                <span className="action-label">{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default BAR_Navigation;