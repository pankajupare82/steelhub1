{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 class ChartManager \{\
    constructor() \{\
        this.charts = \{\};\
    \}\
\
    initSpotChart(canvasId, data) \{\
        const ctx = document.getElementById(canvasId).getContext('2d');\
        \
        this.charts.spotChart = new Chart(ctx, \{\
            type: 'line',\
            data: \{\
                labels: data.labels,\
                datasets: [\{\
                    label: 'Spot Price (\uc0\u8377 /MT)',\
                    data: data.data,\
                    borderColor: '#3498db',\
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',\
                    borderWidth: 2,\
                    tension: 0.2,\
                    fill: true\
                \}]\
            \},\
            options: this.getChartOptions('Price (\uc0\u8377 /MT)')\
        \});\
    \}\
\
    initRegionalChart(canvasId, data) \{\
        const ctx = document.getElementById(canvasId).getContext('2d');\
        \
        this.charts.regionalChart = new Chart(ctx, \{\
            type: 'bar',\
            data: \{\
                labels: data.regions.map(r => r.name),\
                datasets: [\{\
                    label: 'Price (\uc0\u8377 /MT)',\
                    data: data.regions.map(r => r.price),\
                    backgroundColor: [\
                        'rgba(52, 152, 219, 0.7)',\
                        'rgba(46, 204, 113, 0.7)',\
                        'rgba(155, 89, 182, 0.7)',\
                        'rgba(241, 196, 15, 0.7)'\
                    ],\
                    borderColor: [\
                        'rgba(52, 152, 219, 1)',\
                        'rgba(46, 204, 113, 1)',\
                        'rgba(155, 89, 182, 1)',\
                        'rgba(241, 196, 15, 1)'\
                    ],\
                    borderWidth: 1\
                \}]\
            \},\
            options: this.getChartOptions('Price (\uc0\u8377 /MT)')\
        \});\
    \}\
\
    initForecastChart(canvasId, data) \{\
        const ctx = document.getElementById(canvasId).getContext('2d');\
        \
        this.charts.forecastChart = new Chart(ctx, \{\
            type: 'line',\
            data: \{\
                labels: data.labels,\
                datasets: [\
                    \{\
                        label: 'Actual Price',\
                        data: data.actual,\
                        borderColor: '#2ecc71',\
                        borderWidth: 2,\
                        tension: 0.1,\
                        pointRadius: 4\
                    \},\
                    \{\
                        label: 'Forecast',\
                        data: data.forecast,\
                        borderColor: '#f39c12',\
                        borderWidth: 2,\
                        borderDash: [5, 5],\
                        tension: 0.1,\
                        pointRadius: 4\
                    \},\
                    \{\
                        label: 'Upper Range',\
                        data: data.upperRange,\
                        borderColor: '#e74c3c',\
                        borderWidth: 1,\
                        tension: 0.1,\
                        pointRadius: 0\
                    \},\
                    \{\
                        label: 'Lower Range',\
                        data: data.lowerRange,\
                        borderColor: '#3498db',\
                        borderWidth: 1,\
                        tension: 0.1,\
                        pointRadius: 0\
                    \}\
                ]\
            \},\
            options: this.getChartOptions('Price (\uc0\u8377 /MT)')\
        \});\
    \}\
\
    getChartOptions(yAxisTitle) \{\
        return \{\
            responsive: true,\
            maintainAspectRatio: false,\
            plugins: \{\
                legend: \{\
                    position: 'top',\
                \}\
            \},\
            scales: \{\
                y: \{\
                    beginAtZero: false,\
                    title: \{\
                        display: true,\
                        text: yAxisTitle\
                    \},\
                    grid: \{\
                        color: 'rgba(0,0,0,0.05)'\
                    \}\
                \},\
                x: \{\
                    grid: \{\
                        display: false\
                    \}\
                \}\
            \}\
        \};\
    \}\
\
    updateSpotChart(newData) \{\
        if (this.charts.spotChart) \{\
            this.charts.spotChart.data.datasets[0].data = newData;\
            this.charts.spotChart.update();\
        \}\
    \}\
\}}