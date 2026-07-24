import React from "react";

export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_DAY = 1440;

/**
 * Period of the day definition:
 * 06:00 - 11:59 -> Morning (Ранок) 🌅
 * 12:00 - 17:59 -> Day (День) ☀️
 * 18:00 - 21:59 -> Evening (Вечір) 🌇
 * 22:00 - 05:59 -> Night (Ніч) 🌙
 */
export function getTimePeriod(hour) {
    if (hour >= 6 && hour < 12) {
        return {
            id: "morning",
            name: "Ранок",
            icon: "🌅",
            color: "#f39c12",
            skyClass: "sky-morning",
            bgGradient: "linear-gradient(180deg, rgba(255,160,80,0.15) 0%, rgba(20,20,35,0) 100%)",
            badgeBg: "rgba(243, 156, 18, 0.2)",
            borderColor: "rgba(243, 156, 18, 0.4)"
        };
    } else if (hour >= 12 && hour < 18) {
        return {
            id: "day",
            name: "День",
            icon: "☀️",
            color: "#f1c40f",
            skyClass: "sky-day",
            bgGradient: "linear-gradient(180deg, rgba(255,230,120,0.1) 0%, rgba(20,20,35,0) 100%)",
            badgeBg: "rgba(241, 196, 15, 0.2)",
            borderColor: "rgba(241, 196, 15, 0.4)"
        };
    } else if (hour >= 18 && hour < 22) {
        return {
            id: "evening",
            name: "Вечір",
            icon: "🌇",
            color: "#e67e22",
            skyClass: "sky-evening",
            bgGradient: "linear-gradient(180deg, rgba(211, 84, 0, 0.25) 0%, rgba(15,15,30,0) 100%)",
            badgeBg: "rgba(230, 126, 34, 0.25)",
            borderColor: "rgba(230, 126, 34, 0.4)"
        };
    } else {
        return {
            id: "night",
            name: "Ніч",
            icon: "🌙",
            color: "#a29bfe",
            skyClass: "sky-night",
            bgGradient: "linear-gradient(180deg, rgba(30, 20, 60, 0.4) 0%, rgba(10,10,20,0.8) 100%)",
            badgeBg: "rgba(142, 68, 173, 0.3)",
            borderColor: "rgba(162, 155, 254, 0.4)"
        };
    }
}

/**
 * Normalizes character time object to { day, hour, minute }
 */
export function normalizeGameTime(character) {
    if (!character) return { day: 1, hour: 8, minute: 0 };
    return {
        day: Number(character.day) || 1,
        hour: typeof character.hour === "number" ? character.hour : 8,
        minute: typeof character.minute === "number" ? character.minute : 0
    };
}

/**
 * Formats time as "08:30"
 */
export function formatGameTime(hour = 8, minute = 0) {
    const h = String(hour).padStart(2, "0");
    const m = String(minute).padStart(2, "0");
    return `${h}:${m}`;
}

/**
 * Advances character time by `minutesToAdd`.
 * Also gradually drains sleep, food, water based on time passed.
 */
export function advanceTime(character, minutesToAdd = 30) {
    if (!character) return character;

    const currentTime = normalizeGameTime(character);
    let totalMinutes = (currentTime.day - 1) * MINUTES_IN_DAY + currentTime.hour * 60 + currentTime.minute + minutesToAdd;

    const newDay = Math.floor(totalMinutes / MINUTES_IN_DAY) + 1;
    const dayRemainder = totalMinutes % MINUTES_IN_DAY;
    const newHour = Math.floor(dayRemainder / 60);
    const newMinute = dayRemainder % 60;

    // Direct drain per hour passed
    const hoursPassed = minutesToAdd / 60;
    const sleepLoss = Math.round(hoursPassed * 2.5);
    const foodLoss = Math.round(hoursPassed * 2.0);
    const waterLoss = Math.round(hoursPassed * 2.5);

    const newSleep = Math.max(0, (character.sleep ?? 100) - sleepLoss);
    const newFood = Math.max(0, (character.food ?? 100) - foodLoss);
    const newWater = Math.max(0, (character.water ?? 100) - waterLoss);

    return {
        ...character,
        day: newDay,
        hour: newHour,
        minute: newMinute,
        sleep: newSleep,
        food: newFood,
        water: newWater
    };
}

/**
 * Rest/sleep until 8:00 AM next day (or +8 hours if already morning)
 */
export function restUntilMorning(character) {
    if (!character) return character;
    const { day, hour, minute } = normalizeGameTime(character);

    // Calculate minutes until 8:00 AM
    let targetHour = 8;
    let daysToAdd = 0;

    if (hour >= 8) {
        daysToAdd = 1; // move to next day 8:00 AM
    }

    const currentTotalMins = (hour * 60) + minute;
    const targetTotalMins = (daysToAdd * 1440) + (targetHour * 60);
    const minsToSleep = targetTotalMins - currentTotalMins;

    const nextDay = day + daysToAdd;

    return {
        ...character,
        day: nextDay,
        hour: 8,
        minute: 0,
        hp: 100,
        mp: 100,
        sleep: 100,
        water: Math.min(100, (character.water || 50) + 30),
        food: Math.min(100, (character.food || 50) + 30)
    };
}

/**
 * TimeDisplay Component for top bar or player card
 */
export function TimeDisplay({ character, size = "medium", className = "" }) {
    const { day, hour, minute } = normalizeGameTime(character);
    const period = getTimePeriod(hour);
    const timeStr = formatGameTime(hour, minute);

    return (
        <div 
            className={`time-display-badge ${period.skyClass} ${className}`}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: period.badgeBg,
                border: `1px solid ${period.borderColor}`,
                padding: size === "small" ? "2px 8px" : "4px 10px",
                borderRadius: "14px",
                color: "#ffffff",
                fontSize: size === "small" ? "11px" : "12px",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                backdropFilter: "blur(4px)",
                whiteSpace: "nowrap"
            }}
            title={`День ${day}, ${timeStr} • ${period.name}`}
        >
            <span style={{ fontSize: size === "small" ? "13px" : "15px" }}>{period.icon}</span>
            <span style={{ color: period.color }}>{timeStr}</span>
            <span style={{ color: "#ccc", opacity: 0.85 }}>({period.name})</span>
            <span style={{
                background: "rgba(0,0,0,0.3)",
                padding: "1px 5px",
                borderRadius: "8px",
                fontSize: "10px",
                color: "#ffd700",
                letterSpacing: "0.5px"
            }}>
                День {day}
            </span>
        </div>
    );
}

export default TimeDisplay;
