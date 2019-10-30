import CompanyStatus from '../Enums/CompanyStatus';

interface CompanyInfo {
    CompanyID?: number;
    CompanyName: string;
    ContactPersonFullName: string;
    ContactPersonPhoneNumber: string;
    ContactPersonCompanyState: string;
    Status?: CompanyStatus;
    CompanyStatusID?: number;
    CityID: number;
    PartnerInfoID: number;
}

export default CompanyInfo;
