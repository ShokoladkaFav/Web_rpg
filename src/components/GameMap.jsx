import { useState, useRef, useEffect } from "react";
import "../styles/GameMap.css";
import mapImage from "../assets/map/map.png";

function GameMap({ onClose }) {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const viewportRef = useRef(null);
    const imgRef = useRef(null);

    // Скидання позиції при зміні зуму, щоб уникнути багів з межами
    useEffect(() => {
        setPosition({ x: 0, y: 0 });
    }, [zoom]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 1)); // Мінімум 1, щоб карта не була меншою за вікно

    const handleReset = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const onMouseMove = (e) => {
        if (!isDragging || !viewportRef.current || !imgRef.current) return;

        const vWidth = viewportRef.current.offsetWidth;
        const vHeight = viewportRef.current.offsetHeight;
        
        // Розміри картинки з урахуванням зуму
        const iWidth = imgRef.current.offsetWidth * zoom;
        const iHeight = imgRef.current.offsetHeight * zoom;

        let newX = e.clientX - startPos.x;
        let newY = e.clientY - startPos.y;

        // ЛОГІКА ОБМЕЖЕННЯ (Clamping)
        // Обчислюємо максимально допустиме зміщення в кожну сторону
        const maxX = Math.max(0, (iWidth - vWidth) / 2);
        const maxY = Math.max(0, (iHeight - vHeight) / 2);

        // Затискаємо координати між -max та +max
        newX = Math.max(-maxX, Math.min(maxX, newX));
        newY = Math.max(-maxY, Math.min(maxY, newY));

        setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => setIsDragging(false);

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
                    <img 
                        ref={imgRef}
                        src={mapImage} 
                        alt="Game Map" 
                        className="map-image"
                        draggable="false"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                    />
                </div>
                <footer className="map-footer">
                    Межі карти обмежені розміром вікна
                </footer>
            </div>
        </div>
    );
}

export default GameMap;
