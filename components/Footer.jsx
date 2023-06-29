import React from "react"
import githIcon from '../assets/gith-icon.png'

function Footer() {
    return (
        <div className="footer">
            <a>Built with 💙 by <a href="https://www.olliequ.com/" target="_blank">Ollie</a></a>
            <img src={githIcon} alt="GitHub icon" height={16} padding={50}/>
        </div>
    )
}

export default Footer