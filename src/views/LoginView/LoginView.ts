import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '@/components/form-component/Card';
import router from '@/router';
import FormType from '@/Models/FormType';
import FormTypeClass from '@/Models/FormTypeClass';

@Component({ components: { Card } })
export default class LoginView extends Vue {
    public CardSource: Array<FormTypeClass> = [
        {
            name: 'logininput',
            type: FormType.INPUT,
        },
        {
            name: 'passwordInput',
            type: FormType.INPUT,
        },
        {
            name: 'loginButton',
            type: FormType.BUTTON,
        },
    ]
}
