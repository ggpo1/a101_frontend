

interface IMyCompaniesListingDTO {
    companyID: number,
    companyName: string,
    contactPersonFullName: string,
    contactPersonPhoneNumber: string,
    contactPersonCompanyState: string,
    status: number,
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
        user: {
            userID: number,
            userName: string,
            passwordHash: string,
            role: number,
        },
        userID: number,
        city: {
            cityID: number,
            cityName: string,
        },
        cityID: number,
    },
}

export default IMyCompaniesListingDTO;
