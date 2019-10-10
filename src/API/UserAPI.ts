import User from '@/Models/DataBase/User';

export default class UserAPI {
    constructor() {}

    public async AddUserInfo(user: User): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName: user.UserName, passwordHash: user.PasswordHash, role: user.Role })
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    public async DeleteUser(userID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/user?userID=' + userID, {
                method: 'DELETE',     
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }
}