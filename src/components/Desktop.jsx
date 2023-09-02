import { useState } from 'react';
import Taskbar from './Taskbar';
import CmdPrompt from './windows/CmdPrompt';
import DocumentsIcon from '../assets/documents.png'
import CommandIcon from '../assets/cmd.png'
import EndlessPopups from './scenarios/EndlessPopups';
import StartMenu from './StartMenu';
import Winamp from './windows/Winamp';
import EndlessPopupsOptions from './windows/EndlessPopupsOptions';

export default function Desktop() {

  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [showCmdPrompt, setShowCmdPrompt] = useState(true);
  const [showWinamp, setShowWinamp] = useState(false);
  const [showEPOptions, setShowEPOptions] = useState(false);

  return (
    <div className="desktop">

      <Winamp isOpen={showWinamp} setIsOpen={setShowWinamp} />

      <div id="desktop-icons">
        <div onClick={() => alert("Sorry, your files were deleted.")} className="icon">
          <img src={DocumentsIcon} />
          <div className="icon-name">My Documents</div>
        </div>
        <div onClick={() => setShowCmdPrompt(true)} className="icon">
          <img src={CommandIcon} />
          <div className="icon-name">Command Prompt</div>
        </div>
      </div>

      {startMenuOpen && 
        <StartMenu 
          setStartMenuOpen={setStartMenuOpen} 
          showWinamp={showWinamp} 
          setShowWinamp={setShowWinamp} 
        />
      }

      <CmdPrompt isOpen={showCmdPrompt} setIsOpen={setShowCmdPrompt} />
      <EndlessPopupsOptions isOpen={showEPOptions} setIsOpen={setShowEPOptions} />

      <EndlessPopups startAt={8} perMiliSec={2000} endAt={100} setShowOptions={setShowEPOptions}  />

      <Taskbar startMenuOpen={startMenuOpen} setStartMenuOpen={setStartMenuOpen} />
    </div>
  );
}