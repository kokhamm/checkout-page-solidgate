import { useState } from "react";


export default function Header () {
    const [lang, setLang] = useState("EN");
    function langSwitch () : void {
        setLang (prevLang => prevLang === "EN" ? "❤️" : "EN");
    }
    return (
        <div className="header">
            <div className="header__arrow-back">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L11 6M5 12L11 18M5 12H19" stroke="#363A43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="header__main-text">
                <span> Checkout </span>
            </div>
            <div className="header__language-switch">
                <span onClick={langSwitch}>{lang}</span>
            </div>
            
        </div>
    )
}