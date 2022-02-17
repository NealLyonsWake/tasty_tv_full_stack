import './Style-recommend-card.css'
import NoPoster from '../img/no-poster.png'

function RecommendedCard(props) {

    const posterCheck = () => {
        if (props.poster.includes('null')) {
            return (<img className='poster' src={NoPoster} alt={`Poster for the movie, ${props.title}`} />)
        }
        else {
            return (<img className='poster' src={props.poster} alt={`Poster for the movie, ${props.title}`} />)
        }
    }

    const handleClickAddMov = async () => {
        // props.onAdd(props.id, props.title, props.poster, props.watched);

        const endpoint = "/watch/requestmovie"

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
                posted: false
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

    return props.poster !== undefined ?
        (
            <div className='movCard'>
                {posterCheck()}
                <div className='addContainer'><button className='addButton' onClick={handleClickAddMov}>Add to Watch List</button></div>
                <h4 className='title'>{props.displayTitle}</h4>
            </div>
        ) : (
            null
        )


}

export default RecommendedCard;