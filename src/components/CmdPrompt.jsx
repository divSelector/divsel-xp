import { useEffect, useState } from "react";
import CommandIcon from '../assets/cmd.png'

export default function CmdPrompt({setShowCmdPrompt}) {
    const [position, setPosition] = useState({ x: 200, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);

    const handleMouseDownWindow = (e) => {
        // raiseZIndexOfWindow();
      }
    
      const handleMouseDownTitleBar = (e) => {
        // raiseZIndexOfWindow();
    
        setIsDragging(true);
        setDragOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      };

    
      const handleMouseMoveWindow = (e) => {
        if (!isDragging) return;
        setPosition({
          x: Math.max(Math.min(e.clientX - dragOffset.x, window.innerWidth - 500), 0),
          y: Math.max(Math.min(e.clientY - dragOffset.y, window.innerHeight - 300), 0),
        });
      };
    
      const handleMouseUpWindow = () => {
        setIsDragging(false);
      };

      const maximizeWindow = (e) => {
        const eventWindow = e.target.parentElement.parentElement.parentElement
        if (isMaximized) {
            eventWindow.style.height = "300px"
            eventWindow.style.width = "unset"
            eventWindow.style.maxWidth = "600px"
            setPosition({x: 0, y: 0})
            setIsMaximized(false)

        } else {
            eventWindow.style.height = "100%"
            eventWindow.style.width = "100%"
            eventWindow.style.maxWidth = "unset"
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
        iconImg.src = CommandIcon
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

    return  (
        <>
      <div
        id="command-prompt"
        className="window"
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
        }}
        onMouseMove={handleMouseMoveWindow}
        onMouseUp={handleMouseUpWindow}
        onMouseDown={handleMouseDownWindow}
      >
        <div className="title-bar" onMouseDown={handleMouseDownTitleBar}>
          <div className="title-bar-text">Command Prompt</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onMouseUp={minimizeWindow} />
            <button aria-label="Maximize" onMouseUp={maximizeWindow} />
            <button aria-label="Close" onMouseUp={()=>setShowCmdPrompt(false)} />
          </div>
        </div>
            <div className="window-body">
                <pre>Microsoft&#10094;R&#10095; Windows DOS 
                        &#10094;C&#10095; Copyright Microsoft Corp 1990-2001.
                <br />C:&#92;WINDOWS&#92;SYSTEM32 &gt; Listen, they say if you close all the windows...df das dasf ds fas fdas fdsfa s ds fds das dsaf das df ads fdas dfasf ds dfsaf dads fas fdas 
                </pre>
            </div>
            </div>
        </>
    )
}