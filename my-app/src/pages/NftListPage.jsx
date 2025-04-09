import React, { useEffect, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import Layout from "../components/Layout"; // 中央配置＋ダークモード対応レイアウト

const CONTRACT_ADDRESS =
  localStorage.getItem("customContractAddress") ||
  "neutron1n6phzpmd7fkuns6lkfzpyxahnmn4enlt47aqzr6nhy6lv4q4wles2w6dsm";
const CHAIN_ID = "pion-1";
const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";

export default function NftListPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.keplr) return alert("Keplr をインストールしてください");
    await window.keplr.enable(CHAIN_ID);
    const signer = window.getOfflineSigner(CHAIN_ID);
    const accounts = await signer.getAccounts();
    setWalletAddress(accounts[0].address);
  };

  const fetchNfts = async () => {
    if (!walletAddress) return;
    setLoading(true);
    try {
      const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
      const tokens = await client.queryContractSmart(CONTRACT_ADDRESS, {
        tokens: { owner: walletAddress },
      });

      const results = await Promise.all(
        tokens.tokens.map(async (token_id) => {
          const { token_uri, extension } = await client.queryContractSmart(CONTRACT_ADDRESS, {
            nft_info: { token_id },
          });
          return { token_id, token_uri, extension };
        })
      );

      setNftList(results);
    } catch (err) {
      console.error("NFT一覧取得エラー:", err);
      alert("NFT一覧の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress) fetchNfts();
  }, [walletAddress]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">🧾 所有NFT一覧</h1>

      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        ウォレット接続
      </button>

      {walletAddress && (
        <div className="text-left text-sm space-y-4 w-full">
          <p>接続アドレス: <code>{walletAddress}</code></p>

          {loading ? (
            <p>読み込み中...</p>
          ) : nftList.length === 0 ? (
            <p>保有しているNFTはありません。</p>
          ) : (
            <ul className="space-y-3">
              {nftList.map((nft) => (
                <li key={nft.token_id} className="border-b border-gray-300 pb-2">
                  <strong>ID:</strong> {nft.token_id}<br />
                  <strong>URI:</strong> {nft.token_uri}<br />
                  {nft.extension && (
                    <div className="mt-1 text-xs text-gray-500 whitespace-pre-wrap">
                      {JSON.stringify(nft.extension, null, 2)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Layout>
  );
}
