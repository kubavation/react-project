import React, { PureComponent, Component } from 'react';
import {
    PieChart, Pie, Legend, Tooltip, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid,  ResponsiveContainer
} from 'recharts';

import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORSCo2 = ['F98866', '#89DA59', '#FF420E', '#80BD9E'];
const COLORSWater = ['#505160', '#598234', '#68829E', '#AEBD38'];


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

class Charts extends Component {

    constructor(props) {
        super();

        let chartIn = {
            energy_resources: [
                {
                    gus: "060",
                    name: "Węgiel kamienny energetyczny z wyłączeniem brykietów",
                    unit: "tona",
                    ammount: 1234.2
                },
                {
                    gus: "088",
                    name: "benzyna silnikowa bezołowiowa",
                    unit: "tona",
                    ammount: 3214.2
                },
                {
                    gus: "024",
                    name: "energia elektryczna",
                    unit: "MWh",
                    ammount: 3122.4
                }
            ],
            resources: [
                {
                    res_id: 1,
                    name: "WATER",
                    unit: "m3",
                    ammount: 255255
                },
                {
                    res_id: 14,
                    name: "BROKUŁ RÓŻA JESIENNY",
                    unit: "kg",
                    ammount: 1093508
                },
                {
                    res_id: 18,
                    name: "GROSZEK",
                    unit: "kg",
                    ammount: 1011485
                }
            ],
            products: [
                {
                    prod_id: 11,
                    name: "Mrożony groszek",
                    unit: "kg",
                    ammount: 981100,
                    resources: [
                        18, 1
                    ],
                    energy_resources: [
                        "024"
                    ]
                },
                {
                    prod_id: 32,
                    name: "Mrożony brokuł",
                    unit: "kg",
                    ammount: 231128,
                    resources: [
                        14, 1
                    ],
                    energy_resources: [
                        "024",
                        "088",
                        "060"
                    ]
                }
            ]
        };


        this.state = {
            chartEqco2: [],
            chartProducts: [],
            chartWater: [],
            json: JSON.stringify(chartIn)
        }
       // this.getCharts(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';
    static chartIn = {
        xd: "xD"
    };

    onSubmit(event) {
        event.preventDefault();

        let chartIn = {
            energy_resources: [
                {
                    gus: "060",
                    name: "Węgiel kamienny energetyczny z wyłączeniem brykietów",
                    unit: "tona",
                    ammount: 1234.2
                },
                {
                    gus: "088",
                    name: "benzyna silnikowa bezołowiowa",
                    unit: "tona",
                    ammount: 3214.2
                },
                {
                    gus: "024",
                    name: "energia elektryczna",
                    unit: "MWh",
                    ammount: 3122.4
                }
            ],
            resources: [
                {
                    res_id: 1,
                    name: "WATER",
                    unit: "m3",
                    ammount: 255255
                },
                {
                    res_id: 14,
                    name: "BROKUŁ RÓŻA JESIENNY",
                    unit: "kg",
                    ammount: 1093508
                },
                {
                    res_id: 18,
                    name: "GROSZEK",
                    unit: "kg",
                    ammount: 1011485
                }
            ],
            products: [
                {
                    prod_id: 11,
                    name: "Mrożony groszek",
                    unit: "kg",
                    ammount: 981100,
                    resources: [
                        18, 1
                    ],
                    energy_resources: [
                        "024"
                    ]
                },
                {
                    prod_id: 32,
                    name: "Mrożony brokuł",
                    unit: "kg",
                    ammount: 231128,
                    resources: [
                        14, 1
                    ],
                    energy_resources: [
                        "024",
                        "088",
                        "060"
                    ]
                }
            ]
        };

        const {json} = this.state;


        this.getCharts(json);

    };

    onChange(event) {
        this.setState({[event.target.name] : event.target.value});
    };

    /*getCharts() {
        fetch('http://api.gabryelkamil.pl/calc')
            .then(response => response.json())
            .then(names => {
                console.log(names)
                let list = [];
                names.forEach( u => {
                    const temp  = {
                        namePL: u.factor_name_pl,
                        nameEn: u.factor_name_eng,
                        descPl: u.factor_description_pl,
                        descEn: u.factor_description_eng,
                        shortcut: u.shortcut,
                        id: u.factor_id,

                    }
                    list.push(temp);
                })
                this.setState({items: list});
            });
    };*/

    /*componentDidMount() {
        this.getFactorNames();
    }*/
    getCharts(input){
        console.log("GET_CHARTS")
        // let chartIn = {
        //     energy_resources: [
        //         {
        //             gus: "060",
        //             name: "Węgiel kamienny energetyczny z wyłączeniem brykietów",
        //             unit: "tona",
        //             ammount: 1234.2
        //         },
        //         {
        //             gus: "088",
        //             name: "benzyna silnikowa bezołowiowa",
        //             unit: "tona",
        //             ammount: 3214.2
        //         },
        //         {
        //             gus: "024",
        //             name: "energia elektryczna",
        //             unit: "MWh",
        //             ammount: 3122.4
        //         }
        //     ],
        //     resources: [
        //         {
        //             res_id: 1,
        //             name: "WATER",
        //             unit: "m3",
        //             ammount: 255255
        //         },
        //         {
        //             res_id: 14,
        //             name: "BROKUŁ RÓŻA JESIENNY",
        //             unit: "kg",
        //             ammount: 1093508
        //         },
        //         {
        //             res_id: 18,
        //             name: "GROSZEK",
        //             unit: "kg",
        //             ammount: 1011485
        //         }
        //     ],
        //     products: [
        //         {
        //             prod_id: 11,
        //             name: "Mrożony groszek",
        //             unit: "kg",
        //             ammount: 981100,
        //             resources: [
        //                 18, 1
        //             ],
        //             energy_resources: [
        //                 "024"
        //             ]
        //         },
        //         {
        //             prod_id: 32,
        //             name: "Mrożony brokuł",
        //             unit: "kg",
        //             ammount: 231128,
        //             resources: [
        //                 14, 1
        //             ],
        //             energy_resources: [
        //                 "024",
        //                 "088",
        //                 "060"
        //             ]
        //         }
        //     ]
        // };


        fetch('http://api.gabryelkamil.pl/calc', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: input
        }).then(response => response.json()
        ).then(data => {
            console.log(data)
            let chartEqco2 = [];
            data.chartEqco2.forEach( u => {
                const temp  = {
                    name: u.name,
                    value: u.ammount
                }
                chartEqco2.push(temp);
            });
            let chartWater = [];
            data.chartWater.forEach( u => {
                const temp  = {
                    name: u.name,
                    value: u.ammount
                }
                chartWater.push(temp);
            });
            let chartProducts = [];
            data.chartProducts.forEach( u => {
                const temp  = {
                    name: u.name,
                    value: u.ammount
                }
                chartProducts.push(temp);
            });

            this.setState({chartEqco2: chartEqco2});
            this.setState({chartProducts: chartProducts});
            this.setState({chartWater: chartWater});

        });
    }

    render() {
        const chartEqco2 = this.state.chartEqco2;
        const chartProducts = this.state.chartProducts;
        const chartWater = this.state.chartWater;

        const { json } = this.state;

        console.log("?")

        const {classes} = this.props;
        return (
            <div>
            <ResponsiveContainer height={400} width="100%">
                <PieChart style={{backgroundColor:"#EEE", borderRadius:'25px'}} >
                    <text x="20%" y="10%" textAnchor="middle" dominantBaseline="middle" style={{fontWeight:'bold'}}>
                        Emisja CO2
                    </text>
                    <Pie dataKey="value" isAnimationActive={false} data={chartEqco2} cx="20%" cy={200} outerRadius={100} fill="#8884d8" label >
                        {
                            chartEqco2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSCo2[index % COLORS.length]} />)
                        }
                    </Pie>
                    <text x="50%" y="10%" textAnchor="middle" dominantBaseline="middle" style={{fontWeight:'bold'}}>
                        Emisja wody
                    </text>
                    <Pie dataKey="value" isAnimationActive={false} data={chartWater} cx="50%" cy={200} outerRadius={100} fill="#8884d8" label >
                        {
                            chartWater.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSWater[index % COLORS.length]} />)
                        }
                    </Pie>
                    <text x="80%" y="10%" textAnchor="middle" dominantBaseline="middle" style={{fontWeight:'bold'}}>
                        Produkty
                    </text>
                    <Pie dataKey="value" isAnimationActive={false} data={chartProducts} cx="80%" cy={200} outerRadius={100} fill="#8884d8" label >
                        {
                            chartProducts.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>



            </ResponsiveContainer>

                <Paper style={{marginLeft: '20%', width: '60%', backgroundColor: '#EEE', borderRadius: '25px'}}>
                    <h1>Wstaw dane</h1>
                    <br/>
                        <TextField id="desc" label="JSON" variant="outlined"
                                   style={{width: '60%'}}
                                   onChange={this.onChange}
                                   margin="normal" value={json}
                                    name="json"
                                   multiline
                                   rows="15"/>
                        <br/>
                        <Button style={{marginBottom: '5%',marginTop:'5%',backgroundColor: "#86C232"}}
                                variant="contained" color="primary" onClick={e => this.onSubmit(e)}
                                    size="large">
                            Wyślij
                        </Button>


                </Paper>
            </div>

        );
    }

}

export default (Charts);