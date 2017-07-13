import API, { TradeObjectTypes } from './trade-api';

const api = new API();
const { Village, Farmer } = TradeObjectTypes;

it('initial state', async () => {
    expect.assertions(2);
    await expect(api.getObjects(Village)).resolves.toEqual([]);
    await expect(api.getObjects(Farmer)).resolves.toEqual([]);
})

it('create -> update -> delete', async () => {
    expect.assertions(7);
    const village = {
        name: "Test Village"
    };

    // Test create
    const created = await api.createObject(Village, village);
    expect(created.data.name).toEqual(village.name);
    await expect(api.getObjects(Village)).resolves.toEqual([created]);

    // Test update
    const updatedVillage = {
        name: "Updated Village"
    };
    const updated = await api.updateObject(Village, created.id, updatedVillage);
    expect(updated.data.name).toEqual(updatedVillage.name);
    expect(updated.id).toEqual(created.id);
    await expect(api.getObjects(Village)).resolves.toEqual([updated]);

    // Test delete
    const deleted = await api.deleteObject(Village, updated.id);
    expect(deleted).toEqual(updated);
    await expect(api.getObjects(Village)).resolves.toEqual([]);
})
