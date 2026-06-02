import "../styles/MainMenu.css";
import { useNavigate } from "react-router-dom";

function MainMenu() {
    const navigate = useNavigate();

    return (
        <div className="main-menu">
            <div className="container">
                <header className="header">
                    <h1 className="title">WEB<span>RPG</span></h1>
                    <div className="divider"></div>
                    <p className="subtitle">Modern Fantasy Experience</p>
                </header>

                <nav className="nav-menu">
                    <button className="btn btn-primary" onClick={() => navigate("/create")}>
                        Start Game
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/settings")}>
                        Settings
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default MainMenu;
