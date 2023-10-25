import { initialCampaign, initialSubCamp } from "../context/campaign-context";
import { campaignReducer } from "../context/campaign-reducer";
import {
  AdvertisementContext,
  CampaignContext,
  SubCampaignContext,
} from "../model";
import {
  ADD_NEW_ADS,
  NEW_SUB_CAMP,
  REMOVE_ADS,
  REMOVE_SUB_CAMP,
  SELECT_CAMP,
  UPDATE_ADS_NAME,
  UPDATE_ADS_QUANTITY,
  UPDATE_CAMP_INFO,
  UPDATE_SUB_CAMP_INFO,
  VALIDATE,
} from "../utils/constants";

describe("Test campaign context reducer", () => {
  let campaignCtx: CampaignContext;

  const subCampaign: Readonly<SubCampaignContext> = {
    name: "Chiến dịch con 2",
    status: true,
    ads: [],
    error: "",
    id: 2,
  };

  const advertisement: Readonly<AdvertisementContext> = {
    id: 2,
    name: "Chiến dịch con 2",
    nameError: "",
    quantity: 0,
    quantityError: "",
  };

  beforeEach(() => {
    campaignCtx = {
      ...initialCampaign,
      subCampaigns: [{ ...initialSubCamp }],
    };
  });

  test("Receive update campaign information action - should update campaign information", () => {
    const updateNameAction = {
      type: UPDATE_CAMP_INFO,
      name: "Chiến dịch đã cập nhật",
    };
    const updateDescribeAction = {
      type: UPDATE_CAMP_INFO,
      describe: "Mô tả đã cập nhật",
    };

    const updatedNameCtx = campaignReducer(campaignCtx, updateNameAction);
    const updatedDescribeCtx = campaignReducer(
      campaignCtx,
      updateDescribeAction
    );

    expect(updatedNameCtx.information.name).toBe(updateNameAction.name);
    expect(updatedDescribeCtx.information.describe).toBe(
      updateDescribeAction.describe
    );
  });

  test("Receive add new sub campaign action - should add new sub-campaign to context", () => {
    const newSubCampId = 999;
    Date.now = jest.fn(() => newSubCampId);
    const addNewSubCampAction = {
      type: NEW_SUB_CAMP,
    };

    const updatedNameCtx = campaignReducer(campaignCtx, addNewSubCampAction);

    expect(updatedNameCtx.subCampaigns).toHaveLength(2);
    expect(updatedNameCtx.subCampaigns[1].id).toBe(newSubCampId);
  });

  test("Receive select sub campaign action - should update selected sub-campaign id", () => {
    campaignCtx.subCampaigns = [...campaignCtx.subCampaigns, subCampaign];
    const selectSubCampAction = {
      type: SELECT_CAMP,
      ...subCampaign,
    };

    const updatedNameCtx = campaignReducer(campaignCtx, selectSubCampAction);

    expect(updatedNameCtx.activeSubCamp).toBe(subCampaign.id);
  });

  test("Receive update sub campaign action - should update sub-campaign information", () => {
    const updateSubCamp: SubCampaignContext = {
      name: "Chiến dịch con 2 đã được update",
      status: true,
      ads: [],
      error: "",
      id: 2,
    };
    campaignCtx.subCampaigns = [...campaignCtx.subCampaigns, subCampaign];
    const updateSubCampAction = {
      type: UPDATE_SUB_CAMP_INFO,
      ...updateSubCamp,
    };

    const updatedNameCtx = campaignReducer(campaignCtx, updateSubCampAction);

    expect(updatedNameCtx.subCampaigns[1].id).toBe(updateSubCamp.id);
    expect(updatedNameCtx.subCampaigns[1].name).toBe(updateSubCamp.name);
  });

  test("Receive add new advertisement to sub-campaign action - should add new advertisement information", () => {
    const newAdsId = 999;
    Date.now = jest.fn(() => newAdsId);
    const addNewAdsAction = {
      type: ADD_NEW_ADS,
      id: campaignCtx.subCampaigns[0].id,
    };

    const updatedNameCtx = campaignReducer(campaignCtx, addNewAdsAction);

    expect(updatedNameCtx.subCampaigns[0].ads[1].id).toBe(newAdsId);
  });

  test("Receive remove advertisements action - should remove advertisements from sub-campaign", () => {
    const currentAds = campaignCtx.subCampaigns[0].ads;
    campaignCtx.subCampaigns[0].ads = [...currentAds, advertisement];
    const removeAdsAction = {
      type: REMOVE_ADS,
      subCampId: campaignCtx.subCampaigns[0].id,
      adsIds: [advertisement.id],
    };

    const updatedNameCtx = campaignReducer(campaignCtx, removeAdsAction);

    expect(updatedNameCtx.subCampaigns[0].ads).not.toContain(advertisement);
  });

  test("Receive remove sub-campaign action - should remove sub-campaign from campaign", () => {
    campaignCtx.subCampaigns = [...campaignCtx.subCampaigns, subCampaign];
    const removeSubCampAction = {
      type: REMOVE_SUB_CAMP,
      id: campaignCtx.subCampaigns[0].id,
    };

    const updatedNameCtx = campaignReducer(campaignCtx, removeSubCampAction);

    expect(updatedNameCtx.subCampaigns[0].ads).toHaveLength(0);
  });

  test("Receive remove sub-campaign action - should remove sub-campaign from campaign", () => {
    const currentAds = campaignCtx.subCampaigns[0].ads;
    campaignCtx.subCampaigns[0].ads = [...currentAds, advertisement];
    const updateAdsNameAction = {
      type: UPDATE_ADS_NAME,
      subCampId: campaignCtx.subCampaigns[0].id,
      adsId: advertisement.id,
      name: "Quảng cáo cập nhật",
    };
    const updateAdsQuantityAction = {
      type: UPDATE_ADS_QUANTITY,
      subCampId: campaignCtx.subCampaigns[0].id,
      adsId: advertisement.id,
      quantity: 9999,
    };

    const updatedNameCtx = campaignReducer(campaignCtx, updateAdsNameAction);
    const updatedCtx = campaignReducer(updatedNameCtx, updateAdsQuantityAction);

    expect(updatedCtx.subCampaigns[0].ads[1].name).toBe(
      updateAdsNameAction.name
    );
    expect(updatedCtx.subCampaigns[0].ads[1].quantity).toBe(
      updateAdsQuantityAction.quantity
    );
  });

  // TODO: Add more test-case with updated context
  test("Receive validate action on initial campaign context - should fill error property with data", () => {
    const validateAction = {
      type: VALIDATE,
    };

    const updatedCtx = campaignReducer(campaignCtx, validateAction);

    expect(updatedCtx.information.error).not.toHaveLength(0);
    expect(updatedCtx.subCampaigns[0].ads[0].quantityError).not.toHaveLength(0);
    expect(updatedCtx.hasError).toBe(true);
    expect(updatedCtx.validated).toBe(false);
  });

  test("Receive invalid action - should do nothing with current context", () => {
    const invalidAction = {
      type: "NOT_EXIST",
    };

    const updatedCtx = campaignReducer(campaignCtx, invalidAction);

    expect(updatedCtx).toBe(campaignCtx);
  });
});
