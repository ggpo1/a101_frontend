export default class AuthAPI {
    public response: any;
    /**
     * Auth
     */
    public async Auth(Login: string, Password: string): Promise<any> {
        return new Promise(resolve => {
            fetch('https://localhost:44336/api/auth', {
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
       /*
          let a = (async () => {
            const rawResponse = await fetch('https://localhost:44336/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Login: Login, Password: Password })
            });
            return await rawResponse.json();
            // console.log(this.response)
        })();
        return await a;
        */
    }
    
}