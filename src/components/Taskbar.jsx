import StartLogo from '../assets/logo.svg'
import useTimer from '../hooks/useTimer'

export default function Taskbar({ startMenuOpen, setStartMenuOpen }) {

    useTimer('.time')

    return (
        <>
            <div className="taskbar" onMouseLeave={() => setStartMenuOpen(false)}>
                <div className="start-button" onClick={()=>setStartMenuOpen(!startMenuOpen)}><img src={StartLogo} /> start</div>
                <div className="opened-tabs">
             
                    {/* <div className="open-tab"><img src={DocumentsIcon} /> dsfdsfds</div> */}
                    {/* <div className="open-tab"><img src={ComputerIcon} /> My Computer</div>
                    <div className="open-tab"><img src={NetworkIcon} /> My Network</div>
                    <div className="open-tab readme active"><img src={NotepadIcon} /> ReadME.txt</div> */}
                    
                </div>
                <div className="time">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
        </>
    )
}