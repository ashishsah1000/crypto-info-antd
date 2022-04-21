import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { Loading } from "./index";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Avatar } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery
} from "../services/cryptoApi";

// import Loader from './Loader';
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const [cryptoDetails, setCrytoDetails] = useState("");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod
  });
  console.log(data);
  useEffect(() => {
    setCrytoDetails(data?.data?.coin);
    console.log("from crypto detaisl", cryptoDetails);
  }, [cryptoDetails, data, timePeriod]);

  // if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />
    }
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />
    }
  ];
  if (!cryptoDetails)
    return (
      <div>
        <Loading count={6} />
      </div>
    );
  else
    return (
      <>
        <Col className="coin-detail-container">
          <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
              <span style={{ display: "flex", width: "100%" }}>
                <img
                  className="crypto-image"
                  src={cryptoDetails.iconUrl}
                  style={{
                    width: "100px",
                    margin: "10px 10px",
                    marginTop: "-20px"
                  }}
                />
                {cryptoDetails?.name} | Rank : {cryptoDetails?.rank}
              </span>

              {}
            </Title>
            {HTMLReactParser(cryptoDetails?.description)}
          </Col>
          <Select
            className="select-timeperiod"
            defaultValue="7d"
            placeholder="select the time period"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date} value={date}>
                {date}{" "}
              </Option>
            ))}
          </Select>
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails.name}
          />
          <Col className="other-stats-info">
            <Col className="coin-value-statistics">
              <Col className="coin-value-heading">
                <Title level={3} className="coin-details-heading">
                  Stats of {cryptoDetails.name}
                </Title>
                <p>An overview showing stats of {cryptoDetails.name}</p>
              </Col>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">
                    {value != undefined ? value : "NA"}
                  </Text>
                </Col>
              ))}
              <Col></Col>
            </Col>
            <Col className="other-stats-info">
              <Col className="coin-value-statistics">
                <Col className="coin-value-heading">
                  <Title level={3} className="coin-details-heading">
                    Other statistics
                  </Title>
                  <p>An overview showing stats of all Crypto</p>
                </Col>
                {genericStats.map(({ icon, title, value }) => (
                  <Col className="coin-stats">
                    <Col className="coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="stats">
                      {value != undefined ? value : "NA"}
                    </Text>
                  </Col>
                ))}
              </Col>
            </Col>
          </Col>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links:
              {cryptoDetails.links.map((link) => {
                return (
                  <Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                      {link.type}
                    </Title>
                    <a href={link.url} targer="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </Row>
                );
              })}
            </Title>
          </Col>
        </Col>
      </>
    );
};
export default CryptoDetails;
