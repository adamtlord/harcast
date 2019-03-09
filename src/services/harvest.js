import axios from 'axios';
import harvestCreds from '../settings/harvest';
import stringifyDates from '../utils/stringifyDates';

const harvestSettings = {
    protocol: "https:",
    hostname: "api.harvestapp.com",
    version: "v2"
}

const baseURL = `${harvestSettings.protocol}//${harvestSettings.hostname}/${harvestSettings.version}/`;

class Harvest {
    constructor(instance) {
        const headers = {
            "Authorization": `Bearer ${harvestCreds.TOKEN}`,
            "Harvest-Account-ID": harvestCreds.ACCOUNT_ID
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
            ['company'],
            ['invoices'],
            ['estimates'],
            ['expenses'],
            ['tasks'],
            ['timesheets', 'time_entries'],
            ['projects'],
            ['projectUserAssignments', 'user_assignments'],
            ['projectTaskAssignments', 'task_assignments'],
            ['roles'],
            ['users'],
            ['userBillableRates', 'billable_rates'],
            ['userCostRates', 'cost_rates'],
            ['userProjectAssignments', 'project_assignments'],
        ];

        methods.forEach(([name, dataLocation]) => {
            const route = '/' + name.toLowerCase();
            const prop = dataLocation || name;
            this[name] = options => {
                return this._request(route, options).then(response => response.data[prop]);
            }
            });
    }

    _request(relativeUrl, options = {}) {
        const params = stringifyDates(options);
        return this.instance.get(relativeUrl, {
            params
        });
    }
}

export default Harvest;