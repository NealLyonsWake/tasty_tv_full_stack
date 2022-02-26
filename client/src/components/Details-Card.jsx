import NoPoster from '../img/no-poster.png'


function DetailsCard(props) {

    const posterCheck = () => {
        if (props.poster.includes('null')) {
            return (<img className='poster' src={NoPoster} alt={`Poster for the movie, ${props.title}`} />)
        }
        else {
            return (<img className='poster' src={props.poster} alt={`Poster for the movie, ${props.title}`} />)
        }
    }

    const overviewCheck = () => {
        if (props.overview.length >= 250) {
            const shortenedOverview = props.overview.substring(0, 249) + "..."
            return shortenedOverview
        }
        else {
            return props.overview
        }
    }

    const cancelDetails = () => {
        props.cancel()
    }


    const handleClickAddMov = async () => {

        // props.onAdd(
        //     props.user,
        //     props.id,
        //     props.overview,
        //     props.user_score,
        //     props.title,
        //     props.poster,
        //     props.watched
        // );

        // const endpoint = "/watch/requestmovie/"
        const endpoint = "/watch/requestmovie/"

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: props.user,
                id: props.id,
                name: props.title,
                poster: props.poster,
                watched: props.watched,
                review: "",
                posted: false,
                user_score: props.user_score,
                overview: props.overview
            })
        };
        try {
            const res = await fetch(endpoint, requestOptions)
            const response = await res.json()
            alert(response.message)
            // handleLogin(response.loggedIn, response.user)
        }

        catch (e) {
            console.log(e, "Error connecting to server")
        }
    }

    const manageTitle = () => {
        if (props.title.length >= 48) {
            const result = `${props.title.substr(0, 47)}...`
            return result
        }
        else {
            return props.title
        }
    }
    return (
        <div className="detailsCard">
            <div className="detailsPoster">{posterCheck()}</div>
            <div className="cancelButton"><button className='addButton' onClick={cancelDetails}>X</button></div>
            <div className="detailsName"><h4>{manageTitle()}</h4></div>
            <div className="detailsScore"><p>User Score: <i>{props.user_score * 10}%</i></p></div>
            <div className='detailsAddButton'><button className='addButton' onClick={handleClickAddMov} >Add to Watch List</button></div>
            <div className="detailsOverview"><p>{overviewCheck()}</p></div>
        </div>
    )



}

export default DetailsCard;