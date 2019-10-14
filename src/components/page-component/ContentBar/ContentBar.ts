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
import DocumentInfo from '@/Models/DTO/DocumentInfo';
import CompanyInfo from '@/Models/DTO/CompanyInfo';
import SearchBar from '@/components/page-component/SearchBar';

@Component({ components: { ModalView, ButtonBox, SearchBar } })
export default class ContentBar extends Vue {
    @Prop() public contentState!: string;
    @Prop() public partnersSource!: IGetPartnersDTO[];
    @Prop() public companiesSource!: ICompanyListingDTO[];
    @Prop() public userPartnerInfo!: any;
    @Prop() public documentsSource!: DocumentInfo[];

    public modalPartnerCreateState: boolean = false;
    public modalPartnerInfoState: boolean = false;

    public selectedCompanyDocuments: DocumentInfo[] = [];

    public partnersOptions: { id: number, title: string }[] = [];

    public modalCompanyCreateState: boolean = false;
    public modalCompanyInfoState: boolean = false;
    public modalCompanyEditState: boolean = false;

    public modalMyCompanyCreateState: boolean = false;
    public modalMyCompanyInfoState: boolean = false;

    public modalMyDocumentCreateState: boolean = false;

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
        this.modalMyCompanyCreateState = false;
        this.modalMyCompanyInfoState = false;
        this.modalMyDocumentCreateState = false;
        this.modalCompanyEditState = false;
    }

    public UpdateCompany() {

    }

    public async AddNewCompany() {
        // объявляем переменные API
        let cityAPI = new CityAPI();
        let companyAPI = new CompanyApi();
        let docAPI = new DocumentAPI();

        // достаем айди города по его названию
        let data = await cityAPI.GetCityIDByName(this.addCompanyData.companyInfo.cityName);
        this.addCompanyData.company.cityID = data.cityID;

        // достаем айди статуса компании
        for (const i in this.CompanyStatuses) {
            this.CompanyStatuses[i].title === this.addCompanyData.companyInfo.statusName ? this.addCompanyData.company.status = this.CompanyStatuses[i].id : '';
        }

        console.log(this.addCompanyData.company.status);

        // достаем айди партнера
        let partnerID: number = 0;
        for (let i in this.partnersSource) {
            if (this.addCompanyData.companyInfo.partner === this.partnersSource[i].partnerInfo.companyName + ' - '
                + this.partnersSource[i].partnerInfo.fullName + ' - '
                + this.partnersSource[i].partnerInfo.companyState + ' - '
                + this.partnersSource[i].city) {
                partnerID = this.partnersSource[i].partnerInfo.partnerInfoID;
            }
        }

        // добавляем компанию и получаем companyID для добавления информации о документе в базу данных
        let companyInfo: CompanyInfo = {
            CompanyID: 0,
            CompanyName: this.addCompanyData.company.companyName,
            ContactPersonFullName: this.addCompanyData.company.contactPersonFullName,
            ContactPersonPhoneNumber: this.addCompanyData.company.contactPersonPhoneNumber,
            ContactPersonCompanyState: this.addCompanyData.company.contactPersonCompanyState,
            Status: this.addCompanyData.company.status,
            CityID: this.addCompanyData.company.cityID,
            PartnerInfoID: partnerID
        }

        // добавляем информацию о компании и получаем обратно ее айди
        let companyID = await companyAPI.AddNewCompanyInfo(companyInfo);

        // закачиваем документ на сервер
        docAPI.AddNewDocument(this.addCompanyData.companyInfo.file);

        // формируем объект с информацией о документе для отправки на сервер
        let documentInfo: DocumentInfo = {
            DocumentID: 0,
            DocumentName: this.addCompanyData.companyInfo.file.name,
            PartnerInfoID: partnerID,
            CompanyID: companyID.companyID,
            DocumentStatus: DocumentStatus.MATCHING
        }

        // отправляем информацию о документе на сервер
        docAPI.AddNewDocumentInfo(documentInfo);

        // скрываем модалку добавления компании
        this.modalCompanyCreateState = false;

        // обновляем сурсу
        this.companiesSource = await companyAPI.GetCompanies();
    }

    public async AddNewMyCompany() {

        // объявляем переменные API
        let cityAPI = new CityAPI();
        let companyAPI = new CompanyApi();
        let docAPI = new DocumentAPI();

        // достаем айди города по его названию
        let data = await cityAPI.GetCityIDByName(this.addCompanyData.companyInfo.cityName);
        this.addCompanyData.company.cityID = data.cityID;

        // достаем айди статуса компании
        for (const i in this.CompanyStatuses) {
            this.CompanyStatuses[i].title === this.addCompanyData.companyInfo.statusName ? this.addCompanyData.company.status = this.CompanyStatuses[i].id : '';
        }

        // добавляем компанию и получаем companyID для добавления информации о документе в базу данных
        let companyInfo: CompanyInfo = {
            CompanyID: 0,
            CompanyName: this.addCompanyData.company.companyName,
            ContactPersonFullName: this.addCompanyData.company.contactPersonFullName,
            ContactPersonPhoneNumber: this.addCompanyData.company.contactPersonPhoneNumber,
            ContactPersonCompanyState: this.addCompanyData.company.contactPersonCompanyState,
            Status: this.addCompanyData.company.status,
            CityID: this.addCompanyData.company.cityID,
            PartnerInfoID: this.userPartnerInfo.partnerInfoID
        }

        // добавляем информацию о компании и получаем обратно ее айди
        let companyID = await companyAPI.AddNewCompanyInfo(companyInfo);

        // закачиваем документ на сервер
        docAPI.AddNewDocument(this.addCompanyData.companyInfo.file);

        // формируем объект с информацией о документе для отправки на сервер
        let documentInfo: DocumentInfo = {
            DocumentID: 0,
            DocumentName: this.addCompanyData.companyInfo.file.name,
            PartnerInfoID: this.userPartnerInfo.partnerInfoID,
            CompanyID: companyID.companyID,
            DocumentStatus: DocumentStatus.MATCHING
        }

        // отправляем информацию о документе на сервер
        docAPI.AddNewDocumentInfo(documentInfo);

        // скрываем модалку добавления компании
        this.modalMyCompanyCreateState = false;

        // обновляем сурсу
        this.companiesSource = await companyAPI.GetPartnerCompanies(this.userPartnerInfo.partnerInfoID);
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

    public DocsStatuses = [
        {
            id: 0,
            title: 'Выберите статус...',
        },
        {
            id: DocumentStatus.MATCHING,
            title: 'На согласовании',
        },
        {
            id: DocumentStatus.SIGNED,
            title: 'Подписан',
        },
        {
            id: DocumentStatus.NOT_SIGNED,
            title: 'Не подписан',
        },
        {
            id: DocumentStatus.NOT_PAID,
            title: 'Не оплачен',
        },
        {
            id: DocumentStatus.PAID,
            title: 'Оплачен',
        },
    ]

    /**
     * partnerCompanyGridAction
     */
    public async partnerCompanyGridAction(elem: any, event: string) {
        var docAPI = new DocumentAPI();
        var companyAPI = new CompanyApi();
        switch (event) {
            case 'create':
                let cityAPI = new CityAPI();
                let cities = await cityAPI.GetCities();
                let cSO: { id: number, title: string }[] = [];
                cSO.push({ id: 0, title: 'Выберите город...' });
                for (let index = 0; index < cities.length; index++) {
                    cSO.push({ id: cities[index].cityID, title: cities[index].cityName });
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
                this.modalMyCompanyCreateState = true;
                break;

            case 'select':

                console.log(elem);

                this.ModalInformSource = {
                    title: 'Информация о компании',
                    components: [
                        {
                            name: 'companyNameLabel', // for emit
                            title: 'Название компании',
                            text: elem.companyName,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'contactFullNameNameLabel', // for emit
                            title: 'Контактное лицо',
                            text: elem.contactPersonFullName,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'companyStateNameLabel', // for emit
                            title: 'Должность',
                            text: elem.contactPersonCompanyState,
                            type: FormType.LABELBOX,
                        },
                        {
                            name: 'companyPhoneNumberNameLabel', // for emit
                            title: 'Тел.',
                            text: elem.contactPersonPhoneNumber,
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
                            text: this.getStatus(elem.status),
                            type: FormType.LABELBOX,
                        },
                    ],
                }
                this.selectedCompanyDocuments = await docAPI.GetCompanyDocs(elem.companyID);
                this.modalMyCompanyInfoState = true;
                break;
            case 'delete':
                let response = await docAPI.RemoveDocumentInfo(elem.companyID);
                console.log(response)
                response = await companyAPI.RemoveCompany(elem.companyID);
                console.log(response);

                this.companiesSource = await companyAPI.GetPartnerCompanies(this.userPartnerInfo.partnerInfoID);
                break;
            default:
                break;
        }
    }

    public async CreatePartnerCompanyValueUpdate(value: string, itemName: string) {
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
                this.partnersOptions = [];
                this.partnersOptions.push({ id: 0, title: 'Выберите партнера...' });
                for (let i in this.partnersSource) {
                    let _title = this.partnersSource[i].partnerInfo.companyName + ' - '
                        + this.partnersSource[i].partnerInfo.fullName + ' - '
                        + this.partnersSource[i].partnerInfo.companyState + ' - '
                        + this.partnersSource[i].city;
                    this.partnersOptions.push(
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
                            selectOptions: this.partnersOptions,
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
                let docAPI = new DocumentAPI();

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
                            name: 'partnerNameLabel', // for emit
                            title: 'Партнер',
                            text: elem.partnerInfo.fullName + ' - ' + elem.partnerInfo.companyName + ' - ' + elem.partnerInfo.city.cityName,
                            hasHint: false,
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

                this.selectedCompanyDocuments = await docAPI.GetCompanyDocs(elem.company.companyID);
                console.log(this.selectedCompanyDocuments);
                this.modalCompanyInfoState = true;
                break;

            case 'edit':
                    let _cityAPI = new CityAPI();
                    let _cities = await _cityAPI.GetCities();
                    let _cSO: { id: number, title: string }[] = [];
                    _cSO.push({ id: 0, title: 'Выберите город...' });
                    
                    for (let index = 0; index < _cities.length; index++) {
                        _cSO.push({ id: _cities[index].cityID, title: _cities[index].cityName });
                    }
    
                    // выборка партнеров для селектора партнеров
                    // Компания - Имя - Должность - Город
                    this.partnersOptions = [];
                    this.partnersOptions.push({ id: 0, title: 'Выберите партнера...' });
                    for (let i in this.partnersSource) {
                        let _title = this.partnersSource[i].partnerInfo.companyName + ' - '
                            + this.partnersSource[i].partnerInfo.fullName + ' - '
                            + this.partnersSource[i].partnerInfo.companyState + ' - '
                            + this.partnersSource[i].city;
                        this.partnersOptions.push(
                            {
                                id: Number.parseInt(i),
                                title: _title,
                            }
                        );
                    }
    
                    this.ModalCreateSource = {
                        title: 'Изменение компании',
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
                                selectOptions: _cSO,
                                type: FormType.SELECTBOX,
                            },
                            {
                                name: 'companyPartner', // for emit
                                title: 'Партнер',
                                selectOptions: this.partnersOptions,
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
                    this.modalCompanyEditState = true;
                break;
            case 'delete':
                let _docAPI = new DocumentAPI();
                let companyAPI = new CompanyApi();
                let response = await _docAPI.RemoveDocumentInfo(elem.company.companyID);
                console.log(response)
                response = await companyAPI.RemoveCompany(elem.company.companyID);
                console.log(response);

                this.companiesSource = await companyAPI.GetCompanies();
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

    public async downloadAction(item: any) {
        console.log(item);
        // let docAPI = new DocumentAPI();
        // let file = await docAPI.Download(item.documentName);

        // var link = document.createElement('a');

        window.open('http://192.168.50.8:44336/api/document/download?name=' + item.documentName, '_newtab');


    }

    


    public AddDocumentSource: DocumentInfo = {
        DocumentID: 0,
        DocumentName: '',
        PartnerInfoID: 0,
        CompanyID: 0,
        DocumentStatus: DocumentStatus.MATCHING,
    }

    public FileInfo: {
        companyTitle?: string,
        documentStatusTitle?: string,
    } = {};

    public NewFile: any = null;

    /**
     * CreateDocumentValueUpdate
     */
    public CreateDocumentValueUpdate(value: string, itemName: string) {
        switch (itemName) {            
            case 'documentFileBox':
                this.NewFile = value[0];
                break;

            case 'documentCompanySB':
                this.FileInfo.companyTitle = value;
                break;

            case 'documentStatusSB':
                this.FileInfo.documentStatusTitle = value;
                break;
            
            default:
                break;
        }
    }

    /**
     * documentWork
     */
    public documentWork(elem: DocumentInfo, event: string) {
        let companiesSelectOption: Array<{id: number, title: string}> = [];
        let companies: any = this.companiesSource;
        companiesSelectOption.push({
            id: 0,
            title: 'Выберите компанию...',
        });
        for (let i = 0; i < this.companiesSource.length; i++) {
            companiesSelectOption.push({
                id: i,
                title: companies[i].companyName + ' - ' 
                        + companies[i].contactPersonFullName + ' - '
                        + companies[i].city.cityName,
            });  
        }
        switch (event) {
            case 'create':
                    this.ModalCreateSource = {
                        title: 'Добавление партнера',
                        components: [
                            {
                                name: 'documentFileBox',
                                title: 'Документ',
                                type: FormType.FILEBOX, // type file
                            },
                            {
                                name: 'documentCompanySB',
                                title: 'Компания',
                                selectOptions: companiesSelectOption,
                                type: FormType.SELECTBOX,
                            },
                            {
                                name: 'documentStatusSB',
                                title: 'Статус документа',
                                selectOptions: this.DocsStatuses,
                                type: FormType.SELECTBOX,
                            },
                        ],
                    }

                    this.modalMyDocumentCreateState = true;
                break;
            case 'delete':

                break;
            default:
                break;
        }
    }

    /**
     * AddNewDocument
     */
    public async AddNewDocument(addMode: string) {
        switch (addMode) {
            case 'partner':
                let docApi = new DocumentAPI();
                let companies: any = this.companiesSource;
                
                let companyID: number = 0;
                // нахождение компании по тайтлу
                for (let i = 0; i < companies.length; i++) {
                    if (this.FileInfo.companyTitle === companies[i].companyName + ' - ' 
                            + companies[i].contactPersonFullName + ' - '
                            + companies[i].city.cityName) {
                        companyID = companies[i].companyID;
                    }
                }

                console.log(companyID);
                
                let documentStatus: number = 0;
                for (let i = 0; i < this.DocsStatuses.length; i++) {
                    if (this.DocsStatuses[i].title === this.FileInfo.documentStatusTitle) {
                        documentStatus = i;
                    }
                }
                documentStatus--;
                console.log(documentStatus);

                this.AddDocumentSource.DocumentName = this.NewFile.name;
                this.AddDocumentSource.CompanyID = companyID;
                this.AddDocumentSource.PartnerInfoID = this.userPartnerInfo.partnerInfoID;
                this.AddDocumentSource.DocumentStatus = documentStatus;
                
                docApi.AddNewDocument(this.NewFile);
                docApi.AddNewDocumentInfo(this.AddDocumentSource);
                
                this.documentsSource = await docApi.GetPartnerDocs(this.userPartnerInfo.partnerInfoID);

                this.modalMyDocumentCreateState = false;

                break;
            
            case 'admin':

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