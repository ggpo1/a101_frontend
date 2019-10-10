import FormType from '@/Models/FormType';

interface IModalEditSourceComponent {
    name: string, // for emit
    title: string,
    text?: string,
    inputMethod?: string,
    type: FormType,
    selectOptions?: Array<{
        id: number,
        title: string,
    }>,
}

interface IModalInformSource {
    title: string,
    description?: string,
    components?: IModalEditSourceComponent[],
}

export default IModalInformSource;