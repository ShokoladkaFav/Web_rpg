import { useState } from "react";
import "../styles/EquipmentWindow.css";
import { itemsById } from "../data/items.js";

function ItemImageOrIcon({ item, className, fallbackSize = "20px" }) {
    const [imgError, setImgError] = useState(false);

    if (!item) return null;

    const dbItem = item.id ? itemsById[item.id] : null;
    const itemImage = dbItem ? dbItem.image : item.image;

    if (imgError || !itemImage) {
        const fallbackEmoji = item.icon || (item.category === "Alchemical-Herbs" ? "🌿" : "📦");
        return <span className="item-emoji-fallback" style={{ fontSize: fallbackSize }}>{fallbackEmoji}</span>;
    }

    return (
        <img 
            src={itemImage} 
            alt={item.name} 
            className={className || "item-image-asset"} 
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
    );
}

function EquipmentWindow({ character, onClose, onUpdateCharacter }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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

    // Створюємо сітку на 12 слотів для рендеру
    const inventorySize = 12;
    const filledInventory = [...inventory];
    while (filledInventory.length < inventorySize) {
        filledInventory.push(null);
    }

    const handleSelectSlot = (item, index) => {
        if (!item) {
            setSelectedItem(null);
            setSelectedItemIndex(null);
            return;
        }
        setSelectedItem(item);
        setSelectedItemIndex(index);
    };

    // Дія: Викинути предмет з рюкзака
    const handleDiscardItem = () => {
        if (selectedItemIndex === null || !onUpdateCharacter) return;

        const updatedInventory = [...inventory];
        updatedInventory.splice(selectedItemIndex, 1);

        const updatedCharacter = {
            ...character,
            inventory: updatedInventory
        };

        onUpdateCharacter(updatedCharacter);
        setSelectedItem(null);
        setSelectedItemIndex(null);
    };

    // Дія: Спожити траву (відновити показники)
    const handleConsumeItem = () => {
        if (selectedItemIndex === null || !onUpdateCharacter) return;

        const item = selectedItem;
        
        // Видаляємо предмет
        const updatedInventory = [...inventory];
        updatedInventory.splice(selectedItemIndex, 1);

        // Показники за дефолтом
        let hpGain = 0;
        let sleepGain = 0;
        let foodGain = 0;
        let waterGain = 0;
        let mpGain = 0;
        let message = "";

        // Розраховуємо відновлення відповідно до унікальних властивостей трави
        switch (item.id) {
            case "mint":
                sleepGain = 15;
                foodGain = 2;
                message = "🌱 Ви розжували свіжу М'яту. Освіжаючий прохолодний смак миттєво зняв втому! (+15 сон)";
                break;
            case "seaweed":
                foodGain = 12;
                waterGain = 8;
                message = "🍀 Ви з'їли Морський водоросель. Солоні волокна втамували легкий голод і спрагу! (+12 їжа, +8 вода)";
                break;
            case "gribiscus":
                hpGain = 15;
                sleepGain = 5;
                message = "🍄 Ви спожили солодкуватий Грібіскус. Його дивні лікувальні соки загоїли подряпини! (+15 здоров'я, +5 сон)";
                break;
            case "pink_crested_lily":
                hpGain = 50;
                mpGain = 30;
                message = "🪷 Ви випили чарівний нектар Рожевої плашиної лілії. Потужна магія наповнила ваше тіло! (+50 здоров'я, +30 мана)";
                break;
            case "hermit_herb":
                hpGain = 20;
                message = "🌿 Гіркий сік Трави відлюдника швидко прискорив згортання крові та загоєння ран! (+20 здоров'я)";
                break;
            case "spicy_herb":
                sleepGain = 10;
                foodGain = 5;
                message = "🌶️ Ви розкусили Гостру траву. Пекучий присмак бадьорить ваш розум і серце! (+10 сон, +5 їжа)";
                break;
            case "golden_flower":
                hpGain = 30;
                mpGain = 15;
                message = "🌼 Ви проковтнули пилок Золотої квітки. Приємне тепло розлилося по тілу! (+30 здоров'я, +15 мана)";
                break;
            case "sea_herb":
                hpGain = 10;
                waterGain = 5;
                message = "🌾 Волога Морська трава злегка покращила самопочуття та втамувала сухість в роті! (+10 здоров'я, +5 вода)";
                break;
            case "rozrovochky":
                mpGain = 25;
                message = "🌸 Ніжні бруньки Розровочок миттєво освіжили ваші магічні канали! (+25 мана)";
                break;
            case "birds_herb":
                sleepGain = 8;
                hpGain = 5;
                message = "🌱 Легка Пташина трава дала приємну бадьорість та полегшила втому! (+8 сон, +5 здоров'я)";
                break;
            default:
                hpGain = 5;
                message = `Ви використали предмет "${item.name}".`;
        }

        // Оновлюємо статы з лімітом 100
        const updatedCharacter = {
            ...character,
            hp: Math.min(100, (character.hp || 100) + hpGain),
            mp: Math.min(100, (character.mp || 0) + mpGain),
            sleep: Math.min(100, (character.sleep || 100) + sleepGain),
            food: Math.min(100, (character.food || 100) + foodGain),
            water: Math.min(100, (character.water || 100) + waterGain),
            inventory: updatedInventory
        };

        onUpdateCharacter(updatedCharacter);
        setSelectedItem(null);
        setSelectedItemIndex(null);

        // Показуємо приємне сповіщення про відновлення
        alert(message);
    };

    // Переклад та стиль рідкості
    const rarityLabels = {
        "common": { name: "Звичайне", color: "#64748b", bg: "#f1f5f9" },
        "uncommon": { name: "Незвичайне", color: "#16a34a", bg: "#dcfce7" },
        "rare": { name: "Рідкісне", color: "#2563eb", bg: "#dbeafe" },
        "epic": { name: "Епічне", color: "#9333ea", bg: "#f3e8ff" }
    };

    const curRarity = selectedItem ? (rarityLabels[selectedItem.rarity] || rarityLabels.common) : null;

    return (
        <div className="action-window-overlay" onClick={onClose}>
            <div className="action-window wide eq-modal-window" onClick={(e) => e.stopPropagation()}>
                <header className="action-header">
                    <div className="action-loc-info">
                        <div className="loc-icon">🎒</div>
                        <div>
                            <span className="loc-type">Персонаж</span>
                            <h3 className="loc-name">Спорядження та Інвентар</h3>
                        </div>
                    </div>
                    <button className="close-action-btn" onClick={onClose}>×</button>
                </header>

                <div className="action-body-columns">
                    {/* Ліва колонка: Персонаж, екіпірування та поточні характеристики */}
                    <div className="action-selector-col eq-character-col">
                        <div className="eq-character-card">
                            <div className="eq-char-header">
                                <img src={character.icon} alt={character.nickname} className="eq-char-avatar" />
                                <div className="eq-char-name-box">
                                    <h4 className="eq-char-nickname">{character.nickname}</h4>
                                    <span className="eq-char-level">Рівень {character.level} • {character.locationName}</span>
                                </div>
                            </div>
                            
                            <div className="eq-stats-mini-list">
                                <div className="eq-stat-row-bar">
                                    <span className="eq-stat-lbl">❤️ Здоров'я</span>
                                    <div className="eq-bar-outer"><div className="eq-bar-inner hp" style={{ width: `${character.hp}%` }}></div></div>
                                    <span className="eq-stat-val">{character.hp}/100</span>
                                </div>
                                <div className="eq-stat-row-bar">
                                    <span className="eq-stat-lbl">🧪 Мана</span>
                                    <div className="eq-bar-outer"><div className="eq-bar-inner mp" style={{ width: `${character.mp}%` }}></div></div>
                                    <span className="eq-stat-val">{character.mp}/100</span>
                                </div>
                                <div className="eq-stat-row-bar">
                                    <span className="eq-stat-lbl">🍖 Ситість</span>
                                    <div className="eq-bar-outer"><div className="eq-bar-inner food" style={{ width: `${character.food}%` }}></div></div>
                                    <span className="eq-stat-val">{character.food}/100</span>
                                </div>
                                <div className="eq-stat-row-bar">
                                    <span className="eq-stat-lbl">💧 Спрага</span>
                                    <div className="eq-bar-outer"><div className="eq-bar-inner water" style={{ width: `${character.water}%` }}></div></div>
                                    <span className="eq-stat-val">{character.water}/100</span>
                                </div>
                                <div className="eq-stat-row-bar">
                                    <span className="eq-stat-lbl">⚡ Енергія</span>
                                    <div className="eq-bar-outer"><div className="eq-bar-inner sleep" style={{ width: `${character.sleep}%` }}></div></div>
                                    <span className="eq-stat-val">{character.sleep}/100</span>
                                </div>
                            </div>
                        </div>

                        <div className="eq-slots-section">
                            <label className="sub-label">Поточне Екіпірування</label>
                            <div className="eq-slots-grid-modern">
                                {equipmentSlots.map(slot => (
                                    <div key={slot.id} className="eq-slot-card-modern">
                                        <div className="mini-slot-box-modern">
                                            {equipment[slot.id] ? (
                                                <ItemImageOrIcon item={equipment[slot.id]} className="eq-slot-img" fallbackSize="18px" />
                                            ) : (
                                                <span className="slot-placeholder-modern">{slot.icon}</span>
                                            )}
                                        </div>
                                        <div className="eq-slot-label-box">
                                            <span className="eq-slot-lbl-type">{slot.label}</span>
                                            <span className="eq-slot-lbl-name">
                                                {equipment[slot.id] ? equipment[slot.id].name : "Порожньо"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Права колонка: Інвентар та детальна інформація про предмет */}
                    <div className="action-console-col eq-inventory-col">
                        <div className="eq-inventory-header">
                            <span className="eq-inventory-title">Мій Рюкзак</span>
                            <span className="inventory-indicator">{inventory.length} / {inventorySize} слотів</span>
                        </div>

                        <div className="eq-inventory-container-scroll">
                            <div className="mini-inventory-grid-modern">
                                {filledInventory.map((item, index) => {
                                    const isSelected = selectedItemIndex === index;
                                    const itemRarityClass = item ? `rarity-${item.rarity}` : "";
                                    return (
                                        <div 
                                            key={index} 
                                            className={`mini-inventory-slot-modern ${itemRarityClass} ${isSelected ? "selected" : ""}`}
                                            onClick={() => handleSelectSlot(item, index)}
                                        >
                                            {item && <ItemImageOrIcon item={item} className="inventory-item-img" fallbackSize="24px" />}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Блок з інформацією про вибраний предмет */}
                            {selectedItem ? (
                                <div className="item-details-panel-modern">
                                    <div className="details-header-modern">
                                        <span className="details-icon-modern">
                                            <ItemImageOrIcon item={selectedItem} className="details-item-img" fallbackSize="28px" />
                                        </span>
                                        <div className="details-meta-modern">
                                            <h4 className="details-name-modern">{selectedItem.name}</h4>
                                            <span 
                                                className="details-rarity-badge-modern"
                                                style={{ color: curRarity.color, background: curRarity.bg }}
                                            >
                                                {curRarity.name}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="details-description-modern">{selectedItem.description}</p>
                                    <div className="details-footer-modern">
                                        <span className="details-price-modern">💰 Цінність: {selectedItem.value} золота</span>
                                        <div className="details-actions-modern">
                                            {selectedItem.category === "Alchemical-Herbs" && (
                                                <button className="btn-use-modern" onClick={handleConsumeItem}>Спожити</button>
                                            )}
                                            <button className="btn-discard-modern" onClick={handleDiscardItem}>Викинути</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="item-details-placeholder-modern">
                                    <span className="placeholder-icon-eq">🌿</span>
                                    <p>Оберіть предмет у рюкзаку, щоб переглянути його властивості та використати</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EquipmentWindow;
