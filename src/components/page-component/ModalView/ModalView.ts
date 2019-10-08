import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalModeType from '@/Models/Enums/ModalModeType';
import IModalInformSource from '@/Models/Form/ModalView/IModalInformSource';
import LabelBox from '@/components/form-component/LabelBox';
import InputBox from '@/components/form-component/InputBox';
import Company from '@/Models/DataBase/Company';

@Component({ components: { LabelBox, InputBox } })
export default class ModalView extends Vue{
@Prop() public ModalMode!: ModalModeType;
@Prop() public ModalInformSource!: IModalInformSource;
@Prop() public ModalCreateSource!: IModalInformSource;
@Prop() public pages!: any;
@Prop() public companies!: Company[]; 
public ModalPage: number = 0;

}