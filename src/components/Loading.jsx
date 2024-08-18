import { useEffect } from 'react'
import xpLogo from '../assets/logo.svg'
import { useNavigate } from "react-router-dom";

export default function Loading({ action }) {

    const navigate = useNavigate()

    useEffect(() => {

        let x = 1;
        let int = setInterval(() => {
            if (x == document.querySelector(".loader").offsetWidth) x = 0
            x += 1
            document.querySelectorAll(".loader span")[0].style.marginLeft = x + "px"
        }, 10);
        setTimeout(function() {
            clearInterval(int)
            console.log(action)
            navigate(`../${action}`)
          }, 2000);
        return () => {
            clearInterval(int)
        }
    }, [])

    return (
        <div id="loading-container">
            <div className="centred">
                <div className="logo">
                    <img src={xpLogo} />
                    <div className="ms">Microsoft<sup>®</sup></div>
                    <div className="win">Windows</div>
                    <div className="xp">xp</div>
                </div>
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="copy">Copyright &copy; Microsoft Corporation</div>
            <div className="title">Microsoft</div>
        </div>
    )
}