# 後台與資料管理建議

這個專案目前是純靜態網站。下一步如果想讓家人不用改程式也能新增礦石、商品或筆記，可以先從輕量後台開始，不需要一開始就做完整會員系統。

## 建議結論

短期建議：

- 用 Google Sheets 當內容後台。
- 用 Google Drive 存放原始照片和拍攝素材。
- 網站讀取整理後的公開資料。

中期建議：

- 如果想保留 Git 版本管理，又想要瀏覽器後台，可以研究 Decap CMS。
- 如果要公開留言、會員、訂單、庫存和付款狀態，再升級 Firebase 或 Supabase。

## 選項比較

| 方案 | 適合用途 | 優點 | 限制 |
| --- | --- | --- | --- |
| Google Sheets | 礦石資料、商品資料、時間線 | 家人容易編輯，像表格一樣直覺 | 不適合高流量，也不該直接放秘密資料 |
| Google Drive | 原始照片、素材備份 | 適合整理照片資料夾 | 不適合當網站資料庫 |
| Apps Script | 把 Sheets 轉成簡單 API | 可以做 `GET` 讀資料、`POST` 收表單 | 需要注意公開端點和濫用問題 |
| Decap CMS | Git 型內容後台 | 內容仍進 GitHub，保留版本紀錄 | 初期設定比 Sheets 複雜 |
| Firebase | 公開留言、登入、即時資料 | Google 生態系，適合互動功能 | 權限規則要設好，正式使用要注意費用 |
| Supabase | 資料庫、登入、後台資料 | PostgreSQL，資料結構清楚 | 比 Sheets 更像工程專案 |

## 推薦路線

### 第一階段：Google Sheets 後台

建立幾個工作表：

- `specimens`：礦石資料。
- `products`：商品資料。
- `timeline`：館長筆記時間線。
- `messages_review`：留言審核區。

網站可以先讀取一份公開 JSON。初期可以手動匯出，之後再用 Apps Script 自動輸出。

### 第二階段：照片整理

Google Drive 適合這樣使用：

- `photos/raw`：原始照片。
- `photos/selected`：挑選後可上站照片。
- `photos/edited`：裁切、壓縮後的網站圖片。

網站真正使用的圖片建議放在 repo 的 `assets/` 裡，或放到可靠的圖片服務。不要直接依賴私人 Drive 檔案連結當正式網站圖片。

### 第三階段：真正社群與訂單

當你想做這些功能時，再加正式後端：

- 公開留言並需要審核。
- 會員登入。
- 收藏清單。
- 訂單紀錄。
- 付款狀態。
- 後台管理商品與庫存。

這時再評估 Firebase 或 Supabase，比用 Sheets 硬撐更合理。

## 官方參考

- Google Sheets API 有每分鐘配額限制，官方也建議單次 payload 以 2 MB 內為佳：https://developers.google.com/workspace/sheets/api/limits
- Apps Script Web App 可透過 `doGet(e)` 和 `doPost(e)` 提供簡單網頁或 API：https://developers.google.com/apps-script/guides/web
- Decap CMS 是 Git workflow 的內容管理工具，內容可以存回 Git repo：https://decapcms.org/docs/intro/
- Firebase 提供 no-cost Spark plan 與 pay-as-you-go Blaze plan：https://firebase.google.com/docs/projects/billing/firebase-pricing-plans
- Supabase 有 Free、Pro、Team、Enterprise 等方案：https://supabase.com/docs/guides/platform/billing-on-supabase
