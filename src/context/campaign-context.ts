import { Dispatch, createContext, useContext } from "react";
import { CampaignContext as CampaignCtx, SubCampaignContext } from "../model";

const initialSubCamp: SubCampaignContext = {
  id: Date.now(),
  name: "Chiến dịch con 1",
  status: true,
  error: "",
  ads: [
    {
      id: Date.now(),
      name: "quảng cáo 1",
      quantity: 0,
      nameError: "",
      quantityError: "",
    },
  ],
};

const initialCampaign: CampaignCtx = {
  information: {
    name: "",
    describe: "",
    error: "",
  },
  subCampaigns: [initialSubCamp],
  activeSubCamp: initialSubCamp.id,
  validated: false,
  hasError: false,
};

const CampaignContext = createContext<CampaignCtx>(initialCampaign);

const CampaignDispatchContext = createContext(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (() => undefined) as Dispatch<any>
);

const useCampaign = () => useContext(CampaignContext);

export {
  CampaignContext,
  CampaignDispatchContext,
  useCampaign,
  initialCampaign,
  initialSubCamp,
};
