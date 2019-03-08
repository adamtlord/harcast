import axios from 'axios';
import moment from 'moment';

const harvestSettings = {
    protocol: "https:",
    hostname: "api.harvestapp.com",
    version: "v2"
}

const baseURL = `${harvestSettings.protocol}//${harvestSettings.hostname}/${harvestSettings.version}/`;

const toDateString = obj => {
    let date;

    if (typeof obj === 'string') {
        date = moment(obj);
        if (!date.isValid()) {
            throw new Error(
                'Invalid date string; expecting ISO-8601 compatible format.'
            );
        }
    } else if (obj instanceof Date) {
        // Check for bad date objects like: new Date('LOL');
        if (isNaN(+obj)) {
            throw new Error('Invalid date object; expecting non NaN date value.');
        }
        date = moment(obj);
    } else if (obj && obj._isAMomentObject) {
        date = obj;
    }

    if (!date) {
        throw new Error(
            'Invalid date; expecting a valid: ISO-8601 compatible date string, a Date object or a moment date object.'
        );
    }

    return date.format('YYYY-MM-DD');
}

const stringifyDates = options => {
    const qs = options;

    if (options.startDate) qs.start_date = toDateString(options.startDate);

    if (options.endDate) {
        qs.end_date = toDateString(options.endDate);
    }

    return qs;
}
class Harvest {
    constructor(instance) {
        const headers = {
            "Authorization": `Bearer ${process.env.HARVEST_TOKEN}`,
            "Harvest-Account-ID": process.env.HARVEST_ACCOUNT_ID
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

export default Harvest;