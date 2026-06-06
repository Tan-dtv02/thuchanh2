/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
const BASE_URL = "https://xz9ygh-8081.csb.app";
function fetchModel(url, options = {}) {
  const fetchData = async () => {
    const res = await fetch(BASE_URL + url, options);
    const data = await res.json();
    return data;
  };
  return fetchData();
}

export default fetchModel;
