import { useEffect, useState } from "react";
import { StargateClient, SigningStargateClient } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Link } from "react-router-dom";
import './index.css';


const CHAINS = {
  osmosis: {
    chainId: "osmosis-1",
    rpc: "https://osmosis-rpc.publicnode.com/",
    denom: "uosmo",
    label: "Osmosis / オスモシス",
  },
  neutron: {
    chainId: "neutron-1",
    rpc: "https://neutron-rpc.publicnode.com/",
    denom: "untrn",
    label: "Neutron / ニュートロン",
  },
  neutronTestnet: {
    chainId: "pion-1",
    rpc: "https://rpc-palvus.pion-1.ntrn.tech",
    denom: "untrn",
    label: "Neutron Testnet / ニュートロン テストネット",
  },
  cosmoshubTestnet: {
    chainId: "provider",
    rpc: "https://cosmos-testnet-rpc.itrocket.net/",
    denom: "uatom",
    label: "Cosmos Hub Testnet / コスモスハブ テストネット",
  },
};

export default function App() {
  const [selectedChain, setSelectedChain] = useState("osmosis");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [contractResult, setContractResult] = useState("");

  useEffect(() => {
    if (address) fetchBalance();
  }, [selectedChain, address]);

  const fetchBalance = async () => {
    const chain = CHAINS[selectedChain];
    const client = await StargateClient.connect(chain.rpc);
    const bal = await client.getAllBalances(address);
    const token = bal.find((b) => b.denom === chain.denom);
    setBalance(token ? `${token.amount} ${token.denom}` : "なし / None");
  };

  const connectWallet = async () => {
    const chain = CHAINS[selectedChain];
    if (!window.keplr) return alert("Keplrをインストールしてください / Please install Keplr");

    await window.keplr.enable(chain.chainId);
    const offlineSigner = window.getOfflineSigner(chain.chainId);
    const accounts = await offlineSigner.getAccounts();
    setAddress(accounts[0].address);
  };

  const sendToken = async () => {
    const chain = CHAINS[selectedChain];
    if (!recipient || isNaN(amount) || Number(amount) <= 0) {
      alert("有効な送金先アドレスと金額を入力してください / Please enter a valid recipient and amount");
      return;
    }
    const signer = window.getOfflineSigner(chain.chainId);
    const client = await SigningStargateClient.connectWithSigner(chain.rpc, signer);

    const result = await client.sendTokens(
      address,
      recipient,
      [{ denom: chain.denom, amount: String(Number(amount)) }],
      "auto"
    );
    setTxHash(result.transactionHash);
    fetchBalance();
  };

  return (
    <div className="p-8 space-y-6 font-sans">
      <h1 className="text-3xl font-bold">🚀 マルチチェーン Keplr 接続 / Multi-chain Keplr Connection</h1>

      <div className="flex space-x-4">
        <select
          className="border rounded px-3 py-1"
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
        >
          {Object.entries(CHAINS).map(([key, chain]) => (
            <option key={key} value={key}>{chain.label}</option>
          ))}
        </select>
        <button onClick={connectWallet} className="px-4 py-2 bg-blue-500 text-white rounded">
          Keplr に接続 / Connect Keplr
        </button>
      </div>

      {address && (
        <div className="border p-4 rounded shadow">
          <p><strong>アドレス / Address:</strong> {address}</p>
          <p><strong>残高 / Balance:</strong> {balance}</p>
        </div>
      )}

      <div className="border p-4 rounded shadow space-y-3">
        <h2 className="text-xl font-semibold">💸 トークン送金 / Token Transfer</h2>
        <input
          className="w-full border px-3 py-1 rounded"
          placeholder="送金先アドレス / Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          className="w-full border px-3 py-1 rounded"
          placeholder="金額 / Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendToken} className="px-4 py-2 bg-green-600 text-white rounded">
          送金する / Send
        </button>
        {txHash && (
          <p className="text-sm">
            TxHash:{" "}
            <a
              href={`https://www.mintscan.io/${selectedChain}/txs/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {txHash}
            </a>
          </p>
        )}
      </div>

      <Link to="/neutron-testnet" className="text-blue-600 underline">
        🧠 Neutron Testnet コントラクトページへ / Go to Smart Contract Page
      </Link>
    </div>
  );
}