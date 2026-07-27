import { alchemicalHerbs } from "./items_AlchemicalHerbs.js";
import { foodBerries } from "./items_FoodBerries.js";
import { foodCooked } from "./items_FoodCooked.js";
import { weapons } from "./items_Weapons.js";
import { armor } from "./items_Armor.js";
import { potions } from "./items_Potions.js";
import { resources } from "./items_Resources.js";

export const items = {
    "Alchemical-Herbs": alchemicalHerbs,
    "Food_Berries": foodBerries,
    "Food_Cooked": foodCooked,
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
