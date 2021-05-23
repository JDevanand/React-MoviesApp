import React, { Component } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import moviesData from '../../common/movieData';
import Typography from '@material-ui/core/Typography';

class Details extends Component {

    constructor() {
        super();
        this.state = {
            movie: {}
        }
    }

    //Component will mount is required to fetch data before render() function is called
    //Component did mount is called only after render()
    componentWillMount() {
        let currentState = this.state;
        currentState.movie = moviesData.filter((movie) => {
            return movie.id === this.props.movieId;
        })[0];      //[0] is to get the first element in array
        this.setState({ currentState });
        console.log(this.state);
    }

    render() {
        let movie = this.state.movie;
        return (
            <div className='details'>
                <Header />
                <div className='flex-containerDetails'>
                    <div className='leftDetails'>
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>

                    <div className='middleDetails'>
                        <div>
                            <Typography variant='headline' component='h2'>{movie.title}</Typography>
                        </div>
                        <br /><br />
                        <div>
                            <Typography><span className='bold'>Genre:</span>{movie.genres.join(',')}</Typography>
                        </div>
                        <div>
                            <Typography><span className='bold'>Duration:</span>{movie.duration}</Typography>
                        </div>
                        <div>
                            <Typography><span className='bold'>Release Date:</span>{new Date(movie.release_date).toDateString()}</Typography>
                        </div>
                        <div>
                            <Typography><span className='bold'>Rating:</span>{movie.critics_rating}</Typography>
                        </div>
                        <br /><br />
                        <div>
                            <Typography>
                                <span className='bold'>Plot:</span>
                                <span>(<a href={movie.wiki_url}>Wiki Link</a>){movie.storyline}</span>                                
                            </Typography>
                        </div>
                    </div>

                    <div className='rightDetails'>

                    </div>
                </div>
            </div>
        );
    }

}

export default Details;