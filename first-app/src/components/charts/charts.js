import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Legend, Tooltip, Cell,
} from 'recharts';

const data01 = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


class Charts extends PureComponent {

    constructor(props) {
        super();
        this.state = {
            energy_resources: [],
            resources: [],
            products: []
        }
        this.getCharts(props);
    }
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';
    static chartIn = {
        xd: "xD"
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
    getCharts(){
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
        fetch('http://api.gabryelkamil.pl/calc', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(chartIn)
        }).then(response => response.json()
        ).then(data => {
            console.log(data)
            let energy_resources = [];
            data.energy_resources.forEach( u => {
                const temp  = {
                    name: u.name,
                    value: u.ammount
                }
                energy_resources.push(temp);
            });
            let products = [];
            data.products.forEach( u => {
                const temp  = {
                    name: u.name,
                    value: u.ammount
                }
                products.push(temp);
            });
            let resources = data.resources;
            this.setState({energy_resources: energy_resources});
            this.setState({products: products});
            this.setState({resources: data.resources});

        });
    }

    render() {
        const energy_resources = this.state.energy_resources;
        const products = this.state.products;
        const resources = this.state.resources;
        return (
            <div style={{backgroundColor:'grey'}}>

                <PieChart width={800} height={400} >
                    <Pie dataKey="value" isAnimationActive={true} data={energy_resources} cx={400} cy={200} outerRadius={80} fill="#8884d8" label >
                        {
                            energy_resources.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
                <PieChart width={400} height={400}>
                    <Pie dataKey="value" isAnimationActive={true} data={products} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                    <Tooltip />
                    <Legend/>
                </PieChart>
            </div>
        );
    }

}

export default (Charts);