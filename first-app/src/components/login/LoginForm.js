import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { createQuantity } from "../../actions/quantitiesActions";
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {Link, Redirect} from 'react-router-dom';

import SnackbarFormWrapper from '../view/Snackbarformwrapper'
import purple from "@material-ui/core/es/colors/purple";
import green from "@material-ui/core/es/colors/green";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    cssLabel: {
        '&$cssFocused': {
            color: '#86C232'
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#86C232'
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#86C232'
        }
    },
    notchedOutline: {}
});



class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: false,

            open: false,
            vertical: 'top',
            horizontal: 'center',

            messageVariant: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleSuccess() {

        console.log(localStorage.getItem('token'));
        const { success } = this.state;

        if(success) {
            this.setState({open: true, messageVariant: 'success'}, () => {
                localStorage.setItem('token',this.state.username); //TODO change to token
                setTimeout(() =>
                    this.props.history.push('/header'), 1000)
            });
        } else {

            localStorage.setItem('token',''); //todo remove
            this.setState({username: '', password: '',
                messageVariant: 'error', open: true})
        }
    }

    onSubmit(event) {
        event.preventDefault();

        const credentials = {
            username: this.state.username,
            password: this.state.password
        };

        this.login(credentials);
    };

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    login(credentials) {
        fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => response.json())
            .then(res => {
                    //TODO DO ZMIANY
                    res.username === '' ?
                        this.setState({success: false}, this.handleSuccess)
                        : this.setState({success:true}, this.handleSuccess);
                }
            );
    }


    render() {

        const { classes } = this.props;
        const { username, password, open, messageVariant } = this.state;

        const auth = localStorage.getItem('token');
        const isLoggedIn = !(auth === '' || auth === null);

        if(isLoggedIn)
            this.props.history.push('/header');

        return (
            <div>
                <h1 style={{color:'#CCC', fontSize: 40}}>Log in</h1>
                <Paper style={{marginLeft:'30%',width:'40%',backgroundColor:'#CCC',borderRadius:'25px'}}>
                    <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                        <br/>
                        <TextField id="username" label="Username"
                                   className={classes.textField} margin="normal" value={username}
                                   onChange={this.onChange} name="username" variant="outlined"
                                   InputLabelProps={{
                                       classes: {
                                           root: classes.cssLabel,
                                           focused: classes.cssFocused,
                                       },
                                   }}
                                   InputProps={{
                                       classes: {
                                           root: classes.cssOutlinedInput,
                                           focused: classes.cssFocused,
                                           notchedOutline: classes.notchedOutline,
                                       }
                                   }}
                                    />
                        <br/>

                        <TextField id="password" label="Password"
                                   className={classes.textField} margin="normal" value={password}
                                   onChange={this.onChange} name="password" type="password"
                                   variant="outlined"
                                   InputLabelProps={{
                                       classes: {
                                           root: classes.cssLabel,
                                           focused: classes.cssFocused,
                                       },
                                   }}
                                   InputProps={{
                                       classes: {
                                           root: classes.cssOutlinedInput,
                                           focused: classes.cssFocused,
                                           notchedOutline: classes.notchedOutline,
                                       }}}
                                />
                        <br/>

                        <Button style={{marginBottom: '5%',marginTop:'5%',backgroundColor: "#86C232"}}
                                variant="contained"  className={classes.button} type="submit" onSubmit={this.onSubmit}
                                size="large">
                            Log in
                        </Button>

                        <br/>
                        <Button style={{marginBottom: '5%',backgroundColor: "#86C232"}}
                                component={Link} to={'/register'}
                                variant="contained"  className={classes.button} type="submit"
                                size="small">
                            Create account
                        </Button>

                    </form>

                    <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                </Paper>

            </div>


        );
    }

}

export default withStyles(styles)(LoginForm);