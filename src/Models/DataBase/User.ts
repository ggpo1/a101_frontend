import UserRoles from '../Enums/UserRoles';

export default class User {
    constructor(
        public UserID: number,
        public UserName: string,
        public PasswordHash: string,
        public Role: UserRoles,
    ) {}
}
