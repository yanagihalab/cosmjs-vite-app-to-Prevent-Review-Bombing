import base64

# 画像ファイルをBase64文字列に変換する
def image_to_base64(image_path):
    with open(image_path, "rb") as img_file:
        encoded_bytes = base64.b64encode(img_file.read())
    encoded_str = encoded_bytes.decode("utf-8")
    return encoded_str

# Base64文字列から画像ファイルに復元する
def base64_to_image(base64_str, output_path):
    decoded_bytes = base64.b64decode(base64_str)
    with open(output_path, "wb") as img_file:
        img_file.write(decoded_bytes)

# 文字列のバイト数を取得する
def get_byte_size(text, encoding='utf-8'):
    return len(text.encode(encoding))

# メイン処理の例
if __name__ == "__main__":
    # 元画像 → Base64文字列
    image_path = "NFT_Image.png"
    base64_text = image_to_base64(image_path)
    print("Base64文字列:", base64_text)

    # Base64文字列のバイト数を表示
    byte_size = get_byte_size(base64_text)
    print(f"Base64文字列のバイト数: {byte_size}")

    # Base64文字列 → 画像に復元
    restored_image_path = "restored_image.png"
    base64_to_image(base64_text, restored_image_path)
    print(f"画像が復元されました: {restored_image_path}")
