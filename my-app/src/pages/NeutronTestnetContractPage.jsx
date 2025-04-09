import React, { useEffect, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { StargateClient, GasPrice } from "@cosmjs/stargate";


const CONTRACT_ADDRESS = localStorage.getItem("customContractAddress") || "neutron1n6phzpmd7fkuns6lkfzpyxahnmn4enlt47aqzr6nhy6lv4q4wles2w6dsm";// ← 実際のコントラクトアドレスに変更
const CHAIN_ID = "pion-1";
const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
const DENOM = "untrn";

// const CONTRACT_ADDRESS = localStorage.getItem("customContractAddress") || "neutron1fndrppflxqwsgnwrr3299n369t3d49fgwznq9cdvt6hk62nc2jgsh6sdhz";// ← 実際のコントラクトアドレスに変更
// const CHAIN_ID = "pion-1";
// const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";
// const DENOM = "untrn";
// const CONTRACT_ADDRESS = localStorage.getItem("customContractAddress") || "neutron1fndrppflxqwsgnwrr3299n369t3d49fgwznq9cdvt6hk62nc2jgsh6sdhz";// ← 実際のコントラクトアドレスに変更
// const CHAIN_ID = "neutron-1";
// const RPC_ENDPOINT = "https://neutron-rpc.publicnode.com/";
// const DENOM = "untrn";
const FALLBACK_FEE_AMOUNT = "10000";

export default function NeutronTestnetContractPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidContract, setIsValidContract] = useState(null);

  const connectWallet = async () => {
    if (!window.keplr) return alert("Keplr をインストールしてください");
    await window.keplr.enable(CHAIN_ID);
    const signer = window.getOfflineSigner(CHAIN_ID);
    const accounts = await signer.getAccounts();
    setWalletAddress(accounts[0].address);
  };

  const fetchBalance = async (address) => {
    try {
      const client = await StargateClient.connect(RPC_ENDPOINT);
      const balances = await client.getAllBalances(address);
      const token = balances.find((b) => b.denom === DENOM);
      setBalance(token ? `${token.amount} ${token.denom}` : `${DENOM}残高なし`);
    } catch (err) {
      console.error("残高取得エラー:", err);
      setBalance("取得失敗");
    }
  };

  const validateContractAddress = async () => {
    try {
      const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
      const info = await client.getContract(CONTRACT_ADDRESS);
      setIsValidContract(!!info);
    } catch {
      setIsValidContract(false);
    }
  };

  useEffect(() => {
    if (walletAddress) fetchBalance(walletAddress);
    validateContractAddress();
  }, [walletAddress]);

  const executeMint = async () => {
    try {
      setLoading(true);
      const signer = window.getOfflineSigner(CHAIN_ID);
      const gasPrice = GasPrice.fromString(`0.025${DENOM}`);
      const client = await SigningCosmWasmClient.connectWithSigner(RPC_ENDPOINT, signer, { gasPrice });

      const msg = {
        mint: {
          token_id: `token-${Date.now()}`,
          owner: walletAddress,
          token_uri: "https://raw.githubusercontent.com/yanagihalab/cosmjs-vite-app-to-Prevent-Review-Bombing/main/NFT_Image.png",
          extension: null
        }
      };

      const funds = [{ denom: DENOM, amount: FALLBACK_FEE_AMOUNT }];

      const tx = await client.execute(
        walletAddress,
        CONTRACT_ADDRESS,
        msg,
        "auto",
        "Mint NFT",
        funds
      );

      setResult(JSON.stringify(tx, null, 2));
      fetchBalance(walletAddress);
    } catch (err) {
      console.error("Mint 実行エラー:", err);
      setResult(`エラー / Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">🧠 Neutron Testnet NFT Mint</h1>

      <p className="text-sm text-gray-600">
        コントラクトアドレス:<br />
        <code>{CONTRACT_ADDRESS}</code><br />
        有効性: <strong>{isValidContract === null ? "確認中..." : isValidContract ? "✅ True" : "❌ False"}</strong>
      </p>

      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        ウォレット接続
      </button>

      {walletAddress && (
        <div className="space-y-4">
          <p>アドレス: <code>{walletAddress}</code></p>
          <p>残高: <strong>{balance}</strong></p>

          <button
            onClick={executeMint}
            disabled={loading || !isValidContract}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            来店証明NFTを発行する
          </button>

          {result && (
            <pre className="mt-4 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
              {result}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}