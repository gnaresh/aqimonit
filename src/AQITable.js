import React from "react";
import "./AQITable.css";
import moment from 'moment';
import LiveChart from './LiveChart';
import AQIGUIDE from './AQIGUIDE.png';

function getColor(aqi) {
    let classObj = {
        color: null,
        level: null,
        healthImplication: null,
        CautionaryStatement: null
    };
    if (aqi >= 0 && aqi <= 50) {
        return {
            color: "#55A850",
            level: "Good",
        }
    } else if (aqi > 50 && aqi < 100) {
        return {
            color: "#A3C853",
            level: "Satisfactory",
        }
    } else if (aqi > 100 && aqi <= 200) {
        return {
            color: "#EFE71B",
            level: "Moderate",
        }
    }
    else if (aqi > 200 && aqi <= 300) {
        return {
            color: "#F29C33",
            level: "Poor",
        }
    } else if (aqi > 300 && aqi <= 400) {
        return {
            color: "#E93F33",
            level: "Very Poor",
        }
    } else if (aqi > 400) {
        return {
            color: "#AF2E24",
            level: "Severe",
        }
    }
    return classObj
}

class AQITable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromServer: {},
            selectedCity: ""
        };
        this.selectCity = this.selectCity.bind(this);
    }
    // instance of websocket connection as a class property
    ws = new WebSocket('ws://city-ws.herokuapp.com/')

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        this.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            let { dataFromServer } = this.state;
            Object.keys(dataFromServer).forEach(x => dataFromServer[x].changed = false);
            message.forEach(obj => {
                if (dataFromServer[obj.city]) {
                    if (dataFromServer[obj.city].aqi !== obj.aqi) {
                        if (dataFromServer[obj.city].aqi <= 200 && obj.aqi > 200) { //from good to poor
                            obj.changed = true
                        } else {
                            obj.changed = false
                        }
                        obj["updated"] = moment().valueOf();
                        dataFromServer[obj.city] = obj
                    }
                } else {
                    dataFromServer[obj.city] = obj
                    dataFromServer[obj.city]["updated"] = moment().valueOf();
                    if (dataFromServer[obj.city].aqi <= 200 && obj.aqi > 200) { //from good to poor
                        dataFromServer[obj.city]["changed"] = true
                    } else {
                        dataFromServer[obj.city]["changed"] = false
                    }
                }
            })
            this.setState({ dataFromServer })
            // console.log(message)
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss

        }
    }
    selectCity(selectedCity) {
        this.setState({ selectedCity });
    }

    render() {
        const { dataFromServer, selectedCity } = this.state;
        return (
            <div style={{ margin: 32, textAlign: 'left' }}>
                <p>Click on a city to view Real Time AQI Chart!</p>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>AQI</th>
                                <th>Last updated/changed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(dataFromServer).length > 0 ? Object.values(dataFromServer).map((row, r) => {

                                return (
                                    <tr key={r} id={`row${r}`} onClick={() => this.selectCity(row.city)} >
                                        <td id={`city${r}`}>
                                            {row.city}
                                        </td>
                                        <td className="aqi" id={`aqi${r}`} style={{ color: getColor(row.aqi).color, background: row.changed === true ? "#F6CED2" : "none" }}>
                                            {row.aqi.toFixed(2)}
                                        </td>
                                        <td id={`date${r}`}>
                                            {(row["updated"] > moment().subtract(1, 'minute').valueOf()) ? moment(row["updated"]).fromNow() : moment(row["updated"]).format("hh:mm a")}
                                        </td>
                                    </tr>
                                );
                            }) :
                                <tr>No data available yet!</tr>
                            }
                        </tbody>
                    </table>
                    {
                        (selectedCity && dataFromServer[selectedCity]) && <LiveChart city={selectedCity} data={dataFromServer[selectedCity]} />
                    }
                </div>
                <div>
                    <img src={AQIGUIDE} width={480} alt="AQI Guide" />
                </div>
            </div>
        );
    }
}

export default AQITable;
