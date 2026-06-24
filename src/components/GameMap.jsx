import { useState, useRef, useEffect } from "react";
import "../styles/GameMap.css";
import mapImage from "../assets/map/map.png";

function GameMap({ onClose, playerLocationId, onSelectLocation }) {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const viewportRef = useRef(null);
    const imgRef = useRef(null);

    const settlements = [
        { id: "start_village", name: "Селище 'Дьювотер'", x: 39, y: 56 },
        { id: "village2", name: "Слітденн", x: 34, y: 60 },
        { id: "capital", name: "Столиця 'Емберхолд'", x: 30.5, y: 66 },
        { id: "village3", name: "Мітгейт", x: 33, y: 90 },
        { id: "village4", name: "Бран", x: 24.5, y: 66 },
        { id: "village5", name: "Доункрест", x: 20, y: 74 },
        { id: "village6", name: "Стілмедоу", x: 19, y: 55 },
        { id: "village7", name: "Елдерхенд", x: 12, y: 61 },
        { id: "village8", name: "Шіммерспайр", x: 19, y: 55 },
        { id: "village9", name: "Руїни старої фортеці", x: 6, y: 58 },
        { id: "village10", name: "Фарвінд", x: 8, y: 48 },
        { id: "village11", name: "Мідспайр", x: 17.5, y: 38 },
        { id: "village12", name: "Велике Дерево", x: 19.7, y: 34 },
        { id: "village13", name: "Бріджмаут", x: 39, y: 37 },
        { id: "village14", name: "Фолфорд", x: 55.5, y: 41.5 },
        { id: "village15", name: "Мадвінд", x: 91.5, y: 39.5 },
        { id: "village16", name: "Фортеця дворфів", x: 77.7, y: 53 },
        { id: "village17", name: "Шіммерглен", x: 59.5, y: 58 },
        { id: "village18", name: "Віндхем", x: 55, y: 74.5 },
        { id: "village19", name: "Шрауд'ярд", x: 68.5, y: 64.6 },
        { id: "village20", name: "Рейвенхоллоу", x: 76.8, y: 69 },
        { id: "village21", name: "Амбервік", x: 89.4, y: 69 },
        { id: "village22", name: "Мадфрост", x: 74.5, y: 39 },
    ];

    useEffect(() => {
        setPosition({ x: 0, y: 0 });
    }, [zoom]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 1));
    const handleReset = () => { setZoom(1); setPosition({ x: 0, y: 0 }); };

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const onMouseMove = (e) => {
        if (!isDragging || !viewportRef.current || !imgRef.current) return;
        const vWidth = viewportRef.current.offsetWidth;
        const vHeight = viewportRef.current.offsetHeight;
        const iWidth = imgRef.current.offsetWidth * zoom;
        const iHeight = imgRef.current.offsetHeight * zoom;

        let newX = e.clientX - startPos.x;
        let newY = e.clientY - startPos.y;

        const maxX = Math.max(0, (iWidth - vWidth) / 2);
        const maxY = Math.max(0, (iHeight - vHeight) / 2);

        newX = Math.max(-maxX, Math.min(maxX, newX));
        newY = Math.max(-maxY, Math.min(maxY, newY));
        setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => setIsDragging(false);

    const handleSettlementClick = (id, name) => {
        if (id === playerLocationId) {
            alert("Ви вже перебуваєте в цьому місці!");
            return;
        }
        
        if (window.confirm(`Вирушити до: ${name}?`)) {
            onSelectLocation(id, name);
            onClose();
        }
    };

    return (
        <div className="map-modal-overlay" onClick={onClose}>
            <div className="map-window" onClick={(e) => e.stopPropagation()}>
                <header className="map-header">
                    <span className="map-title">🗺️ Світова карта</span>
                    <div className="map-controls">
                        <button onClick={handleReset}>🎯</button>
                        <div className="zoom-group">
                            <button onClick={handleZoomOut}>−</button>
                            <span className="zoom-text">{Math.round(zoom * 100)}%</span>
                            <button onClick={handleZoomIn}>+</button>
                        </div>
                        <button className="close-map" onClick={onClose}>×</button>
                    </div>
                </header>
                
                <div 
                    className="map-viewport" 
                    ref={viewportRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                >
                    <div 
                        className="map-content"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                    >
                        <img ref={imgRef} src={mapImage} alt="Map" className="map-image" draggable="false" />

                        {settlements.map((s) => {
                            const isPlayerHere = s.id === playerLocationId;
                            return (
                                <div 
                                    key={s.id}
                                    className={`map-marker ${isPlayerHere ? "player-here" : ""}`}
                                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                                    onClick={() => handleSettlementClick(s.id, s.name)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <div className="marker-icon">
                                        {isPlayerHere ? "👤" : "🏰"}
                                        {isPlayerHere && <div className="pulse-ring"></div>}
                                    </div>
                                    <span className="marker-label">
                                        {isPlayerHere ? "Ви тут" : s.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameMap;
