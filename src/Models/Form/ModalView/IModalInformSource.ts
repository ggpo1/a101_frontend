import FormType from '@/Models/FormType';

interface IModalEditSourceComponent {
    name: string; // for emit
    title: string;
    text?: any;
    inputMethod?: string;
    type: FormType;
    selectOptions?: Array<{
        id: number,
        title: string,
    }>;
    hasHint?: boolean;
    required?: boolean;
    error?: boolean;
    errorText?: string;
}

interface IModalInformSource {
    title: string;
    description?: string;
    components?: IModalEditSourceComponent[];
}

export default IModalInformSource;
