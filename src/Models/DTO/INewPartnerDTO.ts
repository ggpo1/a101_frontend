import UserRoles from '../Enums/UserRoles';

interface INewPartnerDTO {
    user: {
        UserName: string,
        PasswordHash: string,
        Role: UserRoles,
    },
    partnerInfo: {
        FullName: string,
        CompanyName: string,
        CompanyState: string,
        PhoneNumber: string,
        // CityID: number, // from combobox
        // UserID: number, // from user add response
    }
}

export default INewPartnerDTO;
