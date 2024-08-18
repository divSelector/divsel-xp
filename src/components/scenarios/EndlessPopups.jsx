import { useState, useEffect } from 'react';
import AlertPopup from "../windows/AlertPopup";
import { getRandomHackerMessage } from "../../data/dialog";
import { useNavigate } from "react-router-dom";
import useLocalStorage from '../../hooks/useLocalStorage';
import { useScenario } from '../../context/scenario';

export default function EndlessPopups({ startAt, perMiliSec, endAt, setShowOptions = false, postScenarioSetter = false }) {
    const [windowPositions, setWindowPositions] = useState([]);

    const navigate = useNavigate()

    const { scenarioIdx, setScenarioIdx } = useScenario()

    let closedAllPopups, setClosedAllPopups
    if (postScenarioSetter) {
        [closedAllPopups, setClosedAllPopups] = useState(false)
    } else {
        [closedAllPopups, setClosedAllPopups] = useLocalStorage('endless-popups-1', false)
    }

    const checkIfAllPopupsClosed = () => {
        let popups = document.querySelectorAll('.desktop > .popup');
        if (popups.length != 0 && popups.length <= 1) {
            setClosedAllPopups(true);
            if (postScenarioSetter) postScenarioSetter(false)
            if (setShowOptions) setShowOptions(true)
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
        if (!closedAllPopups) calculateInitialPositions(startAt)
    }, [])

    useEffect(() => {
        if (!closedAllPopups) checkIfAllPopupsClosed()
    }, [windowPositions])

    useEffect(() => {
        if (!postScenarioSetter && closedAllPopups) {
            if (scenarioIdx == 0) {
                setScenarioIdx(1)
            }
        }
        if (!closedAllPopups) {
            if (Object.keys(windowPositions).length > endAt) {
                setWindowPositions([])
                navigate('/gameover')
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