import axios from "axios";

const baseDomain = "https://localhost:7247";
const baseUrl = `${baseDomain}/api/v1`;

export default axios.create({
	baseURL: baseUrl,
});
