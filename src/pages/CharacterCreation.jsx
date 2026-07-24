import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CharacterCreation.css";

const iconNames = ["icon1.png", "icon2.png", "icon3.png", "icon4.png", "icon5.png"];

function CharacterCreation() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
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
        if (!nickname.trim() || !selectedTrait) {
            alert("Заповніть всі поля!");
            return;
        }

        const characterData = {
            nickname: nickname,
            icon: selectedIcon,
            trait: selectedTrait,
            level: 1,
            xp: 0,
            maxXp: 100,
            hp: 100,
            mp: 100,
            food: 100,
            water: 100,
            sleep: 100,
            locationId: "start_village",
            locationName: "Селище 'Початок'",
            copper: 150, // 1 срібна монета + 50 мідних
            day: 1,
            hour: 8,
            minute: 0,
            // НОВЕ: Спорядження та Інвентар
            equipment: {
                head: null,
                chest: null,
                legs: null,
                weapon: null,
                shield: null
            },
            inventory: [] 
        };

        localStorage.setItem("player_character", JSON.stringify(characterData));
        navigate("/game");
    };

    return (
        <div className="creation-page">
            <div className="creation-container">
                <header className="creation-header">
                    <h1>Створення героя</h1>
                    <p>Налаштуйте параметри вашої пригоди</p>
                </header>
                <div className="creation-form">
                    <div className="form-section">
                        <label>Ім'я персонажа</label>
                        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={15} placeholder="Нікнейм..."/>
                    </div>
                    <div className="form-section">
                        <label>Аватар</label>
                        <div className="icon-grid">
                            {icons.map((icon, i) => (
                                <div key={i} className={`icon-item ${selectedIcon === icon ? "active" : ""}`} onClick={() => setSelectedIcon(icon)}>
                                    <img src={icon} alt="icon" onError={(e) => e.target.src = "https://via.placeholder.com/64"}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="form-section">
                        <label>Вміння</label>
                        <div className="traits-list">
                            {traits.map(t => (
                                <div key={t.id} className={`trait-card ${selectedTrait?.id === t.id ? "active" : ""}`} onClick={() => setSelectedTrait(t)}>
                                    <span className="trait-name">{t.name}</span>
                                    <span className="trait-desc">{t.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="creation-footer">
                    <button className="btn-back" onClick={() => navigate("/")}>Назад</button>
                    <button className="btn-confirm" onClick={handleCreate}>Створити</button>
                </footer>
            </div>
        </div>
    );
}

export default CharacterCreation;