import DocumentInfo from '@/Models/DTO/DocumentInfo';

export default class DocumentAPI {
    constructor() {}

    // сохранение информации о документе
    public async AddNewDocumentInfo(docInfo: DocumentInfo): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/document/SaveDocInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(docInfo)
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }
    
    // загрузка документа как файла на сервер
    public async AddNewDocument(file: any): Promise<any> {
        var fd = new FormData();
        fd.append('file', file); 
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/document/', {
                method: 'POST',
                body: fd
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // получение списка всех документов
    public async GetDocs(): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/document', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // удаление информации о документе
    public async RemoveDocumentInfo(companyID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/document/' + companyID, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // получение списка документов по айди компании
    public async GetCompanyDocs(companyID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/document/getCompanyDocs?companyID=' + companyID, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // получение списка документов по айди партнера
    public async GetPartnerDocs(partnerID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/document/getPartnerDocs?partnerID=' + partnerID, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // скачивание документа
    public async Download(docName: string): Promise<any> {
        return new Promise(resolve => {
            fetch('http://192.168.50.8:44336/api/document/download?name=' + docName, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }
}
