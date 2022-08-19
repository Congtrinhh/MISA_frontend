import axios from "axios";

const baseDomain = "https://localhost:44376";
const baseUrl = `${baseDomain}/api/v1`;

export default axios.create({
	baseURL: baseUrl,
});
