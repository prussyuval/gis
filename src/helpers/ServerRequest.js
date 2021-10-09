import axios from 'axios';

const url = "https://data.opendatasoft.com/api/records/1.0/search/";

const LOGGING = true;

class ServerRequest {
    static logResponse(method, response) {
        if (LOGGING === true) {
            console.log(`[${method}] Received response:`);
            console.log(response);
        }
    }

    static async get(params = {}, cancelToken) {
        const response = await axios.get(url, {
            cancelToken: cancelToken,
            params: params,
        }).catch(error => {
            return error.response;
        });
        this.logResponse('GET', response);
        return response.data;
    }

    static async postWithUrl(url, body) {
        let response;
        try {
            response = await axios.post(url, body, {
                withCredentials: false
            });
        } catch {
            return null;
        }

        this.logResponse('POST', response);
        return response;
    }
}

export default ServerRequest;