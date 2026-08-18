import { alchemicalHerbs } from "./items_AlchemicalHerbs.js";
import { foodBerries } from "./items_FoodBerries.js";
import { foodFruits } from "./items_FoodFruits.js";
import { foodCooked } from "./items_FoodCooked.js";
import { foodVegetables } from "./items_FoodVegetables.js";
import { weapons } from "./items_Weapons.js";
import { armor } from "./items_Armor.js";
import { potions } from "./items_Potions.js";
import { resources } from "./items_Resources.js";
import { monstersLoot } from "./items_MonstersLoot.js";
import { lootQuestItems } from "./items_LootQuestItems.js";
import { lootGoblin } from "./items_LootGoblin.js";

export const items = {
    "Alchemical-Herbs": alchemicalHerbs,
    "Food_Berries": foodBerries,
    "Food_Fruits": foodFruits,
    "Food_Cooked": foodCooked,
    "Food_Vegetables": foodVegetables,
    "Monsters_Loot": monstersLoot,
    "Loot_QuestItems": lootQuestItems,
    "Loot_Goblin": lootGoblin,
    "Weapons": weapons,
    "Armor": armor,
    "Potions": potions,
    "Resources": resources
};

// Плоский список для швидкого пошуку предметів за ID
export const itemsById = Object.values(items).flat().reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});

export default items;
