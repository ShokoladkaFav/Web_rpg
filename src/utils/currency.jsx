import React from "react";
import copperCoinImg from "../assets/images/copper_coin.png";
import silverCoinImg from "../assets/images/silver_coin.png";
import goldCoinImg from "../assets/images/gold_coin.png";

export const COIN_IMAGES = {
    copper: copperCoinImg,
    silver: silverCoinImg,
    gold: goldCoinImg
};

export const COIN_NAMES = {
    gold: { full: "Золота", short: "зол.", plural: "золотих" },
    silver: { full: "Срібна", short: "ср.", plural: "срібних" },
    copper: { full: "Мідна", short: "мідн.", plural: "мідних" }
};

/**
 * Перетворює загальну кількість мідних монет у об'єкт { gold, silver, copper, total }
 * 100 мідних = 1 срібна
 * 100 срібних = 1 золота (10,000 мідних)
 */
export function parseCoins(totalCopper = 0) {
    const val = Math.max(0, Math.floor(Number(totalCopper) || 0));
    const gold = Math.floor(val / 10000);
    const remAfterGold = val % 10000;
    const silver = Math.floor(remAfterGold / 100);
    const copper = remAfterGold % 100;
    return { gold, silver, copper, total: val };
}

/**
 * Конвертує окремі монети у загальну кількість мідних
 */
export function toCopper({ gold = 0, silver = 0, copper = 0 }) {
    return (Math.floor(gold) * 10000) + (Math.floor(silver) * 100) + Math.floor(copper);
}

/**
 * Форматує монети у текстовий рядок, наприклад: "1 зол. 25 ср. 50 мідн."
 */
export function formatCoinsText(totalCopper = 0) {
    const { gold, silver, copper } = parseCoins(totalCopper);
    const parts = [];
    if (gold > 0) parts.push(`${gold} зол.`);
    if (silver > 0) parts.push(`${silver} ср.`);
    if (copper > 0 || parts.length === 0) parts.push(`${copper} мідн.`);
    return parts.join(" ");
}

/**
 * Reusable React Component для гарного відображення монет із іконками
 */
export function CoinsDisplay({ totalCopper = 0, size = "medium", showZero = true, className = "" }) {
    const { gold, silver, copper, total } = parseCoins(totalCopper);

    const sizes = {
        small: { icon: "14px", font: "11px", gap: "4px" },
        medium: { icon: "18px", font: "13px", gap: "6px" },
        large: { icon: "24px", font: "15px", gap: "8px" }
    };

    const currentSize = sizes[size] || sizes.medium;

    if (total === 0 && !showZero) {
        return <span style={{ color: "#999", fontSize: currentSize.font }}>0 мідн.</span>;
    }

    const hasGold = gold > 0;
    const hasSilver = silver > 0;
    const hasCopper = copper > 0 || (!hasGold && !hasSilver);

    return (
        <span 
            className={`coins-display-container ${className}`}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: currentSize.gap,
                verticalAlign: "middle",
                whiteSpace: "nowrap"
            }}
        >
            {hasGold && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", color: "#ffd700", fontWeight: 600, fontSize: currentSize.font }}>
                    <img 
                        src={COIN_IMAGES.gold} 
                        alt="Золота монета" 
                        title="Золота монета (100 срібних)"
                        referrerPolicy="no-referrer"
                        style={{
                            width: currentSize.icon,
                            height: currentSize.icon,
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 0 4px rgba(255,215,0,0.5)",
                            border: "1px solid #ffe066"
                        }}
                    />
                    <span>{gold}</span>
                </span>
            )}

            {hasSilver && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", color: "#e0e6ed", fontWeight: 600, fontSize: currentSize.font }}>
                    <img 
                        src={COIN_IMAGES.silver} 
                        alt="Срібна монета" 
                        title="Срібна монета (100 мідних)"
                        referrerPolicy="no-referrer"
                        style={{
                            width: currentSize.icon,
                            height: currentSize.icon,
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 0 4px rgba(224,230,237,0.4)",
                            border: "1px solid #ffffff"
                        }}
                    />
                    <span>{silver}</span>
                </span>
            )}

            {hasCopper && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", color: "#e59866", fontWeight: 600, fontSize: currentSize.font }}>
                    <img 
                        src={COIN_IMAGES.copper} 
                        alt="Мідна монета" 
                        title="Мідна монета"
                        referrerPolicy="no-referrer"
                        style={{
                            width: currentSize.icon,
                            height: currentSize.icon,
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 0 4px rgba(229,152,102,0.4)",
                            border: "1px solid #f0b27a"
                        }}
                    />
                    <span>{copper}</span>
                </span>
            )}
        </span>
    );
}

export default CoinsDisplay;
