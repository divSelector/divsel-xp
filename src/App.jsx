import React, { useState, useEffect } from 'react';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import './style/app.css';

function App() {
  const [windowPositions, setWindowPositions] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [closedAllPopups, setClosedAllPopups] = useState(false);

  const checkIfAllPopupsClosed = () => {
    console.log("Checked if closed");
    let popups = document.querySelectorAll('.desktop > .window');
    console.log(popups.length);
    if (popups.length > 2) {
      console.log("Open");
      setClosedAllPopups(false); // Set closedAllPopups to false if there are still popups open
    } else {
      console.log("Closed");
      setClosedAllPopups(true);
    }
  };
  const calculateSpaceForWindow = (width = 300, height = 300) => {
    return [screenWidth - width, screenHeight - height];
  };

  const calculateInitialPositions = () => {
    const [maxX, maxY] = calculateSpaceForWindow();

    // Generate random positions for the windows
    const newWindowPositions = {};
    for (let i = 0; i < 8; i++) {
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      newWindowPositions[i] = { x: randomX, y: randomY };
    }

    setWindowPositions(newWindowPositions);
  };

  useEffect(() => {
    // Event listener for screen resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    calculateInitialPositions()
  }, [])

  useEffect(() => {
    checkIfAllPopupsClosed()
  }, [windowPositions])

  // Generate a new popup every ten seconds
  useEffect(() => {
    if (!closedAllPopups) {
      const interval = setInterval(() => {
        const [maxX, maxY] = calculateSpaceForWindow();

        const newWindowPositions = { ...windowPositions };
        const newWindowId = Object.keys(newWindowPositions).length;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        newWindowPositions[newWindowId] = { x: randomX, y: randomY };

        setWindowPositions(newWindowPositions);
        console.log(Object.keys(windowPositions).length)
      }, 2000); // 10000 milliseconds = 10 seconds

      return () => {
        clearInterval(interval);
      };
    }
  }, [closedAllPopups, windowPositions]);


  return (
    <div className="desktop">
      {Object.keys(windowPositions).map((key) => (
        <Window
          key={key}
          id={"window"+key}
          initialPosition={windowPositions[key]}
          initialWidth={300}
          popupMessage="Lulz you got hacked"
          popupTitle="Hello :)"
        />
      ))}

      <Taskbar />
    </div>
  );
}

export default App;
