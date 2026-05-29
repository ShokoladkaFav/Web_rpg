import "../styles/SettingsPage.css";

function SettingsPage() {
    return (
        <div className="settings-page">

            <div className="settings-overlay">

                <div className="settings-panel">

                    <h1 className="settings-title">
                        Settings
                    </h1>

                    <div className="setting-item">

                        <label>Music Volume</label>

                        <input
                            type="range"
                            min="0"
                            max="100"
                        />

                    </div>

                    <div className="setting-item">

                        <label>Sound Effects</label>

                        <input
                            type="range"
                            min="0"
                            max="100"
                        />

                    </div>

                    <div className="setting-item checkbox-item">

                        <label>Fullscreen</label>

                        <input type="checkbox" />

                    </div>

                    <button className="back-button">
                        Back
                    </button>

                </div>

            </div>

        </div>
    );
}

export default SettingsPage;