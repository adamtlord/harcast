const axios = require('axios')

const HARVEST_CREDS = {
    TOKEN: '870202.pt.BnltfZlVKzZNfHWTlLnVpEZfadd1fZHRwl82odL6-OAoCHri3uGHgNt6ioKVIWlAkPi1cJGUnsGVLN9Su9an-g',
    ACCOUNT_ID: '563649'
}
const harvestOptions = {
    protocol: "https:",
    hostname: "api.harvestapp.com",
    version: "v2",
    paths: {
        me: "users/me",
        projects: "projects",
        clients: "clients"
    },
    headers: {
        "User-Agent": "Harcast API POC",
        "Authorization": "Bearer " + HARVEST_CREDS.TOKEN,
        "Harvest-Account-ID": HARVEST_CREDS.ACCOUNT_ID
    }
}

const harvestBaseURL = `${harvestOptions.protocol}//${harvestOptions.hostname}/${harvestOptions.version}/`

module.exports = function (api) {
    api.loadSource(async store => {
        const {
            data
        } = await axios({
            method: 'get',
            url: harvestBaseURL + harvestOptions.paths.projects,
            headers: harvestOptions.headers,
            params: {
                is_active: true
            }
        })

        const contentType = store.addContentType({
            typeName: 'Projects'
        })

        for (const project of data.projects) {
            const { id, name, is_active, budget, hourly_rate } = project;
            contentType.addNode({
                id,
                title: name,
                fields: {
                    is_active,
                    budget,
                    hourly_rate
                }
            })
        }
    })
}