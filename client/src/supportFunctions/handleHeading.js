function handleHeading(location, user) {
    // Set the heading 
    if (location.pathname === '/tastyrandoms' || location.pathname === '/') {
        return user ? <h2 className='heading'>{`Hey ${user}, your Tasty Randoms`}</h2>
            : <h2 className='heading'>Tasty Randoms</h2>
    }
    else if (location.pathname === '/watchlist') {
        return user ? <h2 className='heading'>{`Hey ${user}, your Watch List`}</h2>
            : <h2 className='heading'>Watch List</h2>
    }
    else if (location.pathname === '/reviews') {
        return user ? <h2 className='heading'>{`Hey ${user}, your Reviews`}</h2>
            : <h2 className='heading'>Reviews</h2>
    }
    else {
        return user ? <h2 className='heading'>{`Hey ${user}, your Account`}</h2>
            : <h2 className='heading'>Account</h2>
    }
}

export default handleHeading