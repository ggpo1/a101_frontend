import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/form-component/Card';
import router from '@/router';
import FormType from '@/Models/FormType';
import FormTypeClass from '@/Models/FormTypeClass';
import UserLoginDTO from '@/Models/DTO/UserLoginDTO';
import PartnerInfoApi from '@/API/PartnerInfoAPI';
import PartnerInfo from '@/Models/DataBase/PartnerInfo';
import AuthAPI from '@/API/AuthAPI';
import { UserInfo } from '@/Data/UserInfo';
import UserLoginDTOResponse from '@/Models/DTO/Response/UserLoginDTOResponse';

@Component({ components: { Card } })
export default class LoginView extends Vue {
    public LoginData: UserLoginDTO = {
        Login: '',
        Password: '',
    };

    public CardSource: FormTypeClass[] = [
        {
            name: 'loginLabel',
            type: FormType.LABELBOX,
            title: 'Добро пожаловать в А101',
        },
        {
            name: 'loginInput',
            type: FormType.INPUTBOX,
            placeHolder: 'Пользователь',
            inputMethod: 'text',
        },
        {
            name: 'passwordInput',
            type: FormType.INPUTBOX,
            placeHolder: 'Пароль',
            inputMethod: 'password',
        },
        {
            name: 'loginButton',
            type: FormType.BUTTONBOX,
            title: 'Войти',
        },
    ];




    public mounted() {
        /*
        if (UserInfo.UserAuth === null || UserInfo.UserAuth === undefined) {
            router.push('login');
        }
        */

       if (localStorage.user_auth_status === 1) {
           router.push('workspace');
       }
    }


    /**
     * LoginMethod
     */
    public async LoginMethod() {
        const partner = new PartnerInfoApi();
        const auth = new AuthAPI();
        // partner.GetPartnerInfoByUserID();
        const data = await auth.Auth(this.LoginData.Login, this.LoginData.Password);
        if (data.status === 1) {
            UserInfo.UserAuth = new UserLoginDTOResponse(
                data.user,
                data.status,
            );
            localStorage.setItem('user_auth_status', '1');
            localStorage.setItem('user', JSON.stringify(data));
            router.push('workspace');
        } else {
            alert('Неправильный логин или пароль!');
        }
    }



    /**
     * LoginMethod
     */
    public ValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'loginInput':
                this.LoginData.Login = value;
                break;
            case 'passwordInput':
                this.LoginData.Password = value;
                break;
        }
    }
}
