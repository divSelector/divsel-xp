import StartLogo from '../assets/logo.svg'
import DocumentsIcon from '../assets/documents.png'
import ComputerIcon from '../assets/computer.png'
import NetworkIcon from '../assets/network.png'
import NotepadIcon from '../assets/notepad.png'

export default function Taskbar() {
    return (
        <>
            <div className="taskbar">
                <div className="start-button"><img src={StartLogo} /> start</div>
                <div className="opened-tabs">
                    {/* <div className="open-tab"><img src={DocumentsIcon} /> dsfdsfds</div> */}
                    {/* <div className="open-tab"><img src={ComputerIcon} /> My Computer</div>
                    <div className="open-tab"><img src={NetworkIcon} /> My Network</div>
                    <div className="open-tab readme active"><img src={NotepadIcon} /> ReadME.txt</div> */}
                    
                </div>
                <div className="time" title="20 August 2023 at 7:46 pm">7:46 pm</div>
            </div>
        </>
    )
}