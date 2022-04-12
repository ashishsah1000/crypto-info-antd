import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = ({ count = 5 }) => {
  return (
    <div className="coin-detail-container">
      <Skeleton />
      <Skeleton count={count} />
    </div>
  );
};

export default Loading;
