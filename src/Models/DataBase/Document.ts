import DocumentStatus from '../Enums/DocumentStatus';

export default class Doc {
    constructor(
        public DocumentID: number,
        public DocumentName: string,
        public PartnerInfoID: number,
        public CompanyID: number,
        public DocumentStatus: DocumentStatus,
    ) {}
}
