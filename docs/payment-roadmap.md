# 金流與電商路線圖

目前購物車和結帳是測試流程，適合先學網站和購物車概念。正式收款時需要後端伺服器或金流平台提供的安全結帳頁，不能把金流密鑰放在前端網頁裡。

## 目前狀態

- 前端可以加入商品、調整數量、計算總金額。
- 測試結帳只會產生本機提示，不會建立正式訂單。
- 商品和購物車資料都在瀏覽器本機，尚未同步到雲端。

## 學習順序

1. 先把靜態網站上線。
2. 申請金流測試商店，拿到測試用商店代號和密鑰。
3. 加一個小型後端，例如 Node.js、Cloudflare Workers 或 Vercel Functions。
4. 後端負責建立訂單、產生金流參數、接收付款結果通知。
5. 前端只負責購物車、送出訂單和顯示付款狀態。

## 台灣金流候選

依 2026-04-28 查到的官方資料：

- Stripe 官方全球可用地區頁面目前未列出台灣，所以台灣本地商家通常不會把 Stripe 當第一個直連選項。
- 綠界 ECPay 有全方位金流 API、SDK、物流與電子發票文件。
- 藍新 NewebPay 有 API 文件下載、線上刷卡、超商代收、ATM 與行動支付等服務說明。

官方入口：

- Stripe global availability: https://stripe.com/global
- 綠界 ECPay Developers: https://developers.ecpay.com.tw/
- 藍新 NewebPay API 文件: https://www.newebpay.com/website/Page/content/download_api

## 正式付款前必做

- 不要把商店密鑰、HashKey、HashIV 或 API secret 放在前端。
- 建立訂單編號和訂單狀態資料表。
- 驗證金流回傳簽章。
- 紀錄付款成功、付款失敗、取消付款和逾時。
- 加上退款、出貨、客服聯絡方式與隱私權政策。
