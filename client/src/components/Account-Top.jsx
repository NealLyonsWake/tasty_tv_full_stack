import React, { useState } from 'react'
import AccountRegister from './Account-Register'
import AccountSignIn from './Account-Sign-In'
import AccountProfile from './Account-Profile'
import "./Style-account.css";

function AccountTop(props) {
    const [subHeading, setSubHeading] = useState('Sign in')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleChange(e) {
        e.target.name === "username" ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    const subHeadingChange = (newSubHeading) => {
        setSubHeading(newSubHeading);
    }

    const resetCredentials = () =>{
        setUsername('')
        setPassword('')
    }

    const returnSubComponent = () => {

        if (!props.loggedIn) {
            return (
                <div className="account-space">
                    <h3>{subHeading}</h3>
                    {
                     subHeading === 'Sign up to enjoy!' ?
                            <AccountRegister subHeading={subHeadingChange} event={handleChange} un={username} pw={password} reset={resetCredentials} /> :
                            <AccountSignIn subHeading={subHeadingChange} event={handleChange} un={username} pw={password} handleLogin={props.handleLogin} reset={resetCredentials}/>
                    }
                </div>
            )
        }
        else {
            return <AccountProfile user={props.user} />
        }

    }

    return (
        <div>
            {returnSubComponent()}
        </div>
    )
}

export default AccountTop