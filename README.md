# 🛒 Shopee Ads Tracker - Chrome Extension

A specialized Google Chrome extension for **Shopee Sellers** and **Advertisers** designed to transform the standard Shopee Ads dashboard into a smart, real-time, and in-depth data analysis hub.

This tool helps advertisers instantly identify whether an ad campaign is generating **Profit**, reaching **Break-Even (BEP)**, or resulting in a **Loss**, automatically—eliminating the need for manual calculations in Excel or calculators.

---

## ✨ Key Features & Benefits

1. **📊 OPEX, Selling Price, and Margin Management**
   Input your cost structure (OPEX, Selling Price, Margin) directly under the product name on the Shopee Ads page. Data is automatically saved locally in your browser (**Local Storage**).
   <img width="405" height="47" alt="image" src="https://github.com/user-attachments/assets/cb9f658a-1010-4ff0-adef-875b94f4435c" />

2. **🎯 Automated Target ROAS Strategy**
   Instantly calculates the **Break-even ROAS** and provides Target ROAS recommendations based on your risk profile (*Saving, Conservative, Moderate, Aggressive, Hyper-Aggressive*).
   <img width="322" height="293" alt="image" src="https://github.com/user-attachments/assets/f86f2f74-f60c-4641-a3e7-e90105731759" />

3. **🚦 ROAS Health Indicators**
   Labels actual ROAS with color-coded status: Green (**GOOD**) if it meets the target, or Red (**POOR**) if it falls below the target for faster optimization decision-making.
   <img width="311" height="227" alt="image" src="https://github.com/user-attachments/assets/0a4ca974-ae5c-4946-9d26-32b622e8a225" />

4. **📉 Ad Cost & CPO (Cost Per Order) Analysis**
   Calculates crucial metrics to prevent budget bleeding:
   * Calculates CPO value and its percentage relative to the Selling Price.
   * Calculates **Actual Profit (Margin - CPO)**.
   * Automatic status labels (🟢 HEALTHY, 🟡 WARNING, 🔴 CRITICAL) with customizable percentage thresholds.
   <img width="353" height="343" alt="image" src="https://github.com/user-attachments/assets/a86fcd5c-b32b-4a16-88f5-b20a3c6e2d4c" />

5. **👁️ Impression Quality Analysis (CTR to Conversion)**
   Diagnoses ad creative/relevancy issues by calculating the **Order per 1,000 Views** ratio. Includes status labels to evaluate the effectiveness of the ad algorithm.
   <img width="305" height="343" alt="image" src="https://github.com/user-attachments/assets/4d85daa2-376b-4ed5-be26-f6ceac4e3919" />

6. **📋 1-Click Report Generator (SUMMARY Button)**
   Compiles all ad performance data for a product into a concise, neatly formatted text. It's copied to your clipboard instantly, ready to be pasted into WhatsApp or reporting groups.

7. **💾 Backup & Restore System**
   Easily **Export** or **Import** your entire strategy configuration and OPEX/Margin data using `.csv` files.

---

## 🛠️ Installation (Local / Developer Mode)

Since this extension is in development (not yet on the Chrome Web Store), you can install it manually on Chrome or Edge (Chromium-based):

1. **Download Repository**
   Click the green `Code` button in this repository and select **Download ZIP**. (Or clone via terminal: `git clone https://github.com/subject1996/SellerShopeeAds.git`)
2. **Extract Files**
   Extract the downloaded `.zip` file into a folder (e.g., `Shopee-Tracker-Ext`).
3. **Open Chrome Extensions Page**
   Open Google Chrome, type `chrome://extensions/` in the address bar, and press Enter.
4. **Enable Developer Mode**
   In the top right corner, toggle **Developer mode** to **ON**.
5. **Load Extension**
   Click the **Load unpacked** button in the top left. Select the folder where you extracted the files (the one containing the `manifest.json` file).
6. **Done! 🎉**
   The extension is now active. The extension icon (S) will appear in your browser's toolbar. Make sure to **Pin** it for easy access.

---

## 📖 How to Use

1. Open your **Shopee Ads** dashboard as usual.
2. You will see new input fields (**OPEX, Price, Margin**) appearing in each product row. Enter the figures according to your product profile.
3. **Hover** your cursor over the new badges/labels next to ROAS, Ad Cost, and Views to trigger the **Analysis Detail Pop-up**.
4. Click the **Extension Icon** in the top right of your browser to:
   * Toggle the extension features on/off.
   * Hide input columns (for a cleaner look when taking screenshots).
   * Adjust **ROAS Strategy** multipliers.
   * Customize **CPO Strategy** percentage thresholds (Healthy & Warning limits).
   * Perform data **Backup/Restore**.

---

## 🔒 Data Privacy
This extension runs entirely **client-side**. All your input data (Price, Margin, OPEX) is stored securely within your own browser's `chrome.storage.local`. This extension **DOES NOT** send your financial data, login credentials, or ad data to any external servers.

---

## 👨‍💻 Author

Developed by **Fitroh Satrio**.

If you find any bugs, issues, or have feature suggestions, please create an **Issue** in this repository. **Pull Requests** are also very welcome!

---
*Disclaimer: This extension is a third-party tool and is not officially affiliated with Shopee.*
