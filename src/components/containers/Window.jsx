// WindowContainer.js
import React from 'react';

const Window = ({
  id,
  dragMouseDownTitleBar, dragMouseDownWindow,
  dragMouseUpWindow, dragMouseMoveWindow,
  maximizeWindow, minimizeWindow,
  windowTitle, windowStyle, setIsOpen, className,
  children
}) => (
  <div
    id={id}
    className={className}
    style={windowStyle}
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
    <div className="window-body">{children}</div>
  </div>
);

export default Window;
