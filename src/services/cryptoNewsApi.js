import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react/";

const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": "4d36d0690amsha9fb495c3428903p1e73a3jsnbdf92e7f3487"
};
const baseUrl = "https://bing-news-search1.p.rapidapi.com";
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        )
    })
  })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
