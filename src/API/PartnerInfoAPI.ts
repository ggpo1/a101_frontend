import PartnerInfo from "../Models/DataBase/PartnerInfo";

export default class PartnerInfoApi {
    constructor() {}
    /**
     * GetPartnerInfoByUserID
     */
    public async GetPartnerInfoByUserID() {
        let url = 'http://192.168.50.8:44336/api/partnerinfo/GetPartnerInfoByUserID?userID=2'
        await fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            // this.ser(data)

            console.log(data)
            
            // this.todoTasks = data;
            // console.log(this.todoTasks)
            
        });
    }

    public async GetPartners(): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/partnerinfo/getpartners', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
          });
    }
}