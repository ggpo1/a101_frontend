import { Component, Prop, Vue } from  'vue-property-decorator';
import { UserInfo } from '@/Data/UserInfo';
import router from '@/router';
import UserLoginDTOResponse from '@/Models/DTO/Response/UserLoginDTOResponse';
import User from '@/Models/DataBase/User';
import UserRoles from '@/Models/Enums/UserRoles';
import UserAuthStatus from '@/Models/Enums/UserAuthStatus';

@Component({ components: {  } })
export default class WorkSpaceView extends Vue {
    public user!: UserLoginDTOResponse;
    public role: number = 0;


    
    
    public mounted() {
        /*
        if (UserInfo.UserAuth === null || UserInfo.UserAuth === undefined) {
            router.push('login');
        }
        */
       
       if (localStorage.user_auth_status === 0 || localStorage.user_auth_status === null || localStorage.user_auth_status === undefined) {
           router.push('login');
       } else {
           let data = JSON.parse(localStorage.user);
           
           this.user = new UserLoginDTOResponse(
               new User(
                   data.user.userID,
                   data.user.userName,
                   data.user.passwordHash,
                   data.user.role
                ),
                data.status
           );
           
           this.role = this.user.User.Role;
           
       }

    }
}