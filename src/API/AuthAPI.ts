export default class AuthAPI {
    public response: any;
    /**
     * Auth
     */
    public async Auth(Login: string, Password: string): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Login: Login, Password: Password })
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }
    
}