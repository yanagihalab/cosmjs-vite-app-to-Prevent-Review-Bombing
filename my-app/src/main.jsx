import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import App from './App';
import NeutronTestnetContractPage from './pages/NeutronTestnetContractPage';
import ContractAddressUpdater from './pages/ContractAddressUpdater';
import QrcodeDisplayPage from './pages/QrcodeDisplayPage';
import VisitCertificationPage from "./pages/VisitCertificationPage";
import ReviewPage from "./pages/ReviewSubmissionPage";
import NftListPage from './pages/NftListPage';
import CheckContractNftPage from "./pages/CheckContractNftPage";

import './index.css'; // Tailwindなどを使っている場合のスタイル

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/neutron-testnet" element={<NeutronTestnetContractPage />} />
        <Route path="/contract-update" element={<ContractAddressUpdater />} /> 
        <Route path="/qr" element={<QrcodeDisplayPage />} />
        <Route path="/visit-cert" element={<VisitCertificationPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/nft-list" element={<NftListPage />} />
        <Route path="/check-nft-source" element={<CheckContractNftPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
