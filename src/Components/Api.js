import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";

export const getImages = async (query, page) => {
  const response = await axios.get("", {
    params: {
      client_id: "pSW5AGreSI0Q2VlpeI-NAhfPSa2qYZ7vnZSPm9l_mBQ",
      orientation: "landscape",
      per_page: "12",
      query: query,
      page,
    },
  });
  console.log(response.data.results);
  console.log(response.data);
  return response.data;
};
