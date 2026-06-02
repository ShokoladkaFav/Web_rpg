import "../styles/BAR_Navigation.css";

function BAR_Navigation({ onTravelClick, isMapOpen, onMoveClick, isMoveOpen }) {
    const actions = [
        { id: "move", label: "Переміститися", icon: "📍" },
        { id: "travel", label: "Подорожувати", icon: "🗺️" },
        { id: "craft", label: "Створити щось", icon: "🛠️" },
        { id: "settlement", label: "Зайти в населений пункт", icon: "🏰" },
    ];

    const handleActionClick = (id) => {
        if (id === "travel") {
            onTravelClick();
        } else if (id === "move") {
            onMoveClick();
        } else {
            console.log(`Action: ${id}`);
        }
    };

    return (
        <div className="navigation-bar">
            <div className="actions-panel">
                <h3 className="panel-title">Доступні дії</h3>
                <div className="actions-list">
                    {actions.map((action) => {
                        const isActive = (action.id === "travel" && isMapOpen) || (action.id === "move" && isMoveOpen);
                        
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
