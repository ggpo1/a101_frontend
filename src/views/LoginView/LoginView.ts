import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/form-component/Card';
import router from '@/router';
import FormType from '@/Models/FormType';
import FormTypeClass from '@/Models/FormTypeClass';
import UserLoginDTO from '@/Models/DTO/UserLoginDTO';

@Component({ components: { Card } })
export default class LoginView extends Vue {
    public LoginData: UserLoginDTO = {
        Login: '',
        Password: '',
    }

    public CardSource: Array<FormTypeClass> = [
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

    mounted() {
        
    }
    
    /**
     * LoginMethod
     */
    public LoginMethod() {
        
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
            default:
                break;
        }
    }
}
