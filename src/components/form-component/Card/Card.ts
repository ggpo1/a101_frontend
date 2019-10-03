import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '@/router';
import FormTypeClass from '@/Models/FormTypeClass';
import InputBox from '@/components/form-component/InputBox';
import ButtonBox from '@/components/form-component/ButtonBox';
import LabelBox from '@/components/form-component/LabelBox';
import FormType from '@/Models/FormType';
import UserLoginDTO from '@/Models/DTO/UserLoginDTO';

@Component({ components: { InputBox, ButtonBox, LabelBox } })
export default class Card extends Vue {
    @Prop() public CardSource!: Array<FormTypeClass>;
    @Prop() public LoginData!: UserLoginDTO; 
    public inputValue: string = '';
    /**
     * helloEmit
     */
    public inputChangeAction(value: string) {
        this.inputValue = value;
    }
}