import { assets } from "../assets/manifest"

export default function StartMenu({ setStartMenuOpen }) {

    let timeoutId
    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setStartMenuOpen(true);
      };
    
      const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setStartMenuOpen(false);
        }, 200); 
      };

    return (
        <>
            <div id="menu"
                 onMouseLeave={() => handleMouseLeave()}
                 onMouseEnter={() => handleMouseEnter()}
            >
                <div id="avatar">
                    <img src={assets.user} />
                    <p>Windows User</p>
                </div>

                <div id="menuColumns">
                    <div id="menuFirstColumn">
                        <label>
                            <img src={assets.ie} />
                            Internet
                        </label>
                        <div>
                            <img src={assets.email} />
                            <p>E-mail</p>
                        </div>
                        <hr />
                        <div>
                            <img src={assets.msn} />
                            <p>MSN</p>
                        </div>
                        <div>
                            <img src={assets.winPlayer} />
                            <p>Windows Media Player</p>
                        </div>
                        <div>
                            <img src={assets.messenger} />
                            <p>Windows Messenger</p>
                        </div>
                        <label>
                            <img src={assets.calculator} />
                            Calculator
                        </label>
                        <label>
                            <img src={assets.notepad} />
                            Notepad
                        </label>
                        <hr />
                        <div id="allPrograms">
                            <p>All Programs</p>
                            <img src={assets.programs} />
                        </div>
                    </div>

                    <div id="menuLastColumn">
                        <div>
                            <img src={assets.documents} />
                            <p>My Documents</p>
                        </div>
                        <div>
                            <img src={assets.pictures} />
                            <p>My Pictures</p>
                        </div>
                        <div>
                            <img src={assets.musics} />
                            <p>My Music</p>
                        </div>
                        <div>
                            <img src={assets.computer} />
                            <p>My Computer</p>
                        </div>
                        <hr />
                        <div>
                            <img src={assets.help} />
                            <p>Help</p>
                        </div>
                        <div>
                            <img src={assets.search} />
                            <p>Search</p>
                        </div>
                        <div>
                            <img src={assets.run} />
                            <p>Run...</p>
                        </div>
                    </div>
                </div>

                <div id="menuSystem">
                    <div>
                        <img src={assets.logoff} />
                        <p>Log OFF</p>
                        <p></p>
                    </div>

                    <div>
                        <img src={assets.turnoff} />
                        <p>Turn OFF Computer</p>
                    </div>
                </div>
            </div>
        </>
    )
}