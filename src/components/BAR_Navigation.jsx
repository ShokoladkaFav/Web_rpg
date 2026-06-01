import "../styles/BAR_Navigation.css";

function BAR_Navigation() {
    const actions = [
        { id: "move", label: "Переміститися", icon: "📍" },
        { id: "travel", label: "Подорожувати", icon: "🗺️" },
        { id: "craft", label: "Створити щось", icon: "🛠️" },
        { id: "settlement", label: "Зайти в населений пункт", icon: "🏰" },
    ];

    return (
        <div className="navigation-bar">
            <div className="actions-panel">
                <h3 className="panel-title">Доступні дії</h3>
                <div className="actions-list">
                    {actions.map((action) => (
                        <button 
                            key={action.id} 
                            className="action-item-btn"
                            onClick={() => console.log(`Action: ${action.id}`)}
                        >
                            <span className="action-icon">{action.icon}</span>
                            <span className="action-label">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BAR_Navigation;
