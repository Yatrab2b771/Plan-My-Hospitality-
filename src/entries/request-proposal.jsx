import React from "react";
import ReactDOM from "react-dom/client";
import PageLayout from "../components/PageLayout.jsx";
import ProposalWizard from "../pages/ProposalWizard.jsx";
import "../styles/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PageLayout>
      <ProposalWizard />
    </PageLayout>
  </React.StrictMode>
);
