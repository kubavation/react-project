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
import SnackbarFormWrapper from '../view/Snackbarformwrapper';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { createMuiTheme } from '@material-ui/core'
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";

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

export const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#86C232',
            light:  '#0f0',
            dark:  '#00f',
        },
        secondary: {
            main: '#0F0',
        },
    },
});
class FactorSourcesform extends Component {

    constructor(props) {
        super();
        if (props.match.params.id !== null && props.match.params.id !== undefined){
            this.getForEdit(props);
        }
        else{
            this.state = {
                date: new Date(),
                desc: '',
                doi: '',
                bibtex: '',
                fileName: '',
                file :  React.createRef(),

                open: false,
                vertical: 'top',
                horizontal: 'center',

                messageVariant: '',
            };
        }


        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    componentDidMount() {
     //   this.fetchFiles();
    }

    createFactorSource(factorSource) {

        console.log(factorSource);

        fetch(process.env.REACT_APP_HOST + '/source',{
            method: 'POST',
/*            headers: {
                'content-type' : 'application/json'
            },*/
            body: factorSource
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({open: true, messageVariant: 'success'})
                    setTimeout(() =>
                        this.props.history.push('/factors/factorsources/list'), 800);
            }
        });
            /*.then(response => response.json())
            .then(res => {
                    console.log(res)
                }
            );*/
    }

    updateFactorSource(factorSource) {

        console.log(factorSource);

        fetch(process.env.REACT_APP_HOST + '/source/' + this.state.id, {
            method: 'POST',
            /*            headers: {
                            'content-type' : 'application/json'
                        },*/
            body: factorSource
        }).then(response => {
            if (response.status != "204")
                this.setState({open: true, messageVariant: 'error'})
            else {
                this.setState({open: true, messageVariant: 'success'})
                setTimeout(() =>
                    this.props.history.push('/factors/factorsources/list'), 800);
            }
        });
        /*.then(response => response.json())
        .then(res => {
                console.log(res)
            }
        );*/
    }



    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };


    onFileChange(event) {
        //todo cos tu nie dziala
        console.log(this.state)
        const name = this.state.file.current.files[0].name;
        this.setState({fileName: name});
    }


    onSubmit(event) {
        event.preventDefault();
        let formData = new FormData();

        /*this.state.file.current.files[0].map((file, index) => {
            formData.append(`file${index}`, file);
        });*/

        const {date} = this.state;
        console.log(date)
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        formData.append(`file`, this.state.file.current.files[0]);
        console.log(this.state.file.current.files[0])
        formData.append('date', formatted_date);
        formData.append('description', this.state.desc);
        formData.append('doi', this.state.doi);
        formData.append('bibtex', this.state.bibtex);


        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        //formData.append('date', this.state.date);

        const factorSource = {
            date: this.state.date,
            desc: this.state.desc,
            doi: this.state.doi,
            bibtex: this.state.bibtex,
            file: this.state.file.current.files[0]
        };

        if(this.state.id)
            this.updateFactorSource(formData)
        else
            this.createFactorSource(formData);

        // const variant = 'success';  // ? fail?
        //
        // this.setState({userId: '', title: '',
        //     date: '', desc: '', doi: '',bibtex: '',file: React.createRef(),
        //     redirect: true, open: true, messageVariant: variant});

    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    handleDateChange = date => {
        this.setState({ date: date });
    };

    getForEdit(props) {
        fetch(process.env.REACT_APP_HOST + '/source/' + props.match.params.id)
        //fetch('https://jsonplaceholder.typicode.com/todos/2')
            .then(response => response.json())
            .then(res => {
                console.log(res)
                this.setState({
                    doi: res.doi,
                    bibtex: res.bibtex,
                    date: new Date(res.source_date),
                    desc: res.source_description,
                    id: res.source_id,
                    //file: res.file_id,
                    file: React.createRef(),
                    open: false,
                    vertical: 'top',
                    horizontal: 'center',
                    messageVariant: '',
                }, () => this.fetchFile(res.file_id));
            });
    }

    fetchFile(id) {
        fetch(process.env.REACT_APP_HOST + '/file/' + id)
            .then(response => response.json())
            .then(res => {
                console.log(res);
               this.setState({fileName: res.file_name})
            });
    }

    render() {
        if(this.state != null) {
            const {classes} = this.props;
            const {date, desc, doi, bibtex, file, files, fileName} = this.state;
            const {open, messageVariant} = this.state;

            // const fileItems = files.map(file => (
            //     <MenuItem value={file.id}>{file.title}</MenuItem>
            // ));

            return (
                <div>
                    <h1 style={{color: '#CCC', fontSize: 40}}>Dodawanie nowego źródła</h1>
                    <Paper style={{marginLeft: '20%', width: '60%', backgroundColor: '#EEE', borderRadius: '25px'}}>
                        <form onSubmit={this.onSubmit} style={{marginTop: '10%'}}>

                            {/*<TextField*/}
                            {/*id="date"*/}
                            {/*label="Data"*/}
                            {/*value={date}*/}
                            {/*name="date"*/}
                            {/*type="date"*/}
                            {/*onChange={this.onChange}*/}
                            {/*className={classes.textField}*/}
                            {/*InputLabelProps={{*/}
                            {/*shrink: true,*/}
                            {/*}}*/}
                            {/*/>*/}

                            <br/>
                            <MuiThemeProvider theme={customTheme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    {/* <Grid container className={classes.grid} justify="space-around"> */}
                                    <DatePicker
                                        id="date"
                                        margin="normal"
                                        format="dd-MM-yyyy"
                                        keyboard
                                        style={{width: '25%'}}
                                        label="Date"
                                        name="date"
                                        value={date}
                                        onChange={this.handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </MuiThemeProvider>


                            <TextField id="doi" label="DOI" variant="outlined" style={{marginLeft: '9%', width: '25%'}}
                                       className={classes.textField} margin="normal" value={doi}
                                       onChange={this.onChange} name="doi"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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
                                       }}/>

                            <br/>


                            <TextField id="bibtex" label="BibText" variant="outlined"//textarea
                                       style={{width: '60%'}}
                                       multiline
                                       rows="5"
                                       className={classes.textField} margin="normal" value={bibtex}
                                       onChange={this.onChange} name="bibtex"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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
                                       }}/>

                            <br/>

                            <TextField id="desc" label="Opis" variant="outlined"
                                       style={{width: '60%'}}
                                       className={classes.textField} margin="normal" value={desc}
                                       onChange={this.onChange} name="desc"
                                       multiline
                                       rows="3"
                                       InputLabelProps={{
                                           style: {fontSize: 25},
                                           shrink: true,
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
                                       }}/>

                            <br/>


                            <br/>
                            <br/>

                            <div>
                                <TextField id="fileName" label="Plik" variant="outlined"
                                           style={{width: '43%', marginLeft: '0%'}} disabled
                                           className={classes.textField} margin="normal" value={fileName}
                                           onChange={this.onChange} name="fileName"
                                           InputLabelProps={{
                                               style: {fontSize: 25},
                                               shrink: true,
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
                                           }}/>


                                <Button variant="contained" component="label"
                                        style={{marginTop: '2%', backgroundColor: "#86C232", color: '#fff'}}
                                        size="large">
                                    Upload file
                                    <input type="file" style={{display: 'none'}} name="file" ref={file}
                                           onChange={this.onFileChange}
                                    />
                                </Button>
                            </div>

                            {/* <InputLabel htmlFor="file">Plik</InputLabel>
                        <Select
                            value={file}
                            style={{width:'20%'}}
                            onChange={this.onChange}
                            placeholder="Plik"
                            input={<Input name="file" id="file"/>}
                        >
                            {fileItems}
                        </Select> */}

                            <br/>
                            <Button style={{marginBottom: '5%', marginTop: '5%', backgroundColor: '#86C232'}}
                                    variant="contained" color="primary" className={classes.button} type="submit"
                                    onSubmit={this.onSubmit}
                                    size="large">
                                {this.state.id != null ? 'Zmień' : 'Dodaj'}
                            </Button>


                            <Button style={{marginBottom: '5%', marginTop: '5%', backgroundColor: "#86C232",
                                marginLeft:'2%'}}
                                    variant="contained" color="primary" className={classes.button}
                                    onClick={() => window.history.go(-1)}
                                    size="large">
                                Anuluj
                            </Button>

                        </form>

                        <SnackbarFormWrapper open={open} onClose={this.handleClose} variant={messageVariant}/>

                    </Paper>

                </div>

            )
        }
        else return null;

    }


}

export default withStyles(styles)(FactorSourcesform);