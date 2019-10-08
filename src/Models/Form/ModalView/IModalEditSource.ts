import FormType from '@/Models/FormType';

interface IModalEditSourceComponent {
    name: string, // for emit
    title: string,
    type: FormType,
}

interface IModalEditSource {
    title: string,
    components: IModalEditSourceComponent[],
}

export default IModalEditSource;
