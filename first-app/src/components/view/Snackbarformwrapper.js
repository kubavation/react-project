import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import SnackbarForm from './Snackbarform';


class SnackbarFormWrapper extends Component {

    constructor(props) {
        super();
        this.state = {
            open: props.open,
            onClose: props.onClose,
            variant: props.variant,
            message: props.message
        };
    }

    componentWillReceiveProps(props) {
        this.setState({open: props.open, variant: props.variant,message: props.message})
    }

    render() {

        const { open, onClose, variant, message } = this.state;

        let msg;
        if(message === undefined) {
            msg = variant === "success" ? "Dodano nowy rekord"
                : "Nie udało się utworzyć nowego rekordu";
        } else {
            msg = message;
        }

        return (
           <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={onClose}
            >
                <SnackbarForm
                    onClose={onClose}
                    open = {open}
                    variant={variant}
                    message={msg}
                />
            </Snackbar>
        );
    }
}

export default SnackbarFormWrapper;