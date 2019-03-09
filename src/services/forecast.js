import axios from 'axios';
import forecastCreds from '../settings/forecast';
import stringifyDates from '../utils/stringifyDates';

const forecastSettings = {
    protocol: "https:",
    hostname: "api.forecastapp.com",
    version: ""
}

const baseURL = `${forecastSettings.protocol}//${forecastSettings.hostname}/${forecastSettings.version}/`;

class Forecast {
    constructor(instance) {
        const headers = {
            "Authorization": `Bearer ${forecastCreds.TOKEN}`,
            "Forecast-Account-ID": forecastCreds.ACCOUNT_ID
        }

        this.instance =
            instance ||
            axios.create({
                baseURL,
                headers
            });

        const methods = [
            ['whoAmI', 'current_user'],
            ['clients'],
            ['people'],
            ['projects'],
            ['assignments'],
            ['milestones'],
            ['roles'],
        ];

        methods.forEach(([name, dataLocation]) => {
            const route = '/' + name.toLowerCase();
            const prop = dataLocation || name;
            this[name] = options =>
                this._request(route, options).then(response => response.data[prop]);
            });
    }

    _request(relativeUrl, options = {}) {
        const params = stringifyDates(options);
        return this.instance.get(relativeUrl, {
            params
        });
    }
}

export default Forecast;