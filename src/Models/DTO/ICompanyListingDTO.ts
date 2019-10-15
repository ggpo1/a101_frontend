import CompanyStatus from '../Enums/CompanyStatus';

interface ICompanyListingDTO {
    company: {
        companyID: number,
        companyName: string,
        contactPersonFullName: string,
        contactPersonPhoneNumber: string,
        contactPersonCompanyState: string,
        cityID: number,
        city: {
            cityID: number,
            cityName: string,
        },
        partnerInfoID: number,
        partnerInfo: {
            partnerInfoID: number,
            companyName: string,
            fullName: string,
            companyState: string,
            phoneNumber: string,
            user: any,
            userID: number,
            city: {
                cityID: number,
                cityName: string,
            },
            cityID: number,
        }
        status: CompanyStatus,
    };
    partnerInfo: {
        partnerInfoID: number,
        companyName: string,
        fullName: string,
        companyState: string,
        phoneNumber: string,
        user: any,
        userID: number,
        city: {
            cityID: number,
            cityName: string,
        },
        cityID: number,
    };
    city: {
        cityID: number,
        cityName: string,
    };
}

export default ICompanyListingDTO;
