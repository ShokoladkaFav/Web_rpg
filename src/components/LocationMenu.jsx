import "../styles/LocationMenu.css";

function LocationMenu({ onClose, currentLocationId, onSelectSubLocation }) {
    // База даних внутрішніх локацій для кожного поселення
    const settlementSubLocations = {
        "start_village": [
            { id: "forest", name: "Ліс", icon: "🌲" },
            { id: "lake", name: "Озеро", icon: "🌊" },
            { id: "beach", name: "Пляж", icon: "🏖️" },
            { id: "north_forest", name: "Північний ліс", icon: "🌳" },
            { id: "abvol_rock", name: "Скеля 'Абволь'", icon: "⛰️" }
        ],
        "village2": [
            { id: "main_square", name: "Головна площа", icon: "⚖️" },
            { id: "old_well", name: "Стара криниця", icon: "🕳️" }
        ],
        "village1": [
            { id: "carrow_plain", name: "Рівнина Карроу", icon: "🌾" },
            { id: "dead_plain", name: "Рівнина мерців", icon: "💀" },
            { id: "forest_outskirts", name: "Околиці лісу", icon: "🌲" }
        ],
        "capital": [
            { id: "dead_plain", name: "Рівнина мерців", icon: "💀" },
            { id: "wild_lands", name: "Дикі землі", icon: "🐾" },
            { id: "slums", name: "Нетрі", icon: "🏚️" }
        ],
        "town_1": [
            { id: "silver_forest", name: "Срібний ліс", icon: "🌲" },
            { id: "sea_bay", name: "Морська бухта", icon: "🌊" },
            { id: "outskirts", name: "Околиці", icon: "🏞️" },
            { id: "old_settlement_ruins", name: "Руїни старого поселення", icon: "🏛️" }
        ],
        "desert_village1": [
            { id: "desert_land", name: "Пустельна земля", icon: "🏜️" },
            { id: "wasteland", name: "Пустка", icon: "🌵" },
            { id: "desert_ruins", name: "Руїни пустельного поселення", icon: "🏚️" }
        ],
        "desert_village2": [
            { id: "old_settlements_ruins", name: "Руїни старих поселень", icon: "🏛️" },
            { id: "oasis", name: "Оазис", icon: "🌴" },
            { id: "old_volcano", name: "Старий вулкан", icon: "🌋" }
        ],
        "desert_village5": [
            { id: "wasteland", name: "Пустка", icon: "🌵" },
            { id: "desert_rocks", name: "Пустельні скелі", icon: "🪨" },
            { id: "desert_gorge", name: "Пустельна ущелина", icon: "🌄" }
        ],
        "desert_village4": [
            { id: "desert_wasteland", name: "Пустельна пустка", icon: "🏜️" }
        ],
        "desert_destroy": [
            { id: "slums", name: "Нетрі", icon: "🏚️" },
            { id: "small_sea_bay", name: "Мала морська бухта", icon: "🌊" },
            { id: "desert_lands", name: "Пустельні землі", icon: "🏜️" }
        ],
        "desert_town": [
            { id: "desert_sea_forest", name: "Пустельно-морський ліс", icon: "🌴" },
            { id: "desert_lands", name: "Пустельні землі", icon: "🏜️" },
            { id: "grand_bay", name: "Велика бухта", icon: "🌊" },
            { id: "forest_plateau", name: "Лісне плато", icon: "🌲" }
        ],
        "town_2": [
            { id: "deep_old_forest", name: "Глибокий старий ліс", icon: "🌲" },
            { id: "old_forest_outskirts", name: "Околиці старого лісу", icon: "🌳" },
            { id: "ancient_lands_journey", name: "Подорож в стародавні землі", icon: "🗺️" },
            { id: "forest_city_dungeon", name: "Підземелля \"Лісне місто\"", icon: "🕳️" }
        ],
        "elf_capital": [
            { id: "deep_old_forest", name: "Глибокий старий ліс", icon: "🌲" },
            { id: "old_forest_outskirts", name: "Околиці старого лісу", icon: "🌳" },
            { id: "sea_territory_old_forest", name: "Морська територія старого лісу", icon: "🌊" }
        ],
        "port_town_1": [
            { id: "north_forest", name: "Північний ліс", icon: "🌲" },
            { id: "lake_bay", name: "Озеро-бухта", icon: "🌊" },
            { id: "sea_ruins", name: "Морські руїни", icon: "🏛️" }
        ]
    };

    const defaultSubLocations = [
        { id: "center", name: "Центр поселення", icon: "🏛️" },
        { id: "tavern", name: "Місцева таверна", icon: "🍺" },
        { id: "market", name: "Торгові ряди", icon: "⚖️" },
        { id: "outskirts", name: "Околиці", icon: "🌲" }
    ];

    // Визначаємо список під-локацій для поточного місця перебування гравця
    const currentSubLocations = settlementSubLocations[currentLocationId] || defaultSubLocations;

    // Функція обробки вибору локації
    const handleSubLocationMove = (loc) => {
        // Передаємо весь об'єкт {id, name, icon} у GamePage
        onSelectSubLocation(loc);
        onClose();
    };

    return (
        <div className="location-menu-panel">
            <header className="location-header">
                <span className="location-title">📍 Переміщення</span>
                <button className="close-small-btn" onClick={onClose}>×</button>
            </header>
            
            <div className="location-content">
                {currentSubLocations.length > 0 ? (
                    <div className="location-list">
                        {currentSubLocations.map((loc) => (
                            <button 
                                key={loc.id} 
                                className="sub-location-btn"
                                onClick={() => handleSubLocationMove(loc)}
                            >
                                <span className="sub-loc-icon">{loc.icon}</span>
                                <span className="sub-loc-name">{loc.name}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="empty-locations">
                        <p>Тут немає відомих місць для дослідження</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationMenu;