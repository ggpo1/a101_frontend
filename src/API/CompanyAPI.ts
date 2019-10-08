import Company from "../Models/DataBase/Company";

export default class CompanyApi {
    /**
     * GetPartnerCompanies
     */
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
}