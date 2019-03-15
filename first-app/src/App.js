import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MyDrawer from './components/appbars/Drawer';
import video from './bvideo4.mp4';

//remove

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


//


class App extends Component {

  componentDidMount() {
    console.log("hi")
  }

  constructor(props) {
      super(props)
  }

  render() {
      const { classes } = this.props;
      const bull = <span className={classes.bullet}>•</span>;
    return (

      <Router>
      <div className="App">
          <MyDrawer/>
          <video autoPlay muted loop id="myVideo">
              <source src={video} type="video/mp4"/>
          </video>
          <h1 className="header">Knowledge Bank</h1>
          <div className="content">
              <p>This website was created to store information about carbon footprint.</p>
              <p>Help us to make it bigger and insert new data.</p>
          </div>
      </div>
      </Router>
    );
  }
}

{/*App.propTypes = {*/}
    {/*classes: PropTypes.object.isRequired,*/}
{/*};*/}

export default withStyles(styles)(App);
