import "./App.css";
import { CampaignProvider } from "./context/CampaignProvider";
import Campaign from "./pages/Campaign";

function App() {
  console.log("App render");

  return (
    <>
      <CampaignProvider>
        <Campaign />
      </CampaignProvider>
    </>
  );
}

export default App;
