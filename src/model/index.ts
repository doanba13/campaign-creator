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

export type { Campaign, CampaignInfo, SubCampaign, Advertisement };
