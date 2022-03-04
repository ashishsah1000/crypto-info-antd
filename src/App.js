import React from "react";
import { Switch, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails
} from "./components";

export default function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route
                exact
                path="/cryptocurriences"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            CryptoInfo | Get infotmation about your investment
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">news</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}
