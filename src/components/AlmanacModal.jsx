import { useState } from "react";
import { items } from "../data/items.js";
import "../styles/AlmanacModal.css";
import { CoinsDisplay } from "../utils/currency.jsx";

// Допоміжна мапа підказок про місця знаходження та особливості трав
const HERB_LOCATIONS = {
    "golden_flower": "Лісові галявини, скелі та рівнини",
    "hermit_herb": "Віддалені лісові чагарники, скелі та підземелля",
    "gribiscus": "Густі лісові нетрі та рівнини",
    "spicy_herb": "Пустелі, скелі, пустки та руїни",
    "sea_herb": "Узбережжя та водойми",
    "rozrovochky": "Скелясті схили та пустелі",
    "birds_herb": "Ліси, рівнини та луки",
    "mint": "Береги водойм, луки та ліси",
    "seaweed": "Озера, річки та оазиси",
    "pink_crested_lily": "Рідкісні водойми та оазиси",
    "marine_algae": "Глибокі водойми та оазиси",
    "young_tree_branch": "Лісові хащі та гаї",
    "dye_flower": "Фруктові рівнини, луки та скелі",
    "blue_eyed_maiden": "Печери, гірські скелі та підземелля",
    "dope_flower": "Пустельні оазиси та густі ліси",
    "vera_aloe": "Пустелі та спекотні землі",
    "tea_sprout": "Фруктові рівнини та поля",
    "wooden_grass": "Великий та Глибокий Старий Ліс",
    "twin_flower": "Густі лісові хащі та Глибокий Ліс",
    "blue_lady": "Глибокі підземелля та темні руїни",
    "nettle": "Поля, лісові узлісся та рівнини",
    "blue_rose": "Високогірні скелі",
    "flycatcher_grass": "Темні лісові хащі",
    "forest_flower": "Лісові узлісся та галявини",
    "four_leaf_clover": "Глибокий Старий Ліс та прадавній гай",
    "nimble_grass": "Трофей із монстрів пустелі та гір",
    "firefly_grass": "Нічні лісові хащі",
    "underground_flower": "Підземні печери та руїни",
    "shvibald": "Високі крони дерев у лісі (+10 Енергії на збір)",
    "pretrushka": "Старі руїни та древні забуті будівлі",
    "ardruinda": "Підземні печери та стародавні dungeons",
    "red_rose": "Гірські скелі та височини",
    "firuerta": "Колючі лісові зарості (знадобиться меч/сокира)",
    "forest_persheval": "Повалені стовбури у густому лісі",
    "bright_lady": "Яскрава лісова квітка з токсичним пилком (-15 HP при зборі)",
    "brambook": "Спекотні пустелі та янтаряні землі",
    "bloody_lady": "Колючі пустельні хащі (-10 HP при зборі)",
    "lovers_pair": "Унікально: Тільки у 'Глибокому старому лісі'",
    "blue_azure": "Високогірні скелі (-20 HP, -20 Енергії від холоду)",
    "sea_laminaria": "Глибоководні водойми (-20 HP на занурення)",
    "branch_healthy_tree": "Прадавні дерева в 'Глибокому старому лісі'",
    "lyapotyazhma": "Сухі пустельні рівнини та пустки",
    "sea_baron": "Морський трофей із чудовиськ",
    "leaves_healthy_tree": "Прадавній 'Глибокий старий ліс'",
    "mary_drop": "Сухі пустки та випалені землі",
    "sea_tentacles": "Глибокі морські бухти (-10 HP, -10 Енергії)",
    "gerdalf_grass": "Високі гірські скелі",
    "stinky_flower": "Глибокий Старий Ліс (-10 HP від їдкого запаху)",
    "mrakovyk": "Лісові нетрі на мертвих рештках",
    "romanshka": "Фруктові рівнини та луки"
};

const RARITY_NAMES = {
    common: "Звичайна",
    uncommon: "Незвичайна",
    rare: "Рідкісна",
    epic: "Епічна"
};

function AlmanacModal({ onClose }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [rarityFilter, setRarityFilter] = useState("all");
    const [selectedItemDetail, setSelectedItemDetail] = useState(null);

    const currentCategoryItems = items[selectedCategory] || [];

    // Фільтрація предметів активної категорії
    const filteredItems = currentCategoryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRarity = rarityFilter === "all" || item.rarity === rarityFilter;
        return matchesSearch && matchesRarity;
    });

    const categories = [
        {
            id: "Alchemical-Herbs",
            title: "Корисні трави",
            icon: "🌿",
            count: (items["Alchemical-Herbs"] || []).length,
            available: true,
            description: "Лікувальні рослини, рідкісні квіти, магічні водорості та цілющі гриби."
        },
        {
            id: "Food_Berries",
            title: "Ягоди та Пожива",
            icon: "🫐",
            count: (items["Food_Berries"] || []).length,
            available: true,
            description: "Соковиті лісові й гірські ягоди, смачні горіхи та насіння."
        },
        {
            id: "Food_Fruits",
            title: "Соковиті Фрукти",
            icon: "🍎",
            count: (items["Food_Fruits"] || []).length,
            available: true,
            description: "Соковиті фрукти з усіх куточків світу: з лісів, рівнин, гір, пустель та від торговців."
        },
        {
            id: "Food_Cooked",
            title: "Приготована їжа",
            icon: "🍲",
            count: (items["Food_Cooked"] || []).length,
            available: true,
            description: "Ситні страви, ароматне м'ясо, гарячі бульйони, пироги та напої з корчми."
        },
        {
            id: "Food_Vegetables",
            title: "Овочі та Інгредієнти",
            icon: "🥦",
            count: (items["Food_Vegetables"] || []).length,
            available: true,
            description: "Свіжі овочі, зелень, молочні продукти, спеції та кулінарні заготовки."
        },
        {
            id: "Monsters_Loot",
            title: "Лут з монстрів",
            icon: "🍖",
            count: (items["Monsters_Loot"] || []).length,
            available: true,
            description: "М'ясо, шкури, кістки, ікла та рідкісні трофеї, здобуті з повалених монстрів та істот."
        },
        {
            id: "Weapons",
            title: "Зброя",
            icon: "⚔️",
            count: 0,
            available: false,
            description: "Мечі, сокири, луки та посохи для бою та захисту."
        },
        {
            id: "Armor",
            title: "Обрудунок та Броня",
            icon: "🛡️",
            count: 0,
            available: false,
            description: "Шоломи, обладунки, щити та захисне спорядження."
        },
        {
            id: "Potions",
            title: "Зілля та Алхімія",
            icon: "🧪",
            count: 0,
            available: false,
            description: "Цілющі відвари, еліксири сили та магічні розчини."
        },
        {
            id: "Resources",
            title: "Ресурси та Матеріали",
            icon: "🏺",
            count: 0,
            available: false,
            description: "Руда, деревина, дорогоцінне каміння та побутові предмети."
        }
    ];

    return (
        <div className="almanac-overlay" onClick={onClose}>
            <div className="almanac-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="almanac-header">
                    <div className="almanac-title-box">
                        <span className="almanac-icon">📖</span>
                        <div>
                            <h2 className="almanac-title">Альманах Світу</h2>
                            <p className="almanac-subtitle">
                                {selectedCategory === "Alchemical-Herbs"
                                    ? "Категорія: Корисні трави"
                                    : "Енциклопедія предметів та інгредієнтів"}
                            </p>
                        </div>
                    </div>
                    <button className="almanac-close-btn" onClick={onClose} title="Закрити">✕</button>
                </div>

                {/* Main Content Body */}
                <div className="almanac-body">
                    {selectedCategory === null ? (
                        /* CATEGORIES VIEW */
                        <div className="almanac-categories-view">
                            <h3 className="almanac-section-title">Оберіть категорію предметів:</h3>
                            <div className="almanac-categories-grid">
                                {categories.map(cat => (
                                    <div
                                        key={cat.id}
                                        className={`almanac-category-card ${cat.available ? "active" : "disabled"}`}
                                        onClick={() => {
                                            if (cat.available) setSelectedCategory(cat.id);
                                        }}
                                    >
                                        <div className="cat-card-header">
                                            <span className="cat-icon">{cat.icon}</span>
                                            <span className={`cat-status-badge ${cat.available ? "available" : "coming-soon"}`}>
                                                {cat.available ? `${cat.count} предметів` : "Незабаром"}
                                            </span>
                                        </div>
                                        <h4 className="cat-title">{cat.title}</h4>
                                        <p className="cat-desc">{cat.description}</p>
                                        <div className="cat-action">
                                            {cat.available ? (
                                                <span className="cat-btn">Переглянути →</span>
                                            ) : (
                                                <span className="cat-btn-disabled">У розробці</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* ITEMS LIST VIEW FOR "Alchemical-Herbs" */
                        <div className="almanac-items-view">
                            {/* Navigation & Toolbar */}
                            <div className="almanac-toolbar">
                                <button
                                    className="almanac-back-btn"
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSearchQuery("");
                                        setRarityFilter("all");
                                    }}
                                >
                                    ← Назад до категорій
                                </button>

                                <div className="almanac-search-box">
                                    <span className="search-icon">🔍</span>
                                    <input
                                        type="text"
                                        placeholder={`Пошук у категорії "${categories.find(c => c.id === selectedCategory)?.title || 'предмети'}"...`}
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="almanac-search-input"
                                    />
                                    {searchQuery && (
                                        <button className="clear-search-btn" onClick={() => setSearchQuery("")}>✕</button>
                                    )}
                                </div>
                            </div>

                            {/* Rarity Filter Tabs */}
                            <div className="almanac-rarity-filters">
                                <span className="filter-label">Рідкісність:</span>
                                {[
                                    { id: "all", label: "Усі" },
                                    { id: "common", label: "Звичайні" },
                                    { id: "uncommon", label: "Незвичайні" },
                                    { id: "rare", label: "Рідкісні" },
                                    { id: "epic", label: "Епічні" }
                                ].map(f => (
                                    <button
                                        key={f.id}
                                        className={`rarity-filter-btn rarity-${f.id} ${rarityFilter === f.id ? "active" : ""}`}
                                        onClick={() => setRarityFilter(f.id)}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            {/* Items Grid */}
                            <div className="almanac-items-grid-container">
                                {filteredItems.length > 0 ? (
                                    <div className="almanac-items-grid">
                                        {filteredItems.map(item => (
                                            <div
                                                key={item.id}
                                                className={`almanac-item-card rarity-${item.rarity}`}
                                                onClick={() => setSelectedItemDetail(item)}
                                            >
                                                <div className="item-card-top">
                                                    <div className="item-img-wrap">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="item-img"
                                                                onError={e => {
                                                                    e.target.style.display = "none";
                                                                    if (e.target.nextSibling) {
                                                                        e.target.nextSibling.style.display = "block";
                                                                    }
                                                                }}
                                                            />
                                                        ) : null}
                                                        <span className="item-fallback-icon" style={{ display: item.image ? "none" : "block", fontSize: "24px" }}>
                                                            {item.icon || (selectedCategory === "Food_Berries" ? "🫐" : selectedCategory === "Food_Fruits" ? "🍎" : selectedCategory === "Food_Cooked" ? "🍲" : selectedCategory === "Food_Vegetables" ? "🥦" : "🌿")}
                                                        </span>
                                                    </div>
                                                    <div className="item-title-meta">
                                                        <h4 className="item-name">{item.name}</h4>
                                                        <div className="item-pills-row">
                                                            <span className={`rarity-pill rarity-${item.rarity}`}>
                                                                {RARITY_NAMES[item.rarity] || item.rarity}
                                                            </span>
                                                            <span className="value-pill" style={{ display: "inline-flex", alignItems: "center" }}>
                                                                <CoinsDisplay totalCopper={item.value} size="small" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="item-desc">{item.description}</p>

                                                {HERB_LOCATIONS[item.id] && (
                                                    <div className="item-location-info">
                                                        <span className="loc-icon">📍</span>
                                                        <span className="loc-text">{HERB_LOCATIONS[item.id]}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="almanac-empty-state">
                                        <span className="empty-icon">🍃</span>
                                        <p>Предметів за вашим запитом не знайдено.</p>
                                        <button className="reset-filter-btn" onClick={() => { setSearchQuery(""); setRarityFilter("all"); }}>
                                            Скинути фільтри
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ITEM DETAIL POPUP MODAL */}
                {selectedItemDetail && (
                    <div className="item-detail-overlay" onClick={() => setSelectedItemDetail(null)}>
                        <div className="item-detail-card" onClick={e => e.stopPropagation()}>
                            <button className="detail-close-btn" onClick={() => setSelectedItemDetail(null)}>✕</button>
                            <div className="detail-header">
                                <div className="detail-img-box">
                                    <img
                                        src={selectedItemDetail.image}
                                        alt={selectedItemDetail.name}
                                        className="detail-img"
                                        onError={e => {
                                            e.target.style.display = "none";
                                            if (e.target.nextSibling) {
                                                e.target.nextSibling.style.display = "block";
                                            }
                                        }}
                                    />
                                    <span className="detail-fallback-icon" style={{ display: "none" }}>
                                        {selectedItemDetail.icon || (selectedCategory === "Food_Berries" ? "🫐" : selectedCategory === "Food_Fruits" ? "🍎" : selectedCategory === "Food_Cooked" ? "🍲" : "🌿")}
                                    </span>
                                </div>
                                <div className="detail-header-meta">
                                    <span className={`rarity-pill rarity-${selectedItemDetail.rarity}`}>
                                        {RARITY_NAMES[selectedItemDetail.rarity] || selectedItemDetail.rarity}
                                    </span>
                                    <h3 className="detail-name">{selectedItemDetail.name}</h3>
                                    <span className="detail-price" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                        <span>Цінність продавця:</span>
                                        <CoinsDisplay totalCopper={selectedItemDetail.value} size="small" />
                                    </span>
                                </div>
                            </div>

                            <div className="detail-body">
                                <div className="detail-section">
                                    <h5>
                                        {selectedCategory === "Alchemical-Herbs" ? "Опис рослини:" :
                                         selectedCategory === "Food_Berries" ? "Опис ягоди:" :
                                         selectedCategory === "Food_Fruits" ? "Опис фрукта:" :
                                         selectedCategory === "Food_Cooked" ? "Опис страви:" :
                                         selectedCategory === "Food_Vegetables" ? "Опис овоча / інгредієнта:" :
                                         selectedCategory === "Monsters_Loot" ? "Опис трофею з монстра:" :
                                         selectedCategory === "Weapons" ? "Опис зброї:" :
                                         selectedCategory === "Armor" ? "Опис обладунків:" :
                                         selectedCategory === "Potions" ? "Опис зілля:" :
                                         selectedCategory === "Resources" ? "Опис ресурсу:" : "Опис предмету:"}
                                    </h5>
                                    <p>{selectedItemDetail.description}</p>
                                </div>

                                {HERB_LOCATIONS[selectedItemDetail.id] && (
                                    <div className="detail-section">
                                        <h5>Де знайти або особливості:</h5>
                                        <p className="location-detail-p">
                                            📍 {HERB_LOCATIONS[selectedItemDetail.id]}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="detail-footer">
                                <button className="detail-ok-btn" onClick={() => setSelectedItemDetail(null)}>
                                    Зрозуміло
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AlmanacModal;
