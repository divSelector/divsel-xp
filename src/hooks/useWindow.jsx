import { useState } from 'react';
import useDrag from './useDrag';
import useMaximize from './useMaximize';
import useMinimize from './useMinimize';

export function useWindow({
  initialPosition, windowSize,
  shouldRaiseZIndex, iconImg
}) {
  const [isOpen, setIsOpen] = useState(true);

  const windowOptions = {
    initialPosition,
    windowSize,
    shouldRaiseZIndex,
  };

  const {
    position,
    setPosition,
    zIndex,
    dragMouseDownTitleBar,
    dragMouseDownWindow,
    dragMouseUpWindow,
    dragMouseMoveWindow,
  } = useDrag(windowOptions);

  const { maximizeWindow } = useMaximize({ 
    position, setPosition, windowSize 
  });
  const { minimizeWindow } = useMinimize(iconImg);

  const commonWindowProps = {
    position, 
    zIndex, 
    dragMouseDownTitleBar,
    dragMouseDownWindow, 
    dragMouseUpWindow, 
    dragMouseMoveWindow,
    minimizeWindow,
    maximizeWindow
  }

  return {
    isOpen,
    setIsOpen,
    position,
    zIndex,
    commonWindowProps
  };
}
