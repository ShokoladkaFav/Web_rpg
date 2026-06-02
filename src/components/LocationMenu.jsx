import "../styles/LocationMenu.css";

function LocationMenu({ onClose }) {
    const locations = [];

    return (
        <div className="location-menu-panel">
            <header className="location-header">
                <span className="location-title">📍 Переміщення</span>
                <button className="close-small-btn" onClick={onClose}>×</button>
            </header>
            
            <div className="location-content">
                {locations.length > 0 ? (
                    <div className="location-list">
                    </div>
                ) : (
                    <div className="empty-locations">
                        <p>Наразі немає доступних місць для швидкого переміщення</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationMenu;
