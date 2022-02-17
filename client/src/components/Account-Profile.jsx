import React from 'react'

function AccountProfile(props) {

    const signOut = async () => {

        const requestOption = {
            method: 'GET',
            credentials: 'include'
          }

        try {
            await fetch('/account/signout', requestOption).then(async (res) => {
                const response = await res.json()
                console.log(response.message)
                

            })
        }
        catch (err) {
            console.log('Error', err)
        }
    }



return (
    <div className='account-space'>
        <h3>{`Hello ${props.user}`}</h3>
        <p>Logged In</p>
        <button className="account-button" onClick={signOut}>Sign out</button>
    </div>
)
}

export default AccountProfile