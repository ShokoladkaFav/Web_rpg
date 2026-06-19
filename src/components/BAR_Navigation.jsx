import "../styles/BAR_Navigation.css";

function BAR_Navigation({ 
    onTravelClick, 
    isMapOpen, 
    onMoveClick, 
    isMoveOpen, 
    onSettlementClick, 
    isSettlementOpen,
    onEquipmentClick,    // Новий пропс для відкриття спорядження
    isEquipmentOpen      // Новий пропс для перевірки активності
}) {
    const actions = [
        { id: "move", label: "Переміститися", icon: "📍" },
        { id: "travel", label: "Подорожувати", icon: "🗺️" },
        { id: "equipment", label: "Спорядження", icon: "🎒" }, // Нова дія
        { id: "craft", label: "Створити щось", icon: "🛠️" },
        { id: "settlement", label: "Зайти в населений пункт", icon: "🏰" },
    ];

    const handleActionClick = (id) => {
        if (id === "travel") onTravelClick();
        else if (id === "move") onMoveClick();
        else if (id === "settlement") onSettlementClick();
        else if (id === "equipment") onEquipmentClick(); // Викликаємо функцію для спорядження
        else console.log(`Action: ${id}`);
    };

    return (
        <div className="navigation-bar">
            <div className="actions-panel">
                <h3 className="panel-title">Доступні дії</h3>
                <div className="actions-list">
                    {actions.map((action) => {
                        // Визначаємо, чи активна кнопка в даний момент
                        let isActive = false;
                        if (action.id === "move") isActive = isMoveOpen;
                        if (action.id === "travel") isActive = isMapOpen;
                        if (action.id === "settlement") isActive = isSettlementOpen;
                        if (action.id === "equipment") isActive = isEquipmentOpen;
                        
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