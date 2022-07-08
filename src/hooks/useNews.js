import { useQuery } from "react-query";
import { getNews } from "../services/api";

export const useNews = ({ search }) => {
  return useQuery(["news", search], () => getNews({ search }));
};
