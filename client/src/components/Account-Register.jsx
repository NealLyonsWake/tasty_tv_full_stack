import React, { useState } from 'react'

function AccountRegister(props) {
    const [status, setStatus] = useState('')

    function handleChange(e) {
        const target = e.target.value
        const targetLength = target.length
        props.event(e)
        if (e.target.name === 'username') {
            if (targetLength < 3) {
                setStatus('Username should be at least 3 characters')                
            }
            else (setStatus(''))
        } else {
            if (targetLength < 12) {
                setStatus('Password should be at least 12 characters')
            }
            else (setStatus(''))
        }
    }

    const subHeadingChange = (e) => {
        props.subHeading(e.target.name)
        e.preventDefault()
    }

    const resetCredentials = () => {
        props.reset()
    }

    const register = async (e) => {

        e.preventDefault()
        const usernameLength = props.un.length
        const passwordLength = props.pw.length
        
        if(usernameLength >=3 && passwordLength >= 12){

        const endpoint = "/account/register"
       
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
            if (response.message !== 'Registration successful.') {
                setStatus(response.message)
            }
            else {
                alert(response.message)
                setStatus('')
                subHeadingChange(e)
            }
        }

        catch (e) {
            console.log(e, "Error connecting to server")
        }
    } else {
        if(usernameLength < 3 && passwordLength < 12){
        setStatus('Username and Password are too short')}
        else if(usernameLength < 3){
            setStatus('Username is too short')
        }
        else{
            setStatus('Password is too short')
        }
    }
        resetCredentials()
    }

    return (

        <div>
            <p>Welcome to Tasty TV, a social platform for movie fans.</p>
            <p>Discover our tasty random movie recommendations to review.</p>
            <p>Post your reviews to the community and start a conversation.</p>
            <p>Join in with other conversations on your favourite movies.</p>
            <p><i>Tasty TV Dev Team</i></p>

            <p><em><b>{status}</b></em></p>

            <form onSubmit={register} name='Sign in'>
                <div className="account-form-section">
                    <label for="username">Username:</label>
                    <input className="account-input" type="textbox" name="username" onChange={handleChange} value={props.un} />
                </div>
                <div className="account-form-section">
                    <label for="password">Password:</label>
                    <input className="account-input" type="password" name="password" onChange={handleChange} value={props.pw} />
                </div>
                <button className="account-button">Register</button>
            </form>

            <h4>Already registered?, <a href="/login" onClick={subHeadingChange} name='Sign in'>Sign in</a></h4>
        </div>
    )
}

export default AccountRegister