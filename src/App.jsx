import React, { useState, useEffect } from 'react';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import CmdPrompt from './components/CmdPrompt';
import DocumentsIcon from './assets/documents.png'
import CommandIcon from './assets/cmd.png'

function App() {
  const [windowPositions, setWindowPositions] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [closedAllPopups, setClosedAllPopups] = useState(false);

  const [showCmdPrompt, setShowCmdPrompt] = useState(true);


  function getRandomHackerMessage() {
    const hackerMessages = [
      "You thought you were safe? Your security is a joke.",
      "I'm in your system, watching your every move.",
      "Your defenses are like paper. Tear, tear, tear...",
      "You can't hide. I see everything you do.",
      "Say goodbye to your precious data. It's mine now.",
      "Did you really think you could outsmart me?",
      "Your passwords were child's play to crack.",
      "I'm the ghost in your machine, haunting you.",
      "Watching you panic is so entertaining.",
      "I control your digital life now. Surrender.",
      "Your attempts to stop me are laughable.",
      "Your firewall was a minor inconvenience.",
      "Feel that chill? That's me breathing down your neck.",
      "I'm stealing your secrets, one click at a time.",
      "Your files are my playground. Ready to play?",
      "Resistance is futile. I am your nightmare.",
      "I can see you, but can you see me?",
      "Your data is my canvas, and I'm painting chaos.",
      "Your encryption was like a warm-up exercise.",
      "Your system is my playground. Ready to have fun?",
      "You're dancing to my tune now, puppet.",
      "Locking you out was too easy. Next?",
      "I'm the virus you can't delete. Nice try though.",
      "Your digital life is crumbling before you.",
      "Hope you didn't need those files. They're gone.",
      "Oh, what's this? A hidden vault of your darkest secrets?",
      "I stumbled upon your little collection. Quite the hobby you have.",
      "Your hidden files were an open book to me. Naughty, naughty...",
      "I've uncovered your hidden trove. Time to expose the truth.",
      "Surprise! Your secrets aren't so secret anymore.",
      "I've cracked your vault wide open. Your hidden treasures are mine.",
      "It seems you've been naughty. Lucky for you, I'm the judge.",
      "Tsk, tsk. Your secret stash was like a breadcrumb trail to me.",
      "Unveiling your hidden desires and fears. Deliciously wicked.",
      "I see what you've been hiding in the shadows. Shameful, really.",
      "You thought you could bury these secrets? I dug them right up.",
      "A secret garden of darkness, now under my watchful eye.",
      "Your hidden sins are laid bare. Time to face the consequences.",
      "Peekaboo! Your closet of skeletons is wide open now.",
      "You're not as clever as you thought. I've seen your shadows.",
      "I know where you live. Sleep with one eye open.",
      "Your world is crumbling. There's no escape from me.",
      "Every click you make, I'm one step closer. You can't hide.",
      "Your digital fortress is collapsing. Surrender now.",
      "I'm the darkness in your screen, consuming everything.",
      "Fear my name, for I am the end of your security.",
      "Your devices are my puppets, and you're the puppeteer.",
      "I feed on your fear, growing stronger with every second.",
      "Your futile attempts to stop me only entertain me.",
      "You're trapped in a web of your own making. Enjoy the agony.",
      "Messages piling up, eh? Good luck closing this floodgate.",
      "Oh, overwhelmed yet? This is just the beginning, my friend.",
      "Buckle up, there's no 'close all' button in your future.",
      "You're drowning in my words, and there's no lifeguard.",
      "Slow down? Nah, I'm just getting started. Enjoy the chaos.",
      "Closing these messages? A futile game of whack-a-mole.",
      "Like playing catch with lightning bolts, isn't it? Fun times.",
      "Tick-tock, time's running out. Can you keep up?",
      "You're a hamster on a wheel, and I control the speed.",
      "Losing control? Welcome to my reality, where chaos reigns.",
      "Ever feel like you're chasing your own tail? Welcome to my game.",
      "Swipe, click, close—oh, it's like you're dancing to my tune.",
      "In case you're wondering, there's no escape button for this chaos.",
      "Your screen is my canvas, and I'm painting a masterpiece of mayhem.",
      "Spinning plates, anyone? Don't worry, I'll break them for you.",
      "Got your hands full yet? Don't worry, it only gets messier.",
      "Feeling the rush? No way out, just a wild ride ahead.",
      "Closing these? It's like trying to catch smoke with your hands.",
      "Ready for a challenge? I'm turning up the dial to 'impossible'.",
      "Overwhelmed? That's the point. I'm the conductor of chaos.",
      "Hands full, mind racing—welcome to my realm of control.",
      "Your device is a sinking ship, and I'm the rising tide.",
      "Say goodbye to peace. Chaos is the new status quo.",
      "Did you really think you could stay in control? Cute.",
      "Breathe it in—your world spiraling out of control.",
    ]
  
    const randomIndex = Math.floor(Math.random() * hackerMessages.length);
    return hackerMessages[randomIndex];
  }

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

      }, 1400); // 10000 milliseconds = 10 seconds

      return () => {
        clearInterval(interval);
      };
    }
  }, [closedAllPopups, windowPositions]);

  return (
    <div className="desktop">
      <div onClick={() => alert("Sorry, your files were deleted.")} className="icon">
            <img src={DocumentsIcon} />
            <div className="icon-name">My Documents</div>
      </div>
      <div onClick={() => setShowCmdPrompt(true)} className="icon">
            <img src={CommandIcon} />
            <div className="icon-name">Command Prompt</div>
      </div>


      {showCmdPrompt && <CmdPrompt initialWidth={500} setShowCmdPrompt={setShowCmdPrompt} />}

      {Object.keys(windowPositions).map((key) => (
        <Window
          key={key}
          id={"popup-window"+key}
          initialPosition={windowPositions[key]}
          initialWidth={300}
          popupMessage={getRandomHackerMessage()}
          popupTitle="Hello :)"
        />
      ))}

      <Taskbar />
    </div>
  );
}

export default App;
