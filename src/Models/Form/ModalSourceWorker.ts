import UserRoles from '../Enums/UserRoles';
import Enity from '../Enums/Entity';
import AdminDocumentCreate from './form-declarations/Modal/AdminDocumentCreate';
import IModalInformSource from './ModalView/IModalInformSource';
import PartnerInfoApi from '@/API/PartnerInfoAPI';
import CompanyApi from '@/API/CompanyAPI';
import DocumentAPI from '@/API/DocumentAPI';
import UserAPI from '@/API/UserAPI';
import CityAPI from '@/API/CityAPI';

export default class ModalSourceWorker {
    public partnerAPI: PartnerInfoApi = new PartnerInfoApi();
    public companyAPI: CompanyApi = new CompanyApi();
    public documentAPI: DocumentAPI = new DocumentAPI();
    public userAPI: UserAPI = new UserAPI();
    public cityAPI: CityAPI = new CityAPI();

    public GetSource(role: UserRoles, entity: Enity): IModalInformSource {
        switch (role) {
            case UserRoles.ADMIN:
                switch (entity) {
                    case Enity.PARTNER: return AdminDocumentCreate;
                    case Enity.COMPANY: return AdminDocumentCreate;
                    case Enity.DOCUMENT: return AdminDocumentCreate;
                    case Enity.USER: return AdminDocumentCreate;
                    case Enity.CITY: return AdminDocumentCreate;
                }
            case UserRoles.PARTNER:
        }
        return AdminDocumentCreate;
    }

    public async getOptions(role: UserRoles, entity: Enity) {
        switch (role) {
            case UserRoles.ADMIN:
                switch (entity) {
                    case Enity.COMPANY:
                        let companies = await this.companyAPI.GetCompanies();
                        let _options = [];
                        companies.forEach(element => {
                            // доделать
                        });
                        break;
                    case Enity.COMPANY_STATUS:
                        let statuses = await this.companyAPI.GetStatuses();
                        console.log(statuses)
                        let statusOptions: Array<{ id: number, title: string }> = [];

                        for (let i = 0; i < statuses.length; i++) {
                            statusOptions.push({ id: statuses[i].companyStatusID, title: statuses[i].companyStatusName });
                        }
                        console.log(statusOptions);
                        return statusOptions;
                    default:
                        break;
                }
            default:
                break;
        }
    }
}
