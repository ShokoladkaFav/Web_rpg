import { useState, useEffect } from "react";
import "../styles/NPCDialogue.css";
import { CoinsDisplay } from "../utils/currency.jsx";
import FoodShopModal from "./FoodShopModal.jsx";

function NPCDialogue({ npc, character, onUpdateCharacter, onClose }) {
    // Обираємо випадкове вітання при відкритті вікна
    const [npcSpeech, setNpcSpeech] = useState("");
    const [actionLog, setActionLog] = useState("");
    const [isActionDone, setIsActionDone] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [isFoodShopOpen, setIsFoodShopOpen] = useState(false);

    useEffect(() => {
        if (npc && npc.greetings) {
            const randomIndex = Math.floor(Math.random() * npc.greetings.length);
            setNpcSpeech(npc.greetings[randomIndex]);
        }
        setActionLog("");
        setIsActionDone(false);
        setImgError(false);
    }, [npc]);

    if (!npc) return null;

    // Обробка діалогових відповідей
    const handleOptionClick = (response) => {
        setNpcSpeech(response);
        setActionLog(""); // очистити лог дій при зміні репліки
    };

    // Виконати унікальну дію NPC
    const handleActionClick = (action) => {
        if (!character || !onUpdateCharacter) return;
        
        let updatedChar = { ...character };
        let logText = action.successText;

        // Ініціалізація інвентарю, якщо його раптом немає
        if (!Array.isArray(updatedChar.inventory)) {
            updatedChar.inventory = [];
        }

        // Обмеження на максимальний розмір інвентарю
        const isInventoryFull = updatedChar.inventory.filter(i => i !== null).length >= 12;

        switch (action.id) {
            case "heal":
                // Відновити здоров'я та ману
                updatedChar.hp = 100;
                updatedChar.mp = 100;
                break;
            case "rent_room":
                // Відновити сон
                updatedChar.sleep = 100;
                break;
            case "buy_food":
                if (isInventoryFull) {
                    logText = "Неможливо купити: ваш інвентар порожній чи заповнений!";
                } else {
                    updatedChar.food = 100;
                    updatedChar.water = 100;
                    updatedChar.inventory.push({ name: "Пайок Софії", icon: "🍎" });
                }
                break;
            case "buy_arrows":
                if (isInventoryFull) {
                    logText = "Неможливо купити: інвентар повністю заповнено!";
                } else {
                    updatedChar.inventory.push({ name: "Якісні стріли", icon: "🏹" });
                }
                break;
            case "get_contract":
                if (isInventoryFull) {
                    logText = "Неможливо взяти контракт: звільніть місце в інвентарі!";
                } else {
                    // Перевіряємо чи вже є такий контракт
                    const hasContract = updatedChar.inventory.some(item => item && item.name === "Контракт на монстра");
                    if (hasContract) {
                        logText = "У вас вже є активний контракт у інвентарі!";
                    } else {
                        updatedChar.inventory.push({ name: "Контракт на монстра", icon: "📜" });
                    }
                }
                break;
            case "trade":
                if (isInventoryFull) {
                    logText = "Олаф хитає головою: 'Спершу звільни місце у своєму наплічнику!'";
                } else {
                    updatedChar.inventory.push({ name: "Чародейне зілля", icon: "🧪" });
                }
                break;
            case "repair":
                // Даруємо точильний камінь, якщо є місце
                if (!isInventoryFull) {
                    const hasStone = updatedChar.inventory.some(item => item && item.name === "Точильний камінь");
                    if (!hasStone) {
                        updatedChar.inventory.push({ name: "Точильний камінь", icon: "🪨" });
                        logText += " Брун також подарував вам надійний Точильний камінь!";
                    }
                }
                break;
            case "get_licence":
                // Проста дія відмова за сценарієм
                break;
            case "buy_cooked_food":
                setIsFoodShopOpen(true);
                break;
            default:
                break;
        }

        // Зберегти оновленого персонажа
        onUpdateCharacter(updatedChar);
        setActionLog(logText);
        setIsActionDone(true);
    };

    return (
        <div className="npc-dialogue-overlay" onClick={onClose}>
            <div className="npc-dialogue-window" onClick={(e) => e.stopPropagation()}>
                <header className="npc-dialogue-header">
                    <div className="npc-status-info">
                        <span className="npc-pulse">●</span> Active Dialogue
                    </div>
                    {character && (
                        <div style={{ marginLeft: "auto", marginRight: "16px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(0,0,0,0.3)", padding: "3px 10px", borderRadius: "12px", border: "1px solid rgba(255,215,0,0.2)" }}>
                            <span style={{ fontSize: "11px", color: "#aaa" }}>Ваші монети:</span>
                            <CoinsDisplay totalCopper={character.copper || 0} size="small" />
                        </div>
                    )}
                    <button className="npc-close-btn" onClick={onClose}>×</button>
                </header>

                <div className="npc-dialogue-body">
                    {/* Ліва частина: Аватар та Опис */}
                    <div className="npc-sidebar">
                        <div className="npc-avatar-box">
                            {imgError || !npc.avatar ? (
                                <div className="npc-avatar-fallback">
                                    {npc.name ? npc.name.charAt(0) : "👤"}
                                </div>
                            ) : (
                                <img 
                                    src={npc.avatar} 
                                    alt={npc.name} 
                                    className="npc-avatar-img"
                                    onError={() => setImgError(true)}
                                    referrerPolicy="no-referrer"
                                />
                            )}
                        </div>
                        <h3 className="npc-sidebar-name">{npc.name}</h3>
                        <span className="npc-sidebar-title">{npc.title}</span>
                        <div className="npc-sidebar-divider"></div>
                        <p className="npc-sidebar-desc">{npc.description}</p>
                    </div>

                    {/* Права частина: Діалогова репліка та вибір дій */}
                    <div className="npc-chat-section">
                        <div className="speech-bubble-container">
                            <div className="speech-npc-name">{npc.name}</div>
                            <div className="speech-bubble">
                                <p>{npcSpeech}</p>
                                {actionLog && (
                                    <div className="action-success-alert">
                                        <span className="alert-sparkle">✨</span> {actionLog}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="dialog-options-label">Ваші відповіді та рішення</div>
                        <div className="dialog-options-list">
                            {/* Відображення звичайних діалогових опцій */}
                            {npc.dialogOptions && npc.dialogOptions.map((opt, index) => (
                                <button 
                                    key={index} 
                                    className="dialog-option-btn"
                                    onClick={() => handleOptionClick(opt.response)}
                                >
                                    💬 "{opt.text}"
                                </button>
                            ))}

                            {/* Робочі кнопки активності */}
                            {npc.actions && npc.actions.map((act) => (
                                <button 
                                    key={act.id} 
                                    className="dialog-action-btn"
                                    onClick={() => handleActionClick(act)}
                                >
                                    ⚡ {act.label}
                                </button>
                            ))}

                            {/* Кнопка повернення/закриття */}
                            <button className="dialog-option-btn close-option" onClick={onClose}>
                                🚪 "Дякую, мені час йти. Бувай!"
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isFoodShopOpen && (
                <FoodShopModal 
                    character={character} 
                    onUpdateCharacter={onUpdateCharacter} 
                    onClose={() => setIsFoodShopOpen(false)} 
                />
            )}
        </div>
    );
}

export default NPCDialogue;
