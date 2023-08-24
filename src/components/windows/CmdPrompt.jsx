import commandIcon from '../../assets/cmd.png'
import { useWindow } from '../../hooks/useWindow';
import Window from '../containers/Window';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { fs } from '../../data/filesystem';

export default function CmdPrompt({ isOpen, setIsOpen }) {

    const inputRef = useRef(null);
    const outputRef = useRef(null);
    const [prompt, setPrompt] = useState('C:\\WINDOWS\\SYSTEM32' + '> ')
    const [scenarioIdx, setScenarioIdx] = useState(0)
    const [windowTitle, setWindowTitle] = useState("Command Prompt")

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

    const scrollToBottom = () => {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            const enteredCommand = e.target.value;
            const stdInLine = prompt + enteredCommand + '\n';
            const stdOutLines = processCommand(enteredCommand);
            setOutput([...output, stdInLine, ...stdOutLines]);
            e.target.value = '';
        }
    }

    const pathFromPrompt = (path) => {
        if (path.endsWith('> ')) {
            path = path.split('> ')[0]
        }
        return path.toLowerCase();
    }

    function runDirCmd() {

        function generateDirOutput(node) {
            const childNodes = node.getChildren();
            const lines = [];

            let fileCount = 0;
            let dirCount = 0

            for (const childNode of childNodes) {
                const line = childNode.isFile
                    ? `       ${childNode.name}    [File]`
                    : `       ${childNode.name}    [Dir]`;

                lines.push(line);
                if (childNode.isFile) {
                    fileCount++;
                } else {
                    dirCount++;
                }
            }

            lines.push(`\n${fileCount} File(s)`);
            lines.push(`${dirCount} Directories(s)\n`);
            return lines;
        }

        const cwd = pathFromPrompt(prompt)
        const node = fs.findNode(cwd)

        const banner = [
            'Volume in drive C has no label.',
            'Volume serial number is 0000-0000\n',
            `Directory of ${cwd.toUpperCase()}:\n`
        ]
        let lines = node ? generateDirOutput(node) : [];
        return [...banner, ...lines]
    }

    function runCdCmd(args) {

        const updatePrompt = (path) => {
            if (path.length === 2) {
                path += '\\';
            } else if (path.length <= 1) {
                return []
            } else if (fs.findNode(path).isFile) {
                return ['Directory name invalid.\n']
            }
            setPrompt(path.toUpperCase() + "> ")
            return []
        }

        let destination;
        if (args[0]) {
            destination = pathFromPrompt(args[0]);
        }
        else {
            return [];
        }

        // No destination provided or just ".": stay in the same directory
        if (!destination || destination === '.') {
            return [prompt + ' '];

        } else if (destination === '..') {
            // Go to the parent directory
            const parent = fs.findNode(pathFromPrompt(prompt)).parent
            if (!parent.isFile) {
                return updatePrompt(parent.toString())
            } else return []

        } else if (fs.findNode(destination)) {
            // Navigate to a directory by absolute path
            const node = fs.findNode(destination)
            return updatePrompt(node.toString())

        } else {
            // Try to navigate to a directory by relative path
            const cwd = pathFromPrompt(prompt)
            console.log(cwd)
            console.log(destination)
            if (fs.findNode(cwd + "\\" + destination)) {
                return updatePrompt(cwd + "\\" + destination)

            } else if (fs.findNode(cwd + destination)) {
                // Required check for path at root level height
                return updatePrompt(cwd + destination)
            } else {
                return [`File not found.\n`]
            }

        }
    }

    const runHelpCmd = (args) => {
        if (args.length === 0) {
            return [
                "\n",
                "CMD built-in commands are:",
                "CD (CHDIR)      Change current default directory",
                "CLS             Clear the console screen",
                "DIR             List the contents of a directory",
                "ECHO            Copy text directly to the console output",
                "HELP            Show brief help details on a topic",
                "TITLE           Set the window title for the CMD session",
                "\n"
            ]
        }

        switch (args.join(" ")) {
            case "chdir":
                return ["CHDIR <directory> changes the current default directory\n"]
            case "cd":
                return ["CD <directory> is the short version of CHDIR. It changes the default directory.\n"]
            case "title":
                return ["TITLE <string> sets the window title for the cmd window.\n"]
            case 'dir':
                return ["DIR lists the contents of a directory.\n"]
            case 'echo':
                return ['ECHO <string> displays <string> on the current terminal device.\n']
            case 'cls':
                return ['CLS clears the console screen.\n']
            case 'help':
                return [
                    "HELP <command> shows brief help details on a topic.",
                    "HELP without an argument shows all built-in CMD commands.\n"
                ]
            default:
                return [`No help available for ${args.join(" ")}\n`]
        }
    }

    const processCommand = (stdin) => {
        const argv = stdin.split(' ').filter(item => item !== '');
        const script = argv[0];
        const args = argv.slice(1);

        const stdout = (() => {
            const invalidDrive = /^[a-bd-zA-BD-Z]:$/i.test(script);
            const validDrive = /^[cC]:$/i.test(script);
            if (invalidDrive) return ['Path not found.\n']
            else if (validDrive) return []

            switch (script) {
                case 'dir':
                    return runDirCmd(args);
                case 'cd':
                case 'chdir':
                    return runCdCmd(args);
                case 'echo':
                    return [args.join(' ')]
                case 'cls':
                    setTimeout(() => {
                        setOutput(outputScenarios[scenarioIdx]);
                    }, 0);
                    return []
                case 'title':
                    setWindowTitle(args.join(' '));
                    return []
                case 'help':
                    return runHelpCmd(args);
                default:
                    if (script) {
                        return [`Can't recognize '${script}' as an internal or external command, or batch script.\n`];
                    } else {
                        return [];
                    }
            }
        })();

        return stdout.map(each => each + '\n');
    }

    useEffect(() => {
        scrollToBottom();
    }, [output]);


    return (
        isOpen && <>
            <Window
                id="command-prompt"
                className="window"
                windowTitle={windowTitle}
                windowStyle={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    width: windowSize.x,
                }}
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

