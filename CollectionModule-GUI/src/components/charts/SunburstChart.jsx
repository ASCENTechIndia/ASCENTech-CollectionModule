import React from 'react';
import ReactECharts from 'echarts-for-react';

const SunburstChart = ({ data, total }) => {
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}'
        },
        series: {
            type: 'sunburst',
            data,
            radius: [0, '90%'],
            //   label: {
            //     show: true,
            //     formatter: '{b}:{c}',
            //     rotate: 0
            //   }
            label: {
                formatter: '{b}'
            },
            labelLayout: {
                hideOverlap: true
            },
            levels: [
                {},
                {
                    label: {
                        rotate: 0,
                        align: "center",
                        verticalAlign: "middle"
                    },
                },
                {
                    label: {
                        rotate: "radial"
                    }
                }
            ]
        },

        // 🔥 Center Text
        graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
                text: `Total\n${total}`,
                textAlign: 'center',
                fill: '#111827',
                fontSize: 20,
                fontWeight: 'bold'
            }
        }
    };

    return <ReactECharts option={option} style={{ height: 500, width: '100%' }} />;
};

export default SunburstChart;