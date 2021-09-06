import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "22530693-10a6882b39438d2f880057b1b";

export default function ApiServise(keyword, page = 1) {
  return axios
    .get(
      `${BASE_URL}?q=${keyword}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits)
    .catch((error) => console.log(error));
}
