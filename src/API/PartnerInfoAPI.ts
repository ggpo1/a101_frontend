import PartnerInfo from "../Models/DataBase/PartnerInfo";

export default class PartnerInfoApi {
    constructor() {}
       
    public async GetPartnerInfoByUserID(userID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/partnerinfo/GetPartnerInfoByUserID?userID=' + userID, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
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

    public async AddPartnerInfo(partner: PartnerInfo): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/partnerinfo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { 
                        companyName: partner.CompanyName,
                        fullName: partner.FullName,
                        companyState: partner.CompanyState,
                        phoneNumber: partner.PhoneNumber,
                        userID: partner.userID,
                        cityID: partner.cityID,
                    }
                )
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    public async DeletePartner(partnerID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/partnerinfo?partnerInfoID=' + partnerID, {
                method: 'DELETE',        
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }
    
}