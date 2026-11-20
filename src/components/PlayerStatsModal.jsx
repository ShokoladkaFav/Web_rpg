import "../styles/PlayerStatsModal.css";
import { CoinsDisplay } from "../utils/currency.jsx";
import { TimeDisplay } from "../utils/timeSystem.jsx";

function PlayerStatsModal({ character, onClose }) {
    const stats = [
        { label: "Здоров'я", value: character.hp, color: "hp" },
        { label: "Мана", value: character.mp, color: "mp" },
        { label: "Їжа", value: character.food, color: "food" },
        { label: "Вода", value: character.water, color: "water" },
        { label: "Сон", value: character.sleep, color: "sleep" },
    ];

    const xpPercentage = (character.xp / character.maxXp) * 100;

    return (
        <div className="stats-overlay" onClick={onClose}>
            <div className="stats-window" onClick={(e) => e.stopPropagation()}>
                <header className="stats-header">
                    <span className="stats-title">📜 Картка героя</span>
                    <button className="close-stats-btn" onClick={onClose}>×</button>
                </header>

                <div className="stats-body">
                    <div className="stats-profile">
                        <div className="stats-avatar-large">
                            <img src={character.icon} alt="Avatar" />
                        </div>
                        <div className="stats-main-info">
                            <h2 className="stats-name">{character.nickname}</h2>
                            <p className="stats-level">Рівень {character.level}</p>
                            <div className="modal-xp-container">
                                <div className="modal-xp-bar">
                                    <div className="modal-xp-fill" style={{ width: `${xpPercentage}%` }}></div>
                                </div>
                                <span className="modal-xp-text">XP: {character.xp} / {character.maxXp}</span>
                            </div>
                        </div>
                    </div>

                    <div className="stats-divider"></div>
                    
                    <div className="stats-grid">
                        <div className="stat-card trait-section">
                            <label>Спеціалізація</label>
                            <p className="stat-value trait-value">{character.trait.name}</p>
                            <p className="stat-desc">{character.trait.desc}</p>
                        </div>

                        <div className="stat-card wallet-section" style={{ background: "rgba(0,0,0,0.25)", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,215,0,0.2)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <label style={{ color: "#ffd700", fontWeight: "600", fontSize: "12px", textTransform: "uppercase" }}>💰 Гаманець (Монети)</label>
                            <div style={{ marginTop: "8px" }}>
                                <CoinsDisplay totalCopper={character.copper || 0} size="large" />
                            </div>
                        </div>

                        <div className="stat-card time-section" style={{ background: "rgba(0,0,0,0.25)", padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(162,155,254,0.3)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <label style={{ color: "#a29bfe", fontWeight: "600", fontSize: "12px", textTransform: "uppercase" }}>⏱️ Ігровий час та Пора дня</label>
                            <div style={{ marginTop: "8px" }}>
                                <TimeDisplay character={character} size="medium" />
                            </div>
                        </div>

                        <div className="stats-divider-small"></div>

                        {stats.map((s, i) => (
                            <div key={i} className="stat-card">
                                <label>{s.label}</label>
                                <div className="stat-bar-bg">
                                    <div className={`stat-bar-fill ${s.color}`} style={{ width: `${s.value}%` }}></div>
                                </div>
                                <p className="stat-num">{s.value} / 100</p>
                            </div>
                        ))}
                    </div>

                    {character.skills && Object.keys(character.skills).length > 0 && (
                        <>
                            <div className="stats-divider-small"></div>
                            <div className="stat-card" style={{ marginTop: "8px" }}>
                                <label>📚 Вивчені вміння та магія</label>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                                    {Object.entries({
                                        light_magic: "✨ Магія світла",
                                        earth_magic: "🪨 Магія землі",
                                        ice_magic: "❄️ Магія льоду",
                                        fire_magic: "🔥 Магія вогню",
                                        axe_mastery: "🪓 Володіння сокирою",
                                        dagger_mastery: "🗡️ Володіння кинджалами",
                                        ranged_mastery: "🏹 Стрілецька зброя",
                                        sword_mastery: "⚔️ Володіння мечами",
                                        staff_mastery: "🪄 Володіння посохами",
                                        forbidden_magic: "💀 Заборонена магія"
                                    }).map(([key, label]) => {
                                        const lvl = character.skills[key];
                                        if (!lvl) return null;
                                        return (
                                            <span key={key} style={{ background: "#f1f5f9", color: "#0f172a", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", border: "1px solid #e2e8f0" }}>
                                                {label}: +{lvl}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <footer className="stats-footer">
                    Клікніть "×" для закриття
                </footer>
            </div>
        </div>
    );
}

export default PlayerStatsModal;
