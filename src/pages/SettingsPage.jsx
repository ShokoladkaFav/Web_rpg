import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";

function SettingsPage() {
    const navigate = useNavigate();

    const [musicVolume, setMusicVolume] = useState(() => {
        const saved = localStorage.getItem("musicVolume");
        return saved !== null ? Number(saved) : 75;
    });

    const [soundVolume, setSoundVolume] = useState(() => {
        const saved = localStorage.getItem("soundVolume");
        return saved !== null ? Number(saved) : 50;
    });

    useEffect(() => {
        localStorage.setItem("musicVolume", musicVolume.toString());
    }, [musicVolume]);

    useEffect(() => {
        localStorage.setItem("soundVolume", soundVolume.toString());
    }, [soundVolume]);

    return (
        <div className="settings-page">
            <div className="settings-container">
                <header className="settings-header">
                    <h1 className="settings-title">Settings</h1>
                    <p className="settings-subtitle">Configure your experience</p>
                </header>
                <div className="settings-panel">
                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Music Volume</label>
                            <span className="volume-value">{musicVolume}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={musicVolume}
                            onChange={(e) => setMusicVolume(Number(e.target.value))}
                            className="modern-slider" 
                        />
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <label>Sound Effects</label>
                            <span className="volume-value">{soundVolume}%</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={soundVolume}
                            onChange={(e) => setSoundVolume(Number(e.target.value))}
                            className="modern-slider" 
                        />
                    </div>
                </div>
                <button className="back-btn" onClick={() => navigate("/")}>
                    Back to Menu
                </button>
            </div>
        </div>
    );
}

export default SettingsPage;
