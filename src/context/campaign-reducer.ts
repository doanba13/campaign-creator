import { CampaignContext, SubCampaignContext } from "../model";
import {
  UPDATE_CAMP_INFO,
  NEW_SUB_CAMP,
  SELECT_CAMP,
  UPDATE_SUB_CAMP_INFO,
  ADD_NEW_ADS,
  REMOVE_ADS,
  REMOVE_SUB_CAMP,
  UPDATE_ADS_NAME,
  UPDATE_ADS_QUANTITY,
  VALIDATE,
  RESET_VALIDATE_STATUS,
} from "../utils/constants";

type SubCampIdentify = Pick<SubCampaignContext, "id">;

interface RemoveAdsPayload {
  subCampId: number;
  adsIds: number[];
}

interface UpdateAdsPayload {
  subCampId: number;
  adsId: number;
}

type UpdateAdsNamePayload = UpdateAdsPayload & { name: string };
type UpdateAdsQuantityPayload = UpdateAdsPayload & { quantity: number };

const campaignReducer = (
  campaign: CampaignContext,
  { type, ...props }: { type: string } & unknown
): CampaignContext => {
  switch (type) {
    case UPDATE_CAMP_INFO:
      return updateCampaignInformation(campaign, props);
    case NEW_SUB_CAMP:
      return addNewCampaign(campaign);
    case SELECT_CAMP:
      return selectSubCampHandler(campaign, props as SubCampaignContext);
    case UPDATE_SUB_CAMP_INFO:
      return updateSubCampaignInfo(campaign, props as SubCampaignContext);
    case ADD_NEW_ADS:
      return addNewAdvertisement(campaign, props as SubCampIdentify);
    case REMOVE_ADS:
      return removeAdvertisements(campaign, props as RemoveAdsPayload);
    case REMOVE_SUB_CAMP:
      return removeSubCampaign(campaign, props as SubCampIdentify);
    case UPDATE_ADS_NAME:
      return updateAdvertisementName(campaign, props as UpdateAdsNamePayload);
    case UPDATE_ADS_QUANTITY:
      return updateAdvertisementQuantity(
        campaign,
        props as UpdateAdsQuantityPayload
      );
    case VALIDATE:
      return validateCampaign(campaign);
    case RESET_VALIDATE_STATUS:
      return { ...campaign, validated: false, hasError: false };
    default:
      break;
  }
  return campaign;
};

const validateCampaign = (state: CampaignContext): CampaignContext => {
  let hasError = false;
  const campaign = { ...state };

  if (campaign.information.name.trim().length === 0) {
    campaign.information.error = "Vui lòng nhập tên chiến dịch";
    hasError = true;
  }

  campaign.subCampaigns.forEach((sub) => {
    if (sub.name.trim().length === 0) {
      sub.error = "Vui lòng nhập tên chiến dịch con";
      hasError = true;
    }
    sub.ads.forEach((ads) => {
      if (ads.name.trim().length === 0) {
        ads.nameError = "Vui lòng nhập tên quảng cáo";
        hasError = true;
      }
      if (ads.quantity === 0) {
        ads.quantityError = "Vui lòng nhập số lượng quảng cáo";
        hasError = true;
      }
    });
  });
  return {
    ...campaign,
    validated: !hasError,
    hasError,
  };
};

const updateCampaignInformation = (
  state: CampaignContext,
  props: Record<string, string>
): CampaignContext => {
  return {
    ...state,
    information: {
      ...state.information,
      ...props,
      error: "",
    },
  };
};

const addNewCampaign = (state: CampaignContext): CampaignContext => {
  return {
    ...state,
    subCampaigns: [
      ...state.subCampaigns,
      {
        id: Date.now(),
        name: `Chiến dịch con ${state.subCampaigns.length + 1}`,
        status: true,
        error: "",
        ads: [
          {
            id: Date.now(),
            name: "Quảng cáo 1",
            quantity: 0,
            nameError: "",
            quantityError: "",
          },
        ],
      },
    ],
  };
};

const selectSubCampHandler = (
  state: CampaignContext,
  props: SubCampaignContext
): CampaignContext => {
  return {
    ...state,
    activeSubCamp: props.id,
  };
};

const updateSubCampaignInfo = (
  state: CampaignContext,
  props: SubCampaignContext
): CampaignContext => {
  const updatedSubCamp = state.subCampaigns.map((e) =>
    e.id !== props.id ? e : props
  );
  return {
    ...state,
    subCampaigns: updatedSubCamp,
  };
};

const addNewAdvertisement = (
  state: CampaignContext,
  { id }: SubCampIdentify
): CampaignContext => {
  const campaign = { ...state };
  const subCamp = campaign.subCampaigns.find((c) => c.id === id);

  // Directly manipulate this ads because find method return object reference
  subCamp!.ads = [
    ...subCamp!.ads,
    {
      id: Date.now(),
      name: `Quảng cáo ${subCamp!.ads.length + 1}`,
      quantity: 0,
      nameError: "",
      quantityError: "",
    },
  ];
  return campaign;
};

const removeAdvertisements = (
  state: CampaignContext,
  { subCampId, adsIds }: RemoveAdsPayload
): CampaignContext => {
  const campaign = { ...state };
  const subCamp = campaign.subCampaigns.find((c) => c.id === subCampId);
  subCamp!.ads = subCamp!.ads.filter((a) => !adsIds.includes(a.id));

  return campaign;
};

const removeSubCampaign = (
  state: CampaignContext,
  { id }: SubCampIdentify
): CampaignContext => {
  return {
    ...state,
    subCampaigns: state.subCampaigns.filter((s) => s.id != id),
  };
};

// TODO: Deal with ts to find way to dynamic update Ads property
const updateAdvertisementName = (
  state: CampaignContext,
  { subCampId, adsId, name }: UpdateAdsNamePayload
): CampaignContext => {
  const campaign = { ...state };
  const ads = campaign.subCampaigns
    .find((c) => c.id === subCampId)
    ?.ads.find((a) => a.id === adsId);

  ads!.name = name;
  ads!.nameError = "";

  return campaign;
};

const updateAdvertisementQuantity = (
  state: CampaignContext,
  { subCampId, adsId, quantity }: UpdateAdsQuantityPayload
): CampaignContext => {
  const campaign = { ...state };
  const ads = campaign.subCampaigns
    .find((c) => c.id === subCampId)
    ?.ads.find((a) => a.id === adsId);

  ads!.quantity = quantity || 0;
  ads!.quantityError = "";

  return campaign;
};

export { campaignReducer };
