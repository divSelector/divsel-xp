import { useState, useEffect } from 'react';
import AlertPopup from "../windows/AlertPopup";
import { getRandomHackerMessage } from "../../data/dialog";
import { useNavigate } from "react-router-dom";

export default function EndlessPopups({ startAt, perMiliSec, endAt }) {
    const [windowPositions, setWindowPositions] = useState([]);
    const [closedAllPopups, setClosedAllPopups] = useState(false);

    const navigate = useNavigate()

    const checkIfAllPopupsClosed = () => {
        let popups = document.querySelectorAll('.desktop > .window');
        if (popups.length > 2) {
            setClosedAllPopups(false);
        } else {
            setClosedAllPopups(true);
        }
    };

    const calculateSpaceForWindow = (width = 300, height = 200) => {
        return [window.innerWidth - width, window.innerHeight - height];
    };

    const calculateInitialPositions = (n) => {
        const [maxX, maxY] = calculateSpaceForWindow();

        // Generate random positions for the windows
        const newWindowPositions = {};
        for (let i = 0; i < n; i++) {
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            newWindowPositions[i] = { x: randomX, y: randomY };
        }

        setWindowPositions(newWindowPositions);
    };

    useEffect(() => {
        calculateInitialPositions(startAt)
    }, [])

    useEffect(() => {
        checkIfAllPopupsClosed()
    }, [windowPositions])

    useEffect(() => {
        if (!closedAllPopups) {
            if (Object.keys(windowPositions).length > endAt) {

                // TODO FAILURE
                console.log("FAILURE")
                setWindowPositions([])
                navigate('/xp/gameover')
            }

            const interval = setInterval(() => {
                const [maxX, maxY] = calculateSpaceForWindow();

                const newWindowPositions = { ...windowPositions };
                const newWindowId = Object.keys(newWindowPositions).length;

                const randomX = Math.random() * maxX;
                const randomY = Math.random() * maxY;
                newWindowPositions[newWindowId] = { x: randomX, y: randomY };

                setWindowPositions(newWindowPositions);

            }, perMiliSec);

            return () => {
                clearInterval(interval);
            };
        }
    }, [closedAllPopups, windowPositions]);

    return (
        <>
            {Object.keys(windowPositions).map((key) => (
                <AlertPopup
                    key={key}
                    id={"popup-window" + key}
                    initialPosition={windowPositions[key]}
                    windowMessage={getRandomHackerMessage()}
                    windowTitle="Hello :)"
                />
            ))}

        </>
    )
}