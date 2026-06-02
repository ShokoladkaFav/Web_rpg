import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainMenu from "./pages/MainMenu";
import GamePage from "./pages/GamePage";
import SettingsPage from "./pages/SettingsPage";
import CharacterCreation from "./pages/CharacterCreation";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainMenu />} />
                
                <Route path="/create" element={<CharacterCreation />} />
                
                <Route path="/game" element={<GamePage />} />
                
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
