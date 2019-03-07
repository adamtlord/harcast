const axios = require('axios')

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
        "Authorization": "Bearer " + process.env.HARVEST_TOKEN,
        "Harvest-Account-ID": process.env.HARVEST_ACCOUNT_ID
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
    api.loadSource(async store => {
        const {
            data
        } = await axios({
            method: 'get',
            url: harvestBaseURL + harvestOptions.paths.clients,
            headers: harvestOptions.headers,
            params: {
                is_active: true
            }
        })

        const contentType = store.addContentType({
            typeName: 'Clients'
        })

        for (const client of data.clients) {
            const {
                id,
                name,
                is_active,
                address,
                currency
            } = client;
            contentType.addNode({
                id,
                title: name,
                fields: {
                    is_active,
                    address,
                    currency
                }
            })
        }
    })
}