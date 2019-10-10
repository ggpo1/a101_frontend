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
import User from '@/Models/DataBase/User';
import UserAPI from '@/API/UserAPI';
import PartnerInfo from '@/Models/DataBase/PartnerInfo';
import PartnerInfoApi from '@/API/PartnerInfoAPI';
import CityAPI from '@/API/CityAPI';
import ICompanyListingDTO from '@/Models/DTO/ICompanyListingDTO';
import DocumentStatus from '@/Models/Enums/DocumentStatus';
import CompanyStatus from '@/Models/Enums/CompanyStatus';
import INewCompanyDTO from '@/Models/DTO/INewCompanyDTO';
import DocumentAPI from '@/API/DocumentAPI';

@Component({ components: { ModalView, ButtonBox } })
export default class ContentBar extends Vue {
    @Prop() public contentState!: string;
    @Prop() public partnersSource!: IGetPartnersDTO[];
    @Prop() public companiesSource!: ICompanyListingDTO[];
    public modalPartnerCreateState: boolean = false;
    public modalPartnerInfoState: boolean = false;

    public modalCompanyCreateState: boolean = false;
    public modalCompanyInfoState: boolean = false;

    public getStatus(status: number): string {
        switch (status) {
            case 0:
                return 'Новый';
            case 1:
                return 'Обсуждение';
            case 2:
                return 'Согласоввание КП';
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
            CityID: 0, // from combobox
            // UserID: number, // from user add response
        }
    }

    public addCompanyData: INewCompanyDTO = {
        company: {
            companyName: '',
            contactPersonFullName: '',
            contactPersonPhoneNumber: '',
            contactPersonCompanyState: '',
            status: CompanyStatus.NEW,
            cityID: 0,
            partnerInfoID: 0,
        },
        companyInfo: {
            cityName: '',
            partner: '',
            statusName: '',
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

    public companyInfoModalPages = [
        {
            title: 'Информация',
        },
        {
            title: 'Документы',
        },
    ]

    public ModalCreateSource!: IModalInformSource;

    public modalClose() {
        this.modalPartnerCreateState = false;
        this.modalPartnerInfoState = false;
        this.modalCompanyInfoState = false;
        this.modalCompanyCreateState = false;
    }

    public async AddNewCompany() {
        // add new company
        // console.log(this.addCompanyData);
        // cityID по cityName ~
        let cityAPI = new CityAPI();
        // this.addCompanyData.companyInfo.cityName = this.addCompanyData.companyInfo.cityName === '' ? '' : '';

        let data = await cityAPI.GetCityIDByName(this.addCompanyData.companyInfo.cityName);
        this.addCompanyData.company.cityID = data.cityID;
        // console.log(this.addCompanyData.company.cityID);

        // statusName +
        for (const i in this.CompanyStatuses) {
            this.CompanyStatuses[i].title === this.addCompanyData.companyInfo.statusName ? this.addCompanyData.company.status = this.CompanyStatuses[i].id : '';
        }
        
        // partner 
        console.log(this.addCompanyData.companyInfo.partner);
        let docAPI = new DocumentAPI();
        docAPI.AddNewDocument(this.addCompanyData.companyInfo.file);

    }

    public async AddNewPartner() {
        // console.log('adding');
        let newUser = new User(
            0,
            this.addPartnerData.user.UserName,
            this.addPartnerData.user.PasswordHash,
            this.addPartnerData.user.Role,
        );
        let userAPI = new UserAPI();
        let user = await userAPI.AddUserInfo(newUser);
        // console.log(user);
        // console.log(this.addPartnerData.partnerInfo.CityID);
        let newPartner = new PartnerInfo(
            0,
            this.addPartnerData.partnerInfo.CompanyName,
            this.addPartnerData.partnerInfo.FullName,
            this.addPartnerData.partnerInfo.CompanyState,
            this.addPartnerData.partnerInfo.PhoneNumber,
            user.userID,
            this.addPartnerData.partnerInfo.CityID,
        );
        // console.log(newPartner);
        let partnerAPI = new PartnerInfoApi();
        await partnerAPI.AddPartnerInfo(newPartner);
        this.partnersSource = await partnerAPI.GetPartners();
        this.modalPartnerCreateState = false;
        // console.log(partnerID);

    }

    public async CreatePartnerValueUpdate(value: string, itemName: string) {

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
            case 'partnerCityEdit':
                let cityAPI = new CityAPI();
                let cityResponse = await cityAPI.GetCityIDByName(value);
                console.log(cityResponse);
                this.addPartnerData.partnerInfo.CityID = cityResponse.cityID;
                break;

        }

    }
    
    public async CreateCompanyValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'companyNameEdit':
                this.addCompanyData.company.companyName = value;
                break;
            case 'companyPersonFullNameEdit':
                this.addCompanyData.company.contactPersonFullName = value;
                break;
            case 'companyPersonPhoneNumberEdit':
                this.addCompanyData.company.contactPersonPhoneNumber = value;
                break;
            case 'companyPersonState':
                this.addCompanyData.company.contactPersonCompanyState = value;
                break;    
            case 'companyCity':
                this.addCompanyData.companyInfo.cityName = value;
                break;
            case 'companyPartner':
                this.addCompanyData.companyInfo.partner = value;
                break;
            case 'companyStatus':
                this.addCompanyData.companyInfo.statusName = value;
                break;
            case 'companyDocument':
                console.log(value[0]);
                this.addCompanyData.companyInfo.file = value[0];
                break;
            default:
                break;
        }
    }

    

    public CompanyStatuses = [
        {
            id: 0,
            title: 'Выберите статус...',
        },
        {
            id: CompanyStatus.NEW,
            title: 'Новый',
        },
        {
            id: CompanyStatus.DISCUSSION,
            title: 'Обсуждение',
        },
        {
            id: CompanyStatus.MATCHING_KP,
            title: 'Согласование КП',
        },
        {
            id: CompanyStatus.MATCHING_CONTRACT,
            title: 'Согласование договора',
        },
        {
            id: CompanyStatus.NOT_PAID,
            title: 'Выставлен счет',
        },
        {
            id: CompanyStatus.PAID,
            title: 'Счет оплачен',
        },
        {
            id: CompanyStatus.DONE,
            title: 'Услуга выполнена',
        },
    ]

    /**
     * partnerCompanyGridAction
     */
    public partnerCompanyGridAction(elem: ICompanyListingDTO, event: string) {
        switch (event) {
            case 'create':
                
                break;
        
            default:
                break;
        }
    }

    /**
     * companyBlockClick
     */
    public async companyBlockClick(elem: ICompanyListingDTO, event: string) {
        switch (event) {
            case 'create':
                let cityAPI = new CityAPI();
                let cities = await cityAPI.GetCities();
                let cSO: { id: number, title: string }[] = [];
                cSO.push({ id: 0, title: 'Выберите город...' });
                for (let index = 0; index < cities.length; index++) {
                    cSO.push({ id: cities[index].cityID, title: cities[index].cityName });
                }
                this.modalCompanyCreateState = true;

                // выборка партнеров для селектора партнеров
                // Компания - Имя - Должность - Город
                let partnersOptions: { id: number, title: string }[] = [];
                partnersOptions.push({ id: 0, title: 'Выберите партнера...' });
                for (let i in this.partnersSource) {
                    let _title = this.partnersSource[i].partnerInfo.companyName + ' - ' 
                                    + this.partnersSource[i].partnerInfo.fullName + ' - ' 
                                    + this.partnersSource[i].partnerInfo.companyState + ' - '
                                    + this.partnersSource[i].city;
                    partnersOptions.push(
                        {
                            id: Number.parseInt(i),
                            title: _title,
                        }
                    );
                }

                this.ModalCreateSource = {
                    title: 'Добавление компании',
                    components: [
                        {
                            name: 'companyNameEdit', // for emit
                            title: 'Название компании',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonFullNameEdit', // for emit
                            title: 'Контактное лицо',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonPhoneNumberEdit', // for emit
                            title: 'Тел.',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonState', // for emit
                            title: 'Должность',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyCity', // for emit
                            title: 'Город',
                            selectOptions: cSO,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'companyPartner', // for emit
                            title: 'Партнер',
                            selectOptions: partnersOptions,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'companyDocument',
                            title: 'Документ',
                            type: FormType.FILEBOX, // type file
                        },
                        {
                            name: 'companyStatus', // for emit
                            title: 'Статус',
                            selectOptions: this.CompanyStatuses,
                            type: FormType.SELECTBOX,
                        },
                    ],
                }
                break;
            case 'select':
                console.log(elem);
                this.ModalInformSource = {
                    title: 'Информация о компании',
                    components: [
                        {
                            name: 'companyNameLabel', // for emit
                            title: 'Название компании',
                            text: elem.company.companyName,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'contactFullNameNameLabel', // for emit
                            title: 'Контактное лицо',
                            text: elem.company.contactPersonFullName,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'companyStateNameLabel', // for emit
                            title: 'Должность',
                            text: elem.company.contactPersonCompanyState,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'companyPhoneNumberNameLabel', // for emit
                            title: 'Тел.',
                            text: elem.company.contactPersonPhoneNumber,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'companyCityNameLabel', // for emit
                            title: 'Город',
                            text: elem.city.cityName,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'companyCityNameLabel', // for emit
                            title: 'Статус', // Переход на статус
                            text: this.getStatus(elem.company.status),
                            type: FormType.LABELBOX,
                        },
                    ],
                }
                this.modalCompanyInfoState = true;
                break;

            case 'edit':

                break;
            case 'delete':

                break;
            default:
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
                this.partnerCompanies = await companyAPI.GetPartnerCompanies(elem.partnerInfo.partnerInfoID);
                let cAPI = new CityAPI();
                let _cities = await cAPI.GetCities();
                for (let i = 0; i < this.partnerCompanies.length; i++) {
                    for (let j = 0; j < _cities.length; j++) {
                        if (_cities[j].cityID === this.partnerCompanies[i].CityID) {
                            this.partnerCompanies[i]
                        }
                    }
                }
                // let cityInfo = cAPI.GetCityByID();
                console.log(this.partnerCompanies);

                break;
            case 'create':
                console.log("creating");
                let cityAPI = new CityAPI();
                let cities = await cityAPI.GetCities();
                let cSO: { id: number, title: string }[] = [];
                cSO.push({ id: 0, title: 'Выберите город...' });
                for (let index = 0; index < cities.length; index++) {
                    cSO.push({ id: cities[index].cityID, title: cities[index].cityName });
                }
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
                            selectOptions: cSO,
                            type: FormType.SELECTBOX,
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
                // TODO
                break;
            case 'delete':
                console.log(elem);
                let _partnerAPI = new PartnerInfoApi();
                let _userAPI = new UserAPI();
                await _partnerAPI.DeletePartner(elem.partnerInfo.partnerInfoID);
                await _userAPI.DeleteUser(elem.user.userID);
                this.partnersSource = await _partnerAPI.GetPartners();
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