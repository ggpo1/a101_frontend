export default class CityAPI {
    constructor() {}

    public async GetCities(): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/city', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    public async GetCityIDByName(cityName: string): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/city/GetCityIDByName?cityName=' + cityName, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // /api/city/
    public async GetCityByID(cityID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/city/' + cityID, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }
}