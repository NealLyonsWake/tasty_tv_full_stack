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
    
    return (
        <div>
        {posterCheck()}
        <h4>{props.name}</h4>
        <p><i>{props.user_score}</i></p>                     
        <p>{props.overview}</p>               
        </div>
    )   
        


}

export default DetailsCard;