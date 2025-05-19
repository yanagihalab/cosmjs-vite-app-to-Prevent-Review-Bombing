# [EN] NFT-Based Review Management DApp

## Overview

This project is an NFT-based review submission and management system running on the **Neutron testnet (pion-1)** within the Cosmos ecosystem.  
Users can mint NFTs via a web interface built with CosmJS.  
Only holders of a minted NFT are allowed to submit a review associated with that specific NFT.

Review data — including score, title, and content — is permanently stored on-chain in a tamper-resistant manner.

### Features

- ✅ NFT Minting
- ✅ Review submission restricted to NFT holders
- ✅ On-chain storage of review data
- ✅ One-time review submission (no resubmission allowed)

---

## ⚠️ Contract Expiry Notice

This project operates on the **Neutron testnet (pion-1)**, which is intended for development and testing purposes. Please keep the following in mind:

- 🚨 Deployed smart contracts may become unusable after a certain period.
- 🚨 NFTs minted and reviews submitted on-chain may be lost if the testnet is reset.
- 🚨 Periodic contract redeployment and reconfiguration may be required during development and testing.

### 🔧 Recommendations for Developers and Testers

- Regularly monitor the status of the testnet.
- Promptly redeploy contracts when a testnet reset or maintenance occurs.

> ⚠️ **Disclaimer**  
> The issues mentioned above are specific to the testnet environment.  
> In a production (mainnet) deployment, data will **not** be lost.

---

## 🚀 How to Launch the Web Application

```sh
docker compose up
```


# [JA] NFTベースのレビュー管理Dapps

## 全体の説明

本プロジェクトは、Cosmosエコシステムの **Neutronテストネット（pion-1）** 上で動作する、NFTベースのレビュー投稿および管理システムである。
ユーザーはCosmJSを利用したWebインターフェースを通じ、NFTの発行（Mint）を行う。
また、発行されたNFTを所有するホルダーのみが、そのNFTに関連したレビューを投稿できる。

レビュー情報（スコア、件名、本文など）は、改ざん困難な状態でブロックチェーン上に永久保存される。

### 機能一覧

- ✅ NFTのMint（発行）
- ✅ NFT所有者限定のレビュー投稿
- ✅ レビュー情報のオンチェーン保存
- ✅ レビュー投稿後の再投稿禁止（1回限りの投稿）

---

## コントラクトが無効になる話（重要）

本プロジェクトが利用する **Neutronテストネット（pion-1）** は、テストや検証のために構築された環境であり、以下の点に注意が必要である。

- 🚨 デプロイされたスマートコントラクトは一定期間後に利用できなくなる可能性がある。
- 🚨 コントラクト上で発行したNFTおよび投稿されたレビューなどのオンチェーンデータは、テストネットのリセット時に失われる可能性がある。
- 🚨 開発・テスト時には、定期的なコントラクト再デプロイおよび再設定が求められる。

**開発者および検証者への推奨事項**

- 最新のネットワーク状態を定期的に確認する。
- テストネットのリセットやメンテナンスが行われた際は、速やかに再デプロイを行うことを推奨。

> ⚠️ **注意事項**  
> 上記の問題はテストネット環境特有のものであり、本番環境（メインネット）にデプロイした場合、データが失われることはありません。

---  

```sh:(webアプリ起動方法)
docker compose up
```