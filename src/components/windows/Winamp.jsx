import React from "react";
import Webamp from "webamp";
import { assets } from "../../manifest";
import useMinimize from "../../hooks/useMinimize";

const { useState, useEffect } = React;

export default function Winamp({ isOpen, setIsOpen }) {

  const [winampRef, setWinampRef] = useState(null);

  const { minimizeExternalWindow } = useMinimize(assets.winampIcon)

  useEffect(() => {
    if (winampRef == null) {
      return;
    }
    const webamp = new Webamp({

    });
    webamp.renderWhenReady(winampRef);

    webamp.onClose(() => {
      setIsOpen(false)
    });

    webamp.onMinimize(() => {
      minimizeExternalWindow('#webamp', "Winamp")
    });

    return () => {
      webamp.dispose();
    };
  }, [winampRef]);

  if (!Webamp.browserIsSupported()) {
    return <></>
  }

  return <>
    {isOpen && <div ref={setWinampRef} />}
  </>
}