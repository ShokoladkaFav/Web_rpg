import "../styles/ActionWindow.css";

function ActionWindow({ subLocation, onClose }) {
    if (!subLocation) return null;

    // Загальні дії для всіх під-локацій
    const commonActions = [
        { id: "hunt_monsters", name: "Полювати на монстрів", icon: "⚔️" },
        { id: "search_resources", name: "Шукати корисні ресурси", icon: "💎" },
        { id: "wander", name: "Блукати в пошуках цікавого", icon: "👣" },
    ];

    // Специфічні дії для конкретних місць (по ID з LocationMenu)
    const uniqueActions = {
        "forest": [
            { id: "forest_plants", name: "Пошук корисних лісних рослин", icon: "🌿" },
            { id: "hunt_beast", name: "Спробувати вполювати дикого звіра", icon: "🏹" }
        ],
        "lake": [
            { id: "water_plants", name: "Пошук корисних морських рослин", icon: "🍀" },
            { id: "fishing", name: "Порибачити", icon: "🎣" }
        ],
        "beach": [
            { id: "search_caves", name: "Пошук печер", icon: "🕳️" }
        ],
        "north_forest": [
            { id: "bandit_camp", name: "Пошук стоянок бандитів", icon: "⛺" }
        ],
        "abvol_rock": [
            { id: "rock_plants", name: "Пошук корисних скелястих рослин", icon: "🌵" },
            { id: "flying_monsters", name: "Пошук літаючих монстрів", icon: "🦅" }
        ]
    };

    const currentUniqueActions = uniqueActions[subLocation.id] || [];

    const handleAction = (actionName) => {
        alert(`Дія: ${actionName} у локації ${subLocation.name}`);
    };

    return (
        <div className="action-window-overlay" onClick={onClose}>
            <div className="action-window" onClick={(e) => e.stopPropagation()}>
                <header className="action-header">
                    <div className="action-loc-info">
                        <span className="loc-icon">{subLocation.icon}</span>
                        <div>
                            <h3 className="loc-name">{subLocation.name}</h3>
                            <p className="loc-type">Доступні можливості</p>
                        </div>
                    </div>
                    <button className="close-action-btn" onClick={onClose}>×</button>
                </header>

                <div className="action-body">
                    <div className="action-section">
                        <label>Унікальні дії</label>
                        <div className="action-list">
                            {currentUniqueActions.map(action => (
                                <button key={action.id} className="action-item-btn unique" onClick={() => handleAction(action.name)}>
                                    <span className="btn-icon">{action.icon}</span>
                                    {action.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="action-section">
                        <label>Загальні дії</label>
                        <div className="action-list">
                            {commonActions.map(action => (
                                <button key={action.id} className="action-item-btn" onClick={() => handleAction(action.name)}>
                                    <span className="btn-icon">{action.icon}</span>
                                    {action.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActionWindow;