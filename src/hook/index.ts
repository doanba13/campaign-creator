import { useCallback, useContext, useMemo } from "react";
import { SubCampaignContext } from "../model";
import {
  UPDATE_CAMP_INFO,
  NEW_SUB_CAMP,
  SELECT_CAMP,
  UPDATE_SUB_CAMP_INFO,
  ADD_NEW_ADS,
  REMOVE_ADS,
  UPDATE_ADS_NAME,
  UPDATE_ADS_QUANTITY,
  VALIDATE,
  RESET_VALIDATE_STATUS,
} from "../utils/constants";
import {
  CampaignDispatchContext,
  useCampaign,
} from "../context/campaign-context";

const useUpdateCampaignInfo = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const updateCampaignInfo = useCallback(
    (key: string, value: string) => {
      dispatch({ type: UPDATE_CAMP_INFO, [key]: value });
    },
    [dispatch]
  );

  return updateCampaignInfo;
};

const useAddNewSubCampaign = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const addNewSubCampaign = useCallback(
    () => dispatch({ type: NEW_SUB_CAMP }),
    [dispatch]
  );

  return addNewSubCampaign;
};

const useSelectSubCampaign = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const selectSubCampaign = useCallback(
    (camp: SubCampaignContext) => dispatch({ type: SELECT_CAMP, ...camp }),
    [dispatch]
  );

  return selectSubCampaign;
};

const useUpdateSubCampaign = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const updateSubCampaign = useCallback(
    (updatedSubCamp: SubCampaignContext) =>
      dispatch({
        type: UPDATE_SUB_CAMP_INFO,
        ...updatedSubCamp,
        error: "",
      }),
    [dispatch]
  );

  return updateSubCampaign;
};

const useResetValidateStatus = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const resetValidateStatus = useCallback(
    () =>
      dispatch({
        type: RESET_VALIDATE_STATUS,
      }),
    [dispatch]
  );

  return resetValidateStatus;
};

const useGetActiveSubCamp = () => {
  const { activeSubCamp, subCampaigns } = useCampaign();
  const camp = useMemo(
    () => subCampaigns.find((c) => c.id === activeSubCamp),
    [activeSubCamp, subCampaigns]
  );

  return camp!;
};

const useAddNewAds = () => {
  const dispatch = useContext(CampaignDispatchContext);
  const activeSubCamp = useGetActiveSubCamp();

  const addNewAds = useCallback(
    () =>
      dispatch({
        type: ADD_NEW_ADS,
        id: activeSubCamp.id,
      }),
    [dispatch, activeSubCamp]
  );

  return addNewAds;
};

const useRemoveAds = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const removeAdvertisements = useCallback(
    (subCampId: number, adsIds: number[]) =>
      dispatch({
        type: REMOVE_ADS,
        subCampId,
        adsIds,
      }),
    [dispatch]
  );

  return removeAdvertisements;
};

const useValidateCampaign = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const validateCampaign = useCallback(
    () =>
      dispatch({
        type: VALIDATE,
      }),
    [dispatch]
  );

  return validateCampaign;
};

const useUpdateAdvertisement = () => {
  const dispatch = useContext(CampaignDispatchContext);

  const updateAdvertisementName = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (subCampId: number, adsId: number, name: string) =>
      dispatch({
        type: UPDATE_ADS_NAME,
        subCampId,
        adsId,
        name,
      }),
    [dispatch]
  );

  const updateAdvertisementQuantity = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (subCampId: number, adsId: number, quantity: number) => {
      dispatch({
        type: UPDATE_ADS_QUANTITY,
        subCampId,
        adsId,
        quantity: quantity > 0 ? quantity : 0,
      });
    },
    [dispatch]
  );

  return { updateAdvertisementName, updateAdvertisementQuantity };
};

export {
  useUpdateCampaignInfo,
  useAddNewSubCampaign,
  useSelectSubCampaign,
  useUpdateSubCampaign,
  useAddNewAds,
  useRemoveAds,
  useGetActiveSubCamp,
  useUpdateAdvertisement,
  useValidateCampaign,
  useResetValidateStatus,
};
