import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './BookShow.css';
import Header from '../../common/header/Header';
import Home from '../home/Home';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import language from '../../common/language';
import location from '../../common/location';
import showDate from '../../common/showDate';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class BookShow extends Component {

    constructor(){
        super();
        this.state={
            location:""
        }
    }

    backToDetailsHandler = () => {
        ReactDom.render(<Home />, document.getElementById('root'));
    }

    locationChangeHandler= event =>{
        this.setState({location:event.target.value});
    }

    render() {
        return (
            <div>
                <Header />

                <div className='bookShow'>
                    <Typography className='back' onClick={this.backToDetailsHandler}>
                        &#60; Back to Movie Details
                    </Typography>
                    <Card className='cardStyle'>
                        <CardContent>
                            <Typography variant='headline' component='h2'>
                                BookShow
                            </Typography> <br />

                            <FormControl required className='formControl'>
                                <InputLabel htmlFor='location'>Choose Location:</InputLabel>
                                <Select  
                                    value={this.state.location}
                                    onChange={this.locationChangeHandler}>                                  
                                    {location.map(loc => (
                                        <MenuItem key={'loc'+loc.id} value={loc.location}>
                                            {loc.location}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>

            </div>
        );
    }
}



export default BookShow;