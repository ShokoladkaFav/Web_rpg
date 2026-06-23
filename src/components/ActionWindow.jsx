import { useState, useEffect, useRef } from "react";
import "../styles/ActionWindow.css";
import { items } from "../data/items.js";

function ActionWindow({ subLocation, onClose, character, onUpdateCharacter }) {
    if (!subLocation) return null;

    const [logs, setLogs] = useState([]);
    const logsEndRef = useRef(null);

    // Завжди автоматично прокручуємо лог до низу
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    // Додавання нового повідомлення в консоль дій
    const addLog = (newLog) => {
        setLogs((prev) => [...prev, { id: Date.now() + Math.random(), ...newLog }]);
    };

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

    // Зони випадіння трав
    const herbDropsByAction = {
        "forest_plants": ["golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint"],
        "water_plants": ["pink_crested_lily", "seaweed", "sea_herb", "mint"],
        "rock_plants": ["golden_flower", "rozrovochky", "hermit_herb", "spicy_herb"]
    };

    // Зважений вибір трави на основі рідкості
    const getWeightedHerb = (allowedIds) => {
        const candidates = items["Alchemical-Herbs"].filter(h => allowedIds.includes(h.id));
        if (candidates.length === 0) return null;
        
        const weights = {
            "common": 50,
            "uncommon": 30,
            "rare": 15,
            "epic": 5
        };
        
        const candidatesWithWeights = candidates.map(c => ({
            item: c,
            weight: weights[c.rarity] || 50
        }));
        
        const totalWeight = candidatesWithWeights.reduce((sum, c) => sum + c.weight, 0);
        let roll = Math.random() * totalWeight;
        
        for (const cand of candidatesWithWeights) {
            if (roll < cand.weight) {
                return cand.item;
            }
            roll -= cand.weight;
        }
        return candidatesWithWeights[0].item;
    };

    const handleAction = (actionId, actionName) => {
        if (!character || !onUpdateCharacter) return;

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const inventory = Array.isArray(character.inventory) ? character.inventory : [];

        // Перевірка на заповненість інвентарю для пошуку трав
        const isGatheringAction = ["forest_plants", "water_plants", "rock_plants"].includes(actionId);
        if (isGatheringAction && inventory.length >= 12) {
            addLog({
                type: "error",
                text: "🎒 Інвентар заповнений (12/12)! Потрібно звільнити місце.",
                time: timeString
            });
            return;
        }

        // Розрахунок споживання показників
        let hpDamage = 0;
        let newSleep = character.sleep - 4;
        let newWater = character.water - 3;
        let newFood = character.food - 2;

        let exhaustWarnings = [];
        if (newSleep < 0) { newSleep = 0; hpDamage += 6; exhaustWarnings.push("Виснаження (Сон: 0%)"); }
        if (newWater < 0) { newWater = 0; hpDamage += 4; exhaustWarnings.push("Спрага (Вода: 0%)"); }
        if (newFood < 0) { newFood = 0; hpDamage += 2; exhaustWarnings.push("Голод (Їжа: 0%)"); }

        let newHp = character.hp - hpDamage;

        // Фатальний кінець від виснаження
        if (newHp <= 0) {
            addLog({
                type: "death",
                text: "💀 Ви знепритомніли від тотального виснаження! Вас підібрали місцеві жителі та віднесли відновлюватися у Корчму. Показники частково стабілізовано.",
                time: timeString
            });
            
            const revivedCharacter = {
                ...character,
                hp: 25,
                sleep: 35,
                water: 35,
                food: 35,
            };
            onUpdateCharacter(revivedCharacter);
            return;
        }

        // Початок обробки логіки дії
        let logText = "";
        let logType = "info";
        let foundItem = null;
        let xpGained = 0;

        if (isGatheringAction) {
            const success = Math.random() < 0.85; // Шанс успіху 85%
            if (success) {
                const allowedHerbs = herbDropsByAction[actionId];
                foundItem = getWeightedHerb(allowedHerbs);
                if (foundItem) {
                    xpGained = foundItem.rarity === "epic" ? 22 : foundItem.rarity === "rare" ? 16 : foundItem.rarity === "uncommon" ? 12 : 8;
                    logText = `🌱 Ви ретельно оглянули територію і знайшли чудовий екземпляр: "${foundItem.name}"`;
                    logType = "loot";
                } else {
                    xpGained = 4;
                    logText = "🍂 Ви знайшли лише зів'яле коріння неотруйних рослин.";
                }
            } else {
                xpGained = 4;
                logText = "🔍 Довгі пошуки серед заростей не дали жодних цінних результатів.";
            }
        } 
        else if (actionId === "search_resources") {
            const success = Math.random() < 0.40; // Шанс знайти будь-яку траву 40%
            if (success) {
                const allHerbs = items["Alchemical-Herbs"].map(h => h.id);
                foundItem = getWeightedHerb(allHerbs);
                if (foundItem) {
                    xpGained = foundItem.rarity === "epic" ? 18 : foundItem.rarity === "rare" ? 14 : foundItem.rarity === "uncommon" ? 10 : 6;
                    logText = `💎 Випадкова знахідка! Ви знайшли цінну рослину: "${foundItem.name}"`;
                    logType = "loot";
                }
            } else {
                xpGained = 5;
                logText = "⛏️ Ви оглянули скелясті тріщини та суху траву, але корисних ресурсів не виявлено.";
            }
        }
        else if (actionId === "hunt_beast") {
            const success = Math.random() < 0.65;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🏹 Полювання пройшло успішно! Ви вистежили та вполювали швидкого лісового зайця." 
                : "🏹 Звір почув ваші кроки за милю та миттєво зник у нетрях лісу.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "fishing") {
            const success = Math.random() < 0.70;
            xpGained = success ? 14 : 5;
            logText = success 
                ? "🎣 Поплавок різко пішов під воду! Ви витягли великого сріблястого карася." 
                : "🎣 Риба обережно об'їла наживку та попливла геть.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "search_caves") {
            const success = Math.random() < 0.50;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "🕳️ Ви заглибилися в печеру та виявили старі людські стоянки з корисними залишками." 
                : "🕳️ Печера виявилася сирою, холодною і абсолютно порожньою.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "bandit_camp") {
            const success = Math.random() < 0.60;
            xpGained = success ? 25 : 10;
            logText = success 
                ? "⛺ Ви виявили занедбане багаття розбійників та змогли поцупити трохи корисних матеріалів." 
                : "⛺ Бандити посилили патрулювання. Вам довелося довго переховуватися у тернах.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "flying_monsters") {
            const success = Math.random() < 0.60;
            xpGained = success ? 24 : 12;
            logText = success 
                ? "🦅 З неба каменем кинувся гірський яструб! Ви вправно захистилися і здобули цінний бойовий досвід." 
                : "🦅 Тінь пролетіла високо над скелями, залишаючи вас у напруженому очікуванні.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "hunt_monsters") {
            const success = Math.random() < 0.75;
            xpGained = success ? 20 : 10;
            logText = success 
                ? "⚔️ Ви зіткнулися з блукаючим монстром і здолали його у запеклій сутичці!" 
                : "⚔️ Пошуки чудовиськ затягнулися, ви лише поблукали небезпечними стежками.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "wander") {
            const options = [
                "Ви пройшлися мальовничим краєм, милуючись яскравим сонцем.",
                "Ви почули спів лісових птахів і на хвилину забули про тривоги.",
                "На узбіччі ви побачили покинутий віз купецького каравану.",
                "Ви зустріли метелика дивовижної краси, що супроводжував вас деякий час."
            ];
            xpGained = 6;
            logText = `👣 ${options[Math.floor(Math.random() * options.length)]}`;
            logType = "info";
        }

        // Оновлення інвентарю при знахідці
        const updatedInventory = [...inventory];
        if (foundItem) {
            updatedInventory.push({
                id: foundItem.id,
                name: foundItem.name,
                category: foundItem.category,
                icon: foundItem.icon || "🌿",
                image: foundItem.image,
                rarity: foundItem.rarity,
                value: foundItem.value,
                description: foundItem.description
            });
        }

        // Розрахунок нового досвіду та рівнів
        let newXp = character.xp + xpGained;
        let newLevel = character.level;
        let newMaxXp = character.maxXp || 100;
        let levelUpOccurred = false;

        if (newXp >= newMaxXp) {
            newLevel += 1;
            newXp = newXp - newMaxXp;
            newMaxXp = Math.floor(newMaxXp * 1.5);
            newHp = 100;
            newSleep = 100;
            newWater = 100;
            newFood = 100;
            levelUpOccurred = true;
        }

        // Логування в нашу консоль дій
        addLog({
            type: logType,
            text: logText,
            time: timeString,
            xp: xpGained,
            stats: `💤 -4, 💧 -3, 🍎 -2${hpDamage > 0 ? `, 💔 -${hpDamage}` : ""}`,
            warnings: exhaustWarnings.length > 0 ? exhaustWarnings : null
        });

        if (levelUpOccurred) {
            addLog({
                type: "level_up",
                text: `🎉 РІВЕНЬ ПІДНЯТО! Ви отримали рівень ${newLevel}! Усі ваші життєві показники відновлено на 100%!`,
                time: timeString
            });
        }

        // Збереження оновленого персонажа
        const updatedCharacter = {
            ...character,
            hp: newHp,
            sleep: newSleep,
            water: newWater,
            food: newFood,
            xp: newXp,
            level: newLevel,
            maxXp: newMaxXp,
            inventory: updatedInventory
        };

        onUpdateCharacter(updatedCharacter);
    };

    return (
        <div className="action-window-overlay" onClick={onClose}>
            <div className="action-window wide" onClick={(e) => e.stopPropagation()}>
                <header className="action-header">
                    <div className="action-loc-info">
                        <span className="loc-icon">{subLocation.icon}</span>
                        <div>
                            <h3 className="loc-name">{subLocation.name}</h3>
                            <p className="loc-type">Зона дослідження</p>
                        </div>
                    </div>
                    <button className="close-action-btn" onClick={onClose}>×</button>
                </header>

                <div className="action-body-columns">
                    {/* Ліва колонка: Доступні дії */}
                    <div className="action-selector-col">
                        <div className="action-section">
                            <label>Специфічні дії локації</label>
                            <div className="action-list">
                                {currentUniqueActions.length > 0 ? (
                                    currentUniqueActions.map(action => (
                                        <button 
                                            key={action.id} 
                                            className="action-item-btn unique" 
                                            onClick={() => handleAction(action.id, action.name)}
                                        >
                                            <span className="btn-icon">{action.icon}</span>
                                            {action.name}
                                        </button>
                                    ))
                                ) : (
                                    <p className="no-actions-msg">Немає унікальних дій у цій зоні.</p>
                                )}
                            </div>
                        </div>

                        <div className="action-section">
                            <label>Загальні дослідження</label>
                            <div className="action-list">
                                {commonActions.map(action => (
                                    <button 
                                        key={action.id} 
                                        className="action-item-btn" 
                                        onClick={() => handleAction(action.id, action.name)}
                                    >
                                        <span className="btn-icon">{action.icon}</span>
                                        {action.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Права колонка: Консоль результатів */}
                    <div className="action-console-col">
                        <div className="console-header">
                            <span>📜 Консоль подій</span>
                            <span className="inventory-indicator">🎒 {character?.inventory?.length || 0}/12</span>
                        </div>
                        <div className="console-logs-container">
                            {logs.length === 0 ? (
                                <div className="console-placeholder">
                                    <span className="placeholder-icon">⛺</span>
                                    <p>Оберіть будь-яку дію ліворуч, щоб почати дослідження цієї місцевості...</p>
                                </div>
                            ) : (
                                <div className="logs-list">
                                    {logs.map((log) => (
                                        <div key={log.id} className={`log-row ${log.type}`}>
                                            <div className="log-meta">
                                                <span className="log-time">{log.time}</span>
                                                <span className="log-xp">+{log.xp} XP</span>
                                            </div>
                                            <p className="log-text">{log.text}</p>
                                            <div className="log-footer">
                                                <span className="log-stats-cost">{log.stats}</span>
                                                {log.warnings && (
                                                    <span className="log-warnings-tag">⚠️ {log.warnings.join(", ")}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={logsEndRef} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActionWindow;
