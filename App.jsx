import { useState } from "react";
import { StargateClient } from "@cosmjs/stargate";

const CHAINS = {
  osmosis: {
    chainId: "osmosis-1",
    rpc: "https://osmosis-rpc.publicnode.com/",
    denom: "uosmo",
  },
  neutron: {
    chainId: "neutron-1",
    rpc: "https://neutron-rpc.publicnode.com/",
    denom: "untrn",
  },
};

function App() {
  const [selectedChain, setSelectedChain] = useState("osmosis");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    const chain = CHAINS[selectedChain];

    if (!window.keplr) {
      alert("Keplrをインストールしてください");
      return;
    }

    try {
      await window.keplr.enable(chain.chainId);
      const offlineSigner = window.getOfflineSigner(chain.chainId);
      const accounts = await offlineSigner.getAccounts();

      const client = await StargateClient.connect(chain.rpc);
      const addr = accounts[0].address;
      setAddress(addr);

      const bal = await client.getAllBalances(addr);
      const token = bal.find((b) => b.denom === chain.denom);
      setBalance(token ? `${token.amount} ${token.denom}` : "なし");
    } catch (err) {
      console.error(err);
      alert("接続に失敗しました");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔗 マルチチェーン Keplr 接続</h1>

      <label>
        チェーンを選択：
        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
        >
          <option value="osmosis">Osmosis</option>
          <option value="neutron">Neutron</option>
        </select>
      </label>

      <br /><br />
      <button onClick={connectWallet}>Keplr に接続</button>

      {address && (
        <div>
          <p><strong>アドレス:</strong> {address}</p>
          <p><strong>残高:</strong> {balance}</p>
        </div>
      )}
    </div>
  );
}

export default App;
