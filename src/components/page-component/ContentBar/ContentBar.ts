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
import City from '@/Models/DataBase/City';
import ErrorModal from '@/components/page-component/ErrorModal';
import RusAlph from '@/Data/RusAlph';
import FormErrors from '@/Models/Enums/FormErrors';

@Component({ components: { ModalView, ButtonBox, SearchBar, ErrorModal } })
export default class ContentBar extends Vue {
    @Prop() public contentState!: string;
    @Prop() public partnersSource!: IGetPartnersDTO[];
    @Prop() public companiesSource!: ICompanyListingDTO[];
    @Prop() public userPartnerInfo!: any;
    @Prop() public documentsSource!: DocumentInfo[];

    public modalPartnerCreateState: boolean = false;
    public modalPartnerInfoState: boolean = false;
    public modalPartnerEditState: boolean = false;

    public selectedCompanyDocuments: DocumentInfo[] = [];

    public partnersOptions: Array<{ id: number, title: string }> = [];

    public modalCompanyCreateState: boolean = false;
    public modalCompanyInfoState: boolean = false;
    public modalCompanyEditState: boolean = false;

    public modalMyCompanyCreateState: boolean = false;
    public modalMyCompanyInfoState: boolean = false;

    public modalMyDocumentCreateState: boolean = false;
    public modalMyDocEditState: boolean = false;

    public emptyField: boolean = false;
    
    public errorModalState: boolean = false;
    public errorModalData: { title: string, text: string } = {
        title: '',
        text: '',
    }

    public addPartnerData: INewPartnerDTO = {
        user: {
            UserID: 0,
            UserName: '',
            PasswordHash: '',
            Role: UserRoles.PARTNER,
        },
        partnerInfo: {
            PartnerInfoID: 0,
            FullName: '',
            CompanyName: '',
            CompanyState: '',
            PhoneNumber: '',
            CityID: 0, // from combobox
            // UserID: number, // from user add response
        },
    };

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
            partner: 0,
            statusName: 0,
        },
    };

    public UpdateCompanyData: INewCompanyDTO = {
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
            partner: 0,
            statusName: 0,
        },
    };

    public partnerCompanies: Company[] = [];

    public ModalInformSource: IModalInformSource = {
        title: 'Инфомация',
        description: 'Информация',
    };

    public partnerInfoModalPages = [
        {
            title: 'Информация',
        },
        {
            title: 'Компании',
        },
    ];

    public companyInfoModalPages = [
        {
            title: 'Информация',
        },
        {
            title: 'Документы',
        },
    ];

    public ModalCreateSource: IModalInformSource = {
        title: '',
        description: '',
        components: []
    }

    public CompanyStatuses = [
        {
            id: -1,
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
    ];

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
    ];




    public AddDocumentSource: DocumentInfo = {
        DocumentID: 0,
        DocumentName: '',
        PartnerInfoID: 0,
        CompanyID: 0,
        DocumentStatus: DocumentStatus.MATCHING,
    };

    public FileInfo: {
        companyTitle?: string,
        documentStatusTitle?: string,
    } = {};

    public NewFile: any = null;

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

    public modalClose() {
        this.modalPartnerCreateState = false;
        this.modalPartnerInfoState = false;
        this.modalCompanyInfoState = false;
        this.modalCompanyCreateState = false;
        this.modalMyCompanyCreateState = false;
        this.modalMyCompanyInfoState = false;
        this.modalMyDocumentCreateState = false;
        this.modalCompanyEditState = false;
        this.modalMyDocEditState = false;
        this.modalPartnerEditState = false;
    }

    public async UpdateCompany() {
        const companyAPI = new CompanyApi();
        const companyInfo: CompanyInfo = {
            CompanyID: this.UpdateCompanyData.company.companyID,
            CompanyName: this.UpdateCompanyData.company.companyName,
            ContactPersonFullName: this.UpdateCompanyData.company.contactPersonFullName,
            ContactPersonPhoneNumber: this.UpdateCompanyData.company.contactPersonPhoneNumber,
            ContactPersonCompanyState: this.UpdateCompanyData.company.contactPersonCompanyState,
            Status: this.UpdateCompanyData.company.status,
            CityID: this.UpdateCompanyData.company.cityID,
            PartnerInfoID: this.UpdateCompanyData.company.partnerInfoID,
        };
        if (companyInfo.CompanyName === '' ||
            companyInfo.ContactPersonFullName === '' ||
            companyInfo.ContactPersonPhoneNumber === '' ||
            companyInfo.ContactPersonCompanyState === '' ||
            companyInfo.CityID === 0 ||
            companyInfo.PartnerInfoID === 0 ||
            companyInfo.Status === -1
        ) {
            
        } else {
            const response = await companyAPI.PatchCompanyInfo(companyInfo);
            if (this.userPartnerInfo.user.role === 0) {
                this.companiesSource = await companyAPI.GetPartnerCompanies(this.userPartnerInfo.partnerInfoID);
            }
            else if (this.userPartnerInfo.user.role === 1) {
                this.companiesSource = await companyAPI.GetCompanies();
            }
            this.modalCompanyEditState = false;
        }
    }

    public async UpdateCompanyValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'companyNameEdit':
                this.ModalCreateSource.components![0].error = value === '';
                this.UpdateCompanyData.company.companyName = value;
                break;
            case 'companyPersonFullNameEdit':
                this.ModalCreateSource.components![1].error = value === '';
                this.UpdateCompanyData.company.contactPersonFullName = value;
                break;
            case 'companyPersonPhoneNumberEdit':
                this.ModalCreateSource.components![2].error = value === '';
                this.UpdateCompanyData.company.contactPersonPhoneNumber = value;
                break;
            case 'companyPersonState':
                this.ModalCreateSource.components![3].error = value === '';
                this.UpdateCompanyData.company.contactPersonCompanyState = value;
                break;
            case 'companyCity':
                this.ModalCreateSource.components![4].error = parseInt(value) === 0;
                if (parseInt(value) != 0) {
                    const cityAPI = new CityAPI();
                    const cities = await cityAPI.GetCities();
                    this.UpdateCompanyData.company.cityID = cities[parseInt(value) - 1].cityID;
                }
                break;
            case 'companyStatus':
                this.ModalCreateSource.components![5].error = parseInt(value) === 0;
                if (parseInt(value) != -1) {
                    this.UpdateCompanyData.company.status = this.CompanyStatuses[parseInt(value)].id;
                }

                break;
            default:
                break;
        }
    }

    public async AddNewCompany() {
        // объявляем переменные API
        const cityAPI = new CityAPI();
        const companyAPI = new CompanyApi();
        const docAPI = new DocumentAPI();

        // добавляем компанию и получаем companyID для добавления информации о документе в базу данных
        const companyInfo: CompanyInfo = {
            CompanyID: 0,
            CompanyName: this.addCompanyData.company.companyName,
            ContactPersonFullName: this.addCompanyData.company.contactPersonFullName,
            ContactPersonPhoneNumber: this.addCompanyData.company.contactPersonPhoneNumber,
            ContactPersonCompanyState: this.addCompanyData.company.contactPersonCompanyState,
            Status: this.addCompanyData.company.status,
            CityID: this.addCompanyData.company.cityID,
            PartnerInfoID: this.addCompanyData.company.partnerInfoID,
        };
        console.log(companyInfo.Status);
        if (companyInfo.CompanyName === '' ||
            companyInfo.ContactPersonFullName === '' ||
            companyInfo.ContactPersonPhoneNumber === '' ||
            companyInfo.ContactPersonCompanyState === '' ||
            companyInfo.CityID === 0 ||
            companyInfo.PartnerInfoID === 0 ||
            companyInfo.Status === 0
        ) {
            
        } else {
            if (this.addCompanyData.companyInfo.file !== undefined && this.addCompanyData.companyInfo.file !== null) {
                // добавляем информацию о компании и получаем обратно ее айди
                const companyID = await companyAPI.AddNewCompanyInfo(companyInfo);

                // закачиваем документ на сервер
                docAPI.AddNewDocument(this.addCompanyData.companyInfo.file);

                // формируем объект с информацией о документе для отправки на сервер
                const documentInfo: DocumentInfo = {
                    DocumentID: 0,
                    DocumentName: this.addCompanyData.companyInfo.file.name,
                    PartnerInfoID: this.addCompanyData.company.partnerInfoID,
                    CompanyID: companyID.companyID,
                    DocumentStatus: DocumentStatus.MATCHING,
                };

                // отправляем информацию о документе на сервер
                docAPI.AddNewDocumentInfo(documentInfo);


            }
            // скрываем модалку добавления компании
            this.modalCompanyCreateState = false;
            // обновляем сурсу
            this.companiesSource = await companyAPI.GetCompanies();
        }
    }

    public async AddNewMyCompany() {
        // объявляем переменные API
        const cityAPI = new CityAPI();
        const companyAPI = new CompanyApi();
        const docAPI = new DocumentAPI();
        // добавляем компанию и получаем companyID для добавления информации о документе в базу данных
        const companyInfo: CompanyInfo = {
            CompanyID: 0,
            CompanyName: this.addCompanyData.company.companyName,
            ContactPersonFullName: this.addCompanyData.company.contactPersonFullName,
            ContactPersonPhoneNumber: this.addCompanyData.company.contactPersonPhoneNumber,
            ContactPersonCompanyState: this.addCompanyData.company.contactPersonCompanyState,
            Status: this.addCompanyData.company.status,
            CityID: this.addCompanyData.company.cityID,
            PartnerInfoID: this.userPartnerInfo.partnerInfoID,
        };
        if (companyInfo.CompanyName === '' ||
            companyInfo.ContactPersonFullName === '' ||
            companyInfo.ContactPersonPhoneNumber === '' ||
            companyInfo.ContactPersonCompanyState === '' ||
            companyInfo.CityID === 0 ||
            companyInfo.Status === 0
        ) {
            
        } else {
            // добавляем информацию о компании и получаем обратно ее айди
            const companyID = await companyAPI.AddNewCompanyInfo(companyInfo);
            if (this.addCompanyData.companyInfo.file !== undefined && this.addCompanyData.companyInfo.file !== null) {
                // закачиваем документ на сервер
                docAPI.AddNewDocument(this.addCompanyData.companyInfo.file);

                // формируем объект с информацией о документе для отправки на сервер
                const documentInfo: DocumentInfo = {
                    DocumentID: 0,
                    DocumentName: this.addCompanyData.companyInfo.file.name,
                    PartnerInfoID: this.userPartnerInfo.partnerInfoID,
                    CompanyID: companyID.companyID,
                    DocumentStatus: DocumentStatus.MATCHING,
                };

                // отправляем информацию о документе на сервер
                docAPI.AddNewDocumentInfo(documentInfo);
            }
            // скрываем модалку добавления компании
            this.modalMyCompanyCreateState = false;
            // обновляем сурсу
            this.companiesSource = await companyAPI.GetPartnerCompanies(this.userPartnerInfo.partnerInfoID);
        }
    }

    public async AddNewPartner() {
        // переменные для работы с API
        const userAPI = new UserAPI();
        const partnerAPI = new PartnerInfoApi();
        if (this.addPartnerData.user.UserName === '' ||
            this.addPartnerData.user.PasswordHash === '' ||
            this.addPartnerData.partnerInfo.CompanyName === '' ||
            this.addPartnerData.partnerInfo.FullName === '' ||
            this.addPartnerData.partnerInfo.CompanyState === '' ||
            this.addPartnerData.partnerInfo.PhoneNumber === '' ||
            this.addPartnerData.partnerInfo.CityID === 0
        ) {

        } else {
            // формирование юзера для отправки
            const newUser = new User(
                0,
                this.addPartnerData.user.UserName,
                this.addPartnerData.user.PasswordHash,
                this.addPartnerData.user.Role,
            );
            // отправка юзера на бек
            const user = await userAPI.AddUserInfo(newUser);
            if (user === undefined || user === null) {
                alert('Возникла ошибка!');
            } else {
                const newPartner = new PartnerInfo(
                    0,
                    this.addPartnerData.partnerInfo.CompanyName,
                    this.addPartnerData.partnerInfo.FullName,
                    this.addPartnerData.partnerInfo.CompanyState,
                    this.addPartnerData.partnerInfo.PhoneNumber,
                    user.userID,
                    this.addPartnerData.partnerInfo.CityID,
                );
                await partnerAPI.AddPartnerInfo(newPartner);
                this.partnersSource = await partnerAPI.GetPartners();
                this.modalPartnerCreateState = false;
            }
        }
    }

    public async CreatePartnerValueUpdate(value: string, itemName: string) {

        switch (itemName) {
            case 'partnerLoginEdit':
                this.ModalCreateSource.components![0].errorText = FormErrors.SINGLE_EMPTY;
                if (value.length === 0) {
                    this.ModalCreateSource.components![0].error = true;
                } else {
                    this.ModalCreateSource.components![0].error = false;
                    let check = false;
                    for (let i = 0; i < value.length; i++) {
                        if (RusAlph.indexOf(value[i]) !== -1) {
                            check = true;
                        }
                    }
                    this.ModalCreateSource.components![0].errorText = check ? FormErrors.RUS_CHARS : FormErrors.SINGLE_EMPTY;
                    this.ModalCreateSource.components![0].error = check;
                }
                this.addPartnerData.user.UserName = value;
                break;
            case 'partnerPasswordEdit':
                this.ModalCreateSource.components![1].error = value.length === 0;
                this.addPartnerData.user.PasswordHash = value;
                break;
            case 'partnerCompanyNameEdit':
                this.ModalCreateSource.components![2].error = value.length === 0;
                this.addPartnerData.partnerInfo.CompanyName = value;
                break;
            case 'partnerFullNameEdit':
                this.ModalCreateSource.components![3].error = value.length === 0;
                this.addPartnerData.partnerInfo.FullName = value;
                break;
            case 'partnerCompanyStateEdit':
                this.ModalCreateSource.components![4].error = value.length === 0;
                this.addPartnerData.partnerInfo.CompanyState = value;
                break;
            case 'partnerPhoneEdit':
                this.ModalCreateSource.components![5].error = value.length === 0;
                this.addPartnerData.partnerInfo.PhoneNumber = value;
                break;
            case 'partnerCityEdit':
                this.ModalCreateSource.components![6].error = parseInt(value) === 0;
                if (parseInt(value) != 0) {
                    const cityAPI = new CityAPI();
                    const cities = await cityAPI.GetCities();
                    this.addPartnerData.partnerInfo.CityID = parseInt(cities[parseInt(value) - 1].cityID);
                }
                break;

        }

    }

    public async CreateCompanyValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'companyNameEdit':
                if (value.length === 0) {
                    this.ModalCreateSource.components![0].error = true;
                } else {
                    this.ModalCreateSource.components![0].error = false;
                }
                this.addCompanyData.company.companyName = value;
                break;
            case 'companyPersonFullNameEdit':
                if (value.length === 0) {
                    this.ModalCreateSource.components![1].error = true;
                } else {
                    this.ModalCreateSource.components![1].error = false;
                }
                this.addCompanyData.company.contactPersonFullName = value;
                break;
            case 'companyPersonPhoneNumberEdit':
                if (value.length === 0) {
                    this.ModalCreateSource.components![2].error = true;
                } else {
                    this.ModalCreateSource.components![2].error = false;
                }
                this.addCompanyData.company.contactPersonPhoneNumber = value;
                break;
            case 'companyPersonState':
                if (value.length === 0) {
                    this.ModalCreateSource.components![3].error = true;
                } else {
                    this.ModalCreateSource.components![3].error = false;
                }
                this.addCompanyData.company.contactPersonCompanyState = value;
                break;
            case 'companyCity':
                if (parseInt(value) != 0) {
                    this.ModalCreateSource.components![4].error = false;
                    const cityAPI = new CityAPI();
                    const cities = await cityAPI.GetCities();
                    this.addCompanyData.company.cityID = cities[parseInt(value) - 1].cityID;
                } else {
                    this.ModalCreateSource.components![4].error = true;
                }
                break;
            case 'companyPartner':
                this.addCompanyData.companyInfo.partner = parseInt(value);
                if (parseInt(value) != 0) {
                    this.ModalCreateSource.components![5].error = false;
                    const partnerAPI = new PartnerInfoApi();
                    const partners = await partnerAPI.GetPartners();
                    this.addCompanyData.company.partnerInfoID = parseInt(partners[parseInt(value) - 1].partnerInfo.partnerInfoID);
                } else {
                    this.ModalCreateSource.components![5].error = true;
                }
                break;
            case 'companyStatus':
                if (parseInt(value) === 0) {
                    this.ModalCreateSource.components![7].error = true;
                } else {
                    this.ModalCreateSource.components![7].error = false;
                }
                if (parseInt(value) != -1) {
                    this.addCompanyData.company.status = this.CompanyStatuses[parseInt(value)].id;
                }
                break;
            case 'companyDocument':
                this.addCompanyData.companyInfo.file = value[0];
                break;
            default:
                break;
        }
    }

    /**
     * partnerCompanyGridAction
     */
    public async partnerCompanyGridAction(elem: any, event: string) {
        const docAPI = new DocumentAPI();
        const companyAPI = new CompanyApi();
        switch (event) {
            case 'create':
                const cityAPI = new CityAPI();
                const cities = await cityAPI.GetCities();
                const cSO: Array<{ id: number, title: string }> = [];
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
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonFullNameEdit', // for emit
                            title: 'Контактное лицо',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonPhoneNumberEdit', // for emit
                            title: 'Тел.',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonState', // for emit
                            title: 'Должность',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyCity', // for emit
                            title: 'Город',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
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
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            selectOptions: this.CompanyStatuses,
                            type: FormType.SELECTBOX,
                        },
                    ],
                };
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
                };
                this.selectedCompanyDocuments = await docAPI.GetCompanyDocs(elem.companyID);
                this.modalMyCompanyInfoState = true;
                break;
            case 'delete':
                let response = await docAPI.RemoveDocumentInfo(elem.companyID);
                console.log(response);
                response = await companyAPI.RemoveCompany(elem.companyID);
                console.log(response);

                this.companiesSource = await companyAPI.GetPartnerCompanies(this.userPartnerInfo.partnerInfoID);
                break;
            case 'edit':
                // РЕДАКТИРОВАНИЕ КОМПАНИИ
                // создание переменных для взаимодействия с API
                const _cityAPI = new CityAPI();
                const _cities = await _cityAPI.GetCities();
                // переменная для сохранения выбранного города
                let savedCity = 0;
                // формирование selectOptions для городов
                const _cSO: Array<{ id: number, title: string }> = [];
                _cSO.push({ id: 0, title: 'Выберите город...' });
                for (let index = 0; index < _cities.length; index++) {
                    // добавление города в список selectOptions
                    _cSO.push({ id: _cities[index].cityID, title: _cities[index].cityName });
                    // сохраняем город, который стоит у этой компании в базе данных
                    if (_cities[index].cityID === elem.cityID) {
                        savedCity = index;
                    }
                }
                // переменная для сохранения партнера, к которому принадлежит выбранная компания
                let savedPartner = 0;
                // формирование selectOptions для выбора партнера
                this.partnersOptions = [];
                this.partnersOptions.push({ id: 0, title: 'Выберите партнера...' });
                for (const i in this.partnersSource) {
                    // формирование заголовков, которые будут показаны в selectbox
                    const _title = this.partnersSource[i].partnerInfo.companyName + ' - '
                        + this.partnersSource[i].partnerInfo.fullName + ' - '
                        + this.partnersSource[i].partnerInfo.companyState + ' - '
                        + this.partnersSource[i].city;
                    // сохранение в специальный список selectOptions
                    this.partnersOptions.push(
                        {
                            id: Number.parseInt(i),
                            title: _title,
                        },
                    );
                    // сохранение индекса партнера, к которому принадлежит выбранная компания
                    if (this.partnersSource[i].partnerInfo.partnerInfoID === elem.partnerInfoID) {
                        savedPartner = parseInt(i);
                    }
                }
                // формирование структуры отображения модального окна
                this.ModalCreateSource = {
                    title: 'Изменение компании',
                    components: [
                        {
                            name: 'companyNameEdit', // for emit
                            title: 'Название компании',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.companyName,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonFullNameEdit', // for emit
                            title: 'Контактное лицо',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.contactPersonFullName,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonPhoneNumberEdit', // for emit
                            title: 'Тел.',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.contactPersonPhoneNumber,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonState', // for emit
                            title: 'Должность',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.contactPersonCompanyState,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyCity', // for emit
                            title: 'Город',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: new String(savedCity + 1),
                            selectOptions: _cSO,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'companyStatus', // for emit
                            title: 'Статус',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: new String(elem.status + 1),
                            selectOptions: this.CompanyStatuses,
                            type: FormType.SELECTBOX,
                        },
                    ],
                };
                // сохранение выранной компании
                this.UpdateCompanyData.company.companyID = elem.companyID;
                this.UpdateCompanyData.company.companyName = elem.companyName;
                this.UpdateCompanyData.company.contactPersonFullName = elem.contactPersonFullName;
                this.UpdateCompanyData.company.contactPersonPhoneNumber = elem.contactPersonPhoneNumber;
                this.UpdateCompanyData.company.contactPersonCompanyState = elem.contactPersonCompanyState;
                this.UpdateCompanyData.company.status = elem.status;
                this.UpdateCompanyData.company.cityID = elem.cityID;
                this.UpdateCompanyData.company.partnerInfoID = elem.partnerInfoID;

                // открытие модалки
                this.modalCompanyEditState = true;
                break;
            default:
                break;
        }
    }

    public async CreatePartnerCompanyValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'companyNameEdit':
                this.ModalCreateSource.components![0].error = value.length === 0;
                this.addCompanyData.company.companyName = value;
                break;
            case 'companyPersonFullNameEdit':
                this.ModalCreateSource.components![1].error = value.length === 0;
                this.addCompanyData.company.contactPersonFullName = value;
                break;
            case 'companyPersonPhoneNumberEdit':
                this.ModalCreateSource.components![2].error = value.length === 0;
                this.addCompanyData.company.contactPersonPhoneNumber = value;
                break;
            case 'companyPersonState':
                this.ModalCreateSource.components![3].error = value.length === 0;
                this.addCompanyData.company.contactPersonCompanyState = value;
                break;
            case 'companyCity':
                this.ModalCreateSource.components![4].error = parseInt(value) === 0;
                if (parseInt(value) != 0) {
                    console.log(value);
                    const cityAPI = new CityAPI();
                    const cities = await cityAPI.GetCities();
                    console.log(cities);
                    this.addCompanyData.company.cityID = cities[parseInt(value) - 1].cityID;
                    console.log(this.addCompanyData.company.cityID);
                }
                break;
            case 'companyStatus':
                this.ModalCreateSource.components![6].error = parseInt(value) === 0;
                if (parseInt(value) != -1) {
                    this.addCompanyData.company.status = this.CompanyStatuses[parseInt(value)].id;
                }
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
                // СОЗДАНИЕ КОНПАНИИ
                // создаем переменные для взаимодействия с API
                const cityAPI = new CityAPI();
                const partnerAPI = new PartnerInfoApi();
                // получение актуального списка партнеров
                this.partnersSource = await partnerAPI.GetPartners();
                // получение актуального списка городов
                const cities = await cityAPI.GetCities();
                // формирование selectOpstions из городов
                const cSO: Array<{ id: number, title: string }> = [];
                cSO.push({ id: 0, title: 'Выберите город...' });
                for (let index = 0; index < cities.length; index++) {
                    cSO.push({ id: cities[index].cityID, title: cities[index].cityName });
                }
                // выборка партнеров для селектора партнеров
                this.partnersOptions = [];
                this.partnersOptions.push({ id: 0, title: 'Выберите партнера...' });
                for (const i in this.partnersSource) {
                    // формирование заголовков партнеров для комбобокса
                    const _title = this.partnersSource[i].partnerInfo.companyName + ' - '
                        + this.partnersSource[i].partnerInfo.fullName + ' - '
                        + this.partnersSource[i].partnerInfo.companyState + ' - '
                        + this.partnersSource[i].city;
                    // сохраняем данные в специальный массив
                    this.partnersOptions.push(
                        {
                            id: Number.parseInt(i),
                            title: _title,
                        },
                    );
                }
                // задаем порядок и содержание для отображения модального окна
                this.ModalCreateSource = {
                    title: 'Добавление компании',
                    components: [
                        {
                            name: 'companyNameEdit',
                            title: 'Название компании',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonFullNameEdit',
                            title: 'Контактное лицо',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonPhoneNumberEdit',
                            title: 'Тел.',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonState',
                            title: 'Должность',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyCity',
                            title: 'Город',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            selectOptions: cSO,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'companyPartner',
                            title: 'Партнер',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            selectOptions: this.partnersOptions,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'companyDocument',
                            title: 'Документ',
                            type: FormType.FILEBOX,
                        },
                        {
                            name: 'companyStatus',
                            title: 'Статус',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            selectOptions: this.CompanyStatuses,
                            type: FormType.SELECTBOX,
                        },
                    ],
                };
                // делаем видимой модалку
                this.modalCompanyCreateState = true;
                break;
            case 'select':
                // ПРОСМОТР КОМПАНИИ
                // создание переменных для взаимодействия с API
                const docAPI = new DocumentAPI();
                // задание структуры модального окна
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
                };
                // получение списка документов для просматриваемой компании
                this.selectedCompanyDocuments = await docAPI.GetCompanyDocs(elem.company.companyID);
                // показываем модалку
                this.modalCompanyInfoState = true;
                break;

            case 'edit':
                // РЕДАКТИРОВАНИЕ КОМПАНИИ
                // создание переменных для взаимодействия с API
                const _cityAPI = new CityAPI();
                const _cities = await _cityAPI.GetCities();

                // переменная для сохранения выбранного города
                let savedCity = 0;
                // формирование selectOptions для городов
                const _cSO: Array<{ id: number, title: string }> = [];
                _cSO.push({ id: 0, title: 'Выберите город...' });
                for (let index = 0; index < _cities.length; index++) {
                    // добавление города в список selectOptions
                    _cSO.push({ id: _cities[index].cityID, title: _cities[index].cityName });
                    // сохраняем город, который стоит у этой компании в базе данных
                    if (_cities[index].cityID === elem.company.cityID) {
                        savedCity = index;
                    }
                }
                // переменная для сохранения партнера, к которому принадлежит выбранная компания
                let savedPartner = 0;
                // формирование selectOptions для выбора партнера
                this.partnersOptions = [];
                this.partnersOptions.push({ id: 0, title: 'Выберите партнера...' });
                for (const i in this.partnersSource) {
                    // формирование заголовков, которые будут показаны в selectbox
                    const _title = this.partnersSource[i].partnerInfo.companyName + ' - '
                        + this.partnersSource[i].partnerInfo.fullName + ' - '
                        + this.partnersSource[i].partnerInfo.companyState + ' - '
                        + this.partnersSource[i].city;
                    // сохранение в специальный список selectOptions
                    this.partnersOptions.push(
                        {
                            id: Number.parseInt(i),
                            title: _title,
                        },
                    );
                    // сохранение индекса партнера, к которому принадлежит выбранная компания
                    if (this.partnersSource[i].partnerInfo.partnerInfoID === elem.partnerInfo.partnerInfoID) {
                        savedPartner = parseInt(i);
                    }


                }
                // формирование структуры отображения модального окна
                this.ModalCreateSource = {
                    title: 'Изменение компании',
                    components: [
                        {
                            name: 'companyNameEdit', // for emit
                            title: 'Название компании',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.company.companyName,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonFullNameEdit', // for emit
                            title: 'Контактное лицо',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.company.contactPersonFullName,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonPhoneNumberEdit', // for emit
                            title: 'Тел.',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.company.contactPersonPhoneNumber,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyPersonState', // for emit
                            title: 'Должность',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: elem.company.contactPersonCompanyState,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'companyCity', // for emit
                            title: 'Город',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: new String(savedCity + 1),
                            selectOptions: _cSO,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'companyStatus', // for emit
                            title: 'Статус',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: new String(elem.company.status + 1),
                            selectOptions: this.CompanyStatuses,
                            type: FormType.SELECTBOX,
                        },
                    ],
                };
                // сохранение выранной компании
                this.UpdateCompanyData.company.companyID = elem.company.companyID;
                this.UpdateCompanyData.company.companyName = elem.company.companyName;
                this.UpdateCompanyData.company.contactPersonFullName = elem.company.contactPersonFullName;
                this.UpdateCompanyData.company.contactPersonPhoneNumber = elem.company.contactPersonPhoneNumber;
                this.UpdateCompanyData.company.contactPersonCompanyState = elem.company.contactPersonCompanyState;
                this.UpdateCompanyData.company.status = elem.company.status;
                this.UpdateCompanyData.company.cityID = elem.city.cityID;
                this.UpdateCompanyData.company.partnerInfoID = elem.company.partnerInfoID;

                // открытие модалки
                this.modalCompanyEditState = true;
                break;
            case 'delete':
                // создание переменных для работы с API
                const _docAPI = new DocumentAPI();
                const companyAPI = new CompanyApi();
                // удаление документов, связанных с выбранной компанией
                let response = await _docAPI.RemoveDocumentInfo(elem.company.companyID);
                // удаление компании по id выбранной компании
                response = await companyAPI.RemoveCompany(elem.company.companyID);
                // обновление списка компаний
                this.companiesSource = await companyAPI.GetCompanies();
                break;
            default:
                break;
        }
    }

    /**
     * UpdatePartnerValueUpdate
     */
    public async UpdatePartnerValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'partnerLoginEdit':
                this.ModalCreateSource.components![0].errorText = FormErrors.SINGLE_EMPTY;
                if (value.length === 0) {
                    this.ModalCreateSource.components![0].error = true;
                } else {
                    this.ModalCreateSource.components![0].error = false;
                    let check = false;
                    for (let i = 0; i < value.length; i++) {
                        if (RusAlph.indexOf(value[i]) !== -1) {
                            check = true;
                        }
                    }
                    this.ModalCreateSource.components![0].errorText = check ? FormErrors.RUS_CHARS : FormErrors.SINGLE_EMPTY;
                    this.ModalCreateSource.components![0].error = check;
                }
                this.addPartnerData.user.UserName = value;
                break;
            case 'partnerCompanyNameEdit':
                this.ModalCreateSource.components![1].error = value.length === 0;
                this.addPartnerData.partnerInfo.CompanyName = value;
                break;
            case 'partnerFullNameEdit':
                this.ModalCreateSource.components![2].error = value.length === 0;
                this.addPartnerData.partnerInfo.FullName = value;
                break;
            case 'partnerCompanyStateEdit':
                this.ModalCreateSource.components![3].error = value.length === 0;
                this.addPartnerData.partnerInfo.CompanyState = value;
                break;
            case 'partnerPhoneEdit':
                this.ModalCreateSource.components![4].error = value.length === 0;
                this.addPartnerData.partnerInfo.PhoneNumber = value;
                break;
            case 'partnerCityEdit':
                this.ModalCreateSource.components![5].error = parseInt(value) === 0;
                if (parseInt(value) != 0) {
                    const cityAPI = new CityAPI();
                    const cities = await cityAPI.GetCities();
                    this.addPartnerData.partnerInfo.CityID = parseInt(cities[parseInt(value) - 1].cityID);
                }
                break;
        }
    }

    /**
     * UpdatePartner
     */
    public async UpdatePartner() {
        let userAPI = new UserAPI();
        let partnerAPI = new PartnerInfoApi();
        if (this.addPartnerData.user.UserName === '' ||
            this.addPartnerData.partnerInfo.CompanyName === '' ||
            this.addPartnerData.partnerInfo.FullName === '' ||
            this.addPartnerData.partnerInfo.CompanyState === '' ||
            this.addPartnerData.partnerInfo.PhoneNumber === ''
        ) {
            
        } else {
            let user = new User(this.addPartnerData.user.UserID, this.addPartnerData.user.UserName, '', UserRoles.PARTNER);
            let response = await userAPI.PatchUserInfo(user);
            console.log(response);
            let partnerInfo = new PartnerInfo(this.addPartnerData.partnerInfo.PartnerInfoID,
                this.addPartnerData.partnerInfo.CompanyName,
                this.addPartnerData.partnerInfo.FullName,
                this.addPartnerData.partnerInfo.CompanyState,
                this.addPartnerData.partnerInfo.PhoneNumber,
                undefined,
                this.addPartnerData.partnerInfo.CityID
            );
            response = await partnerAPI.PatchPartnerInfo(partnerInfo);
            console.log(response);

            this.modalPartnerEditState = false;
            this.partnersSource = await partnerAPI.GetPartners();
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
                            title: 'Логин', 
                            text: elem.user.userName,
                            type: FormType.LABELBOX,
                        },
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
                };
                this.modalPartnerInfoState = true;
                const companyAPI = new CompanyApi();
                this.partnerCompanies = await companyAPI.GetPartnerCompanies(elem.partnerInfo.partnerInfoID);
                const cAPI = new CityAPI();
                const _cities = await cAPI.GetCities();
                for (let i = 0; i < this.partnerCompanies.length; i++) {
                    for (let j = 0; j < _cities.length; j++) {
                        if (_cities[j].cityID === this.partnerCompanies[i].CityID) {
                            this.partnerCompanies[i];
                        }
                    }
                }
                // let cityInfo = cAPI.GetCityByID();
                console.log(this.partnerCompanies);

                break;
            case 'create':
                console.log('creating');
                const cityAPI = new CityAPI();
                const cities = await cityAPI.GetCities();
                const cSO: Array<{ id: number, title: string }> = [];
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
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            required: true,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerPasswordEdit', // for emit
                            title: 'Пароль',
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            required: true,
                            inputMethod: 'password',
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCompanyNameEdit', // for emit
                            title: 'Название компании',
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            required: true,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerFullNameEdit', // for emit
                            title: 'ФИО',
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            required: true,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCompanyStateEdit', // for emit
                            title: 'Должность',
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            required: true,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerPhoneEdit', // for emit
                            title: 'Телефон',
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            required: true,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCityEdit', // for emit
                            title: 'Город',
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            required: true,
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
                };
                this.modalPartnerCreateState = true;
                break;
            case 'edit':
                console.log(elem);
                const _cityAPI = new CityAPI();
                const cs = await _cityAPI.GetCities();
                let savedCity = 0;
                // формирование selectOptions для городов
                const _cSO: Array<{ id: number, title: string }> = [];
                _cSO.push({ id: 0, title: 'Выберите город...' });
                for (let index = 0; index < cs.length; index++) {
                    // добавление города в список selectOptions
                    _cSO.push({ id: cs[index].cityID, title: cs[index].cityName });
                    // сохраняем город, который стоит у этой компании в базе данных
                    if (cs[index].cityID === elem.partnerInfo.cityID) {
                        savedCity = index;
                    }
                }
                this.ModalCreateSource = {
                    title: 'Изменение партнера',
                    components: [
                        {
                            name: 'partnerLoginEdit', // for emit
                            title: 'Логин',
                            error: false,
                            errorText: 'Заполните полe!',
                            required: true,
                            text: elem.user.userName,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCompanyNameEdit', // for emit
                            title: 'Название компании',
                            error: false,
                            errorText: 'Заполните полe!',
                            required: true,
                            text: elem.partnerInfo.companyName,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerFullNameEdit', // for emit
                            title: 'ФИО',
                            error: false,
                            errorText: 'Заполните полe!',
                            required: true,
                            text: elem.partnerInfo.fullName,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCompanyStateEdit', // for emit
                            title: 'Должность',
                            error: false,
                            errorText: 'Заполните полe!',
                            text: elem.partnerInfo.companyState,
                            required: true,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerPhoneEdit', // for emit
                            title: 'Телефон',
                            error: false,
                            errorText: 'Заполните полe!',
                            text: elem.partnerInfo.phoneNumber,
                            required: true,
                            type: FormType.INPUTBOX,
                        },
                        {
                            name: 'partnerCityEdit', // for emit
                            title: 'Город',
                            required: true,
                            error: false,
                            errorText: 'Заполните полe!',
                            text: new String(savedCity + 1),
                            selectOptions: _cSO,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'partnerRoleLbl', // for emit
                            title: 'Роль',
                            text: 'Партнер',
                            type: FormType.LABELBOX,
                        },
                    ],
                };

                this.addPartnerData.user.UserID = elem.user.userID;
                this.addPartnerData.user.UserName = elem.user.userName;
                this.addPartnerData.partnerInfo.CompanyName = elem.partnerInfo.companyName;
                this.addPartnerData.partnerInfo.FullName = elem.partnerInfo.fullName;
                this.addPartnerData.partnerInfo.CompanyState = elem.partnerInfo.companyState;
                this.addPartnerData.partnerInfo.PhoneNumber = elem.partnerInfo.phoneNumber;
                this.addPartnerData.partnerInfo.CityID = elem.partnerInfo.cityID;
                this.addPartnerData.partnerInfo.PartnerInfoID = elem.partnerInfo.partnerInfoID;

                this.modalPartnerEditState = true;
                break;
            case 'delete':
                console.log(elem);
                const _partnerAPI = new PartnerInfoApi();
                const _userAPI = new UserAPI();
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

        window.open('https://a100.technovik.ru:3005/api/document/download?name=' + item.documentName, '_newtab');


    }

    /**
     * CreateDocumentValueUpdate
     */
    public async CreateDocumentValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'documentFileBox':
                this.ModalCreateSource.components![0].error = value.length === 0;
                this.NewFile = value[0];
                break;

            case 'documentCompanySB':
                this.ModalCreateSource.components![1].error = parseInt(value) === 0;
                if (parseInt(value) !== 0) {
                    const companyAPI = new CompanyApi();
                    const companies = await companyAPI.GetPartnerCompanies(this.userPartnerInfo.partnerInfoID);
                    this.AddDocumentSource.CompanyID = companies[parseInt(value) - 1].companyID;
                }
                break;

            case 'documentStatusSB':
                this.ModalCreateSource.components![2].error = parseInt(value) === 0;
                const id = parseInt(value) - 1;
                this.AddDocumentSource.DocumentStatus = id;

                break;

            default:
                break;
        }
    }

    /**
     * documentWork
     */
    public documentWork(elem: any, event: string) {
        const companiesSelectOption: Array<{ id: number, title: string }> = [];
        const companies: any = this.companiesSource;
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
                    title: 'Добавление документа',
                    components: [
                        {
                            name: 'documentFileBox',
                            title: 'Документ',
                            required: true,
                            error: true,
                            errorText: FormErrors.FILE_EMPTY,
                            type: FormType.FILEBOX, // type file
                        },
                        {
                            name: 'documentCompanySB',
                            title: 'Компания',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            selectOptions: companiesSelectOption,
                            type: FormType.SELECTBOX,
                        },
                        {
                            name: 'documentStatusSB',
                            title: 'Статус документа',
                            required: true,
                            error: true,
                            errorText: FormErrors.SINGLE_EMPTY,
                            selectOptions: this.DocsStatuses,
                            type: FormType.SELECTBOX,
                        },
                    ],
                };

                this.modalMyDocumentCreateState = true;
                break;
            case 'delete':

                break;

            case 'edit':
                this.ModalCreateSource = {
                    title: 'Изменение документа',
                    components: [
                        {
                            name: 'documentStatusSB',
                            title: 'Статус документа',
                            required: true,
                            error: false,
                            errorText: FormErrors.SINGLE_EMPTY,
                            text: new String(elem.documentStatus + 1),
                            selectOptions: this.DocsStatuses,
                            type: FormType.SELECTBOX,
                        },
                    ],
                };
                this.AddDocumentSource.DocumentID = elem.documentID;
                this.AddDocumentSource.DocumentStatus = elem.documentStatus;
                this.modalMyDocEditState = true;
                break;

            default:
                break;
        }
    }

    /**
     * UpdateDocument
     */
    public async UpdateDocument() {
        const docApi = new DocumentAPI();

        if (this.AddDocumentSource.DocumentStatus === -1) {
            
        } else {
            const response = await docApi.PatchDocumentInfo(this.AddDocumentSource.DocumentID, this.AddDocumentSource.DocumentStatus);

            this.modalMyDocEditState = false;
            this.documentsSource = await docApi.GetPartnerDocs(this.userPartnerInfo.partnerInfoID);
        }
    }

    /**
     * Update
     */
    public UpdateDocumentValueUpdate(value: string, itemName: string) {
        switch (itemName) {
            case 'documentStatusSB':
                this.ModalCreateSource.components![0].error = parseInt(value) === 0;
                const id = parseInt(value) - 1;
                this.AddDocumentSource.DocumentStatus = id;
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
                if (this.NewFile === null || this.NewFile === undefined || this.AddDocumentSource.CompanyID === 0 || this.AddDocumentSource.DocumentStatus === 0) {
                    
                } else {
                    const docApi = new DocumentAPI();
                    const companies: any = this.companiesSource;

                    this.AddDocumentSource.DocumentName = this.NewFile.name;
                    this.AddDocumentSource.PartnerInfoID = this.userPartnerInfo.partnerInfoID;

                    docApi.AddNewDocument(this.NewFile);
                    docApi.AddNewDocumentInfo(this.AddDocumentSource);

                    this.documentsSource = await docApi.GetPartnerDocs(this.userPartnerInfo.partnerInfoID);

                    this.modalMyDocumentCreateState = false;
                }
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
