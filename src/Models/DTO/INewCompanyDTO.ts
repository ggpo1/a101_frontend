import CompanyStatus from '../Enums/CompanyStatus';

interface INewCompanyDTO {
    company: {
        companyID?: number,
        companyName: string,
        contactPersonFullName: string,
        contactPersonPhoneNumber: string,
        contactPersonCompanyState: string,
        status: CompanyStatus,
        cityID: number,
        partnerInfoID: number,
    }
    companyInfo: {
        cityName: string,
        partner: number,
        statusName: number,
        file?: any,
    }
}

export default INewCompanyDTO;
