import commandIcon from '../../assets/cmd.png'
import { useWindow } from '../../hooks/useWindow';

export default function CmdPrompt({ isOpen, setIsOpen }) {

    const windowSize = { x: 600, y: 300 }
    const windowOptions = {
        initialPosition: {
            x: 200,
            y: 50
        },
        windowSize,
        shouldRaiseZIndex: false,
        iconImg: commandIcon
    }

    const { position, zIndex, dragMouseDownTitleBar, dragMouseDownWindow, 
        dragMouseUpWindow, dragMouseMoveWindow, maximizeWindow, 
        minimizeWindow } = useWindow(windowOptions);

    const windowStyle = {
        position: 'absolute',
        left: position.x,
        top: position.y,
    }

    return (
        isOpen && <>
            <div
                id="command-prompt"
                className="window"
                style={windowStyle}
                onMouseMove={dragMouseMoveWindow}
                onMouseUp={dragMouseUpWindow}
                onMouseDown={dragMouseDownWindow}
            >
                <div className="title-bar" onMouseDown={dragMouseDownTitleBar}>
                    <div className="title-bar-text">Command Prompt</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize" onMouseUp={minimizeWindow} />
                        <button aria-label="Maximize" onMouseUp={maximizeWindow} />
                        <button aria-label="Close" onMouseUp={() => setIsOpen(false)} />
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