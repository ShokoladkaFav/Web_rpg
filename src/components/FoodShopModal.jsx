import { useState } from "react";
import "../styles/FoodShopModal.css";
import { foodCooked } from "../data/items_FoodCooked.js";
import { foodBerries } from "../data/items_FoodBerries.js";
import { CoinsDisplay } from "../utils/currency.jsx";

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
        <span className="shop-fallback-icon" style={{ fontSize: fallbackSize }}>
            {item?.icon || (item?.category === "Food_Berries" ? "🫐" : "🍲")}
        </span>
    );
}

const RARITY_MAP = {
    common: { name: "Звичайний", color: "#a0a0a0", bg: "rgba(160, 160, 160, 0.15)" },
    uncommon: { name: "Незвичайний", color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
    rare: { name: "Рідкісний", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },
    epic: { name: "Епічний", color: "#a855f7", bg: "rgba(168, 85, 247, 0.15)" },
    legendary: { name: "Легендарний", color: "#eab308", bg: "rgba(234, 179, 8, 0.15)" }
};

export function FoodShopModal({ character, onUpdateCharacter, onClose }) {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [purchaseLog, setPurchaseLog] = useState("");

    // Отримуємо всі товари, які можна купити
    const shopCooked = foodCooked.filter(i => i.buyable !== false);
    const shopBerries = foodBerries.filter(i => i.buyable !== false);

    const allShopItems = [...shopCooked, ...shopBerries];

    const filteredItems = allShopItems.filter(item => {
        const matchesCategory = activeTab === "all" ||
            (activeTab === "Food_Cooked" && item.category === "Food_Cooked") ||
            (activeTab === "Food_Berries" && item.category === "Food_Berries");

        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    const handleBuyItem = (item) => {
        if (!character || !onUpdateCharacter) return;

        const itemPrice = item.value || 10;
        const currentMoney = character.copper || 0;

        if (currentMoney < itemPrice) {
            setPurchaseLog(`❌ Недостатньо монет для купівлі "${item.name}"! Потрібно ${itemPrice} мідяків.`);
            return;
        }

        const currentInv = Array.isArray(character.inventory) ? character.inventory : [];
        const activeItemsCount = currentInv.filter(i => i !== null).length;

        if (activeItemsCount >= 12) {
            setPurchaseLog(`⚠️ Ваші рюкзаки заповнені! Звільніть місце для "${item.name}".`);
            return;
        }

        // Купівля успішна
        const updatedChar = {
            ...character,
            copper: currentMoney - itemPrice,
            inventory: [...currentInv, { ...item }]
        };

        onUpdateCharacter(updatedChar);
        setPurchaseLog(`✅ Ви успішно придбали "${item.name}" за ${itemPrice} мідяків!`);
    };

    return (
        <div className="food-shop-overlay" onClick={onClose}>
            <div className="food-shop-modal" onClick={(e) => e.stopPropagation()}>
                {/* Заголовок */}
                <div className="food-shop-header">
                    <div className="shop-title-wrap">
                        <span className="shop-header-icon">🍲</span>
                        <div>
                            <h2 className="shop-title">Корчмарська Крамниця та Лавка Продуктів</h2>
                            <p className="shop-subtitle">Придбайте свіжі страви, гарячі бульйони, пироги та цілющі ягоди</p>
                        </div>
                    </div>

                    <div className="shop-player-wallet">
                        <span className="wallet-label">Ваш гаманець:</span>
                        <CoinsDisplay totalCopper={character?.copper || 0} size="medium" />
                    </div>

                    <button className="food-shop-close-btn" onClick={onClose}>✖</button>
                </div>

                {/* Повідомлення про купівлю */}
                {purchaseLog && (
                    <div className={`purchase-log-bar ${purchaseLog.startsWith("✅") ? "success" : "error"}`}>
                        {purchaseLog}
                    </div>
                )}

                {/* Навігація та пошук */}
                <div className="food-shop-toolbar">
                    <div className="shop-tabs">
                        <button
                            className={`shop-tab-btn ${activeTab === "all" ? "active" : ""}`}
                            onClick={() => setActiveTab("all")}
                        >
                            📖 Усі товари ({allShopItems.length})
                        </button>
                        <button
                            className={`shop-tab-btn ${activeTab === "Food_Cooked" ? "active" : ""}`}
                            onClick={() => setActiveTab("Food_Cooked")}
                        >
                            🍲 Приготована їжа ({shopCooked.length})
                        </button>
                        <button
                            className={`shop-tab-btn ${activeTab === "Food_Berries" ? "active" : ""}`}
                            onClick={() => setActiveTab("Food_Berries")}
                        >
                            🫐 Ягоди та Фрукти ({shopBerries.length})
                        </button>
                    </div>

                    <div className="shop-search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Шукати за назвою..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="shop-search-input"
                        />
                    </div>
                </div>

                {/* Сітка товарів */}
                <div className="food-shop-grid-container">
                    <div className="food-shop-grid">
                        {filteredItems.map((item) => {
                            const rarityInfo = RARITY_MAP[item.rarity] || RARITY_MAP.common;
                            const itemPrice = item.value || 10;
                            const canAfford = (character?.copper || 0) >= itemPrice;

                            return (
                                <div key={item.id} className="shop-item-card">
                                    <div className="shop-card-top">
                                        <div className="shop-item-img-box">
                                            <ItemImageOrIcon item={item} className="shop-item-img" fallbackSize="42px" />
                                        </div>
                                        <div className="shop-item-title-box">
                                            <h4 className="shop-item-name">{item.name}</h4>
                                            <div className="shop-item-badges">
                                                <span
                                                    className="shop-rarity-badge"
                                                    style={{ color: rarityInfo.color, background: rarityInfo.bg }}
                                                >
                                                    {rarityInfo.name}
                                                </span>
                                                <span className="shop-category-badge">
                                                    {item.category === "Food_Berries" ? "🫐 Ягода" : "🍲 Страва"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="shop-item-desc">{item.description || "Смачна страва або продукт."}</p>

                                    <div className="shop-card-bottom">
                                        <div className="shop-item-price">
                                            <span className="price-label">Ціна:</span>
                                            <CoinsDisplay totalCopper={itemPrice} size="small" />
                                        </div>

                                        <button
                                            className={`buy-btn ${canAfford ? "active" : "disabled"}`}
                                            onClick={() => handleBuyItem(item)}
                                        >
                                            💰 Купити
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredItems.length === 0 && (
                            <div className="no-items-msg">
                                <span className="no-icon">🛒</span>
                                <p>Товарів за вашим запитом не знайдено</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodShopModal;
