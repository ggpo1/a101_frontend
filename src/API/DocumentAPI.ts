export default class DocumentAPI {
    constructor() {}

    public async AddNewDocument(file: any): Promise<any> {
        var fd = new FormData();
        fd.append('file', file); 
        return new Promise(resolve => {
            fetch('https://localhost:44336/api/document/', {
                method: 'POST',
                body: fd
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

    // https://localhost:44336/api/document/getCompanyDocs?companyID=20
    public async GetCompanyDocs(companyID: number): Promise<any> {
        return new Promise(resolve => {
            fetch('https://localhost:44336/api/document/getCompanyDocs?companyID=' + companyID, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(body => {
                resolve(body);
            });
        });
    }

}
