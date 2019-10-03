import PartnerInfo from "../Models/DataBase/PartnerInfo";

export default class PartnerInfoApi {
    constructor() {}
    /**
     * GetPartnerInfoByUserID
     */
    public async GetPartnerInfoByUserID() {
        let url = 'https://localhost:44336/api/partnerinfo/GetPartnerInfoByUserID?userID=2'
        await fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            // this.ser(data)

            console.log(data)
            
            // this.todoTasks = data;
            // console.log(this.todoTasks)
            
        });
    }
}