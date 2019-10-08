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

@Component({ components: { SideBar, ContentBar, ModalView } })
export default class WorkSpaceView extends Vue {
    public user!: UserLoginDTOResponse;
    public role: number = 0;
    public contentState: string = 'partners';
    public partnersSource: IGetPartnersDTO[] = [];
    public modalState: boolean = true;
    public ModalInformSource: IModalInformSource = {
        title: 'Информация',
        description: 'Информация',
    }
    

    public PartnerSideBarSource: ISideBarSource[] = [
        {
           name: '',
           title: 'Список компаний',
           href: '/mycompanies'
        },
        {
            name: '',
            title: 'Список документов',
            href: '/mydocuments'
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
    ]

    /**
     * adminLinkAction
     */
    public async adminLinkAction(link: string) {
        
        if (link === 'partners') {
            // загрузка контента
            let partnerAPI = new PartnerInfoApi();
            this.partnersSource = await partnerAPI.GetPartners();
            console.log(this.partnersSource);
        } else if (link === 'companies') {
            // загрузка контента
        } else if (link === 'documents') {
            // загрузка контента
        }
        this.contentState = link;
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
            this.partnersSource = await partnerAPI.GetPartners();
       }

    }
}