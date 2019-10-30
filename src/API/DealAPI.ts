import Deal from '@/Models/DataBase/Deal';
import BaseUrl from '@/Data/BaseUrl';

export default class DealAPI {
    // получение списка всех сделок
    public async GetDeals(): Promise<Array<Deal>> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/deal', {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }
}