import Company from "../Models/DataBase/Company";
import CompanyInfo from '@/Models/DTO/CompanyInfo';

export default class CompanyApi {

    // добавление информации о компании
    public async AddNewCompanyInfo(companyInfo: CompanyInfo): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(companyInfo)
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // получение списка компании партнера
    public async GetPartnerCompanies(userID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/company/getpartnercompanies?userid=' + userID, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }


    public async GetCompanies(): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/company/', {
                method: 'GET',
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }
}