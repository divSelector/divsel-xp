import { useState, useEffect } from 'react';

export default function useDrag({ initialPosition, windowSize, shouldRaiseZIndex }) {
    const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [zIndex, setZIndex] = useState(1);

    const dragMouseDownTitleBar = (e) => {
        if (shouldRaiseZIndex) raiseZIndexOfWindow();

        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const getHighestZIndexOfWindow = () => {
        const highestZIndex = [...document.querySelectorAll('.window')]
            .map(windowElement => parseInt(getComputedStyle(windowElement).zIndex, 10))
            .filter(zIndexValue => !isNaN(zIndexValue))
            .reduce((maxZIndex, zIndexValue) => Math.max(maxZIndex, zIndexValue), 1);
        return highestZIndex;
    };

    const raiseZIndexOfWindow = () => {
        const highestZIndex = getHighestZIndexOfWindow()

        setZIndex(highestZIndex + 1);
    }

    const dragMouseDownWindow = (e) => {
        if (shouldRaiseZIndex) raiseZIndexOfWindow();
    }

    const dragMouseUpWindow = () => {
        setIsDragging(false);
    };

    const dragMouseMoveWindow = (e) => {
        if (!isDragging) return;
        setPosition({
            x: Math.max(Math.min(e.clientX - dragOffset.x, window.innerWidth - windowSize.x), 0),
            y: Math.max(Math.min(e.clientY - dragOffset.y, window.innerHeight - windowSize.y), 0),
        });
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', dragMouseMoveWindow);
            document.addEventListener('mouseup', dragMouseUpWindow);
        } else {
            document.removeEventListener('mousemove', dragMouseMoveWindow);
            document.removeEventListener('mouseup', dragMouseUpWindow);
        }

        return () => {
            document.removeEventListener('mousemove', dragMouseMoveWindow);
            document.removeEventListener('mouseup', dragMouseUpWindow);
        };
    }, [isDragging]);

    return {
        position,
        setPosition,
        zIndex,
        setZIndex,
        dragMouseDownTitleBar,
        dragMouseDownWindow,
        dragMouseUpWindow,
        dragMouseMoveWindow,
    }

}