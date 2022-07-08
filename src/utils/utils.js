import moment from "moment";

export const sortDataByDate = (articles, sortBy) => {
  let sortedArticles = [...articles];

  //if sortBy is empty, don't sort the articles, return the default articles
  if (sortBy !== "") {
    sortedArticles = sortedArticles.sort((a, b) => {
      if (sortBy === "newest") {
        return moment.utc(a.publishedAt).diff(moment.utc(b.publishedAt));
      }
      return moment.utc(b.publishedAt).diff(moment.utc(a.publishedAt));
    });
  }

  return sortedArticles;
};
