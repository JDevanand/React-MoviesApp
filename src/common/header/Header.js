import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

//Stateless functional component
// here textAlign is used to center the login form and not just the texts in it
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign:'center'}}> 
            {props.children}
        </Typography>
    );
}

//Below is required to make sure that the "Tabcontainer has childrens"
//This is called type checking 
//Code will stil run but throws console error if there are no children to tabContainer
TabContainer.propTypes={
    children:PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false, //required for modal
            value: 0,             //required for Tabs
            
            username:"",                  // state variable to capture the input field of username
            usernameRequired:"dispNone",  //dispNone is className with css defined as none. 

            password:"",
            passwordRequired:"dispNone",

            register: {
                firstname:"",
                firstnameRequired:"dispNone",
                lastname:"",
                lastnameRequired:"dispNone",
                email:"",
                emailRequired:"dispNone",
                password:"",
                passwordRequired:"dispNone",
                contactno:"",
                contactnoRequired:"dispNone"
            }
        };
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModalHandler = () => {        
        this.setState({ modalIsOpen: false, 
                        usernameRequired:'dispNone', //usename and password "required" helpertext needs to be set to displaynone on closing
                        passwordRequired:'dispNone', //this is to avoid the side-effect of the "required" helpertext been dispalyed when closing & opening modal again
                        value:0,    //this is required to make the "login" tab while opening modal again, in case the "register" tab was selected
                        register:{
                            firstnameRequired:"dispNone",
                            lastnameRequired:"dispNone",
                            emailRequired:"dispNone",
                            passwordRequired:"dispNone",
                            contactnoRequired:"dispNone"
                        } 
                    });   
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler=()=>{
        this.state.username ==="" ? this.setState({usernameRequired:'dispBlock'}) : this.setState({usernameRequired:'dispNone'});
        this.state.password ==="" ? this.setState({passwordRequired:'dispBlock'}) : this.setState({passwordRequired:'dispNone'});
    }

    onInputUsernameChange=(e)=>{
        this.setState({username:e.target.value});
    }

    onInputPasswordChange=(e)=>{
        this.setState({password:e.target.value});
    }

    onRegisterFormInputChange=(e)=>{
        const state = this.state;
        state.register[e.target.name] = e.target.value;
        this.setState({state:state});
    }

    registerClickHandler=()=>{
        const state = this.state.register;
        state.firstname==="" ? state.firstnameRequired="dispBlock" : state.firstnameRequired='dispNone';
        state.lastname==="" ? state.lastnameRequired="dispBlock" : state.lastnameRequired='dispNone';
        state.email==="" ? state.emailRequired="dispBlock" : state.emailRequired='dispNone';
        state.password==="" ? state.passwordRequired="dispBlock" : state.passwordRequired='dispNone';
        state.contactno==="" ? state.contactnoRequired="dispBlock" : state.contactnoRequired='dispNone';        
        this.setState({state:state});
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            Login
                        </Button>
                    </div>
                </header>

                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}  //open or close managed by 'state' property
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login"></Tab>
                        <Tab label="Register"></Tab>
                    </Tabs>

                    
                    {
                    //This check is to make sure that login shows only for login tab                      
                    this.state.value ===0 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="Username">Username:</InputLabel>
                            <Input id="Username" type="text" username={this.state.username} onChange={this.onInputUsernameChange}></Input>
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required>
                            <InputLabel htmlFor="Password" >Password:</InputLabel>
                            <Input id="Password" type="password" password={this.state.password} onChange={this.onInputPasswordChange}></Input>
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </TabContainer>
                    }   

                    {
                    //This check is to make sure that login shows only for register tab                      
                    this.state.value ===1 &&
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="Firstname">Firstname:</InputLabel>
                            <Input name="firstname" id="Firstname" type="text" firstname={this.state.register.firstname} onChange={this.onRegisterFormInputChange}></Input>
                            <FormHelperText className={this.state.register.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>

                        <FormControl required>
                            <InputLabel htmlFor="Lastname">Lastname:</InputLabel>
                            <Input name="lastname" id="Lastname" type="text" lastname={this.state.register.lastname} onChange={this.onRegisterFormInputChange}></Input>
                            <FormHelperText className={this.state.register.lastnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>    

                        <FormControl required>
                            <InputLabel htmlFor="Email">Email:</InputLabel>
                            <Input name="email" id="Email" type="text" email={this.state.register.email} onChange={this.onRegisterFormInputChange}></Input>
                            <FormHelperText className={this.state.register.emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>   

                        <FormControl required>
                            <InputLabel htmlFor="Password">Password:</InputLabel>
                            <Input name="password" id="Password" type="password" password={this.state.register.password} onChange={this.onRegisterFormInputChange}></Input>
                            <FormHelperText className={this.state.register.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>

                        <FormControl required>
                            <InputLabel htmlFor="ContactNo">Contact No.:</InputLabel>
                            <Input name="contactNo" id="ContactNo" type="text" contactno={this.state.register.contactno} onChange={this.onRegisterFormInputChange}></Input>
                            <FormHelperText className={this.state.register.contactnoRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/> 

                        <Button variant="contained" color="primary" onClick={this.registerClickHandler}>Register</Button>
                    </TabContainer>
                    }   
                </Modal>
            </div>
        )
    }
}

export default Header;