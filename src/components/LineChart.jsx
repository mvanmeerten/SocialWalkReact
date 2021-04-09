import React from 'react'
import Chart from 'chart.js'
import 'chartjs-plugin-colorschemes';

/**
 * Component for the linechart using chart.js
 */
class LineChart extends React.Component {
  constructor(props) {
    super(props)
    this.tension = 0.2
    this.chartRef = React.createRef()
  }

  componentDidUpdate() {
    this.lineChart.options.scales.xAxes[0].ticks.min = this.props.date
    this.lineChart.data.labels = this.props.users.map(u => u.name)
    this.lineChart.data.datasets = this.props.users.map(u => {return {
      label: u.name,
      data: u.activities.map(a => {return {x: a.date, y: a.steps}}),
      fill: 'none',
      tension: this.tension
    }})
    this.lineChart.update();
  }

  componentDidMount() {
    this.lineChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        title: {
          display: true,
          text: 'Cumulative steps over time'
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              time: {
                unit: 'day'
              },
              scaleLabel: {
                display: true,
                labelString: 'Day'
              },
              ticks: {
                min: this.props.date
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              },
              scaleLabel: {
                display: true,
                labelString: 'Steps'
              }
            }
          ]
        },
        plugins: {
          colorschemes: {
            scheme: 'brewer.Paired12'
          }
        }
      },
      data: {
        labels: this.props.users.map(u => u.name),
        datasets: this.props.users.map(u => {return {
          label: u.name,
          data: u.activities.map(a => {return {x: a.date, y: a.steps}}),
          fill: 'none',
          tension: this.tension
        }})
      }
    })
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    )
  }
}

export default LineChart