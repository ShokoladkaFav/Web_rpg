export const weapons = [
    // ==========================================
    // 1. Axe (Сокири)
    // ==========================================
    {
        id: "simple_axe",
        name: "Звичайна сокира",
        category: "Weapons",
        subCategory: "Axe",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Axe/simple_axe.png",
        icon: "🪓",
        rarity: "common",
        value: 18,
        attack: 6,
        description: "Проста робоча сокира з дерев'яним топорищем. Придатна як для рубання дров, так і для самозахисту."
    },
    {
        id: "great_axe",
        name: "Велика сокира",
        category: "Weapons",
        subCategory: "Axe",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Axe/great_axe.png",
        icon: "🪓",
        rarity: "uncommon",
        value: 55,
        attack: 12,
        description: "Важка бойова сокира з широким сталевим лезом, здатна прорубувати легкі обладунки."
    },
    {
        id: "two_handed_axe",
        name: "Дворучна сокира",
        category: "Weapons",
        subCategory: "Axe",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Axe/two_handed_axe.png",
        icon: "🪓",
        rarity: "rare",
        value: 95,
        attack: 18,
        description: "Масивна дворучна сокира з подвійним лезом. Вимагає чималої сили, але завдає нищівних ударів."
    },
    {
        id: "small_battle_axe",
        name: "Мала бойова сокира",
        category: "Weapons",
        subCategory: "Axe",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Axe/small_battle_axe.png",
        icon: "🪓",
        rarity: "uncommon",
        value: 42,
        attack: 9,
        description: "Легка та збалансована одноручна бойова сокира для швидких випадів у ближньому бою."
    },

    // ==========================================
    // 2. Bow-and-Crossbow (Луки та Арбалети)
    // ==========================================
    {
        id: "makeshift_bow",
        name: "Саморобний лук",
        category: "Weapons",
        subCategory: "Bow-and-Crossbow",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Bow-and-Crossbow/makeshift_bow.png",
        icon: "🏹",
        rarity: "common",
        value: 14,
        attack: 5,
        description: "Грубо зігнута гілка з тугою мотузкою. Простий, але дієвий лук для полювання на дрібну дичину."
    },
    {
        id: "hunting_bow",
        name: "Лук",
        category: "Weapons",
        subCategory: "Bow-and-Crossbow",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Bow-and-Crossbow/hunting_bow.png",
        icon: "🏹",
        rarity: "uncommon",
        value: 45,
        attack: 10,
        description: "Якісний гнучкий лук з ясена та сухожильною тятивою. Забезпечує точну стрільбу на середній дистанції."
    },
    {
        id: "makeshift_crossbow",
        name: "Саморобний арбалет",
        category: "Weapons",
        subCategory: "Bow-and-Crossbow",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Bow-and-Crossbow/makeshift_crossbow.png",
        icon: "🎯",
        rarity: "uncommon",
        value: 40,
        attack: 11,
        description: "Кустарно зібраний арбалет із дерев'яним ложем. Повільно перезаряджається, але б'є досить боляче."
    },
    {
        id: "crossbow",
        name: "Арбалет",
        category: "Weapons",
        subCategory: "Bow-and-Crossbow",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Bow-and-Crossbow/crossbow.png",
        icon: "🎯",
        rarity: "rare",
        value: 85,
        attack: 16,
        description: "Надійний механічний арбалет зі сталевими дугами, що пробиває щільну шкіру та кольчуги."
    },

    // ==========================================
    // 3. Crushing (Дробильна зброя)
    // ==========================================
    {
        id: "heavy_stick",
        name: "Важка палка",
        category: "Weapons",
        subCategory: "Crushing",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Crushing/heavy_stick.png",
        icon: "🪵",
        rarity: "common",
        value: 5,
        attack: 3,
        description: "Товста сукувата дубина з твердого дерева. Найнадійніша зброя, коли під рукою більше нічого немає."
    },
    {
        id: "heavy_bone",
        name: "Важка кістка",
        category: "Weapons",
        subCategory: "Crushing",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Crushing/heavy_bone.png",
        icon: "🦴",
        rarity: "common",
        value: 10,
        attack: 5,
        description: "Масивна стегнова кістка великого звіра, яку можна використовувати як важку палицю."
    },
    {
        id: "spiked_reinforced_stick",
        name: "Зміцнена палка із шипами",
        category: "Weapons",
        subCategory: "Crushing",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Crushing/spiked_reinforced_stick.png",
        icon: "🏏",
        rarity: "uncommon",
        value: 32,
        attack: 9,
        description: "Обмотана залізними обручами дубина з гострими шипами на ударній частині."
    },
    {
        id: "bone_club",
        name: "Палиця із кістками",
        category: "Weapons",
        subCategory: "Crushing",
        slot: "weapon",
        craftOnly: true,
        image: "/src/assets/items/RPG_Weapons/Crushing/bone_club.png",
        icon: "🦴",
        rarity: "uncommon",
        value: 36,
        attack: 10,
        description: "Саморобна дробильна палиця, обв'язана гострими кістками монстрів. (Тільки крафт)"
    },
    {
        id: "thorny_vine_club",
        name: "Палиця із гострою лозою",
        category: "Weapons",
        subCategory: "Crushing",
        slot: "weapon",
        craftOnly: true,
        image: "/src/assets/items/RPG_Weapons/Crushing/thorny_vine_club.png",
        icon: "🌿",
        rarity: "uncommon",
        value: 38,
        attack: 10,
        description: "Важка палиця, щільно обплетена колючою лісовою лозою, що залишає глибокі рвані рани. (Тільки крафт)"
    },

    // ==========================================
    // 4. Dagger (Кинджали та Ножі)
    // ==========================================
    {
        id: "makeshift_knife",
        name: "Саморобний ніж",
        category: "Weapons",
        subCategory: "Dagger",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Dagger/makeshift_knife.png",
        icon: "🔪",
        rarity: "common",
        value: 8,
        attack: 4,
        description: "Примітивний ніж із гострого уламка металу та обмотаного мотузкою руків'я."
    },
    {
        id: "shiv",
        name: "Заточка",
        category: "Weapons",
        subCategory: "Dagger",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Dagger/shiv.png",
        icon: "🗡️",
        rarity: "common",
        value: 12,
        attack: 5,
        description: "Загострений металевий стрижень із тканинною обмоткою для прихованих та швидких ударів."
    },
    {
        id: "simple_knife",
        name: "Ніж",
        category: "Weapons",
        subCategory: "Dagger",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Dagger/simple_knife.png",
        icon: "🔪",
        rarity: "common",
        value: 20,
        attack: 6,
        description: "Гострий сталевий ніж із дерев'яним руків'ям. Універсальний інструмент мандрівника."
    },
    {
        id: "adventurer_knife",
        name: "Ніж шукача пригод",
        category: "Weapons",
        subCategory: "Dagger",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Dagger/adventurer_knife.png",
        icon: "🗡️",
        rarity: "rare",
        value: 58,
        attack: 11,
        description: "Добре загартований кинджал із зручною гардою та ідеальним балансом для стрімких випадів."
    },

    // ==========================================
    // 5. Shields (Щити)
    // ==========================================
    {
        id: "small_makeshift_metal_shield",
        name: "Малий саморобний щит із металу",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/small_makeshift_metal_shield.png",
        icon: "🛡️",
        rarity: "common",
        value: 16,
        defense: 4,
        description: "Клепаний зі шматків старого заліза невеликий круглий щит. Грубий, але рятує від ударів."
    },
    {
        id: "small_wooden_shield",
        name: "Малий дерев'яний щит",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/small_wooden_shield.png",
        icon: "🛡️",
        rarity: "common",
        value: 14,
        defense: 3,
        description: "Легкий щит із соснових дощок, обтягнутий по краю смужкою сирої шкіри."
    },
    {
        id: "small_improved_shield",
        name: "Малий вдосконалений щит",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/small_improved_shield.png",
        icon: "🛡️",
        rarity: "uncommon",
        value: 34,
        defense: 6,
        description: "Добре укріплений малий щит із залізним умбоном посередині для відбивання клинків."
    },
    {
        id: "small_guard_shield",
        name: "Малий щит вартового",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/small_guard_shield.png",
        icon: "🛡️",
        rarity: "uncommon",
        value: 48,
        defense: 8,
        description: "Стандартний компактний щит міського патруля з гербом та сталевим кантом."
    },
    {
        id: "medium_wooden_shield",
        name: "Середній дерев'яний щит",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/medium_wooden_shield.png",
        icon: "🛡️",
        rarity: "uncommon",
        value: 38,
        defense: 7,
        description: "Надійний дубовий щит середнього розміру, що прикриває корпус від стріл та ударів."
    },
    {
        id: "heavy_wooden_shield",
        name: "Важкий дерев'яний щит",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/heavy_wooden_shield.png",
        icon: "🛡️",
        rarity: "uncommon",
        value: 52,
        defense: 9,
        description: "Товстий щит із масиву дерева, здатний поглинути навіть сильний удар сокирою."
    },
    {
        id: "heavy_reinforced_wooden_shield",
        name: "Важкий зміцнений дерев'яний щит",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/heavy_reinforced_wooden_shield.png",
        icon: "🛡️",
        rarity: "rare",
        value: 78,
        defense: 12,
        description: "Масивний щит, обшитий залізними смугами та заклепками для тривалих сутичок."
    },
    {
        id: "heavy_reinforced_guard_shield",
        name: "Важкий зміцнений дерев'яний щит вартового",
        category: "Weapons",
        subCategory: "Shields",
        slot: "shield",
        image: "/src/assets/items/RPG_Weapons/Shields/heavy_reinforced_guard_shield.png",
        icon: "🛡️",
        rarity: "rare",
        value: 105,
        defense: 15,
        description: "Елітний щит гарнізонних вартових із товстого дуба та загартованої сталевої окантовки."
    },

    // ==========================================
    // 6. Staff (Посохи)
    // ==========================================
    {
        id: "novice_staff",
        name: "Посох початківця",
        category: "Weapons",
        subCategory: "Staff",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Staff/novice_staff.png",
        icon: "🪄",
        rarity: "common",
        value: 20,
        attack: 3,
        magicAttack: 6,
        description: "Гладкий дерев'яний посох для початківців, що допомагає зосереджувати базові магічні потоки."
    },
    {
        id: "novice_shaman_staff",
        name: "Посох шамана початківця",
        category: "Weapons",
        subCategory: "Staff",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Staff/novice_shaman_staff.png",
        icon: "🔮",
        rarity: "uncommon",
        value: 46,
        attack: 4,
        magicAttack: 10,
        description: "Прикрашений пір'ям та кістяними амулетами посох, що підсилює зв'язок із духами природи."
    },
    {
        id: "apprentice_staff",
        name: "Посох учня",
        category: "Weapons",
        subCategory: "Staff",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Staff/apprentice_staff.png",
        icon: "🪄",
        rarity: "uncommon",
        value: 52,
        attack: 4,
        magicAttack: 11,
        description: "Витончений посох магічної школи з невеликим кристалом на наверші для стабілізації заклять."
    },
    {
        id: "novice_forest_staff",
        name: "Лісовий посох початківця",
        category: "Weapons",
        subCategory: "Staff",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Staff/novice_forest_staff.png",
        icon: "🌿",
        rarity: "uncommon",
        value: 55,
        attack: 5,
        magicAttack: 12,
        description: "Живий пагін стародавнього дерева, обплетений корінням. Наповнює закляття силою лісу."
    },
    {
        id: "novice_fire_staff",
        name: "Посох вогню початківця",
        category: "Weapons",
        subCategory: "Staff",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Staff/novice_fire_staff.png",
        icon: "🔥",
        rarity: "rare",
        value: 75,
        attack: 5,
        magicAttack: 15,
        description: "Обвуглений біля навершя посох із жариною всередині, що розпалює вогняні чари."
    },

    // ==========================================
    // 7. Sword (Мечі)
    // ==========================================
    {
        id: "wooden_sword",
        name: "Дерев'яний меч",
        category: "Weapons",
        subCategory: "Sword",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Sword/wooden_sword.png",
        icon: "🗡️",
        rarity: "common",
        value: 10,
        attack: 4,
        description: "Тренувальний меч із міцного дуба. Безпечний для спарингів, але здатен добряче оглушити."
    },
    {
        id: "makeshift_sword",
        name: "Саморобний меч",
        category: "Weapons",
        subCategory: "Sword",
        slot: "weapon",
        craftOnly: true,
        image: "/src/assets/items/RPG_Weapons/Sword/makeshift_sword.png",
        icon: "⚔️",
        rarity: "common",
        value: 25,
        attack: 7,
        description: "Грубо викуваний клинок із переплавленого брухту та шкіряною обмоткою. (Тільки крафт)"
    },
    {
        id: "copper_sword",
        name: "Мідний меч",
        category: "Weapons",
        subCategory: "Sword",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Sword/copper_sword.png",
        icon: "⚔️",
        rarity: "common",
        value: 34,
        attack: 8,
        description: "Непоганий короткий меч із кованої міді. Дещо м'який, проте гострий та надійний."
    },
    {
        id: "novice_warrior_sword",
        name: "Меч воїна початківця",
        category: "Weapons",
        subCategory: "Sword",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Sword/novice_warrior_sword.png",
        icon: "⚔️",
        rarity: "uncommon",
        value: 52,
        attack: 11,
        description: "Класичний залізний меч новобранця зі зручною хрестовиною та збалансованим лезом."
    },
    {
        id: "western_sword",
        name: "Західний меч",
        category: "Weapons",
        subCategory: "Sword",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Sword/western_sword.png",
        icon: "⚔️",
        rarity: "rare",
        value: 88,
        attack: 15,
        description: "Довгий сталевий меч майстрів Західного королівства з витонченим долом та гострим вістрям."
    },
    {
        id: "pirate_sword",
        name: "Піратський меч",
        category: "Weapons",
        subCategory: "Sword",
        slot: "weapon",
        image: "/src/assets/items/RPG_Weapons/Sword/pirate_sword.png",
        icon: "🏴‍☠️",
        rarity: "rare",
        value: 92,
        attack: 16,
        description: "Вигнутий абордажний корд із закритою гардою, створений для стрімких морських сутичок."
    }
];

export default weapons;
