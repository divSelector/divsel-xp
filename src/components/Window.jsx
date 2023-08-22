import { useState } from 'react';
import alertIcon from '../assets/alert.png'
import useDrag from '../hooks/useDrag';
import useMaximize from '../hooks/useMaximize';
import useMinimize from '../hooks/useMinimize';

export default function Window({ popupMessage, popupTitle, initialPosition, id }) {
  const [storedPopupMessage, _] = useState(popupMessage)
  const [isOpen, setIsOpen] = useState(true);

  const windowSize = { x: 300, y:100 }
  const windowOptions = {
    initialPosition,
    windowSize,
    shouldRaiseZIndex: true
  }
  
  const { position, setPosition, zIndex, dragMouseDownTitleBar, 
          dragMouseDownWindow, dragMouseUpWindow, dragMouseMoveWindow } = useDrag(windowOptions)

  const { maximizeWindow } = useMaximize({ position, setPosition, windowSize })

  const { minimizeWindow } = useMinimize(alertIcon)

  return isOpen && (
    <>
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