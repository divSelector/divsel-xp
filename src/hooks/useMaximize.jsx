import { useState } from 'react';

export default function useMaximize({ position, setPosition, windowSize}) {
    const [isMaximized, setIsMaximized] = useState(false);
    const [previousPosition, setPreviousPosition] = useState(position)

    const maximizeWindow = (e) => {
        setPreviousPosition(position)
        const eventWindow = e.target.parentElement.parentElement.parentElement
        if (isMaximized) {
            eventWindow.style.height = windowSize.y + "px"
            eventWindow.style.width = windowSize.x + 'px'
            eventWindow.style.maxWidth = windowSize.x + 'px'
            setPosition(previousPosition)
            setIsMaximized(false)

        } else {
            eventWindow.style.height = "100%"
            eventWindow.style.width = "100%"
            eventWindow.style.maxWidth = "unset"
            setPosition({ x: 0, y: 0 })
            setIsMaximized(true)
        }

    }

    return { maximizeWindow }

}