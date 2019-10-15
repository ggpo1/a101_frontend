import UserRoles from '../Enums/UserRoles';

interface INewPartnerDTO {
    user: {
        UserID: number,
        UserName: string,
        PasswordHash: string,
        Role: UserRoles,
    };
    partnerInfo: {
        PartnerInfoID: number,
        FullName: string,
        CompanyName: string,
        CompanyState: string,
        PhoneNumber: string,
        CityID: number, // from combobox
        // UserID: number, // from user add response
    };
}

export default INewPartnerDTO;
