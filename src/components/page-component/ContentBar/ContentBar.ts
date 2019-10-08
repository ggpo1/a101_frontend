import { Component, Prop, Vue } from 'vue-property-decorator';
import IGetPartnersDTO from '@/Models/DTO/IGetPartnersDTO';
import IModalInformSource from '@/Models/Form/ModalView/IModalInformSource';
import ModalView from '@/components/page-component/ModalView';
import FormType from '@/Models/FormType';
import ButtonBox from '@/components/form-component/ButtonBox';
import INewPartnerDTO from '@/Models/DTO/INewPartnerDTO';
import UserRoles from '@/Models/Enums/UserRoles';
import CompanyApi from '@/API/CompanyAPI';
import Company from '@/Models/DataBase/Company';

@Component({ components: { ModalView, ButtonBox } })
export default class ContentBar extends Vue {
    @Prop() public contentState!: string;
    @Prop() public partnersSource!: IGetPartnersDTO[];
    public modalPartnerCreateState: boolean = false;
    public modalPartnerInfoState: boolean = false;

    public addPartnerData: INewPartnerDTO = {
        user: {
            UserName: '',
            PasswordHash: '',
            Role: UserRoles.PARTNER,
        },
        partnerInfo: {
            FullName: '',
            CompanyName: '',
            CompanyState: '',
            PhoneNumber: '',
            // CityID: number, // from combobox
            // UserID: number, // from user add response
        }
    }

    public partnerCompanies: Company[] = [];

    public ModalInformSource: IModalInformSource = {
        title: 'Инфомация',
        description: 'Информация',
    }

    public partnerInfoModalPages = [
        {
            title: 'Информация',
        },
        {
            title: 'Компании'
        },
    ]

    public ModalCreateSource!: IModalInformSource;

    public modalClose() {
        this.modalPartnerCreateState = false;
        this.modalPartnerInfoState = false;
    }

    public AddNewPartner() {
        console.log(this.addPartnerData);
    }
    
    public CreatePartnerValueUpdate(value: string, itemName: string) {

        switch (itemName) {
            case 'partnerLoginEdit':
                this.addPartnerData.user.UserName = value;
                break;
            case 'partnerPasswordEdit':
                this.addPartnerData.user.PasswordHash = value;
                break;
            case 'partnerCompanyNameEdit':
                this.addPartnerData.partnerInfo.CompanyName = value;
                break;
            case 'partnerFullNameEdit':
                this.addPartnerData.partnerInfo.FullName = value;
                break;
            case 'partnerCompanyStateEdit':
                this.addPartnerData.partnerInfo.CompanyState = value;
                break;
            case 'partnerPhoneEdit':
                this.addPartnerData.partnerInfo.PhoneNumber = value;
                break;

        }

    }

    /**
     * partnerBlockClick
     */
    public async partnerBlockClick(elem: IGetPartnersDTO, event: string) {
        switch (event) {
            case 'select':
                console.log(elem);
                this.ModalInformSource = {
                    title: 'Информация о партнере',
                    components: [
                        {
                            name: 'partnerCompanyNameLabel', // for emit
                            title: 'Название компании',
                            text: elem.partnerInfo.companyName,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'partnerFullNameNameLabel', // for emit
                            title: 'ФИО',
                            text: elem.partnerInfo.fullName,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'partnerCompanyStateNameLabel', // for emit
                            title: 'Должность',
                            text: elem.partnerInfo.companyState,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'partnerPhoneNumberNameLabel', // for emit
                            title: 'Тел.',
                            text: elem.partnerInfo.phoneNumber,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'partnerCityNameLabel', // for emit
                            title: 'Город',
                            text: elem.city,
                            type: FormType.LABELBOX,
                        },
                    ],
                }
                this.modalPartnerInfoState = true;
                const companyAPI = new CompanyApi();
                this.partnerCompanies =  await companyAPI.GetPartnerCompanies(elem.partnerInfo.partnerInfoID);
                console.log(this.partnerCompanies);
                break;
            case 'create':
                console.log("creating");
                this.ModalCreateSource = {
                    title: 'Добавление партнера',
                    components: [
                        {
                            name: 'partnerLoginEdit', // for emit
                            title: 'Логин',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerPasswordEdit', // for emit
                            title: 'Пароль',
                            inputMethod: 'password',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCompanyNameEdit', // for emit
                            title: 'Название компании',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerFullNameEdit', // for emit
                            title: 'ФИО',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCompanyStateEdit', // for emit
                            title: 'Должность',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerPhoneEdit', // for emit
                            title: 'Телефон',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCityEdit', // for emit
                            title: 'Город',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerRoleLbl', // for emit
                            title: 'Роль',
                            text: 'Партнер',
                            type: FormType.LABELBOX,
                        },
                    ],
                }
                this.modalPartnerCreateState = true;
                break;
            case 'edit':
                console.log("changing");
                break;
            case 'delete':
                console.log("deleting");
                break;
            default:
                break;
        }
    }

    /**
     * editPartnerInfo
     */
    public editPartnerInfo(elem: IGetPartnersDTO) {

    }
}