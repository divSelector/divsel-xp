import commandIcon from '../../assets/cmd.png'
import { useWindow } from '../../hooks/useWindow';
import Window from '../containers/Window';
import { useState } from 'react';
import { useRef } from 'react';
import { existingDirectories } from '../../data/filesystem';

export default function CmdPrompt({ isOpen, setIsOpen }) {

    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const [prompt, setPrompt] = useState('C:&#92;WINDOWS&#92;SYSTEM32&gt;&nbsp;')
    const [scenarioIdx, setScenarioIdx] = useState(0)

    let outputScenarios = [
        [
            `Microsoft&#10094;R&#10095; Windows DOS &#10094;C&#10095; Copyright Microsoft Corp 1990-2001.\n`,
            prompt, `type C:\\lulz.txt\n\n`,
            'J00 |-|4V3 833|\\| |-|4(|<3|) 4|\\||) |>VV|\\|3|) 4|\\||) |_|773.-|_`/ 4|\\||\\||-|1|_473|) 8`/ 73|-| 9.-347357 |\\/|057 |_337 |-|4><0.- 0f 4|_|_ 71|\\/|3 J3Ff |<\nif joo w4N7 7o 54ve joor pREcIouZ FILEz, JOO wILL h4VE 7o 57OP my POpuPZ fir57.\n\n'
        ]
    ]

    const [output, setOutput] = useState(outputScenarios[scenarioIdx])

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

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            const enteredCommand = e.target.value;
            const stdInLine = prompt + enteredCommand + '\n';
            const stdOutLines = processCommand(enteredCommand);
            setOutput([...output, stdInLine, ...stdOutLines]);
            e.target.value = '';
            console.log(output)
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }

    function runDirCmd(args) {
        return ['Your Files Have Been Deleted...', ':)']
    }


    function findExistingDirectory(subPath) {
        const lowercaseSubPath = subPath.toLowerCase();
        for (const existingDir of existingDirectories) {
            if (existingDir.endsWith(lowercaseSubPath)) {
                return existingDir;
            }
        }
        return null;
    }

    function runCdCmd(args) {
        const destination = args[0].toLowerCase();
        const currentDirectory = prompt.split('> ')[0];

        if (!destination || destination === '.') {
            // No destination provided or just ".": stay in the same directory
            return [prompt + ' '];
        } else if (destination === '..') {
            // Go to the parent directory
            const parentDirectory = currentDirectory.split('\\').slice(0, -1).join('\\');
            setPrompt(parentDirectory.toUpperCase() + '> ');
            return [];
        } else if (existingDirectories.includes(destination)) {
            // Navigate to an existing directory
            setPrompt(destination.toUpperCase() + '> ');
            return [];
        } else {
            // Check for relative path
            const existingDir = findExistingDirectory(destination);
            if (existingDir) {
                setPrompt(existingDir.toUpperCase() + '> ');
                return [];
            } else {
                // Directory doesn't exist
                return [`The system cannot find the path specified.`];
            }
        }
    }

    const processCommand = (stdin) => {
        const argv = stdin
            .split(' ')
            .filter(item => item != '');
        const script = argv[0];
        const args = argv.slice(1);
        let stdout;
        if (script == 'dir') stdout = runDirCmd(args)
        else if (script == 'cd') stdout = runCdCmd(args)
        else if (script) stdout = [`Can't recognize '${script}' as an internal or external command, or batch script.`]
        else return []

        return stdout.map(each => each + '\n')
    }

    return (
        isOpen && <>
            <Window
                id="command-prompt"
                className="window"
                windowTitle="Command Prompt"
                windowStyle={windowStyle}
                setIsOpen={setIsOpen}
                {...commonWindowProps}
            >
                <pre ref={outputRef}
                    onClick={() => inputRef.current.focus()}
                >
                    <div>
                        {output.map((line, index) => (
                            <span key={index} dangerouslySetInnerHTML={{ __html: line }} />
                        ))}
                        <span>
                            <span dangerouslySetInnerHTML={{ __html: prompt }} />
                            <input
                                ref={inputRef}
                                onKeyDown={onKeyDown}
                            ></input>
                        </span>
                    </div>
                </pre>

            </Window>
        </>
    )
}

