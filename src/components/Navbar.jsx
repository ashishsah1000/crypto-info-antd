import React from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenyOutlined
} from "@ant-design/icons";

const Navbar = () => {
  return (
    <div>
      <div className="nav-container">
        <div className="logo-container">
          {/* <Avatar /> */}
          <Typography.Title level={2} className="logo">
            <Link to="/">CryptoVerse</Link>
          </Typography.Title>
          {/* <Button className="menu-control-container">

            </Button> */}
        </div>
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurriences">cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">Home</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};
export default Navbar;
