import { useEffect } from 'react';
import StartLogo from '../assets/logo.svg'

export default function Taskbar({ startMenuOpen, setStartMenuOpen }) {

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //       if (startMenuOpen && event.target.closest('#menu')) {
    //         setStartMenuOpen(false);
    //       }
    //     };
    
    //     document.addEventListener('click', handleClickOutside);
    
    //     return () => {
    //       document.removeEventListener('click', handleClickOutside);
    //     };
    //   }, [startMenuOpen]);

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
                <div className="time" title="20 August 2023 at 7:46 pm">7:46 pm</div>
            </div>
        </>
    )
}