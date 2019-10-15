import DocumentStatus from '../Enums/DocumentStatus';

interface DocumentInfo {
    DocumentID: number;
    DocumentName: string;
    PartnerInfoID: number;
    CompanyID: number;
    DocumentStatus: DocumentStatus;
}

export default DocumentInfo;
