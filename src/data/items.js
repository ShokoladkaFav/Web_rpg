import { alchemicalHerbs } from "./items_AlchemicalHerbs.js";
import { weapons } from "./items_Weapons.js";
import { armor } from "./items_Armor.js";
import { potions } from "./items_Potions.js";
import { resources } from "./items_Resources.js";

export const items = {
    "Alchemical-Herbs": alchemicalHerbs,
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
