import { useState } from 'react';
import alertIcon from '../../assets/alert.png'
import { useWindow } from '../../hooks/useWindow';
import Window from '../containers/Window';

export default function AlertPopup({ windowMessage, windowTitle, initialPosition, id }) {
  const [storedPopupMessage, _] = useState(windowMessage)

  const windowSize = { x: 300, y: 100 }
  const windowOptions = {
    initialPosition,
    windowSize,
    shouldRaiseZIndex: true,
    iconImg: alertIcon
  }

  const { isOpen, setIsOpen,
    position, zIndex,
    dragMouseDownTitleBar, dragMouseDownWindow,
    dragMouseUpWindow, dragMouseMoveWindow,
    maximizeWindow, minimizeWindow } = useWindow(windowOptions);

  const windowStyle = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    width: windowSize.x,
    zIndex: zIndex,
  }

  return (
    isOpen && <>
      <Window
        id={id}
        position={position}
        zIndex={zIndex}
        dragMouseDownTitleBar={dragMouseDownTitleBar}
        dragMouseDownWindow={dragMouseDownWindow}
        dragMouseUpWindow={dragMouseUpWindow}
        dragMouseMoveWindow={dragMouseMoveWindow}
        maximizeWindow={maximizeWindow}
        minimizeWindow={minimizeWindow}
        windowTitle={windowTitle}
        windowStyle={windowStyle}
        setIsOpen={setIsOpen}
      >
        <p style={{ textAlign: "center" }}>{storedPopupMessage}</p>
        <div className="field-row" style={{ justifyContent: "center" }}>
          <button onClick={() => setIsOpen(false)}>Ok</button>
        </div>
      </Window>
    </>
  )
}