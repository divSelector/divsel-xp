import { useState, useEffect } from 'react';
import AlertIcon from '../assets/alert.png'
import useDrag from '../hooks/useDrag';

export default function Window({ popupMessage, popupTitle, initialPosition, initialWidth = 300, id }) {
  const [storedPopupMessage, _] = useState(popupMessage)
  const [isOpen, setIsOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  const dragOptions = {
    initialPosition,
    windowSize: {
      x: initialWidth,
      y: 100
    },
    shouldRaiseZIndex: true
  }
  
  const { position, setPosition, zIndex, dragMouseDownTitleBar, 
          dragMouseDownWindow, dragMouseUpWindow, dragMouseMoveWindow } = useDrag(dragOptions)

  const maximizeWindow = (e) => {
    const eventWindow = e.target.parentElement.parentElement.parentElement
    if (isMaximized) {
      eventWindow.style.height = "unset"
      eventWindow.style.width = "300px"
      setPosition({ x: 0, y: 0 })
      setIsMaximized(false)

    } else {
      eventWindow.style.height = "100%"
      eventWindow.style.width = "100%"
      setPosition({ x: 0, y: 0 })
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

  return isOpen && (
    <>
      <div
        id={id}
        className="window"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: initialWidth,
          zIndex: zIndex,
        }}
        onMouseMove={dragMouseMoveWindow}
        onMouseUp={dragMouseUpWindow}
        onMouseDown={dragMouseDownWindow}
      >
        <div className="title-bar" onMouseDown={dragMouseDownTitleBar}>
          <div className="title-bar-text">{popupTitle}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onMouseUp={minimizeWindow} />
            <button aria-label="Maximize" onMouseUp={maximizeWindow} />
            <button aria-label="Close" onMouseUp={() => setIsOpen(false)} />
          </div>
        </div>

        <div className="window-body">
          <p style={{ textAlign: "center" }}>{storedPopupMessage}</p>
          <div className="field-row" style={{ justifyContent: "center" }}>
            {/* <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button> */}
            <button onClick={() => setIsOpen(false)}>Ok</button>
          </div>
        </div>
      </div>
    </>
  )
}