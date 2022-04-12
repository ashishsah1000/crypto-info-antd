import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Loading } from "./index";

const Cryptocurrencies = ({ simplified = false }) => {
  // console.log("Simplified=", simplified);
  // if (simplified !== true) simplified = false;
  const count = simplified ? 10 : 100;
  //  console.log("count=",count)
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(cryptos);
  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
    const searchData = cryptos?.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (searchTerm != "") setCryptos(searchData);
    else setCryptos(cryptoList?.data?.coins);
  }, [searchTerm]);
  if (isFetching) return <Loading count={10} />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            type="text"
            className="search"
            placeholder="Search for coins"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      )}

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
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
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
