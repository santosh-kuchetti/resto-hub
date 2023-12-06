import axios from "axios";
import debounce from "lodash/debounce";
export const fetchData = async () => {
	let response = await axios.get("https://dummyjson.com/products");
	console.log("boom");
	return response;
};

export const debouncedFetchData = debounce(fetchData, 400);
