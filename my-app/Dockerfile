# Dockerfile
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# 必要なパッケージ
RUN apt-get update && apt-get install -y \
    curl \
    git \
    vim \
    build-essential

# Node.js v18をインストール
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# 作業ディレクトリ
WORKDIR /app

# パッケージ情報を先にコピー → キャッシュ活用
COPY ./my-app/package*.json ./

# 依存インストール（vite含む）
RUN npm install

# アプリ全体をコピー
COPY ./my-app .

# Viteが使うポートを開放
EXPOSE 5173

# 開発サーバー起動コマンド（`--host` で外部アクセス許可）
CMD ["npm", "run", "dev", "--", "--host", "--port=5173"]
