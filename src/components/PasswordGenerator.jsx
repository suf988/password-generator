import { useEffect, useRef, useState } from "react"
import '../Styles.css'


const PasswordGenerator = () => {

    const [passLength, setPassLength] = useState(8)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")
    const [heading, setHeading] = useState("");
    const [display, setDisplay] = useState("")

    const passwordRef = useRef(null)

    const generatePassword = () => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*()-_+=?/><";

        for (let i = 1; i <= passLength; i++) {
            let char = Math.floor(Math.random() * str.length + 1)

            pass += str.charAt(char);
        }

        setPassword(pass)
    }

    const handleCopy = () => {
        passwordRef.current.select()
        window.navigator.clipboard.writeText(password)
        setHeading("Password Copied");
        setDisplay(password)
    }

    useEffect(() => {
        generatePassword()
    }, [passLength, numberAllowed, charAllowed])


    return (
        <>
                <div className="outerDiv">

                    <h1 className="heading">My Password Generator</h1>

                    <div className="inputDiv">
                        <input type="text"
                            value={password}
                            placeholder="Password"
                            readOnly
                            ref={passwordRef}
                            className="inputField" />

                        <button className="button"
                            onClick={handleCopy}>Copy</button>
                    </div>

                    <div className="rangeDiv">

                        <div className="optionsDiv">
                            <input type="range"
                                min={8}
                                max={25}
                                value={passLength}
                                id="length"
                                onChange={(e) => {
                                    setPassLength(e.target.value)
                                    setHeading("")
                                    setDisplay("")
                                }}
                            />
                            <label htmlFor="lenght">Length: {passLength}</label>
                        </div>

                        <div className="optionsDiv">
                            <input type="checkbox"
                                id="numberInput"
                                defaultChecked={numberAllowed}
                                onChange={() => {
                                    setNumberAllowed((prev) => !prev)
                                    setHeading("")
                                    setDisplay("")
                                }} />
                            <label htmlFor="numberInput">Select Numbers</label>
                        </div>

                        <div className="optionsDiv">
                            <input type="checkbox"
                                id="charInput"
                                defaultChecked={charAllowed}
                                onChange={() => {
                                    setCharAllowed((prev) => !prev)
                                    setHeading("")
                                    setDisplay("")
                                }} />
                            <label htmlFor="charInput">Select Characters</label>
                        </div>

                    </div>

                </div>

                <div className="displayDiv">

                    <h1 className="heading">{heading}</h1>

                    <div className="displayText">
                        <p>{display}</p>
                    </div>

                </div>
        </>
    )
}

export default PasswordGenerator
