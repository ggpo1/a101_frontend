import UserRoles from '@/Models/Enums/UserRoles';
import User from '@/Models/DataBase/User';
import UserAuthStatus from '@/Models/Enums/UserAuthStatus';

export default class UserLoginDTOResponse {
    constructor(
        public User: User,
        public Status: UserAuthStatus,
    ) {}
}
