import React from 'react'
import { Chart } from "react-google-charts";
import loader from './loader'
function DrawChart(props)
{

    return (
        <div>
                    <Chart
                        width={'100%'}
                        height={'250px'}
                        chartType="Sankey"
                        loader={<div>Loading Chart</div>}
                        data={props.data}
                        rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                
        
    );
}

export default DrawChart;