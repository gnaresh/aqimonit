import React from 'react';
import { useEffect, useState } from 'react';
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import moment from 'moment';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <span className="label">AQI: {`${payload[0].value.toFixed(2)}`}</span>
                <br />
                <span className="desc">Time: {`${moment(label).format("HH:mm:ss a")}`}</span>
            </div>
        );
    }
    return null;
};
const LiveChart = (props) => {
    const [data, setData] = useState([props.data]);
    const [city, setCity] = useState([props.city]);

    // 1. listen for a cpu event and update the state
    useEffect(() => {
        let arr = [...data, props.data];

        setData(arr.slice(Math.max(arr.length - 10, 0)));
    }, [props.data]);

    useEffect(() => {
        setCity(props.city);
        setData([props.data]);
    }, [props.city]);

    // 2. render the line chart using the state
    return (
        <div>
            <h3>Real Time AQI ({city})</h3>
            {
                data.length > 2 ? <LineChart width={500} height={400} data={data}>
                <XAxis
                    dataKey="updated"
                    tickFormatter={(timestamp) => moment(timestamp).format("HH:mm:ss a")}
                    type='number'
                    domain={['auto', 'auto']}
                    scale="time"
                    angle={-45}
                    height={100}
                    textAnchor="end"
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line dataKey="aqi" />
                </LineChart> :
                    <span>Gathering data for the live chart...</span>
            }
        </div>
    );
};

export default LiveChart;