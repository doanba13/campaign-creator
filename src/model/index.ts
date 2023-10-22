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
  id: number;
  name: string;
  quantity: number;
  active?: boolean;
}

export type { Campaign, CampaignInfo, SubCampaign, Advertisement };
