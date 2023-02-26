import { fetchSpellsList } from './spells';

describe('fetchSpellsList', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches spells from the API', async () => {
    const fakeData = {
      results: [
        { name: 'Magic Missile', url: '/api/spells/1' },
        { name: 'Fireball', url: '/api/spells/2' },
      ],
    };

    global.fetch.mockResolvedValue({
      json: async () => fakeData,
      status: 200,
    });

    const result = await fetchSpellsList();
    expect(result).toEqual(fakeData.results);
    expect(global.fetch).toHaveBeenCalledWith('https://www.dnd5eapi.co/api/spells');
  });

  it('throws an error if the fetch fails', async () => {
    global.fetch.mockResolvedValue({ status: 404 });

    await expect(fetchSpellsList()).rejects.toThrow('Fetch failed [404]');
  });
});
