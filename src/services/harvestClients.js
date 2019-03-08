import Harvest from '~/services/harvest';


class HarvestClients {
    constructor(){
        const harvest = new Harvest();
        return harvest.clients({is_active: true})
    }
}

export default HarvestClients