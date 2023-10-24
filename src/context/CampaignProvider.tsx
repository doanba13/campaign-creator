/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, PropsWithChildren, useReducer } from "react";
import {
  CampaignContext,
  CampaignDispatchContext,
  initialCampaign,
} from "./campaign-context";
import { campaignReducer } from "./campaign-reducer";

export const CampaignProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, dispatch] = useReducer(campaignReducer, initialCampaign);
  return (
    <CampaignContext.Provider value={tasks}>
      <CampaignDispatchContext.Provider value={dispatch}>
        {children}
      </CampaignDispatchContext.Provider>
    </CampaignContext.Provider>
  );
};
