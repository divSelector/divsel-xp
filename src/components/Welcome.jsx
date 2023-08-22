import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Welcome({msg}) {

    const [message, setMessage] = useState(msg)

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(function() {
            if (msg == 'welcome') navigate(`/xp/desktop`)
            else if (msg == 'gameover') navigate(`/xp/loading`)
          }, 2000);
    }, [])


    return (
        <div id="welcome-container">
            <div id="welcome">{message}</div>
        </div>

    )
}