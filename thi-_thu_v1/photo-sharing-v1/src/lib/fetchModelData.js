/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
const BASE_URL = "https://p2vl83-8080.csb.app";
function fetchModel(url) {
  const fetchData = async () => {
    const res = await fetch(BASE_URL + url);
    const data = await res.json();
    return data;
  };

  return fetchData();
}

export default fetchModel;
