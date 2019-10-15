import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalModeType from '@/Models/Enums/ModalModeType';
import IModalInformSource from '@/Models/Form/ModalView/IModalInformSource';
import LabelBox from '@/components/form-component/LabelBox';
import InputBox from '@/components/form-component/InputBox';
import Company from '@/Models/DataBase/Company';
import SelectBox from '@/components/form-component/SelectBox';
import FileBox from '@/components/form-component/FileBox';
import DocumentInfo from '@/Models/DTO/DocumentInfo';

@Component({ components: { LabelBox, InputBox, SelectBox, FileBox } })
export default class ModalView extends Vue {
    @Prop() public ModalMode!: ModalModeType;
    @Prop() public ModalInformSource!: IModalInformSource;
    @Prop() public ModalCreateSource!: IModalInformSource;
    @Prop() public pages!: any;
    @Prop() public companies!: Company[];
    @Prop() public documents!: DocumentInfo[];
    @Prop() public modalPage2State!: string;

    public ModalPage: number = 0;

    public getStatus(status: number): string {
        switch (status) {
            case 0:
                return 'Новый';
            case 1:
                return 'Обсуждение';
            case 2:
                return 'Согласование КП';
            case 3:
                return 'Согласование договора';
            case 4:
                return 'Выставлен счет';
            case 5:
                return 'Счет оплачен';
            case 6:
                return 'Услуга выполнена';
            default:
                break;
        }
        return 'null';
    }

    public getDocStatus(status: number): string {
        switch (status) {
            case 0:
                return 'На согласовании';
            case 1:
                return 'Подписан';
            case 2:
                return 'Не подписан';
            case 3:
                return 'Не оплачен';
            case 4:
                return 'Оплачен';
            default:
                break;
        }
        return 'null';
    }

}
