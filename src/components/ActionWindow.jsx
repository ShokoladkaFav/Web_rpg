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
        ],
        // Слітденн (village1)
        "carrow_plain": [
            { id: "carrow_herbs", name: "Пошук корисних рослин рівнин", icon: "🌱" },
            { id: "carrow_monsters", name: "Пошук монстрів на рівнині", icon: "⚔️" }
        ],
        "dead_plain": [
            { id: "dead_plain_undead", name: "Битва із нежиттю", icon: "💀" }
        ],
        "forest_outskirts": [
            { id: "forest_outskirts_herbs", name: "Пошук лісних корисних рослин", icon: "🌱" },
            { id: "forest_outskirts_mysteries", name: "Пошук лісних цікавинок", icon: "🔍" }
        ],
        // Столиця 'Емберхолд' (capital)
        "wild_lands": [
            { id: "wild_lands_search", name: "Пошук корисних речей диких земель", icon: "🎒" }
        ],
        "slums": [
            { id: "slums_fight", name: "Поєдинок із людиною із нетрів", icon: "🥊" },
            { id: "slums_search", name: "Пошук в нетрях", icon: "🔍" }
        ],
        // Мітгейт (town_1)
        "silver_forest": [
            { id: "silver_forest_herbs", name: "Пошук корисних рослин \"Срібного лісу\"", icon: "🌱" },
            { id: "silver_forest_monsters", name: "Пошук лісних монстрів", icon: "⚔️" }
        ],
        "sea_bay": [
            { id: "sea_bay_monsters", name: "Пошук морських монстрів", icon: "🐉" }
        ],
        "outskirts": [
            { id: "outskirts_dungeon", name: "Зайти в підземелля", icon: "🕳️" }
        ],
        "old_settlement_ruins": [
            { id: "old_settlement_ruins_dungeon", name: "Зайти в підземелля", icon: "🕳️" }
        ],
        // Бран (desert_village1)
        "desert_land": [
            { id: "desert_land_herbs", name: "Пошук пустельних корисних рослин", icon: "🌱" }
        ],
        "wasteland": [
            { id: "wasteland_search", name: "Пошук в пустці", icon: "🔍" },
            { id: "wasteland_gems", name: "Пошук корисних речей пустки", icon: "💎" }
        ],
        "desert_ruins": [
            { id: "desert_ruins_dungeon", name: "Зайти в підземелля", icon: "🕳️" }
        ],
        // Доункрест (desert_village2)
        "old_settlements_ruins": [
            { id: "old_settlements_ruins_search", name: "Дослідити руїни", icon: "🔍" }
        ],
        "oasis": [
            { id: "oasis_herbs", name: "Пошук корисних рослин оазиса", icon: "🌱" }
        ],
        "old_volcano": [
            { id: "old_volcano_search", name: "Пошук корисних речей біля вулкана", icon: "🎒" }
        ],
        // Шіммерспайр (desert_village5)
        "desert_rocks": [
            { id: "desert_rocks_fruits", name: "Пошук пустельних плодів", icon: "🌵" }
        ],
        "desert_gorge": [
            { id: "desert_gorge_search", name: "Пошук корисних речей в пустельній ущелині", icon: "🎒" }
        ],
        // Елдерхенд (desert_village4)
        "desert_wasteland": [
            { id: "desert_wasteland_search", name: "Пошук корисних речей пустки", icon: "🎒" }
        ],
        // Руїни старої фортеці (desert_destroy)
        "small_sea_bay": [
            { id: "small_sea_bay_search", name: "Пошук корисних речей малої морської бухти", icon: "🎒" }
        ],
        "desert_lands": [
            { id: "desert_lands_search", name: "Пошук чогось в пустелі", icon: "🔍" },
            { id: "desert_lands_bandits", name: "Пошук пустельних бандитів", icon: "⛺" }
        ],
        // Фарвінд (desert_town)
        "desert_sea_forest": [
            { id: "desert_sea_forest_monsters", name: "Пошук пустельних монстрів", icon: "👾" }
        ],
        "grand_bay": [
            { id: "grand_bay_search", name: "Пошук корисних морських речей", icon: "⚓" }
        ],
        "forest_plateau": [
            { id: "forest_plateau_search", name: "Пошук лісних речей", icon: "🎒" }
        ],
        // Мідспайр (town_2)
        "deep_old_forest": [
            { id: "deep_old_forest_herbs", name: "Пошук корисних рослин старого лісу", icon: "🌱" }
        ],
        "old_forest_outskirts": [
            { id: "old_forest_outskirts_monsters", name: "Пошук сильних лісних монстрів", icon: "👹" }
        ],
        "ancient_lands_journey": [
            { id: "ancient_lands_expedition", name: "ЕКСПЕДИЦІЯ (ДОДАМО ПІЗНІШЕ)", icon: "🗺️" }
        ],
        "forest_city_dungeon": [
            { id: "forest_city_dungeon_enter", name: "Зайти в підземелля (ПІДЗЕМЕЛЛЯ ДОДАМО ПІЗНІШЕ)", icon: "🕳️" }
        ],
        // Велике Дерево (elf_capital)
        "sea_territory_old_forest": [
            { id: "sea_territory_old_forest_monsters", name: "Пошук сильних морських монстрів", icon: "🐉" }
        ],
        // Бріджмаут (port_town_1)
        "lake_bay": [
            { id: "lake_bay_search", name: "Пошук морських корисних речей", icon: "🌊" }
        ],
        "sea_ruins": [
            { id: "sea_ruins_enter", name: "Зайти в підземелля (ДОДАМО ПІЗНІШЕ)", icon: "🕳️" }
        ],
        "fishing_spot": [
            { id: "catch_fish", name: "Зловити рибу", icon: "🐟" }
        ],
        "folford_hunting": [
            { id: "folford_hunt_animals", name: "Пошук диких тварин", icon: "🦌" }
        ],
        "zalda_plain": [
            { id: "zalda_search_ancient", name: "Пошук чогось стародавнього", icon: "🏺" }
        ],
        "dwarven_mines": [
            { id: "dwarf_mines_enter", name: "Зайти в шахту (БУДЕ ДОДАНО ПІЗНІШЕ)", icon: "🚪" }
        ],
        "shimmerglen_fruit_plains": [
            { id: "shimmerglen_search_food", name: "Пошук чогось їстівного", icon: "🍇" }
        ],
        "shimmerglen_old_fortress": [
            { id: "shimmerglen_old_fortress_enter", name: "Зайти в підземелля (БУДЕ ДОДАНО ПІЗНІШЕ)", icon: "🕳️" }
        ],
        "ogryzok": [
            { id: "ogryzok_search_craft", name: "Пошук ресурсів для крафту", icon: "🛠️" }
        ],
        "vlassa_lake": [
            { id: "vlassa_search_marine", name: "Пошук морських ресурсів", icon: "🐚" },
            { id: "vlassa_fishing", name: "Порибачити", icon: "🎣" }
        ],
        "shraudy_fruit_plains": [
            { id: "shraudy_search_food", name: "Пошук чогось їстівного", icon: "🍓" }
        ],
        "grand_forest": [
            { id: "grand_forest_herbs", name: "Пошук корисних лісних ресурсів", icon: "🌱" },
            { id: "grand_forest_craft", name: "Пошук лісних ресурсів для крафту", icon: "🪵" }
        ],
        "raven_grand_bay": [
            { id: "raven_sea_enemies", name: "Пошук морських ворогів", icon: "🦈" },
            { id: "raven_fishing", name: "Рибалка", icon: "🎣" },
            { id: "raven_sea_resources", name: "Пошук морських ресурсів", icon: "🐚" }
        ],
        "raven_hunting_grounds": [
            { id: "raven_hunt_beasts", name: "Пошук диких тварин", icon: "🦌" }
        ],
        "amber_grand_bay": [
            { id: "amber_sea_enemies", name: "Пошук морських ворогів", icon: "🦈" },
            { id: "amber_fishing", name: "Рибалка", icon: "🎣" },
            { id: "amber_sea_resources", name: "Пошук морських ресурсів", icon: "🐚" }
        ],
        "amber_old_lands": [
            { id: "amber_craft_resources", name: "Пошук ресурсів для крафту", icon: "⛏️" },
            { id: "amber_desert_resources", name: "Пошук пустельних корисних ресурсів", icon: "🌵" }
        ],
        "mudfrost_fruit_plains": [
            { id: "mudfrost_search_food", name: "Пошук чогось їстівного", icon: "🍓" }
        ],
        "mudfrost_swamp": [
            { id: "mudfrost_swamp_exp_start", name: "почати експедицію в болотну землю (БУДЕ ДОДАНО ПІЗНІШЕ)", icon: "🧭" }
        ]
    };

    const currentUniqueActions = uniqueActions[subLocation.id] || [];

    // Зони випадіння трав
    const herbDropsByAction = {
        "forest_plants": ["golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint"],
        "water_plants": ["pink_crested_lily", "seaweed", "sea_herb", "mint"],
        "rock_plants": ["golden_flower", "rozrovochky", "hermit_herb", "spicy_herb"],
        "carrow_herbs": ["golden_flower", "mint", "birds_herb", "gribiscus"],
        "forest_outskirts_herbs": ["golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint"],
        "silver_forest_herbs": ["golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint"],
        "desert_land_herbs": ["spicy_herb", "rozrovochky", "hermit_herb"],
        "oasis_herbs": ["mint", "pink_crested_lily", "seaweed"],
        "desert_rocks_fruits": ["rozrovochky", "spicy_herb", "hermit_herb"],
        "deep_old_forest_herbs": ["golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint"],
        "grand_forest_herbs": ["golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint"],
        "amber_desert_resources": ["spicy_herb", "rozrovochky", "hermit_herb"]
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
        const isGatheringAction = Object.keys(herbDropsByAction).includes(actionId);
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
        else if (actionId === "carrow_monsters") {
            const success = Math.random() < 0.70;
            xpGained = success ? 22 : 8;
            logText = success 
                ? "⚔️ Битва на Рівнині Карроу! Ви успішно вистежили та здолали степового вовка." 
                : "⚔️ Ви обійшли всю Рівнину Карроу, але не зустріли жодних небезпечних істот.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "dead_plain_undead") {
            const success = Math.random() < 0.75;
            xpGained = success ? 26 : 10;
            logText = success 
                ? "💀 Ви зустріли блукаючого кістяка на Рівнині мерців та вщент розбили його!" 
                : "💀 Могильна тиша огортає Рівнину мерців, ворогів наразі не виявлено.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "forest_outskirts_mysteries") {
            const success = Math.random() < 0.50;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🔍 Досліджуючи околиці лісу, ви знайшли стару покинуту схованку мандрівника." 
                : "🔍 Околиці лісу виявилися спокійними, нічого дивного не помічено.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "wild_lands_search") {
            const success = Math.random() < 0.60;
            xpGained = success ? 20 : 8;
            if (success && Math.random() < 0.50) {
                const allHerbs = items["Alchemical-Herbs"].map(h => h.id);
                foundItem = getWeightedHerb(allHerbs);
                if (foundItem) {
                    logText = `🎒 Ви знайшли цінні речі колишніх експедицій у Диких землях, серед яких була: "${foundItem.name}"!`;
                    logType = "loot";
                } else {
                    logText = "🎒 Ви знайшли цінні залишки колишніх експедицій у Диких землях.";
                    logType = "success";
                }
            } else {
                logText = success 
                    ? "🎒 Ви знайшли цінні залишки колишніх експедицій у Диких землях." 
                    : "🎒 Дикі землі нещадні й пусті, ви знайшли лише пісок та гілки.";
                logType = success ? "success" : "info";
            }
        }
        else if (actionId === "slums_fight") {
            const success = Math.random() < 0.65;
            xpGained = success ? 24 : 12;
            logText = success 
                ? "🥊 Перемога у важкому кулачному двобої із зухвалим мешканцем нетрів!" 
                : "🥊 Противник виявився спритнішим та наніс вам кілька синців, перш ніж ви відступили.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "slums_search") {
            const success = Math.random() < 0.55;
            xpGained = success ? 16 : 6;
            if (success && Math.random() < 0.40) {
                const allHerbs = items["Alchemical-Herbs"].map(h => h.id);
                foundItem = getWeightedHerb(allHerbs);
                if (foundItem) {
                    logText = `🔍 Порпаючись у темних закутках нетрів, ви знайшли дещо цінне: "${foundItem.name}"!`;
                    logType = "loot";
                } else {
                    logText = "🔍 Порпаючись у темних закутках нетрів, ви знайшли старий гаманець із мідними монетами.";
                    logType = "success";
                }
            } else {
                logText = success 
                    ? "🔍 Порпаючись у темних закутках нетрів, ви знайшли старий гаманець із мідними монетами." 
                    : "🔍 Брудні вулиці нетрів виявилися порожніми.";
                logType = success ? "success" : "info";
            }
        }
        else if (actionId === "silver_forest_monsters") {
            const success = Math.random() < 0.70;
            xpGained = success ? 24 : 10;
            logText = success 
                ? "⚔️ У Срібному лісі ви успішно здолали рідкісного срібнокликого вовка!" 
                : "⚔️ Срібний ліс здавався затишним і спокійним, жодних монстрів.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "sea_bay_monsters") {
            const success = Math.random() < 0.70;
            xpGained = success ? 24 : 10;
            logText = success 
                ? "🐉 Ви зустріли та перемогли агресивного річкового ящера у морській бухті!" 
                : "🐉 Хвилі б'ються об каміння, жодних ознак морських монстрів.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "outskirts_dungeon" || actionId === "old_settlement_ruins_dungeon" || actionId === "desert_ruins_dungeon") {
            const success = Math.random() < 0.60;
            xpGained = success ? 25 : 10;
            logText = success 
                ? "🕳️ Ви спустилися у темне вологе підземелля та вивчили його верхній ярус!" 
                : "🕳️ Спуск виявився заблокований завалом, вам не вдалося пробратися глибше.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "wasteland_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 18 : 6;
            if (success && Math.random() < 0.50) {
                const allowed = ["spicy_herb", "hermit_herb"];
                foundItem = getWeightedHerb(allowed);
                if (foundItem) {
                    logText = `🔍 Дослідивши пустку, ви натрапили на живучу рослину: "${foundItem.name}"!`;
                    logType = "loot";
                } else {
                    logText = "🔍 Спека та пил — це все, що вдалося знайти у цій безкрайній пустці.";
                    logType = "info";
                }
            } else {
                logText = success 
                    ? "🔍 Дослідивши пустку, ви знайшли стару флягу з водою мандрівника." 
                    : "🔍 Спека та пил — це все, що вдалося знайти у цій безкрайній пустці.";
                logType = success ? "success" : "info";
            }
        }
        else if (actionId === "wasteland_gems") {
            const success = Math.random() < 0.40;
            xpGained = success ? 22 : 8;
            logText = success 
                ? "💎 Серед гарячих скель пустки ви відшукали блискучий кристалічний уламок!" 
                : "💎 Лише розпечене каміння виблискує під пекучим сонцем.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "old_settlements_ruins_search") {
            const success = Math.random() < 0.60;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "🔍 Ви детально дослідили напівзруйновані древні споруди та дізналися більше про минуле." 
                : "🔍 Стіни руїн надто нестабільні для проведення безпечних досліджень.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "old_volcano_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "🎒 Біля підніжжя старого вулкана ви виявили рідкісні обсидіанові відкладення." 
                : "🎒 Тільки гаряча сірка та хмари попелу здіймаються в повітря біля вулкана.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "desert_gorge_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "🎒 Ви обережно спустилися в пустельну ущелину та знайшли прохолодне джерело води." 
                : "🎒 Ущелина занадто крута і слизька для детального обстеження.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "desert_wasteland_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🎒 Ви перетнули небезпечну ділянку пустельної пустки та підібрали стару амфору." 
                : "🎒 ...Пустеля безжальна — гарячий вітер швидко виснажує ваші сили.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "small_sea_bay_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🎒 На березі малої бухти ви знайшли викинуту штормом скриньку з матеріалами." 
                : "🎒 Тільки солона морська піна та порожні мушлі лежать на березі.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "desert_lands_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 16 : 6;
            logText = success 
                ? "🔍 Ви помітили дивні знаки на піску пустелі, що вказують на давнє сховище." 
                : "🔍 Вітер за мить замітає будь-які помічені сліди серед дюн.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "desert_lands_bandits") {
            const success = Math.random() < 0.65;
            xpGained = success ? 25 : 10;
            logText = success 
                ? "⛺ Ви вистежили та успішно розігнали невеликий табір пустельних бандитів!" 
                : "⛺ Сліди розбійників загубилися серед безмежних гарячих пісків.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "desert_sea_forest_monsters") {
            const success = Math.random() < 0.70;
            xpGained = success ? 24 : 10;
            logText = success 
                ? "👾 Ви здолали отруйного шипохвоста у пустельно-морському лісі!" 
                : "👾 Сухий ліс здається абсолютно мертвим і нерухомим.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "grand_bay_search") {
            const success = Math.random() < 0.55;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "⚓ Серед уламків старого корабля у Великій бухті ви знайшли корисний якірний ланцюг." 
                : "⚓ Морська вода надто глибока та каламутна для успішного пошуку.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "forest_plateau_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🎒 На високогірному лісному плато ви знайшли гніздо рідкісного грифа та цінні пір'їни." 
                : "🎒 Плато затягнуло густим туманом, що унеможливило будь-які пошуки.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "old_forest_outskirts_monsters") {
            const success = Math.random() < 0.70;
            xpGained = success ? 28 : 12;
            logText = success 
                ? "👹 Битва з лісовим тролем на околицях старого лісу завершилися вашою впевненою перемогою!" 
                : "👹 Ви чули страшні звуки у гущавині, але вирішили не ризикувати та обійти небезпеку.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "ancient_lands_expedition") {
            xpGained = 15;
            logText = "🗺️ ЕКСПЕДИЦІЯ (ДОДАМО ПІЗНІШЕ) - Ви провели ретельну розвідку кордонів стародавніх земель.";
            logType = "info";
        }
        else if (actionId === "forest_city_dungeon_enter") {
            xpGained = 15;
            logText = "🕳️ Зайти в підземелля (ПІДЗЕМЕЛЛЯ ДОДАМО ПІЗНІШЕ) - Сходи надійно запечатані магією.";
            logType = "info";
        }
        else if (actionId === "sea_territory_old_forest_monsters") {
            const success = Math.random() < 0.65;
            xpGained = success ? 30 : 12;
            logText = success 
                ? "🐉 Битва з велетенським кракеном у морі старого лісу принесла вам велику славу!" 
                : "🐉 На морі піднявся потужний шторм, завадивши вашому полюванню.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "lake_bay_search") {
            const success = Math.random() < 0.50;
            xpGained = success ? 18 : 6;
            if (success && Math.random() < 0.40) {
                const allowed = ["seaweed", "sea_herb", "pink_crested_lily"];
                foundItem = getWeightedHerb(allowed);
                if (foundItem) {
                    logText = `🌊 Ви виловили кілька блискучих перлин та чудовий водяний зразок: "${foundItem.name}"!`;
                    logType = "loot";
                } else {
                    logText = "🌊 Ви виловили кілька блискучих перлин та інші корисні речі в озері-бухті.";
                    logType = "success";
                }
            } else {
                logText = success 
                    ? "🌊 Ви виловили кілька блискучих перлин та інші корисні речі в озері-бухті." 
                    : "🌊 Хвилі бухти викинули на берег лише купу мокрих водоростей.";
                logType = success ? "success" : "info";
            }
        }
        else if (actionId === "sea_ruins_enter") {
            xpGained = 15;
            logText = "🕳️ Зайти в підземелля (ДОДАМО ПІЗНІШЕ) - Ви дослідили напівзатоплені арки древнього храму.";
            logType = "info";
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
        else if (actionId === "catch_fish") {
            const success = Math.random() < 0.70;
            xpGained = success ? 14 : 5;
            logText = success 
                ? "🎣 Поплавок замиготів і пішов під воду! Ви успішно зловили свіжу рибу." 
                : "🎣 Рибалка не вдалася — риба зірвалася з гачка у найостанніший момент.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "folford_hunt_animals") {
            const success = Math.random() < 0.65;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "🦌 Ви заглибилися в лісові хащі й успішно вполювали прекрасного дикого оленя!" 
                : "🦌 Мисливські стежки виявилися порожніми, жодної дикої тварини не зустрінуто.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "zalda_search_ancient") {
            const success = Math.random() < 0.55;
            xpGained = success ? 22 : 8;
            logText = success 
                ? "🏺 Розкопуючи стародавні кургани на рівнині Залда, ви виявили уламок стародавньої амфори!" 
                : "🏺 Ви витратили кілька годин на пошуки стародавніх речей, але знайшли лише звичайні уламки скель.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "dwarf_mines_enter") {
            xpGained = 15;
            logText = "⛏️ Зайти в шахту (БУДЕ ДОДАНО ПІЗНІШЕ) - Двері до глибоких шахт зачинені масивною брамою.";
            logType = "info";
        }
        else if (actionId === "shimmerglen_search_food") {
            const success = Math.random() < 0.70;
            xpGained = success ? 15 : 5;
            logText = success 
                ? "🍇 Ви ретельно оглянули кущі та дикі дерева, знайшовши жменю стиглих солодких ягід!" 
                : "🍇 Дикі плодові дерева виявилися порожніми в цю пору року.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "shimmerglen_old_fortress_enter") {
            xpGained = 15;
            logText = "🕳️ Зайти в підземелля (БУДЕ ДОДАНО ПІЗНІШЕ) - Вхід у занедбане підземелля старої фортеці завалений камінням.";
            logType = "info";
        }
        else if (actionId === "ogryzok_search_craft") {
            const success = Math.random() < 0.60;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🛠️ Серед куп брухту та деревини ви знайшли чудові шкіряні обрізки та міцні залізні гвинти!" 
                : "🛠️ Ви оглянули околиці Огризка, але не знайшли нічого придатного для створення предметів.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "vlassa_search_marine") {
            const success = Math.random() < 0.60;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🐚 На берегах озера Власса ви знайшли блискучі мушлі та цілющі водорості." 
                : "🐚 Озеро спокійне, жодних цінних ресурсів на березі не знайдено.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "vlassa_fishing") {
            const success = Math.random() < 0.70;
            xpGained = success ? 14 : 5;
            logText = success 
                ? "🎣 Ви вдало закинули вудку в озеро Власса і витягли жирного коропа!" 
                : "🎣 На озері Власса сьогодні немає кльову, риба ігнорує гачок.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "shraudy_search_food") {
            const success = Math.random() < 0.70;
            xpGained = success ? 15 : 5;
            logText = success 
                ? "🍓 Ви знайшли чудову лісову суницю та соковиту дику вишню на плодових рівнинах!" 
                : "🍓 На жаль, більшість ягід уже зібрано іншими мандрівниками.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "grand_forest_craft") {
            const success = Math.random() < 0.60;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🪵 Ви зібрали міцні гілки залізного дерева та шматки смоли для майбутнього крафту." 
                : "🪵 Спроба знайти якісну деревину в гущавині виявилися невдалою.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "raven_sea_enemies") {
            const success = Math.random() < 0.65;
            xpGained = success ? 26 : 12;
            logText = success 
                ? "🦈 Ви помітили небезпечну акулу-людожера біля скель бухти та успішно вполювали її!" 
                : "🦈 Води Великої бухти спокійні, морських хижаків наразі не виявлено.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "raven_fishing") {
            const success = Math.random() < 0.70;
            xpGained = success ? 15 : 5;
            logText = success 
                ? "🎣 З глибин Великої бухти Рейвенхоллоу ви витягли гігантського тунця!" 
                : "🎣 На жаль, риба сьогодні занадто обережна і зривається з гачка.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "raven_sea_resources") {
            const success = Math.random() < 0.60;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🐚 На скелястому узбережжі бухти ви назбирали рідкісні сині устриці та цінні мушлі." 
                : "🐚 Сильні припливи затопили берегову смугу, ускладнивши пошук ресурсів.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "raven_hunt_beasts") {
            const success = Math.random() < 0.65;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "🦌 Ви вистежили та успішно вполювали спритну дику козу в густих заростях!" 
                : "🦌 Жодних слідів великих тварин на мисливських угіддях Рейвенхоллоу.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "amber_sea_enemies") {
            const success = Math.random() < 0.65;
            xpGained = success ? 26 : 12;
            logText = success 
                ? "🦈 Ви билися з лютими піратами на підступах до бухти Амбервіка і здобули перемогу!" 
                : "🦈 Горизонт чистий, морські розбійники сьогодні не показувалися.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "amber_fishing") {
            const success = Math.random() < 0.70;
            xpGained = success ? 15 : 5;
            logText = success 
                ? "🎣 Ви закинули вудку з пірсу Амбервіка і виловили чудову королівську макрель!" 
                : "🎣 Вода надто холодна, кльову немає.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "amber_sea_resources") {
            const success = Math.random() < 0.60;
            xpGained = success ? 18 : 6;
            logText = success 
                ? "🐚 На березі бухти ви знайшли викинуті штормом цінні шматки бурштину!" 
                : "🐚 Хвилі принесли лише купу марного піску та каміння.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "amber_craft_resources") {
            const success = Math.random() < 0.60;
            xpGained = success ? 20 : 8;
            logText = success 
                ? "⛏️ У Старих землях ви відшукали пласти пластичного сланцю та мідну руду." 
                : "⛏️ Старі землі спустошені, пошук корисних копалин не приніс результату.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "mudfrost_search_food") {
            const success = Math.random() < 0.70;
            xpGained = success ? 15 : 5;
            logText = success 
                ? "🍓 Незважаючи на холодний клімат Мадфроста, ви знайшли кущі з соковитою морошкою!" 
                : "🍓 Рівнини вкриті памороззю, жодних ягід не знайдено.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "mudfrost_swamp_exp_start") {
            xpGained = 15;
            logText = "🧭 почати експедицію в болотну землю (БУДЕ ДОДАНО ПІЗНІШЕ) - Болота затягнуті непроглядним отруйним туманом.";
            logType = "info";
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
