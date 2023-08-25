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
      initialTracks: [
        {
          metaData: {
            artist: "DJ Mike Llama",
            title: "Llama Whippin' Intro"
          },
          url:
            "https://cdn.jsdelivr.net/gh/captbaritone/webamp@43434d82cfe0e37286dbbe0666072dc3190a83bc/mp3/llama-2.91.mp3",
          duration: 5.322286
        }
      ]
    });
    webamp.renderWhenReady(winampRef);

    webamp.onClose(() => {
      setIsOpen(false)
    });

    webamp.onMinimize(() => {
      minimizeExternalWindow(
        '#webamp', "Winamp")
    });

    return () => {
      webamp.dispose();
    };
  }, [winampRef]);

  useEffect(() => {
    let intervalId;

    const positionElement = (elem) => {
      for (const [index, each] of Array.from(elem.children).entries()) {
        const topValue = 100 + index+1 * 116;
        each.style.top = `${topValue}px`;
        each.style.left = "100px"
      }
      elem.parentElement.parentElement.style.visibility = 'visible'
    }

    const checkElement = () => {
      const elem = document.querySelector('#webamp > div > div');
      if (elem) {
        clearInterval(intervalId);
        positionElement(elem)
      }
    };

    if (isOpen) {
      intervalId = setInterval(checkElement, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isOpen]);

  if (!Webamp.browserIsSupported()) {
    return <></>
  }

  return <>
    {isOpen && <div id="webamp-events" ref={setWinampRef} />}
  </>
}