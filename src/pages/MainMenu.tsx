import "../styles/MainMenu.css";
import { useNavigate } from "react-router-dom";

function MainMenu() {

    const navigate = useNavigate();

    return (
        <div className="main-menu">

            <div className="overlay">

                <div className="menu-panel">

                    <h1 className="game-title">WEB RPG</h1>

                    <p className="game-subtitle">
                        Medieval Fantasy Adventure
                    </p>

                    <div className="menu-buttons">

                        <button
                            className="menu-button"
                            onClick={() => navigate("/game")}
                        >
                            Play
                        </button>

                        <button
                            className="menu-button"
                            onClick={() => navigate("/settings")}
                        >
                            Settings
                        </button>

                        <button
                            className="menu-button"
                            onClick={() => alert("Exit clicked")}
                        >
                            Exit
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MainMenu;