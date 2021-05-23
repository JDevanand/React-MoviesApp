import React, { Component } from 'react';
import './Home.css';
import Header from "../../common/header/Header";
import { withStyles } from '@material-ui/core/styles';
import moviesData from '../../common/movieData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import genres from '../../common/genres';
import artists from '../../common/artists';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBox from '@material-ui/core/Checkbox';
import Textfield from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    },
    gridListMain: {
        transform: 'translateZ(0)',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
     },
     title: {
        color: theme.palette.primary.light,
     }
});



class Home extends Component {

    constructor(){
        super();
        this.state={
            movieName:"",
            genres:[],
            artists:[]
        }
    }

    movieNameChangeHandler = event =>{
        this.setState({movieName:event.target.value});
    }

    genreSelectHandler = event=>{
        const state = this.state.genres;
        console.log(event.target.value);
        state.push(event.target.value);
        this.setState({genres: state});
        console.log(this.state.genres);
    }

    artistSelectHandler=event=>{
        this.setState({artists: event.target.value});
        console.log(this.state.artists);
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>
                <GridList cols={5} className={classes.gridListUpcomingMovies}>
                    {moviesData.map(movie => (
                        <GridListTile key={movie.id}>
                            <img src={movie.picture_url} className="movie-poster" alt={movie.title} />
                            <GridListTileBar title={movie.title} />
                        </GridListTile>
                    ))}
                </GridList>

                <div className="flex-container">
                    <div className="left">
                        <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
                            {moviesData.map(movie => (
                                <GridListTile className="released-movie-grid-item" key={"grid" + movie.id}>
                                    <img src={movie.poster_url} className="movie-poster" alt={movie.title} />
                                    <GridListTileBar
                                        title={movie.title}
                                        subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <div className="right">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor='movieName'>Movie Name</InputLabel>
                                    <Input id='movieName' type="text" onChange={this.movieNameChangeHandler}/>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor='select-multiple-checkbox-genre'>Genre</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id='select-multiple-checkbox-genre'/>}
                                        renderValue = {selected=>selected.join(',')}
                                        value ={this.state.genres}
                                        onChange = {this.genreSelectHandler}
                                        >
                                        <MenuItem value='0'>None</MenuItem> 
                                        {genres.map(genre=>(
                                        <MenuItem key={genre.id} value ={genre.name} >
                                            <CheckBox checked={this.state.genres.indexOf(genre.name) > -1}/>
                                            <ListItemText primary={genre.name}/>                                        
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor='select-multiple-checkbox-artist'>Artists</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id='select-multiple-checkbox-artist'/>}
                                        renderValue = {selected=>selected.join(',')}
                                        value ={this.state.artists}
                                        onChange = {this.artistSelectHandler}>
                                        <MenuItem value='0'>None</MenuItem>
                                        {artists.map(artist=>(
                                        <MenuItem key={artist.id} value ={artist.first_name + " " + artist.last_name}>
                                            <CheckBox checked={this.state.genres.indexOf(artist.first_name + " " + artist.last_name) > -1}/>
                                            <ListItemText primary={artist.first_name + " " + artist.last_name}/>                                        
                                        </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>               

                                <FormControl className={classes.formControl}>
                                        <Textfield type='date'
                                                    id='releaseDateStart'
                                                    label='Release Date Start'
                                                    defaultValue=''
                                                    InputLabelProps={{shrink:true}}
                                        />                                
                                </FormControl>                


                            </CardContent>
                        </Card>            
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(Home);