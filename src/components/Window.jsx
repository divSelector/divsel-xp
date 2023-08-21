import { useState, useEffect } from 'react';
import AlertIcon from '../assets/alert.png'

export default function Window({ popupMessage, popupTitle, initialPosition, initialWidth = 300, id }) {
  const [storedPopupMessage, _] = useState(popupMessage)
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMouseDownWindow = (e) => {
    raiseZIndexOfWindow();
  }

  const handleMouseDownTitleBar = (e) => {
    raiseZIndexOfWindow();

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const getHighestZIndexOfWindow = () => {
    const highestZIndex = [...document.querySelectorAll('.window')].reduce(
      (maxZIndex, windowElement) => {
        const zIndexValue = parseInt(windowElement.style.zIndex, 10);
        return Math.max(maxZIndex, zIndexValue);
      },
      0
    );
    return highestZIndex
  }

  const raiseZIndexOfWindow = () => {
    const highestZIndex = getHighestZIndexOfWindow()

    setZIndex(highestZIndex + 1);
  }

  const handleMouseMoveWindow = (e) => {
    if (!isDragging) return;
    setPosition({
      x: Math.max(Math.min(e.clientX - dragOffset.x, window.innerWidth - 300), 0),
      y: Math.max(Math.min(e.clientY - dragOffset.y, window.innerHeight - 100), 0),
    });
  };

  const handleMouseUpWindow = () => {
    setIsDragging(false);
  };

  const maximizeWindow = (e) => {
    const eventWindow = e.target.parentElement.parentElement.parentElement
    if (isMaximized) {
        eventWindow.style.height = "unset"
        eventWindow.style.width = "300px"
        setPosition({x: 0, y: 0})
        setIsMaximized(false)

    } else {
        eventWindow.style.height = "100%"
        eventWindow.style.width = "100%"
        setPosition({x: 0, y: 0})
        setIsMaximized(true)
    }
    
  }

  const minimizeWindow = (e) => {
    // Make Minimized Window Hidden
    const eventWindow = e.target.parentElement.parentElement.parentElement
    const titleBar = e.target.parentElement.parentElement.children[0]
    eventWindow.style.visibility = "hidden"

    // Create Minimized Tab
    const minTab = document.createElement('div');
    minTab.className = 'open-tab';
    minTab.setAttribute('data-window-id', eventWindow.id);
    const iconImg = document.createElement('img');
    iconImg.src = AlertIcon
    const textNode = document.createTextNode(titleBar.innerHTML);
    minTab.appendChild(iconImg);
    minTab.appendChild(textNode);

      // Add an onClick handler to the minimized tab
      minTab.onclick = () => {
        const correspondingWindow = document.getElementById(eventWindow.id);
        if (correspondingWindow) {
            correspondingWindow.style.visibility = "visible";
        }

        // Remove the minimized tab
        document.querySelector('.opened-tabs').removeChild(minTab);
    };

    // insert tab to taskbar
    const taskbarTabs = document.querySelector('.opened-tabs')
    taskbarTabs.appendChild(minTab)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMoveWindow);
      document.addEventListener('mouseup', handleMouseUpWindow);
    } else {
      document.removeEventListener('mousemove', handleMouseMoveWindow);
      document.removeEventListener('mouseup', handleMouseUpWindow);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWindow);
      document.removeEventListener('mouseup', handleMouseUpWindow);
    };
  }, [isDragging]);
  return isOpen && (
    <>
      <div
        id={id}
        className="popup window"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: initialWidth,
          zIndex: zIndex,
        }}
        onMouseMove={handleMouseMoveWindow}
        onMouseUp={handleMouseUpWindow}
        onMouseDown={handleMouseDownWindow}
      >
        <div className="title-bar" onMouseDown={handleMouseDownTitleBar}>
          <div className="title-bar-text">{popupTitle}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onMouseUp={minimizeWindow} />
            <button aria-label="Maximize" onMouseUp={maximizeWindow} />
            <button aria-label="Close" onMouseUp={()=>setIsOpen(false)} />
          </div>
        </div>

        <div className="window-body">
          <p style={{ textAlign: "center" }}>{storedPopupMessage}</p>
          <div className="field-row" style={{ justifyContent: "center" }}>
            {/* <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button> */}
            <button onClick={()=>setIsOpen(false)}>Ok</button>
          </div>
        </div>
      </div>
    </>
  )
}