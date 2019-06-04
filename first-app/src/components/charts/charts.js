import React, { PureComponent, Component } from 'react';
import {
    PieChart, Pie, Legend, Tooltip, Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid,  ResponsiveContainer
} from 'recharts';

import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#CCFF66','#5D2E8C','#2EC4B6','#F1E8B8','#FF6666'];
const Colors = ['#A4036F', '#048BA8','#16DB93','#EFEA5A','#F29E4C','#C89933','#DBD053','#74526C','#5C415D']
const Colors2 = [ '#4B4237','#D5A021','#EDE7D9','#A49694','#736B60', '#212D40','#11151C', '#364156', '#7D4E57', '#D66853'];
const Colors3 = ['#020122','#F4442E','#FC9E4F','#EDD382','#F2F3AE','#FBBFCA','#FFEED6','#D2BF55','#875053','#2B061E'];


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
            chartCO2: [],
            output: [],
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
            let chartCO2 = [];
            data.EN.forEach( u => {
                const temp  = {
                    name: u.name,
                    value: u.ammount
                }
                chartCO2.push(temp);
            });
            let output = JSON.stringify(data);
            this.setState({chartEqco2: chartEqco2});
            this.setState({chartProducts: chartProducts});
            this.setState({chartWater: chartWater});
            this.setState({chartCO2: chartCO2});
            this.setState({output: output});


        });
    }

    render() {
        const chartEqco2 = this.state.chartEqco2;
        const chartProducts = this.state.chartProducts;
        const chartWater = this.state.chartWater;
        const chartCO2 = this.state.chartCO2;

        const { json } = this.state;
        const output = this.state.output;

        const {classes} = this.props;
        return (
            <div>
            <ResponsiveContainer height={800} width="100%">
                <PieChart style={{backgroundColor:"#EEE", borderRadius:'25px'}} >
                    <text x="30%" y="10%" textAnchor="middle" dominantBaseline="middle" style={{fontWeight:'bold'}}>
                        Emisja CO2[kg]
                    </text>
                    <Pie dataKey="value" isAnimationActive={false} data={chartEqco2} cx="30%" cy="32%" outerRadius={100} fill="#8884d8" label >
                        {
                            chartEqco2.map((entry, index) => <Cell key={`cell-${index}`} fill={Colors2[index % Colors2.length]} />)
                        }
                    </Pie>
                    <text x="70%" y="10%" textAnchor="middle" dominantBaseline="middle" style={{fontWeight:'bold'}}>
                        Emisja CO2/Zasób energetyczny
                    </text>
                    <Pie dataKey="value" isAnimationActive={false} data={chartCO2} cx="70%" cy="32%" outerRadius={100} fill="#8884d8" label >
                        {
                            chartCO2.map((entry, index) => <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />)
                        }
                    </Pie>
                    <text x="30%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{fontWeight:'bold'}}>
                        Emisja wody[l]
                    </text>
                    <Pie dataKey="value" isAnimationActive={false} data={chartWater} cx="30%" cy="72%" outerRadius={100} fill="#8884d8" label >
                        {
                            chartWater.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <text x="70%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{fontWeight:'bold'}}>
                        Produkty
                    </text>
                    <Pie dataKey="value" isAnimationActive={false} data={chartProducts} cx="70%" cy="72%" outerRadius={100} fill="#8884d8" label >
                        {
                            chartProducts.map((entry, index) => <Cell key={`cell-${index}`} fill={Colors3[index % Colors3.length]} />)
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
                                   style={{width: '70%'}}
                                   onChange={this.onChange}
                                   margin="normal" value={json}
                                    name="json"
                                   multiline
                                   rows="15"/>
                        <br/>
                    <TextField id="output" label="JSON Wyjściowy" variant="outlined"
                               style={{width: '70%'}}
                               disabled
                               margin="normal" value={output}
                               name="output"
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