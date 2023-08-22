import { useState } from 'react';
import alertIcon from '../../assets/alert.png'
import { useWindow } from '../../hooks/useWindow';

export default function AlertPopup({ windowMessage, windowTitle, initialPosition, id }) {
  const [storedPopupMessage, _] = useState(windowMessage)

  const windowSize = { x: 300, y:100 }
  const windowOptions = {
    initialPosition,
    windowSize,
    shouldRaiseZIndex: true,
    iconImg: alertIcon
  }
  
  const { isOpen, setIsOpen, position, zIndex, dragMouseDownTitleBar, 
    dragMouseDownWindow, dragMouseUpWindow, dragMouseMoveWindow, 
    maximizeWindow, minimizeWindow } = useWindow(windowOptions);

  return (
    isOpen && <>
      <div
        id={id}
        className="window"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: windowSize.x,
          zIndex: zIndex,
        }}
        onMouseMove={dragMouseMoveWindow}
        onMouseUp={dragMouseUpWindow}
        onMouseDown={dragMouseDownWindow}
      >
        <div className="title-bar" onMouseDown={dragMouseDownTitleBar}>
          <div className="title-bar-text">{windowTitle}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onMouseUp={minimizeWindow} />
            <button aria-label="Maximize" onMouseUp={maximizeWindow} />
            <button aria-label="Close" onMouseUp={() => setIsOpen(false)} />
          </div>
        </div>

        <div className="window-body">
          <p style={{ textAlign: "center" }}>{storedPopupMessage}</p>
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button onClick={() => setIsOpen(false)}>Ok</button>
          </div>
        </div>
      </div>
    </>
  )
}