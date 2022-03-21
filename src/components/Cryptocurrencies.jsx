import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified = false }) => {
  // console.log("Simplified=", simplified);
  // if (simplified !== true) simplified = false;
  const count = simplified ? 10 : 100;
  //  console.log("count=",count)
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  // console.log(cryptos);
  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
  });
  if (isFetching) return "data is being fetched";
  return (
    <>
      <Row className="crypto-card-container" gutter={[32, 32]}>
        {cryptos?.map((currency) => {
          return (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.id}
            >
              <Link to={`/crypto/${currency.id}`}>
                <Card
                  style={{ width: "250px", margin: "2px 2px 2px 2px" }}
                  className="crypto-image"
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                  hoverable
                >
                  <p>Price : {millify(currency.price)}</p>
                  <p>Martket Cap : {millify(currency.marketCap)}</p>

                  <p>Daily Change : {millify(currency.change)} %</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default Cryptocurrencies;
