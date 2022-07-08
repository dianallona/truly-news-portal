import { API_KEY } from "../constants";
import apiClient from "../utils/http-common";

export const getNews = ({ search }) => {
  const searchParams = search === "" ? "" : `&q=${search}`;
  return apiClient
    .get(
      `/top-headlines?category=business&country=gb${searchParams}&apiKey=${API_KEY}`
    )
    .then((res) => res.data);
};
