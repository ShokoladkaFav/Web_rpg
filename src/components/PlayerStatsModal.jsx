import "../styles/PlayerStatsModal.css";

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
                </div>

                <footer className="stats-footer">
                    Клікніть "×" для закриття
                </footer>
            </div>
        </div>
    );
}

export default PlayerStatsModal;
