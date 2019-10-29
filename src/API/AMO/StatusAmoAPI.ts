import BaseUrl from '@/Data/BaseUrl';

export default class StatusAmoAPI {
    public async UpdateStatuses(): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/amo/status', {
                method: 'PATCH',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            })
            .catch(e => {
                console.log(e);
            });
        });
    }
}