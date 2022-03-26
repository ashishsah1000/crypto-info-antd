import React from "react";
import { Select, Row, Col, Card, Typography, Avatar } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
// import { momentjs } from "momentjs";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified = false }) => {
  const demoImage = "https://picsum.photos/200/300";
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "cryptocurrency",
    count: simplified ? 6 : 12
  });
  console.log(cryptoNews);
  if (!cryptoNews?.value)
    return <div className="home-page"> Well we are loading your news</div>;

  return (
    <>
      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="norereffer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  ></img>
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>

                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                    <Text>
                      {/* {momentjs(news.datePublished).startOf("ss").fromNow()} */}
                    </Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
