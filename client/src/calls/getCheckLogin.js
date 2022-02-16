const checkLogin = async () => {

        const requestOption = {
        method: 'GET',
        credentials: 'include'
    }

    try {
        const res = await fetch('https://tasty-tv-api.herokuapp.com/account/welcome', requestOption)
        const response = await res.json()
            // setLoggedIn(response.loggedIn)

            if (response.loggedIn) {
                
                // Save data to sessionStorage
                sessionStorage.setItem('loggedIn', response.loggedIn);
                const data = {
                    loggedIn: response.loggedIn,
                    user: response.user
                }
              
                // console.log(data)
                return data

            }
            else if (!response.loggedIn && response.user !== "") {
                // clear session storage
                sessionStorage.clear();

                const data = {
                    user: '',
                    watchList: []
                }
                // console.log(data)
                return data
            }
        
    }
    catch (err) {
        console.log('Error', err)
    }
}


export default checkLogin