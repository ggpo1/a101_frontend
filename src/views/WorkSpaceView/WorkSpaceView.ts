import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserInfo } from '@/Data/UserInfo';
import router from '@/router';
import UserLoginDTOResponse from '@/Models/DTO/Response/UserLoginDTOResponse';
import User from '@/Models/DataBase/User';
import UserRoles from '@/Models/Enums/UserRoles';
import UserAuthStatus from '@/Models/Enums/UserAuthStatus';
import SideBar from '@/components/page-component/SideBar';
import ContentBar from '@/components/page-component/ContentBar';
import ISideBarSource from '@/Models/Form/ISideBarSource';
import IGetPartnersDTO from '@/Models/DTO/IGetPartnersDTO';
import PartnerInfoApi from '@/API/PartnerInfoAPI';
import ModalView from '@/components/page-component/ModalView';
import ModalModeType from '@/Models/Enums/ModalModeType';
import IModalInformSource from '@/Models/Form/ModalView/IModalInformSource';
import CompanyApi from '@/API/CompanyAPI';
import ICompanyListingDTO from '@/Models/DTO/ICompanyListingDTO';
import IMyCompaniesListingDTO from '@/Models/DTO/IMyCompaniesListingDTO';
import DocumentInfo from '@/Models/DTO/DocumentInfo';
import DocumentAPI from '@/API/DocumentAPI';
import Company from '@/Models/DataBase/Company';
import AmoAPI from '@/API/AMO/AmoAPI';
import StatusAmoAPI from '@/API/AMO/StatusAmoAPI';

@Component({ components: { SideBar, ContentBar, ModalView } })
export default class WorkSpaceView extends Vue {
    public user!: UserLoginDTOResponse;
    public partnerInfo: any = {};
    public role: number = 0;
    public adminContentState: string = 'partners';
    public partnerContentState: string = 'mycompanies';
    public partnersSource: IGetPartnersDTO[] = [];
    public companiesSource: Company[] = [];
    public partnerCompaniesSource: IMyCompaniesListingDTO[] = [];
    public documentsSource: DocumentInfo[] = [];
    public modalState: boolean = true;
    public ModalInformSource: IModalInformSource = {
        title: 'Информация',
        description: 'Информация',
    };


    public PartnerSideBarSource: ISideBarSource[] = [
        {
            name: 'mycompanies',
            title: 'Мои компании',
            href: '',
        },
        {
            name: 'mydocuments',
            title: 'Мои документы',
            href: '',
        },
    ];

    public AdminSideBarSource: ISideBarSource[] = [
        {
            name: 'partners',
            title: 'Партнеры',
            href: '',
        },
        {
            name: 'companies',
            title: 'Компании',
            href: '',
        },
        {
            name: 'documents',
            title: 'Документы',
            href: '',
        },
        {
            name: 'admins',
            title: 'Администраторы',
            href: '',
        },
        {
            name: 'cities',
            title: 'Города',
            href: '',
        },
    ];

    /**
     * partnerLinkAction
     */
    public async partnerLinkAction(link: string) {

        if (link === 'mycompanies') {
            // загрузка контента
            const companyAPI = new CompanyApi();
            this.partnerCompaniesSource = await companyAPI.GetPartnerCompanies(this.partnerInfo.partnerInfoID);
        } else if (link === 'mydocuments') {
            // загрузка контента
            const docAPI = new DocumentAPI();
            this.documentsSource = await docAPI.GetPartnerDocs(this.partnerInfo.partnerInfoID);
        }

        this.partnerContentState = link;
    }

    /**
     * adminLinkAction
     */
    public async adminLinkAction(link: string) {

        if (link === 'partners') {
            // загрузка контента
            const partnerAPI = new PartnerInfoApi();
            this.partnersSource = await partnerAPI.GetPartners();
        } else if (link === 'companies') {
            // загрузка контента
            const companyAPI = new CompanyApi();
            this.companiesSource = await companyAPI.GetCompanies();
        } else if (link === 'documents') {
            // загрузка контента
            const docAPI = new DocumentAPI();
            this.documentsSource = await docAPI.GetDocs();
        } else if (link === 'cities') {
            // загрузка контента
        }

        this.adminContentState = link;
    }



    public async mounted() {
        if (localStorage.user_auth_status === 0 ||
            localStorage.user_auth_status === null ||
            localStorage.user_auth_status === undefined
        ) {
            router.push('login');
        } else {
            // объекты для работы с api
            const statusAmoAPI = new StatusAmoAPI();
            const partnerAPI = new PartnerInfoApi();
            const companyAPI = new CompanyApi();
            const docAPI = new DocumentAPI();

            // AMO MIDDLEWARE check____________
            let resp = await statusAmoAPI.UpdateStatuses();
            console.log("STATUSES UPDATE: " + resp.updated);
            
            // ________________________________

            // загрузка статусов компаний
            this.$store.commit('SET_COMPANY_STATUSES', await companyAPI.GetStatuses());

            const data = JSON.parse(localStorage.user);
            this.user = new UserLoginDTOResponse(
                new User(
                    data.user.userID,
                    data.user.userName,
                    data.user.passwordHash,
                    data.user.role,
                ),
                data.status,
            );

            this.role = this.user.User.Role;
            
            this.companiesSource = await companyAPI.GetCompanies();
            this.partnersSource = await partnerAPI.GetPartners();

            this.partnerInfo = await partnerAPI.GetPartnerInfoByUserID(data.user.userID);
            this.partnerCompaniesSource = await companyAPI.GetPartnerCompanies(this.partnerInfo.partnerInfoID);
            this.documentsSource = await docAPI.GetPartnerDocs(this.partnerInfo.partnerInfoID);
            if (this.role === 1) {
                this.documentsSource = await docAPI.GetDocs();
            }

        }

    }
}
