import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const { Title } = Typography;
  console.log(coinHistory);
  const coinPrice = [];
  const coinStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinStamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }
  const data = {
    labels: coinStamp,
    datasets: [
      {
        label: "price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd"
      }
    ]
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
          <Col className="price-container">
            <Title level={5} className="price-change">
              {coinHistory?.data?.change} %
            </Title>
            <Title level={5} className="current-price">
              Current {coinName} price: ${currentPrice}
            </Title>
          </Col>
        </Title>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
