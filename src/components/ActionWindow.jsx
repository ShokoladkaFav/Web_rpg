import { useState, useEffect, useRef } from "react";
import "../styles/ActionWindow.css";
import { items } from "../data/items.js";
import { advanceTime, formatGameTime, getTimePeriod, TimeDisplay } from "../utils/timeSystem.jsx";

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

    // Зони випадіння трав, ягід та фруктів
    const herbDropsByAction = {
        "forest_plants": ["young_tree_branch", "dope_flower", "twin_flower", "nettle", "flycatcher_grass", "forest_flower", "four_leaf_clover", "firefly_grass", "shvibald", "firuerta", "forest_persheval", "bright_lady", "mrakovyk", "golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint", "blue_drapula", "black_smartberry", "raspberry", "strawberry", "kalyna", "violet_flower_berry", "adventurer_berries", "young_nut", "apple", "blue_thornberry"],
        "forest_outskirts_herbs": ["young_tree_branch", "dope_flower", "twin_flower", "nettle", "flycatcher_grass", "forest_flower", "four_leaf_clover", "firefly_grass", "shvibald", "firuerta", "forest_persheval", "bright_lady", "mrakovyk", "golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint", "blue_drapula", "black_smartberry", "raspberry", "strawberry", "kalyna", "cherry", "ahariyd", "violet_flower_berry", "adventurer_berries", "young_nut", "apple", "olomon", "blue_thornberry"],
        "silver_forest_herbs": ["young_tree_branch", "dope_flower", "twin_flower", "nettle", "flycatcher_grass", "forest_flower", "four_leaf_clover", "firefly_grass", "shvibald", "firuerta", "forest_persheval", "bright_lady", "mrakovyk", "golden_flower", "hermit_herb", "gribiscus", "spicy_herb", "birds_herb", "mint", "blue_drapula", "black_smartberry", "raspberry", "strawberry", "kalyna", "violet_flower_berry", "adventurer_berries", "young_nut", "apple", "mundur"],
        "grand_forest_herbs": ["wooden_grass", "young_tree_branch", "dope_flower", "twin_flower", "nettle", "flycatcher_grass", "forest_flower", "four_leaf_clover", "firefly_grass", "shvibald", "firuerta", "forest_persheval", "bright_lady", "mrakovyk", "golden_flower", "hermit_herb", "gribiscus", "blue_drapula", "black_smartberry", "raspberry", "strawberry", "kalyna", "violet_flower_berry", "old_tree_nut", "apple", "ondiron"],
        "deep_old_forest_herbs": ["wooden_grass", "twin_flower", "lovers_pair", "branch_healthy_tree", "leaves_healthy_tree", "stinky_flower", "shvibald", "firuerta", "forest_persheval", "bright_lady", "mrakovyk", "four_leaf_clover", "golden_flower", "hermit_herb", "gribiscus", "black_smartberry", "cherry", "ahariyd", "violet_flower_berry", "old_tree_nut", "apple", "darmandan", "olomon"],
        "carrow_herbs": ["dye_flower", "tea_sprout", "nettle", "romanshka", "golden_flower", "mint", "birds_herb", "gribiscus", "blue_drapula", "orange_lagur", "adventurer_berries", "porkovyk", "hostrovyk", "big_nut", "aboldas", "lime"],
        "shimmerglen_fruit_plains": ["dye_flower", "tea_sprout", "nettle", "romanshka", "golden_flower", "mint", "birds_herb", "blue_drapula", "orange_lagur", "adventurer_berries", "porkovyk", "hostrovyk", "big_nut", "aboldas", "mango", "lime"],
        "shraudy_fruit_plains": ["dye_flower", "tea_sprout", "nettle", "romanshka", "golden_flower", "mint", "blue_drapula", "orange_lagur", "adventurer_berries", "porkovyk", "hostrovyk", "big_nut", "aboldas", "mango", "lime"],
        "mudfrost_fruit_plains": ["dye_flower", "tea_sprout", "nettle", "romanshka", "golden_flower", "blue_drapula", "orange_lagur", "adventurer_berries", "porkovyk", "hostrovyk", "big_nut", "aboldas", "mango", "lime"],
        "water_plants": ["marine_algae", "sea_laminaria", "sea_tentacles", "pink_crested_lily", "seaweed", "sea_herb", "mint", "brunika", "brusa_berry", "red_sea_berry", "mandar_fruit", "sarndra_fruit", "durdovyn", "sea_fruit"],
        "oasis_herbs": ["marine_algae", "sea_laminaria", "mint", "pink_crested_lily", "seaweed", "sea_herb", "vodovyk", "feyerla_nut", "fruit_nut"],
        "rock_plants": ["dye_flower", "blue_eyed_maiden", "blue_rose", "red_rose", "blue_azure", "gerdalf_grass", "golden_flower", "rozrovochky", "hermit_herb", "spicy_herb", "orange_lagur", "bird_berry", "brausa_berry", "adventurer_berries", "fichkovyk", "piorkovyk", "rare_beans", "peanut", "karpotal", "vandar", "blue_thornberry", "synyayvochka"],
        "desert_rocks_fruits": ["dye_flower", "blue_eyed_maiden", "blue_rose", "red_rose", "blue_azure", "gerdalf_grass", "rozrovochky", "spicy_herb", "hermit_herb", "orange_lagur", "bird_berry", "brausa_berry", "fichkovyk", "piorkovyk", "rare_beans", "peanut", "karpotal", "vandar", "blue_thornberry", "gilgin", "synyayvochka"],
        "desert_land_herbs": ["dope_flower", "vera_aloe", "brambook", "bloody_lady", "lyapotyazhma", "spicy_herb", "rozrovochky", "hermit_herb", "blue_raspberry", "paladin_berry", "chysnolvik", "romran_fruit", "desert_pear", "sokovyn"],
        "amber_desert_resources": ["dope_flower", "vera_aloe", "brambook", "bloody_lady", "lyapotyazhma", "spicy_herb", "rozrovochky", "hermit_herb", "blue_raspberry", "paladin_berry", "chysnolvik", "romran_fruit", "desert_pear", "sokovyn"],
        "wasteland_search": ["mary_drop", "spicy_herb", "hermit_herb", "brambook", "lyapotyazhma", "kravatus", "paladin_berry", "chysnolvik", "dragon_berry", "vodovyk", "fayerukh", "bayeri", "alakoya", "sokovyn", "desert_fruit_pod"],
        "desert_wasteland_search": ["mary_drop", "spicy_herb", "hermit_herb", "brambook", "lyapotyazhma", "kravatus", "paladin_berry", "chysnolvik", "dragon_berry", "vodovyk", "fayerukh", "bayeri", "alakoya", "sokovyn", "desert_fruit_pod"],
        "old_settlement_ruins": ["pretrushka", "spicy_herb", "hermit_herb", "star_fruit"],
        "desert_ruins": ["pretrushka", "spicy_herb", "hermit_herb", "alahay"],
        "old_settlements_ruins_search": ["pretrushka", "spicy_herb", "hermit_herb", "star_fruit"],
        "search_caves": ["blue_eyed_maiden", "underground_flower", "ardruinda", "hermit_herb"],
        "outskirts_dungeon": ["blue_lady", "underground_flower", "ardruinda"],
        "old_settlement_ruins_dungeon": ["blue_lady", "underground_flower", "ardruinda"],
        "desert_ruins_dungeon": ["blue_lady", "underground_flower", "ardruinda", "alahay"]
    };

    // Нічні та сяючі рослини й фрукти
    const nightHerbIds = [
        "firefly_grass",      // Трава-Світляшка
        "mrakovyk",           // Мраковик
        "bright_lady",        // Яскрава Леді
        "underground_flower", // Підземна квітка
        "ardruinda",          // Ардруінда
        "blue_azure",         // Синя Лазур
        "pink_crested_lily",  // Рожева плашина лілія
        "firefly_fruit",      // Фрукт-Світляшка
        "dayvin_fruit"        // Фрукт-Дайвін
    ];

    // Зважений вибір трави на основі рідкості та часу доби
    const getWeightedHerb = (allowedIds, periodId = "day") => {
        let poolIds = [...allowedIds];
        const isNight = periodId === "night";
        const isEvening = periodId === "evening";
        const isNightOrEvening = isNight || isEvening;

        // Увечері та вночі додаємо сяючі/нічні рослини в басейн знахідок
        if (isNightOrEvening) {
            nightHerbIds.forEach(id => {
                if (!poolIds.includes(id)) {
                    poolIds.push(id);
                }
            });
        }

        const allGatherables = [...(items["Alchemical-Herbs"] || []), ...(items["Food_Berries"] || []), ...(items["Food_Fruits"] || [])];
        let candidates = allGatherables.filter(h => poolIds.includes(h.id));
        if (candidates.length === 0) return null;

        const baseWeights = {
            "common": 50,
            "uncommon": 30,
            "rare": 15,
            "epic": 5
        };

        const candidatesWithWeights = candidates.map(c => {
            let weight = baseWeights[c.rarity] || 50;

            // Нічні рослини мають багаторазово підвищений шанс випадіння у вечірній та нічний час!
            if (nightHerbIds.includes(c.id)) {
                if (isNight) weight *= 5;
                else if (isEvening) weight *= 3;
            }

            return { item: c, weight };
        });

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

    // Зважений або випадковий вибір луту з монстрів
    const getRandomMonsterLoot = (poolIds = null) => {
        const lootList = items["Monsters_Loot"] || [];
        if (!lootList.length) return null;
        let candidates = lootList;
        if (poolIds && poolIds.length > 0) {
            candidates = lootList.filter(item => poolIds.includes(item.id));
            if (!candidates.length) candidates = lootList;
        }
        return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const handleAction = (actionId, actionName) => {
        if (!character || !onUpdateCharacter) return;

        // Час ігрової дії: робимо крок у 45 хвилин
        const timeAdvancedChar = advanceTime(character, 45);
        const currentPeriod = getTimePeriod(timeAdvancedChar.hour);
        const periodId = currentPeriod.id;
        const isNight = periodId === "night";
        const isEvening = periodId === "evening";
        const isNightOrEvening = isNight || isEvening;

        const gameTimeString = `${formatGameTime(timeAdvancedChar.hour, timeAdvancedChar.minute)} (${currentPeriod.name})`;
        const realTimeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timeString = `⏱️ ${gameTimeString}`;

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

        // Множник досвіду за підвищену ризикованість увечері та вночі
        const xpMultiplier = isNight ? 1.5 : isEvening ? 1.25 : 1.0;

        if (isGatheringAction) {
            // Шанс успіху: Ранок/День 85%, Вечір 65%, Ніч 45%
            const gatherSuccessChance = isNight ? 0.45 : isEvening ? 0.65 : 0.85;
            const success = Math.random() < gatherSuccessChance;

            if (success) {
                const allowedHerbs = herbDropsByAction[actionId] || [];
                foundItem = getWeightedHerb(allowedHerbs, periodId);
                if (foundItem) {
                    const baseXP = foundItem.rarity === "epic" ? 22 : foundItem.rarity === "rare" ? 16 : foundItem.rarity === "uncommon" ? 12 : 8;
                    xpGained = Math.round(baseXP * xpMultiplier);

                    logText = `🌱 Ви ретельно оглянули територію і знайшли: "${foundItem.name}"`;
                    logType = "loot";

                    if (nightHerbIds.includes(foundItem.id) && isNightOrEvening) {
                        logText += ` (✨ У ${isNight ? "нічній пітьмі" : "вечірніх сутінках"} ця рідкісна рослина яскраво фосфоресцює та сяє!)`;
                    }

                    // Особливі події та механіки при зборі
                    if (foundItem.id === "shvibald") {
                        newSleep = Math.max(0, newSleep - 10);
                        logText += " (Щоб дістати Швибальд з високого дерева, довелося витратити +10 додаткової Енергії)";
                    } else if (foundItem.id === "firuerta") {
                        const hasWeapon = (character.equipment?.weapon?.name || "").toLowerCase().includes("меч") ||
                            (character.equipment?.weapon?.name || "").toLowerCase().includes("сокира") ||
                            inventory.some(i => (i.name || "").toLowerCase().includes("меч") || (i.name || "").toLowerCase().includes("сокира"));
                        if (hasWeapon) {
                            logText += " (Завдяки наявності зброї ви безболісно прорубали шлях крізь колючки!)";
                        } else {
                            hpDamage += 10;
                            newHp = Math.max(0, newHp - 10);
                            logText += " (Пробираючись крізь колючі зарослі Фіруєрта, ви отримали подряпини: -10 HP)";
                        }
                    } else if (foundItem.id === "forest_persheval") {
                        hpDamage += 10;
                        newHp = Math.max(0, newHp - 10);
                        logText += " (На впавших деревах під час збору із кущів вискочила змія та вкусила вас! -10 HP)";
                    } else if (foundItem.id === "bright_lady") {
                        hpDamage += 15;
                        newHp = Math.max(0, newHp - 15);
                        logText += " (Під час збору Яскравої Леді виділилися токсичні речовини: -15 HP)";
                    } else if (foundItem.id === "bloody_lady") {
                        hpDamage += 10;
                        newHp = Math.max(0, newHp - 10);
                        logText += " (Біля колючих зарослів під час збору Кривавої Леді ви покололи руки: -10 HP)";
                    } else if (foundItem.id === "blue_azure") {
                        hpDamage += 20;
                        newHp = Math.max(0, newHp - 20);
                        newSleep = Math.max(0, newSleep - 20);
                        logText += " (Збір високо в горах супроводжувався сильним холодом та малим киснем: -20 HP, -20 Енергії)";
                    } else if (foundItem.id === "sea_laminaria") {
                        hpDamage += 20;
                        newHp = Math.max(0, newHp - 20);
                        logText += " (Рослина була глибоко під водою, під час збору ви виснажилися: -20 HP)";
                    } else if (foundItem.id === "branch_healthy_tree") {
                        newSleep = Math.max(0, newSleep - 10);
                        logText += " (Збір міцної гілки з прадавнього дерева вимагав додаткових зусиль: -10 Енергії)";
                    } else if (foundItem.id === "sea_tentacles") {
                        hpDamage += 10;
                        newHp = Math.max(0, newHp - 10);
                        newSleep = Math.max(0, newSleep - 10);
                        logText += " (Морські шупальця були глибоко у бухті: -10 HP, -10 Енергії)";
                    } else if (foundItem.id === "stinky_flower") {
                        hpDamage += 10;
                        newHp = Math.max(0, newHp - 10);
                        logText += " (Вонюча квітка у глибокому лісі виділила їдкий запах: -10 HP)";
                    }
                } else {
                    xpGained = Math.round(4 * xpMultiplier);
                    logText = "🍂 Ви знайшли лише зів'яле коріння неотруйних рослин.";
                }
            } else {
                xpGained = Math.round(4 * xpMultiplier);
                if (isNight) {
                    logText = "🌙 Нічна густа темрява заважає розгледіти стежки. Пошуки трав у сутінках виявилися марними.";
                } else if (isEvening) {
                    logText = "🌇 Вечірні сутінки ускладнили огляд заростей. Жодної корисної рослини не помічено.";
                } else {
                    logText = "🔍 Довгі пошуки серед заростей не дали жодних цінних результатів.";
                }
            }
        } 
        else if (actionId === "search_resources") {
            const searchChance = isNight ? 0.25 : isEvening ? 0.32 : 0.40;
            const success = Math.random() < searchChance;
            if (success) {
                const allHerbs = items["Alchemical-Herbs"].map(h => h.id);
                foundItem = getWeightedHerb(allHerbs, periodId);
                if (foundItem) {
                    const baseXP = foundItem.rarity === "epic" ? 18 : foundItem.rarity === "rare" ? 14 : foundItem.rarity === "uncommon" ? 10 : 6;
                    xpGained = Math.round(baseXP * xpMultiplier);
                    logText = `💎 Випадкова знахідка! Ви знайшли цінну рослину: "${foundItem.name}"`;
                    logType = "loot";
                    if (nightHerbIds.includes(foundItem.id) && isNightOrEvening) {
                        logText += " (✨ Сяє у темряві!)";
                    }
                }
            } else {
                xpGained = Math.round(5 * xpMultiplier);
                logText = isNight 
                    ? "🌙 Ніч завадила розгледіти корисні мінерали у темряві." 
                    : "⛏️ Ви оглянули скелясті тріщини та суху траву, але корисних ресурсів не виявлено.";
            }
        }
        else if (actionId === "carrow_monsters") {
            const chance = isNight ? 0.45 : isEvening ? 0.58 : 0.70;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 22 : 8) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["wolf_hide", "monster_meat", "monster_ribs", "meat_on_bone", "strong_monster_teeth"]);
                logText = isNight 
                    ? "⚔️ Нічне полювання на Рівнині Карроу! З пітьми виринув Лютневий Нічний Вовк з палаючими очима! Ви подолали його! (+50% Досвіду)" 
                    : isEvening
                    ? "⚔️ У сутінках на Рівнині Карроу ви вистежили та здолали степового вовка! (+25% Досвіду)"
                    : "⚔️ Битва на Рівнині Карроу! Ви успішно вистежили та здолали степового вовка.";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = isNightOrEvening 
                    ? "🌙 Нічні хижаки непомітно пересуваються у пітьмі і змусили вас відступити." 
                    : "⚔️ Ви обійшли всю Рівнину Карроу, але не зустріли жодних небезпечних істот.";
                logType = "info";
            }
        }
        else if (actionId === "dead_plain_undead") {
            const chance = isNight ? 0.50 : isEvening ? 0.62 : 0.75;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 26 : 10) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["monster_bones", "strong_monster_teeth", "monster_eye", "monster_heart"]);
                logText = isNight 
                    ? "💀 У нічній пітьмі на Рівнині мерців з курганів піднявся Палаючий Нічний Некромант! Ви розтрощили його! (+50% Досвіду)" 
                    : "💀 Ви зустріли блукаючого кістяка на Рівнині мерців та вщент розбили його!";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = isNightOrEvening
                    ? "🌙 Нічна імла огортає кургани, некроманти сховалися у тіні."
                    : "💀 Могильна тиша огортає Рівнину мерців, ворогів наразі не виявлено.";
                logType = "info";
            }
        }
        else if (actionId === "forest_outskirts_mysteries") {
            const chance = isNight ? 0.35 : isEvening ? 0.42 : 0.50;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 18 : 6) * xpMultiplier);
            logText = success 
                ? "🔍 Досліджуючи околиці лісу, ви знайшли стару покинуту схованку мандрівника." 
                : isNight ? "🌙 У суцільній нічній темряві складно розгледіти заховані сліди." : "🔍 Околиці лісу виявилися спокійними, нічого дивного не помічено.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "wild_lands_search") {
            const chance = isNight ? 0.40 : isEvening ? 0.50 : 0.60;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 20 : 8) * xpMultiplier);
            if (success && Math.random() < 0.50) {
                const allHerbs = items["Alchemical-Herbs"].map(h => h.id);
                foundItem = getWeightedHerb(allHerbs, periodId);
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
                    : isNight ? "🌙 Ніч у Диких землях холодна й темна, ви нічого не знайшли." : "🎒 Дикі землі нещадні й пусті, ви знайшли лише пісок та гілки.";
                logType = success ? "success" : "info";
            }
        }
        else if (actionId === "slums_fight") {
            const chance = isNight ? 0.40 : isEvening ? 0.52 : 0.65;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 24 : 12) * xpMultiplier);
            logText = success 
                ? (isNight ? "🥊 У завулках нічних нетрів ви розгромили банду Нічних Тіньових Грабіжників! (+50% Досвіду)" : "🥊 Перемога у важкому кулачному двобої із зухвалим мешканцем нетрів!")
                : "🥊 Противник виявився спритнішим у темряві та наніс вам кілька синців, перш ніж ви відступили.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "slums_search") {
            const chance = isNight ? 0.35 : isEvening ? 0.45 : 0.55;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 16 : 6) * xpMultiplier);
            if (success && Math.random() < 0.40) {
                const allHerbs = items["Alchemical-Herbs"].map(h => h.id);
                foundItem = getWeightedHerb(allHerbs, periodId);
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
            const chance = isNight ? 0.45 : isEvening ? 0.58 : 0.70;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 24 : 10) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["wolf_hide", "deep_forest_beast_fur", "forest_monster_horn", "monster_hide", "boar_steak", "forest_creature_remains"]);
                logText = isNight 
                    ? "⚔️ У нічному Срібному лісі зі сховку вискочив Лютий Нічний Тіньовий Вовк! Ви перемогли! (+50% Досвіду)" 
                    : "⚔️ У Срібному лісі ви успішно здолали рідкісного срібнокликого вовка!";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = "⚔️ Срібний ліс у сутінках здавався затишним і спокійним, жодних монстрів.";
                logType = "info";
            }
        }
        else if (actionId === "sea_bay_monsters") {
            const chance = isNight ? 0.45 : isEvening ? 0.58 : 0.70;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 24 : 10) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["sea_monster_meat", "octopus_tentacle", "sea_octopus_tentacle", "fish_fillet"]);
                logText = isNight 
                    ? "🐉 З темних глибин нічної морської бухти виринув Нічний Глибинний Жнець! Ви подолали монстра! (+50% Досвіду)" 
                    : "🐉 Ви зустріли та перемогли агресивного річкового ящера у морській бухті!";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = "🐉 Хвилі б'ються об каміння, жодних ознак морських монстрів.";
                logType = "info";
            }
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
            const chance = isNight ? 0.40 : isEvening ? 0.52 : 0.65;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 25 : 10) * xpMultiplier);
            logText = success 
                ? (isNight ? "⛺ У суцільній пітьмі ви тихо підкралися та розгромили табір Нічних Пустельних Розбійників! (+50% Досвіду)" : "⛺ Ви вистежили та успішно розігнали невеликий табір пустельних бандитів!")
                : "⛺ Сліди розбійників загубилися серед темних та холодних гарячих пісків.";
            logType = success ? "success" : "info";
        }
        else if (actionId === "desert_sea_forest_monsters") {
            const chance = isNight ? 0.45 : isEvening ? 0.58 : 0.70;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 24 : 10) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["snake_meat", "desert_monster_fur", "desert_creature_remains", "sand_bird_feather", "sharp_tail_big_monster"]);
                logText = isNight 
                    ? "👾 Ви зчепилися із Лютим Нічним Шипохвостом у сутінках сухого лісу та здолали його! (+50% Досвіду)" 
                    : "👾 Ви здолали отруйного шипохвоста у пустельно-морському лісі!";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = "👾 Сухий ліс здається абсолютно мертвим і нерухомим.";
                logType = "info";
            }
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
            const chance = isNight ? 0.45 : isEvening ? 0.58 : 0.70;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 28 : 12) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["juicy_monster_meat", "troll_meat", "big_beast_meat", "monster_heart", "forest_monster_horn", "giant_leg"]);
                logText = isNight 
                    ? "👹 У темних надрах нічного пралісу на вас напав Жахливий Нічний Лісовий Троль! У кривавій битві ви перемогли! (+50% Досвіду)" 
                    : "👹 Битва з лісовим тролем на околицях старого лісу завершилися вашою впевненою перемогою!";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = "👹 Ви чули страшні звуки у гущавині, але вирішили не ризикувати та обійти небезпеку.";
                logType = "info";
            }
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
            const chance = isNight ? 0.40 : isEvening ? 0.52 : 0.65;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 30 : 12) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["sea_monster_meat", "sea_octopus_tentacle", "monster_eye", "octopus_tentacle"]);
                logText = isNight 
                    ? "🐉 У бурхливих нічних хвилях ви розгромили Прадавнього Нічного Кракенa! (+50% Досвіду)" 
                    : "🐉 Битва з велетенським кракеном у морі старого лісу принесла вам велику славу!";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = "🐉 На морі піднявся потужний шторм, завадивши вашому полюванню.";
                logType = "info";
            }
        }
        else if (actionId === "lake_bay_search") {
            const chance = isNight ? 0.35 : isEvening ? 0.42 : 0.50;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 18 : 6) * xpMultiplier);
            if (success && Math.random() < 0.40) {
                const allowed = ["seaweed", "sea_herb", "pink_crested_lily"];
                foundItem = getWeightedHerb(allowed, periodId);
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
            const chance = isNight ? 0.35 : isEvening ? 0.50 : 0.65;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 18 : 6) * xpMultiplier);
            logText = success 
                ? (isNight ? "🏹 Нічне полювання! Ви вистежили рідкісного Нічного Срібного Зайця за його сяючим хутром! (+50% Досвіду)" : "🏹 Полювання пройшло успішно! Ви вистежили та вполювали швидкого лісового зайця.")
                : isNight ? "🌙 Звір заховався у темноті нічного лісу." : "🏹 Звір почув ваші кроки за милю та миттєво зник у нетрях лісу.";
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
            const chance = isNight ? 0.40 : isEvening ? 0.50 : 0.60;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 24 : 12) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot(["crow_feather", "small_monster_wing", "flying_monster_paw", "rare_bird_feather", "sand_bird_feather"]);
                logText = isNight 
                    ? "🦅 З нічних хмар кинувся Нічний Гранітний Нетопир! Ви здолали летаючий жах! (+50% Досвіду)" 
                    : "🦅 З неба каменем кинувся гірський яструб! Ви вправно захистилися і здобули цінний бойовий досвід.";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = "🦅 Тінь пролетіла високо над скелями, залишаючи вас у напруженому очікуванні.";
                logType = "info";
            }
        }
        else if (actionId === "hunt_monsters") {
            const chance = isNight ? 0.45 : isEvening ? 0.60 : 0.75;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 20 : 10) * xpMultiplier);
            if (success) {
                foundItem = getRandomMonsterLoot();
                logText = isNight 
                    ? "⚔️ З пітьми вискочив Тіньовий Нічний Потвор! У жорстокій нічній сутичці ви здобули видатну перемогу! (+50% Досвіду)" 
                    : "⚔️ Ви зіткнулися з блукаючим монстром і здолали його у запеклій сутичці!";
                if (foundItem) {
                    logText += ` (🎁 Здобуто трофей: "${foundItem.name}")`;
                    logType = "loot";
                } else {
                    logType = "success";
                }
            } else {
                logText = "⚔️ Пошуки чудовиськ затягнулися, ви лише поблукали небезпечними стежками.";
                logType = "info";
            }
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
            const chance = isNight ? 0.35 : isEvening ? 0.50 : 0.65;
            const success = Math.random() < chance;
            xpGained = Math.round((success ? 20 : 8) * xpMultiplier);
            logText = success 
                ? (isNight ? "🦌 У нічних сутінках лісу Фолфорда ви вполювали рідкісного Нічного Срібнорогого Оленя! (+50% Досвіду)" : "🦌 Ви заглибилися в лісові хащі й успішно вполювали прекрасного дикого оленя!")
                : "🦌 Мисливські стежки виявилися порожніми у темряві.";
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
            day: timeAdvancedChar.day,
            hour: timeAdvancedChar.hour,
            minute: timeAdvancedChar.minute,
            hp: newHp,
            sleep: levelUpOccurred ? 100 : Math.min(newSleep, timeAdvancedChar.sleep),
            water: levelUpOccurred ? 100 : Math.min(newWater, timeAdvancedChar.water),
            food: levelUpOccurred ? 100 : Math.min(newFood, timeAdvancedChar.food),
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
                    {character && (
                        <div style={{ marginLeft: "auto", marginRight: "16px" }}>
                            <TimeDisplay character={character} size="small" />
                        </div>
                    )}
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
