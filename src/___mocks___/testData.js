import moment from "moment";

const currentDate = moment();

export const getNewsList = (count) => {
  const articles = [];
  for (let i = 0; i < count; i++) {
    articles.push({
      source: {
        id: null,
        name: `Test source name ${i}`,
      },
      author: `Test author ${i}`,
      title: `Test title ${i}`,
      description: `Test description ${i}`,
      url: `Test url ${i}`,
      urlToImage: `Test image ${i}`,
      publishedAt: moment(currentDate)
        .add(i + 1, "days")
        .toString(),
      content: `Test content ${i}`,
    });
  }

  return { news: { articles: articles } };
};
