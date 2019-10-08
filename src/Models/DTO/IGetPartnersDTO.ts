interface IGetPartnersDTO {
    user: {
        userID: number,
        userName: string,
        passwordHash: string,
        role: number,
    },
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
    city: string,
}

export default IGetPartnersDTO;