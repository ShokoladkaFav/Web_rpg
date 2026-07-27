import { useState } from "react";
import "../styles/CraftingModal.css";
import { items } from "../data/items.js";

function ItemImageOrIcon({ item, className, fallbackSize = "32px" }) {
    const [hasError, setHasError] = useState(false);

    if (item?.image && !hasError) {
        return (
            <img
                src={item.image}
                alt={item.name}
                className={className}
                onError={() => setHasError(true)}
            />
        );
    }

    return (
        <span className="craft-fallback-icon" style={{ fontSize: fallbackSize }}>
            {item?.icon || "🛠️"}
        </span>
    );
}

const CATEGORY_TABS = [
    { id: "all", label: "Усі рецепти", icon: "📖" },
    { id: "Food_Cooked", label: "Приготована їжа", icon: "🍲" },
    { id: "Potions", label: "Зілля та Алхімія", icon: "🧪" },
    { id: "Resources", label: "Інструменти й ремесло", icon: "🔨" }
];

const RARITY_MAP = {
    common: { name: "Звичайний", color: "#a0a0a0", bg: "rgba(160, 160, 160, 0.15)" },
    uncommon: { name: "Незвичайний", color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
    rare: { name: "Рідкісний", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
    epic: { name: "Епічний", color: "#a855f7", bg: "rgba(168, 85, 247, 0.15)" },
    legendary: { name: "Легендарний", color: "#eab308", bg: "rgba(234, 179, 8, 0.15)" }
};

export function CraftingModal({ onClose }) {
    const [selectedTab, setSelectedTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // Збираємо тільки ті рецепти, які позначені для створення (craftable === true)
    const allRecipes = Object.values(items).flat().filter(item => {
        return item.craftable === true;
    });

    const filteredRecipes = allRecipes.filter(item => {
        const matchesCategory = selectedTab === "all" || item.category === selectedTab;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const activeRecipe = (selectedRecipe && filteredRecipes.some(r => r.id === selectedRecipe.id))
        ? selectedRecipe
        : (filteredRecipes.length > 0 ? filteredRecipes[0] : null);

    return (
        <div className="craft-modal-overlay" onClick={onClose}>
            <div className="craft-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Заголовок модального вікна */}
                <div className="craft-modal-header">
                    <div className="craft-title-wrap">
                        <span className="craft-header-icon">🛠️</span>
                        <div>
                            <h2 className="craft-modal-title">Майстерня Створення та Кулінарії</h2>
                            <p className="craft-modal-subtitle">Готуйте поживні страви, варіть магічні зілля та куйте спорядження</p>
                        </div>
                    </div>
                    <button className="craft-close-btn" onClick={onClose} title="Закрити">✖</button>
                </div>

                {/* Категорії та пошук */}
                <div className="craft-toolbar">
                    <div className="craft-tabs-list">
                        {CATEGORY_TABS.map(tab => (
                            <button
                                key={tab.id}
                                className={`craft-tab-btn ${selectedTab === tab.id ? "active" : ""}`}
                                onClick={() => setSelectedTab(tab.id)}
                            >
                                <span className="tab-icon">{tab.icon}</span>
                                <span className="tab-label">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="craft-search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Пошук за назвою чи ефектом..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="craft-search-input"
                        />
                        {searchQuery && (
                            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>✖</button>
                        )}
                    </div>
                </div>

                {/* Основне тіло модалки */}
                <div className="craft-modal-body">
                    {/* Лівий список рецептів */}
                    <div className="craft-recipes-list-col">
                        <div className="recipes-count-badge">
                            Знайдено рецептів: <strong>{filteredRecipes.length}</strong>
                        </div>

                        <div className="craft-recipes-grid">
                            {filteredRecipes.map((item) => {
                                const isSelected = activeRecipe && activeRecipe.id === item.id;
                                const rarityInfo = RARITY_MAP[item.rarity] || RARITY_MAP.common;

                                return (
                                    <div
                                        key={item.id}
                                        className={`craft-recipe-card ${isSelected ? "selected" : ""}`}
                                        onClick={() => setSelectedRecipe(item)}
                                    >
                                        <div className="recipe-card-img-wrap">
                                            <ItemImageOrIcon item={item} className="recipe-card-img" fallbackSize="28px" />
                                        </div>
                                        <div className="recipe-card-info">
                                            <div className="recipe-card-name">{item.name}</div>
                                            <span
                                                className="recipe-rarity-tag"
                                                style={{ color: rarityInfo.color, background: rarityInfo.bg }}
                                            >
                                                {rarityInfo.name}
                                            </span>
                                        </div>
                                        <span className="recipe-soon-pill">СКОРО</span>
                                    </div>
                                );
                            })}

                            {filteredRecipes.length === 0 && (
                                <div className="no-recipes-found">
                                    <span className="no-found-icon">🔍</span>
                                    <p>Рецептів за вашим запитом не знайдено</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Права детальне панель вибранного рецепта */}
                    <div className="craft-details-col">
                        {activeRecipe ? (
                            <div className="craft-details-card">
                                <div className="details-header">
                                    <div className="details-img-wrap">
                                        <ItemImageOrIcon item={activeRecipe} className="details-main-img" fallbackSize="52px" />
                                    </div>
                                    <div className="details-title-meta">
                                        <h3 className="details-title">{activeRecipe.name}</h3>
                                        <div className="details-tags">
                                            <span
                                                className="details-rarity-badge"
                                                style={{
                                                    color: (RARITY_MAP[activeRecipe.rarity] || RARITY_MAP.common).color,
                                                    background: (RARITY_MAP[activeRecipe.rarity] || RARITY_MAP.common).bg
                                                }}
                                            >
                                                {(RARITY_MAP[activeRecipe.rarity] || RARITY_MAP.common).name}
                                            </span>
                                            <span className="details-category-badge">
                                                {activeRecipe.category === "Food_Cooked" ? "🍲 Кулінарія" :
                                                 activeRecipe.category === "Potions" ? "🧪 Алхімія" : "🛠️ Ремесло"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4 className="section-title">Опис та Властивості</h4>
                                    <p className="details-desc">{activeRecipe.description || "Опис відсутній."}</p>
                                </div>

                                <div className="details-section ingredients-section">
                                    <div className="section-title-row">
                                        <h4 className="section-title">Необхідні ресурси та інгредієнти</h4>
                                        <span className="soon-badge-highlight">СКОРО</span>
                                    </div>
                                    <div className="ingredients-placeholder-box">
                                        <span className="ingredients-icon">📦</span>
                                        <p className="ingredients-text">
                                            Спеціальні ресурси та інгредієнти для створення цієї страви будуть додані в наступному оновленні гри!
                                        </p>
                                    </div>
                                </div>

                                <div className="craft-action-footer">
                                    <button className="btn-craft-disabled" disabled title="Створення буде доступно у майбутньому оновленні">
                                        <span>🛠️ Створити</span>
                                        <span className="btn-soon-label">(СКОРО)</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="craft-details-placeholder">
                                <span className="placeholder-icon">🛠️</span>
                                <p>Оберіть рецепт зі списку ліворуч, щоб переглянути деталі створення</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CraftingModal;
