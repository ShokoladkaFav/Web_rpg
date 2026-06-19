import "../styles/EquipmentWindow.css";

function EquipmentWindow({ character, onClose }) {
    // Слоти спорядження
    const equipmentSlots = [
        { id: "head", label: "Голова", icon: "🪖" },
        { id: "chest", label: "Тіло", icon: "🛡️" },
        { id: "legs", label: "Ноги", icon: "👖" },
        { id: "weapon", label: "Зброя", icon: "⚔️" },
        { id: "shield", label: "Щит", icon: "🛡️" },
    ];

    // Безпечне отримання інвентарю та спорядження
    const inventory = Array.isArray(character?.inventory) ? character.inventory : [];
    const equipment = character?.equipment || {};

    // Створюємо сітку на 12 слотів
    const inventorySize = 12;
    const filledInventory = [...inventory];
    while (filledInventory.length < inventorySize) {
        filledInventory.push(null);
    }

    return (
        <div className="eq-menu-panel">
            <header className="eq-header">
                <div className="eq-title-box">
                    <span className="eq-icon">🎒</span>
                    <div>
                        <span className="eq-label">Персонаж</span>
                        <h3 className="eq-name">Спорядження</h3>
                    </div>
                </div>
                <button className="close-small-btn" onClick={onClose}>×</button>
            </header>

            <div className="eq-content">
                <div className="eq-section">
                    <label className="sub-label">Екіпірування</label>
                    <div className="eq-slots-list">
                        {equipmentSlots.map(slot => (
                            <div key={slot.id} className="eq-slot-row">
                                <div className="mini-slot-box">
                                    {equipment[slot.id] ? (
                                        <span className="item-icon">{equipment[slot.id].icon}</span>
                                    ) : (
                                        <span className="slot-placeholder">{slot.icon}</span>
                                    )}
                                </div>
                                <span className="mini-slot-label">{slot.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="eq-divider"></div>

                <div className="eq-section">
                    <label className="sub-label">Інвентар ({inventory.length}/{inventorySize})</label>
                    <div className="mini-inventory-grid">
                        {filledInventory.map((item, index) => (
                            <div key={index} className="mini-inventory-slot">
                                {item && <span className="item-icon">{item.icon}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EquipmentWindow;