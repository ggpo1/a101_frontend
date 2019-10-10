import CompanyStatus from '../Enums/CompanyStatus';

interface INewCompanyDTO {
    company: {
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
        partner: string,
        statusName: string,
        file?: any,
    }
}

export default INewCompanyDTO;
