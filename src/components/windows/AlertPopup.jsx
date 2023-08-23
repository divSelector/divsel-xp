import { useState } from 'react';
import alertIcon from '../../assets/alert.png'
import { useWindow } from '../../hooks/useWindow';
import Window from '../containers/Window';

export default function AlertPopup({ windowMessage, windowTitle, initialPosition, id }) {
  const [alertMessage, _] = useState(windowMessage)

  const windowSize = { x: 300, y: 100 }
  const windowOptions = {
    initialPosition,
    windowSize,
    shouldRaiseZIndex: true,
    iconImg: alertIcon
  }

  const { isOpen, setIsOpen, position, 
          zIndex, commonWindowProps } = useWindow(windowOptions);

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
        className="window popup"
        windowTitle={windowTitle}
        windowStyle={windowStyle}
        setIsOpen={setIsOpen}
        {...commonWindowProps}
      >
        <p style={{ textAlign: "center" }}>{alertMessage}</p>
        <div className="field-row" style={{ justifyContent: "center" }}>
          <button onClick={() => setIsOpen(false)}>Ok</button>
        </div>
      </Window>
    </>
  )
}