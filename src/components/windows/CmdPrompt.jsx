import commandIcon from '../../assets/cmd.png'
import { useWindow } from '../../hooks/useWindow';
import Window from '../containers/Window';

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

    const { position, commonWindowProps } = useWindow(windowOptions);

    const windowStyle = {
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: windowSize.x,
    }

    return (
        isOpen && <>
            <Window
                id="command-prompt"
                windowTitle="Command Prompt"
                windowStyle={windowStyle}
                setIsOpen={setIsOpen}
                {...commonWindowProps}
            >
                <pre>Microsoft&#10094;R&#10095; Windows DOS
                    &#10094;C&#10095; Copyright Microsoft Corp 1990-2001.
                    <br />C:&#92;WINDOWS&#92;SYSTEM32 &gt; Listen, they say if you close all the windows...df das dasf ds fas fdas fdsfa s ds fds das dsaf das df ads fdas dfasf ds dfsaf dads fas fdas
                </pre>
            </Window>
        </>
    )
}