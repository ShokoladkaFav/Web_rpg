export const items = {
    "Alchemical-Herbs": [
        {
            id: "golden_flower",
            name: "Золота квітка",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/golden_flower.png",
            rarity: "rare",
            value: 25,
            description: "Рідкісна квітка з яскраво-жовтими пелюстками, які випромінюють ледь помітне тепле свічення. Використовується в елітній алхімії."
        },
        {
            id: "hermit_herb",
            name: "Трава відлюдника",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/hermit_herb.png",
            rarity: "uncommon",
            value: 12,
            description: "Непримітна гірка трава, що росте в найвіддаленіших куточках лісу. Цінується цілителями за сильні протиотруйні властивості."
        },
        {
            id: "gribiscus",
            name: "Грібіскус",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/gribiscus.png",
            rarity: "uncommon",
            value: 15,
            description: "Дивний симбіоз гриба та яскравої лісової квітки. Має солодкуватий запах та сильні заспокійливі властивості."
        },
        {
            id: "spicy_herb",
            name: "Гостра трава",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/spicy_herb.png",
            rarity: "common",
            value: 5,
            description: "Пекучі листочки цієї рослини миттєво зігрівають тіло та прискорюють кровообіг у холодну негоду."
        },
        {
            id: "sea_herb",
            name: "Морська трава",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/sea_herb.png",
            rarity: "common",
            value: 6,
            description: "Звичайна солонувата трава, знайдена біля узбережжя. Використовується для приготування відновлювальних мазей."
        },
        {
            id: "rozrovochky",
            name: "Розровочки",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/rozrovochky.png",
            rarity: "rare",
            value: 20,
            description: "Ніжні рожеві бруньки, які розпускаються лише на світанку. Мають надзвичайний магічний потенціал."
        },
        {
            id: "birds_herb",
            name: "Пташина трава",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/birds_herb.png",
            rarity: "common",
            value: 4,
            description: "Легка і тоненька трава, насіння якої дуже полюбляють лісові птахи. Добре підходить для простих тонізуючих відварів."
        },
        {
            id: "mint",
            name: "Мята",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/mint.png",
            rarity: "common",
            value: 3,
            description: "Ароматні м'ятні листочки з освіжаючим прохолодним смаком. Швидко знімають головний біль та втому."
        },
        {
            id: "seaweed",
            name: "Морський водоросель",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/seaweed.png",
            rarity: "common",
            value: 5,
            description: "Волокнисті зелені водорості з дна озера. Чудове джерело поживних речовин та вологи."
        },
        {
            id: "pink_crested_lily",
            name: "Рожева плашина лілія",
            category: "Alchemical-Herbs",
            image: "/src/assets/items/Alchemical-Herbs/pink_crested_lily.png",
            rarity: "epic",
            value: 45,
            description: "Надзвичайно рідкісна водяна лілія з вишуканими рожевими пелюстками у формі пташиного крила. Має потужну цілющу магію."
        }
    ]
};

// Плоский список для швидкого пошуку предметів за ID
export const itemsById = Object.values(items).flat().reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});
