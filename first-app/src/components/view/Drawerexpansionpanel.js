import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Quantities from "../units/Quantities";



class DrawerExpensionPanel extends Component{

    constructor(props) {
        super();
        this.state = {
            numOfListItems: props.numOfListItems,

        }
    }


    render() {

        return (
            <div></div>
        );
    }

}