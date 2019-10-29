import IModalInformSource from '../../ModalView/IModalInformSource';
import FormErrors from '@/Models/Enums/FormErrors';
import FormType from '@/Models/FormType';
import CompanyApi from '@/API/CompanyAPI';


const AdminDocumentCreate: IModalInformSource = {
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
            selectOptions: [],
            type: FormType.SELECTBOX,
        },
        {
            name: 'documentStatusSB',
            title: 'Статус документа',
            required: true,
            error: true,
            errorText: FormErrors.SINGLE_EMPTY,
            selectOptions: [],
            type: FormType.SELECTBOX,
        },
    ]
}

export default AdminDocumentCreate;
