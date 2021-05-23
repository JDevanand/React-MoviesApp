import React, { Component } from 'react';
import '../../screens/details/Details.css';
import Header from '../../common/header/Header';
import moviesData from '../../common/movieData';

class Details extends Component {

    constructor(){
        super();
        this.state={
            movie:{}
        }
    }

    componentDidMount(){
        let currentState = this.state;
        currentState.movie = moviesData.filter((movie)=>{
            return movie.id === this.props.movieId;  
        })[0];      //[0] is to get the first element in array
        this.setState({currentState});
        console.log(this.state);
    }

    render() {
        return (
            <div className='details'>
                <Header />
                <div className='flex-containerDetails'>
                    <div className='leftDetails'>

                    </div>
                    <div className='middleDetails'></div>

                    <div className='rightDetails'></div>
                </div>
            </div>
        );
    }

}

export default Details;