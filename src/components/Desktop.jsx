import { useState } from 'react';
import Taskbar from './Taskbar';
import CmdPrompt from './windows/CmdPrompt';
import DocumentsIcon from '../assets/documents.png'
import CommandIcon from '../assets/cmd.png'
import EndlessPopups from './scenarios/EndlessPopups';
import StartMenu from './StartMenu';

export default function Desktop() {

  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [showCmdPrompt, setShowCmdPrompt] = useState(true);

  return (
    <div className="desktop">
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

      {startMenuOpen && <StartMenu setStartMenuOpen={setStartMenuOpen} />}

      <CmdPrompt isOpen={showCmdPrompt} setIsOpen={setShowCmdPrompt} />

      <EndlessPopups startAt={8} perMiliSec={900} endAt={100} />

      <Taskbar startMenuOpen={startMenuOpen} setStartMenuOpen={setStartMenuOpen} />
    </div>
  );
}