import PartnerInfo from '../Models/DataBase/PartnerInfo';
import BaseUrl from '@/Data/BaseUrl';

export default class PartnerInfoApi {
    constructor() {}

    public async GetPartnerInfoByUserID(userID: number): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/partnerinfo/GetPartnerInfoByUserID?userID=' + userID, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    public async GetPartners(): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/partnerinfo/getpartners', {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    public async AddPartnerInfo(partner: PartnerInfo): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/partnerinfo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        companyName: partner.CompanyName,
                        fullName: partner.FullName,
                        companyState: partner.CompanyState,
                        phoneNumber: partner.PhoneNumber,
                        userID: partner.userID,
                        cityID: partner.cityID,
                    },
                ),
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    public async PatchPartnerInfo(partner: PartnerInfo): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/partnerinfo/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        partnerInfoID: partner.PartnerInfoID,
                        companyName: partner.CompanyName,
                        fullName: partner.FullName,
                        companyState: partner.CompanyState,
                        phoneNumber: partner.PhoneNumber,
                        userID: partner.userID,
                        cityID: partner.cityID,
                    },
                ),
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    public async DeletePartner(partnerID: number): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/partnerinfo?partnerInfoID=' + partnerID, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

}
