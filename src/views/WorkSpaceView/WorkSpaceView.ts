import { Component, Prop, Vue } from  'vue-property-decorator';
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

@Component({ components: { SideBar, ContentBar, ModalView } })
export default class WorkSpaceView extends Vue {
    public user!: UserLoginDTOResponse;
    public partnerInfo!: any;
    public role: number = 0;
    public adminContentState: string = 'partners';
    public partnerContentState: string= 'mycompanies';
    public partnersSource: IGetPartnersDTO[] = [];
    public companiesSource: ICompanyListingDTO[] = [];
    public partnerCompaniesSource: IMyCompaniesListingDTO[] = [];
    public modalState: boolean = true;
    public ModalInformSource: IModalInformSource = {
        title: 'Информация',
        description: 'Информация',
    }
    

    public PartnerSideBarSource: ISideBarSource[] = [
        {
           name: 'mycompanies',
           title: 'Мои компании',
           href: ''
        },
        {
            name: 'mydocuments',
            title: 'Мои документы',
            href: ''
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
    ]

    /**
     * partnerLinkAction
     */
    public async partnerLinkAction(link: string) {
        
        if (link === 'mycompanies') {
            // загрузка контента
            let companyAPI = new CompanyApi();
            // this.companiesSource = await companyAPI.GetPartnerCompanies();
            // console.log(this.partnerInfo);

        } else if (link === 'mydocuments') {
            // загрузка контента
        }
        
        this.partnerContentState = link;
    }

    /**
     * adminLinkAction
     */
    public async adminLinkAction(link: string) {
        
        if (link === 'partners') {
            // загрузка контента
            let partnerAPI = new PartnerInfoApi();
            this.partnersSource = await partnerAPI.GetPartners();
            // console.log(this.partnersSource);
        } else if (link === 'companies') {
            // загрузка контента
            let companyAPI = new CompanyApi();
            this.companiesSource = await companyAPI.GetCompanies();
            console.log(this.companiesSource);
        } else if (link === 'documents') {
            // загрузка контента
        } else if (link === 'cities') {
            // загрузка контента
        }
        
        this.adminContentState = link;
    }
    
    
    
    public async mounted() {
        /*
        if (UserInfo.UserAuth === null || UserInfo.UserAuth === undefined) {
            router.push('login');
        }
        */
       
       if (localStorage.user_auth_status === 0 || localStorage.user_auth_status === null || localStorage.user_auth_status === undefined) {
           router.push('login');
       } else {
           let data = JSON.parse(localStorage.user);
           // console.log(data);
           this.user = new UserLoginDTOResponse(
               new User(
                   data.user.userID,
                   data.user.userName,
                   data.user.passwordHash,
                   data.user.role
                ),
                data.status
           );
           
            this.role = this.user.User.Role;
            let partnerAPI = new PartnerInfoApi();
            let companyAPI = new CompanyApi();
            this.companiesSource = await companyAPI.GetCompanies();
            this.partnersSource = await partnerAPI.GetPartners();
            console.log(this.partnersSource);
            if (data.user.role === 0) {
                this.partnerInfo = await partnerAPI.GetPartnerInfoByUserID(data.user.userID);
                this.partnerCompaniesSource = await companyAPI.GetPartnerCompanies(this.partnerInfo.partnerInfoID);
                console.log(this.partnerCompaniesSource);
            }

       }

    }
}