
import BaseUrl from '@/Data/BaseUrl';

export default class AmoAPI {
    public async Auth(): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/amo/auth', {
                method: 'POST',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body.response.auth);
            })
            .catch(e => {
                console.log(e);
            });
        });
    }
}