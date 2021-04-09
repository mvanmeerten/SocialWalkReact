import React from 'react'
import Chart from 'chart.js'
import moment from 'moment';

/**
 * Component for a BarChart using chart.js
 */
class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidUpdate() {
    this.barChart.data = {
      labels: this.props.name,
      datasets: [{
        label: this.props.name,
        data: this.props.data
      }]
    }
    this.barChart.update();
  }

  componentDidMount() {
    this.barChart = new Chart(this.chartRef.current, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: 'Steps per day of last week'
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
                min: moment().subtract(8, 'days'),
                max: moment().subtract(1, 'days')
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
        }
      },
      data: {
        label: this.props.name,
        datasets: [{
          labels: this.props.name,
          data: this.props.data
        }]
      }
    })
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    )
  }
}

export default BarChart