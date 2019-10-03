import PartnerInfo from "../Models/DataBase/PartnerInfo";

export default class PartnerInfoApi {
    /**
     * GetPartnerInfoByUserID
     */
    public async GetPartnerInfoByUserID() {
        let url = 'https://localhost:44336/api/partnerinfo/GetPartnerInfoByUserID?userID=2'
        let response = await fetch(url);
        // return new PartnerInfo(12, '123', '123', '123', '123');
    }
}