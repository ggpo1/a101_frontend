import Company from '../Models/DataBase/Company';
import CompanyInfo from '@/Models/DTO/CompanyInfo';
import BaseUrl from '@/Data/BaseUrl';
import CompanyStatus from '@/Models/DataBase/CompanyStatus';

export default class CompanyApi {

    // добавление информации о компании
    public async AddNewCompanyInfo(companyInfo: CompanyInfo): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(companyInfo),
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    // обновление данных о компании
    public async PatchCompanyInfo(companyInfo: CompanyInfo): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/company', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(companyInfo),
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    // получение списка компании партнера
    public async GetPartnerCompanies(userID: number): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/company/getpartnercompanies?userid=' + userID, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    // удаление информации о компании
    public async RemoveCompany(companyID: number): Promise<any> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/company/' + companyID, {
                method: 'DELETE',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    // получение списка всех компаний
    public async GetCompanies(): Promise<Array<Company>> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/company/', {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }

    // получение списка всех стутсов для компаний(сделок)
    public async GetStatuses(): Promise<Array<CompanyStatus>> {
        return new Promise((resolve) => {
            fetch(BaseUrl + 'api/company/status', {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((body) => {
                resolve(body);
            });
        });
    }
}
