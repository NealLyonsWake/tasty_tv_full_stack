import React, { useState } from 'react'

function AccountSignIn(props) {
    const [status, setStatus] = useState('')

    function handleChange(e) {
        props.event(e)
    }

    const subHeadingChange = (e) => {
        props.subHeading(e.target.name)
        e.preventDefault()
    }

    function handleLogin(loggedIn, user) {
        props.handleLogin(loggedIn, user)
    }

    const resetCredentials = () => {
        props.reset()
    }

    const login = async (e) => {

        const endpoint = "https://tasty-tv-api.herokuapp.com/account/login"

        e.preventDefault()

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: props.un,
                password: props.pw
            })
        };
        try {
            const res = await fetch(endpoint, requestOptions)
            const response = await res.json()
            handleLogin(response.loggedIn, response.user)
            if(!response.loggenIn){
                setStatus(response.message)
            }
            else{
                setStatus('')
            }
        }

        catch (e) {
            console.log(e, "Error connecting to server")
        }
        resetCredentials()
    }




    return (
        <div >

            <p>Welcome back.</p>

            <p><em><b>{status}</b></em></p>

            <form name="Welcome" onSubmit={login}>
                <div className="account-form-section">
                    <label for="username">Username:</label>
                    <input className="account-input" type="textbox" name="username" onChange={handleChange} value={props.un} />
                </div>
                <div className="account-form-section">
                    <label for="password">Password:</label>
                    <input className="account-input" type="password" name="password" onChange={handleChange} value={props.pw} />
                </div>
                <button className="account-button">Sign In</button>

                {/* <input type="submit" value="Sign In" /> */}
            </form>

            <h4>Not registered?, <a href="/register" onClick={subHeadingChange} name="Sign up to enjoy!">Sign up</a></h4>
        </div>
    )
}

export default AccountSignIn