import User from './User';

export default class PartnerInfo {
    constructor(
        public PartnerInfoID: number,
        public CompanyName: string,
        public FullName: string,
        public CompanyState: string,
        public PhoneNumber: string,
        public userID?: number,
        public cityID?: number,
    ) {}
}
