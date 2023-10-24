interface Campaign {
  information: CampaignInfo;
  subCampaigns: SubCampaign[];
}

interface CampaignInfo {
  name: string;
  describe?: string;
}

interface SubCampaign {
  name: string;
  status: boolean;
  ads: Advertisement[];
}

interface Advertisement {
  name: string;
  quantity: number;
}

interface AdvertisementContext extends Advertisement {
  id: number;
  nameError: string;
  quantityError: string;
}
type CampaignInfoContext = CampaignInfo & Error;
interface SubCampaignContext extends Omit<SubCampaign, "ads">, Error {
  id: number;
  ads: AdvertisementContext[];
}
interface CampaignContext {
  information: CampaignInfoContext;
  subCampaigns: SubCampaignContext[];
  activeSubCamp: number;
  validated: boolean;
  hasError: boolean;
}

interface Error {
  error: string;
}

export type {
  Campaign,
  CampaignInfo,
  SubCampaign,
  Advertisement,
  Error,
  CampaignContext,
  AdvertisementContext,
  CampaignInfoContext,
  SubCampaignContext,
};
