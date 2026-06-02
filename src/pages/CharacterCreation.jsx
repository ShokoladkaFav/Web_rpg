import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CharacterCreation.css";

// Масив з назвами файлів іконок
const iconNames = ["icon1.png", "icon2.png", "icon3.png"];

function CharacterCreation() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    
    // Створюємо повні шляхи до іконок
    const icons = iconNames.map(name => `/src/assets/player_icon/${name}`);
    
    const [selectedIcon, setSelectedIcon] = useState(icons[0]);
    const [selectedTrait, setSelectedTrait] = useState(null);

    const traits = [
        { id: 1, name: "Майстер фехтування", desc: "+20% на фізичну атаку" },
        { id: 2, name: "Мандрівник", desc: "Менші витрати ситості, води та сну" },
        { id: 3, name: "Мисливець", desc: "Дає змогу полювати на диких тварин" },
        { id: 4, name: "Різнороб", desc: "+10 до всіх цивільних вмінь" },
        { id: 5, name: "Скиталець", desc: "Отримує на 20% більше речей" }
    ];

    const handleCreate = () => {
        if (!nickname.trim()) {
            alert("Будь ласка, введіть ім'я героя!");
            return;
        }
        if (!selectedTrait) {
            alert("Оберіть спеціалізацію!");
            return;
        }

        const characterData = {
            nickname: nickname,
            icon: selectedIcon,
            trait: selectedTrait,
            level: 1,
            hp: 100,
            mp: 100
        };

        localStorage.setItem("player_character", JSON.stringify(characterData));
        navigate("/game");
    };

    return (
        <div className="creation-page">
            <div className="creation-container">
                <header className="creation-header">
                    <h1>Створення героя</h1>
                    <p>Налаштуйте свого персонажа перед початком</p>
                </header>

                <div className="creation-form">
                    <div className="form-section">
                        <label>Ім'я персонажа</label>
                        <input 
                            type="text" 
                            placeholder="Наприклад: Ragnar..." 
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            maxLength={15}
                        />
                    </div>

                    <div className="form-section">
                        <label>Зовнішність (Оберіть аватар)</label>
                        <div className="icon-grid">
                            {icons.map((iconPath, index) => (
                                <div 
                                    key={index}
                                    className={`icon-item ${selectedIcon === iconPath ? "active" : ""}`}
                                    onClick={() => setSelectedIcon(iconPath)}
                                >
                                    <img 
                                        src={iconPath} 
                                        alt="Avatar" 
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/64?text=Icon";
                                        }} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <label>Спеціалізація</label>
                        <div className="traits-list">
                            {traits.map((trait) => (
                                <div 
                                    key={trait.id}
                                    className={`trait-card ${selectedTrait?.id === trait.id ? "active" : ""}`}
                                    onClick={() => setSelectedTrait(trait)}
                                >
                                    <span className="trait-name">{trait.name}</span>
                                    <span className="trait-desc">{trait.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="creation-footer">
                    <button className="btn-back" onClick={() => navigate("/")}>Назад</button>
                    <button className="btn-confirm" onClick={handleCreate}>Почати пригоду</button>
                </footer>
            </div>
        </div>
    );
}

export default CharacterCreation;
