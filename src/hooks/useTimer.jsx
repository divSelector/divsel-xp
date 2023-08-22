import { useEffect, useState } from "react";

export default function useTimer(timeElemSelector) {

    const [currentTime, setCurrentTime] = useState('');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const formattedDateTime = now.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            setCurrentTime(formattedTime);
            setElapsedSeconds(prevElapsedSeconds => prevElapsedSeconds + 1);

            if (timeElemSelector) {
                const timeElement = document.querySelector(timeElemSelector);
                if (timeElement) {
                    timeElement.textContent = formattedTime;
                    timeElement.title = formattedDateTime;
                }
            }

        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return { currentTime, setCurrentTime, elapsedSeconds, setElapsedSeconds }
}