import { useState } from "react";
import "../styles/SettlementMenu.css";
import { npcs } from "../data/npcs.js";
import NPCDialogue from "./NPCDialogue.jsx";
import { restUntilMorning, TimeDisplay } from "../utils/timeSystem.jsx";

// Гранично безпечний комопнент аватара NPC з фолбеком на першу літеру
function NPCRowAvatar({ npc }) {
    const [imgError, setImgError] = useState(false);

    if (imgError || !npc.avatar) {
        return (
            <span className="npc-card-avatar npc-card-avatar-fallback">
                {npc.name ? npc.name.charAt(0) : "👤"}
            </span>
        );
    }

    return (
        <span className="npc-card-avatar">
            <img 
                src={npc.avatar} 
                alt={npc.name} 
                className="npc-card-avatar-img"
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
            />
        </span>
    );
}

function SettlementMenu({ onClose, settlementName, character, onUpdateCharacter }) {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [activeDialogueNpc, setActiveDialogueNpc] = useState(null);

    const cityPlaces = [
        { id: "shop", name: "Крамниця скупщика", icon: "💰", desc: "Стелажі ломилися від заморських речей, спецій та блискучих баночок." },
        { id: "blacksmith", name: "Кузня", icon: "⚒️", desc: "Гудіння палючого білявого полум'я горна та дзвін металу по важкому ковадлу." },
        { id: "market", name: "Базар", icon: "⚖️", desc: "Галаслива площа, заповнена прилавками з свіжими фруктами, травами та ліками." },
        { id: "adventurers_guild", name: "Гільдія шукачів пригод", icon: "⚔️", desc: "Дерев'яні столи, розвішані карти та відомості про замовлення." },
        { id: "merchants_guild", name: "Гільдія Купців", icon: "📜", desc: "Тиха велична зала, де пишуть угоди та де пильно рахують капітал." },
        { id: "tavern", name: "Корчма", icon: "🍺", desc: "Повна затишку зала з запахом смаженої дичини та свіжого темного пива." },
        { id: "barber", name: "Цирульник", icon: "✂️", desc: "Очищений кабінет цілителя з акуратно викладеними травами та скляними колбами." },
        { id: "hunter", name: "Ловчий", icon: "🏹", desc: "Дерев'яна хижа ловця, завішана шкурами хижаків, луками та точними стрілами." },
    ];

    // Шукаємо НПС для обраного місця
    const getNpcsForPlace = (placeId) => {
        return npcs.filter(npc => npc.placeId === placeId);
    };

    return (
        <div className="settlement-menu-panel">
            <header className="settlement-header">
                <div className="settlement-title-box">
                    <span className="settlement-icon">{selectedPlace ? selectedPlace.icon : "🏰"}</span>
                    <div>
                        <span className="settlement-label">{selectedPlace ? "Локація" : "Населений пункт"}</span>
                        <h3 className="settlement-name">
                            {selectedPlace ? selectedPlace.name : settlementName}
                        </h3>
                    </div>
                </div>
                {character && (
                    <div style={{ marginLeft: "auto", marginRight: "12px" }}>
                        <TimeDisplay character={character} size="small" />
                    </div>
                )}
                {selectedPlace ? (
                    <button className="back-settlement-btn" onClick={() => setSelectedPlace(null)}>←</button>
                ) : (
                    <button className="close-small-btn" onClick={onClose}>×</button>
                )}
            </header>
            
            <div className="settlement-content">
                {!selectedPlace ? (
                    // Список споруд селища
                    <div className="places-list">
                        {cityPlaces.map((place) => {
                            const placeNpcs = getNpcsForPlace(place.id);
                            return (
                                <button 
                                    key={place.id} 
                                    className="place-btn"
                                    onClick={() => setSelectedPlace(place)}
                                >
                                    <span className="place-icon">{place.icon}</span>
                                    <div className="place-info">
                                        <span className="place-name">{place.name}</span>
                                        {placeNpcs.length > 0 && (
                                            <span className="place-npcs-tag">👥 {placeNpcs.length} особи(а)</span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    // Інтер'єр споруди
                    <div className="place-interior">
                        <p className="place-desc">"{selectedPlace.desc}"</p>
                        
                        {selectedPlace.id === "tavern" && character && onUpdateCharacter && (
                            <div style={{ margin: "12px 0", background: "rgba(142, 68, 173, 0.15)", border: "1px solid rgba(162, 155, 254, 0.3)", padding: "12px", borderRadius: "10px", textAlign: "center" }}>
                                <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "#e0d0ff" }}>
                                    🛏️ <strong>Замовити кімнату у Корчмі</strong> — відпочити до ранку (08:00 AM) та повністю відновити здоров'я, ману та сон.
                                </p>
                                <button 
                                    className="place-btn"
                                    style={{ background: "linear-gradient(135deg, #8e44ad, #6c5ce7)", border: "none", width: "100%", padding: "10px", borderRadius: "8px", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
                                    onClick={() => {
                                        const rested = restUntilMorning(character);
                                        onUpdateCharacter(rested);
                                        alert("🌅 Ви гарно виспалися у теплому ліжку корчми! Показники відновлено до 100%, настав ранок (08:00 AM).");
                                    }}
                                >
                                    🌙 Відпочити у Корчмі (Перемотати на Ранок)
                                </button>
                            </div>
                        )}

                        <div className="interior-divider"></div>
                        
                        <div className="npcs-section">
                            <label className="npcs-title">Присутні персонажі</label>
                            {getNpcsForPlace(selectedPlace.id).length > 0 ? (
                                <div className="npcs-list">
                                    {getNpcsForPlace(selectedPlace.id).map((npc) => (
                                        <div 
                                            key={npc.id} 
                                            className="npc-row-card"
                                            onClick={() => setActiveDialogueNpc(npc)}
                                        >
                                            <NPCRowAvatar npc={npc} />
                                            <div className="npc-card-details">
                                                <h5>{npc.name}</h5>
                                                <span>{npc.title}</span>
                                            </div>
                                            <span className="npc-chat-bubble-indicator">💬</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-npcs">Тут зараз немає нікого з мешканців...</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Модальне вікно діалогу */}
            {activeDialogueNpc && (
                <NPCDialogue 
                    npc={activeDialogueNpc}
                    character={character}
                    onUpdateCharacter={onUpdateCharacter}
                    onClose={() => setActiveDialogueNpc(null)}
                />
            )}
        </div>
    );
}

export default SettlementMenu;