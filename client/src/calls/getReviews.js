const handleReviewCall = async () => {
    

    const loggedIn = sessionStorage.getItem('loggedIn');

    if (loggedIn) {
        const endpoint = "https://tasty-tv-api.herokuapp.com/review/requestreviews"
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await fetch(endpoint, requestOptions)
            const response = await res.json()
            return response            
        }
        catch (e) {
            console.log(e, "Error connecting to server")
        }
    }
    else {
        return []
    }
}

export default handleReviewCall