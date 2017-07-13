import uuidV4 from 'uuid/v4';

class TradeObjectType {
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}
export const TradeObjectTypes = {
    Village: new TradeObjectType('village', 'Village'),
    Farmer: new TradeObjectType('farmer', 'Farmer'),
};

class TradeObject {
    constructor(type, id, data){
        this.type = type;
        this.id = id;
        this.data = data;
    }
}

export default class API {

    constructor(){
        this.tables = {
            [TradeObjectTypes.Village.id]: [],
            [TradeObjectTypes.Farmer.id]: []
        };
    }

    async getObjects(type){
        return this.tables[type.id];
    }

    async getObject(type, id){
        const objects = await this.getObjects(type);
        return objects.find( (o) => o.id === id);
    }

    async createObject(type, data){
        const id = this.generateID();
        const object =  new TradeObject(type, id, data);
        this.tables[type.id].push(object);
        return object;
    }

    async updateObject(type, id, data){
        const object = await this.getObject(type, id);
        object.data = data;
        return object;
    }

    async deleteObject(type, id){
        const objects = await this.getObjects(type);
        const object = await this.getObject(type, id);
        if (object){
            this.tables[type.id] = objects.filter( (o) => o.id !== id);
        }
        return object;
    }

    generateID(){
        return uuidV4();
    }
}
