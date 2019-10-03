import FormType from './FormType';

export default class FormTypeClass {
    constructor(
        public name: string,
        public type: FormType,
        public title?: string,
        public placeHolder?: string,
        public inputMethod?: string,
        public valueProp?: any,
    ) {}
}