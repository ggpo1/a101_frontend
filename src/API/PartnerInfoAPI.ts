import PartnerInfo from "../Models/DataBase/PartnerInfo";

export default class PartnerInfoApi {
    /**
     * GetPartnerInfoByUserID
     */
    public GetPartnerInfoByUserID(): PartnerInfo {
        return new PartnerInfo(12, '123', '123', '123', '123');
    }
}