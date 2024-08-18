import { useState } from 'react';
import Taskbar from './Taskbar';
import CmdPrompt from './windows/CmdPrompt';
import EndlessPopups from './scenarios/EndlessPopups';
import StartMenu from './StartMenu';
import Winamp from './windows/Winamp';
import EndlessPopupsOptions from './windows/EndlessPopupsOptions';
import { useScenario } from '../context/scenario';
import { assets } from '../manifest';

export default function Desktop() {

  const { scenarioIdx } = useScenario()

  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [showCmdPrompt, setShowCmdPrompt] = useState(true);
  const [showWinamp, setShowWinamp] = useState(false);
  const [showEPOptions, setShowEPOptions] = useState(false);

  return (
    <div className="desktop">

      <Winamp isOpen={showWinamp} setIsOpen={setShowWinamp} />

      <div id="desktop-icons">
        <div onClick={() => alert("Sorry, your files were deleted.")} className="icon">
          <img src={assets.documents} />
          <div className="icon-name">My Documents</div>
        </div>
        <div onClick={() => setShowCmdPrompt(true)} className="icon">
          <img src={assets.cmd} />
          <div className="icon-name">Command Prompt</div>
        </div>
        <div onClick={() => setShowWinamp(true)} className="icon">
          <img src={assets.winampIcon} />
          <div className="icon-name">Winamp</div>
        </div>
        {scenarioIdx > 0 && <>
          <div onClick={() => setShowEPOptions(true)} className="icon">
            <img src={assets.file} />
            <div className="icon-name">endlesspopups.exe</div>
          </div>
        </>}

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

      <EndlessPopups startAt={8} perMiliSec={2000} endAt={60} setShowOptions={setShowEPOptions} />

      <Taskbar startMenuOpen={startMenuOpen} setStartMenuOpen={setStartMenuOpen} />
    </div>
  );
}