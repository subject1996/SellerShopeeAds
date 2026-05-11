/**
 * Plugin: Shopee ROAS & OPEX Tracker
 * Author: Fitroh Satrio
 */

// 1. Fungsi Helper untuk format angka ke Rupiah
function formatRupiah(angka) {
  if (!angka) return "0";
  let val = angka.toString().replace(/[^0-9]/g, "");
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// 2. Pembersih Angka Pintar (Anti-NaN, Cerdas Koma/Titik, dan Bisa Baca "k"/"rb")
function parseShopeeNumber(text, isRupiah = false) {
  if (!text) return 0;
  let firstLine = text.toString().split('\n')[0].trim().toLowerCase();

  let multiplier = 1;
  if (firstLine.includes('k') || firstLine.includes('rb')) multiplier = 1000;
  if (firstLine.includes('m') || firstLine.includes('jt')) multiplier = 1000000;

  let cleanText = firstLine.replace(/[^0-9,.-]/g, '');

  if (cleanText.includes(',')) {
    cleanText = cleanText.replace(/\./g, '').replace(',', '.');
  } else if (cleanText.includes('.')) {
    if ((cleanText.match(/\./g) || []).length > 1) {
      cleanText = cleanText.replace(/\./g, '');
    } else {
      let parts = cleanText.split('.');
      if (parts[1] && parts[1].length === 3) {
        cleanText = cleanText.replace(/\./g, '');
      }
    }
  }

  return (parseFloat(cleanText) || 0) * multiplier;
}

const i18nContent = {
  en: {
    exportBtn: "📥 Export Summary to CSV",
    csvHeader: "Product Name,OPEX,Selling Price,Margin,Target ROAS,Real ROAS,ROAS Status,Impressions,Clicks,Conversions,Sales,Cost,Cost Per Order Status,Imp to Order Status,CPM,Max Healthy CPM,CPM Status\n",
    opexPlaceholder: "OPEX",
    pricePlaceholder: "Price",
    marginPlaceholder: "Margin",
    summaryBtn: "SUMMARY",
    tipOpex: "Operational Cost or Marketplace Commission",
    tipPrice: "Product Selling Price",
    tipMargin: "Margin (Net Profit)",
    roasStrategy: "ROAS Strategy",
    roasImpas: "BREAK-EVEN ROAS:",
    sa: "Very Aggressive",
    a: "Aggressive",
    m: "Moderate",
    k: "Conservative",
    s: "Saving",
    pluginBy: "Plugin by Fitroh Satrio",
    statusNoData: "NO DATA",
    statusMarginEmpty: "EMPTY MARGIN",
    statusHealthy: "HEALTHY",
    statusWarning: "WARNING",
    statusDanger: "DANGER",
    statusSaving: "Saving",
    statusConservative: "Conservative",
    statusModerate: "Moderate",
    statusAggressive: "Aggressive",
    statusVeryAggressive: "Very Aggressive",
    statusBreakEven: "Break Even Only",
    statusLoss: "Loss",
    statusOpexEmpty: "OPEX/Margin not filled",
    statusPriceEmpty: "EMPTY SELLING PRICE",
    statusPriceEmpty2: "SELLING PRICE?",
    statusNoCostYet: "NO COST YET",
    statusSafe: "SAFE",
    statusDanger0Conv: "DANGER (0 CONVERSION)",
    statusNotAired: "NOT AIRED",
    status0Aired: "0 IMPRESSIONS",
    subProfit: "(Profit & Stable)",
    subBep: "(Thin Profit / BEP)",
    subLoss: "(Loss Trigger)",
    analysisRoas: "Current ROAS Analysis",
    analysisCpo: "Ad Cost Analysis (CPO)",
    analysisImp: "Impression Conversion Analysis",
    lblTargetRoas: "Target ROAS:",
    lblRoasActual: "Current ROAS:",
    lblStatus: "Status:",
    lblAdCost: "Ad Cost:",
    lblConversion: "Conversions (Orders):",
    lblCpo: "Cost Per Order (CPO):",
    lblProductMargin: "Product Margin:",
    lblMarginCpo: "Margin - CPO:",
    lblRatioPrice: "Ratio to Selling Price:",
    lblTotalImp: "Total Impressions (Imp):",
    lblTotalOrder: "Total Orders:",
    lblOrder1k: "Orders per 1K Imp:",
    lblCost1k: "Cost per 1K Imp (CPM):",
    lblMaxCpm: "Max CPM (Order/1K × Margin):",
    lblStatusRoas: "ROAS Status:",
    lblStatusCpo: "Cost Per Order Status:",
    lblStatusIto: "Imp to Order Status:",
    lblStatusCpm: "CPM Status:",
    perfSummary: "Performance Summary",
    lblSellPrice: "Selling Price:",
    lblClicks: "Clicks:",
    lblSales: "Sales:"
  },
  id: {
    exportBtn: "📥 Export Summary to CSV",
    csvHeader: "Nama Produk,OPEX,Harga Jual,Margin,Target ROAS,ROAS Real,Status ROAS,Dilihat,Klik,Konversi,Penjualan,Biaya,Status Cost Per Order,Status Imp to Order,CPM,Maks CPM Sehat,Status CPM\n",
    opexPlaceholder: "OPEX",
    pricePlaceholder: "Jual",
    marginPlaceholder: "Margin",
    summaryBtn: "SUMMARY",
    tipOpex: "Biaya Operasional atau Komisi Marketplace",
    tipPrice: "Harga Jual Produk",
    tipMargin: "Margin (Keuntungan Bersih)",
    roasStrategy: "Strategi ROAS",
    roasImpas: "ROAS IMPAS:",
    sa: "Sangat Agresif",
    a: "Agresif",
    m: "Moderat",
    k: "Konservatif",
    s: "Saving",
    pluginBy: "Plugin by Fitroh Satrio",
    statusNoData: "NO DATA",
    statusMarginEmpty: "MARGIN KOSONG",
    statusHealthy: "SEHAT",
    statusWarning: "WASPADA",
    statusDanger: "BAHAYA",
    statusSaving: "Saving",
    statusConservative: "Konservatif",
    statusModerate: "Moderat",
    statusAggressive: "Agresif",
    statusVeryAggressive: "Sangat Agresif",
    statusBreakEven: "Hanya Impas",
    statusLoss: "Boncos",
    statusOpexEmpty: "OPEX/Margin belum diisi",
    statusPriceEmpty: "HARGA JUAL KOSONG",
    statusPriceEmpty2: "HARGA JUAL?",
    statusNoCostYet: "BELUM ADA BIAYA",
    statusSafe: "AMAN",
    statusDanger0Conv: "BAHAYA (0 KONVERSI)",
    statusNotAired: "BELUM TAYANG",
    status0Aired: "0 TAYANG",
    subProfit: "(Profit & Stabil)",
    subBep: "(Untung Tipis / BEP)",
    subLoss: "(Pemicu Boncos)",
    analysisRoas: "Analisis ROAS Saat Ini",
    analysisCpo: "Analisis Biaya Iklan (CPO)",
    analysisImp: "Analisis Konversi Tayangan",
    lblTargetRoas: "Target ROAS:",
    lblRoasActual: "ROAS Saat Ini:",
    lblStatus: "Status:",
    lblAdCost: "Biaya Iklan:",
    lblConversion: "Konversi (Pesanan):",
    lblCpo: "Cost Per Order (CPO):",
    lblProductMargin: "Margin Produk:",
    lblMarginCpo: "Margin - CPO:",
    lblRatioPrice: "Rasio thd Harga Jual:",
    lblTotalImp: "Total Tayang (Imp):",
    lblTotalOrder: "Total Order:",
    lblOrder1k: "Order per 1K Tayang:",
    lblCost1k: "Biaya per 1K Tayang (CPM):",
    lblMaxCpm: "Maks. CPM (Order/1K × Margin):",
    lblStatusRoas: "Status ROAS:",
    lblStatusCpo: "Status Cost Per Order:",
    lblStatusIto: "Status Imp to Order:",
    lblStatusCpm: "Status CPM:",
    perfSummary: "Rangkuman Performa",
    lblSellPrice: "Harga Jual:",
    lblClicks: "Klik:",
    lblSales: "Penjualan:"
  }
};
let currentI18nDict = i18nContent['en'];
const dict = new Proxy({}, { get: (target, prop) => currentI18nDict[prop] });

function updateShopeeAdsDashboard() {
  if (!chrome.runtime?.id) return;

  chrome.storage.local.get([
    'isActive',
    'hideInputs',
    'hideExportCSV',
    'extLang',
    'm_s_agresif', 'm_agresif', 'm_moderat', 'm_konservatif', 'm_saving',
    'cpo_sehat', 'cpo_waspada',
    'ito_sehat', 'ito_waspada'
  ], (settings) => {

    if (chrome.runtime.lastError) return;

    const isActive = settings.isActive !== false;
    const isHidden = settings.hideInputs === true;
    const isExportHidden = settings.hideExportCSV === true;
    const lang = settings.extLang || 'en';
    currentI18nDict = i18nContent[lang];

    if (!isActive) {
      document.querySelectorAll('.custom-extension-added').forEach(el => el.remove());
      return;
    }

    const mult = {
      sa: parseFloat(settings.m_s_agresif) || 1.5,
      a: parseFloat(settings.m_agresif) || 2.0,
      m: parseFloat(settings.m_moderat) || 2.5,
      k: parseFloat(settings.m_konservatif) || 3.0,
      s: parseFloat(settings.m_saving) || 3.5
    };

    const cpoLimit = {
      sehat: parseFloat(settings.cpo_sehat) || 15,
      waspada: parseFloat(settings.cpo_waspada) || 25
    };

    const itoLimit = {
      sehat: parseFloat(settings.ito_sehat) || 5,
      waspada: parseFloat(settings.ito_waspada) || 2
    };

    const protectionColor = "#26b0a0";

    const popupStyle = `position: fixed; z-index: 1000005; background: white; border: 1px solid #e5e5e5; border-radius: 4px; padding: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); display: none; width: 230px; color: #333; font-size: 12px; font-family: inherit; pointer-events: none;`;

    let globalAnalysisTooltip = document.getElementById('global-analysis-roas-tooltip');
    if (!globalAnalysisTooltip) {
      globalAnalysisTooltip = document.createElement('div');
      globalAnalysisTooltip.id = 'global-analysis-roas-tooltip';
      globalAnalysisTooltip.className = 'custom-extension-added';
      globalAnalysisTooltip.style.cssText = popupStyle;
      document.body.appendChild(globalAnalysisTooltip);
    }

    let csvExportBtn = document.getElementById('global-csv-export-btn');
    if (!csvExportBtn) {
      csvExportBtn = document.createElement('div');
      csvExportBtn.id = 'global-csv-export-btn';
      csvExportBtn.className = 'custom-extension-added';
      csvExportBtn.innerText = dict.exportBtn;
      csvExportBtn.style.cssText = `position: fixed; z-index: 1000000; bottom: 20px; right: 20px; background: ${protectionColor}; color: white; padding: 10px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: transform 0.2s; font-family: sans-serif;`;

      csvExportBtn.addEventListener('mouseenter', () => csvExportBtn.style.transform = 'scale(1.05)');
      csvExportBtn.addEventListener('mouseleave', () => csvExportBtn.style.transform = 'scale(1)');

      csvExportBtn.addEventListener('click', () => {
        const getVal = (cell) => cell ? cell.querySelector('.report-format-number')?.innerText || '0' : '0';
        const getValNum = (cell) => parseShopeeNumber(getVal(cell), true);

        let csvContent = dict.csvHeader;

        const mRows = document.querySelectorAll('.eds-table__main-body tr.eds-table__row');
        const fRows = document.querySelectorAll('.eds-table__fix-body tr.eds-table__row');

        mRows.forEach((row, i) => {
          const fRow = fRows[i];
          if (!fRow) return;

          const namaProduk = fRow.querySelector('.ellipsis-content')?.innerText.trim().replace(/"/g, '""') || 'Produk-' + i;

          const inOpex = fRow.querySelector('.input-hpp-field')?.value || '0';
          const inPrice = fRow.querySelector('.input-price-field')?.value || '0';
          const inMargin = fRow.querySelector('.input-margin-field')?.value || '0';

          const targetRoasEl = row.querySelector('.roi-value');
          const roasActualCell = row.querySelector('[data-testid*="column-broadRoi"]') || row.querySelector('[data-testid*="column-exactRoi"]') || row.querySelector('[data-testid*="column-roi"]');
          const gmvCell = row.querySelector('[data-testid*="column-broadGmv"]') || row.querySelector('[data-testid*="column-exactGmv"]') || row.querySelector('[data-testid*="column-gmv"]');
          const costCell = row.querySelector('[data-testid*="column-cost"]');
          const orderCell = row.querySelector('[data-testid*="column-broadOrder"]') || row.querySelector('[data-testid*="column-exactOrder"]') || row.querySelector('[data-testid*="column-order"]');
          const impCell = row.querySelector('[data-testid*="column-broadImpression"]') || row.querySelector('[data-testid*="column-exactImpression"]') || row.querySelector('[data-testid*="column-impression"]');
          const clickCell = row.querySelector('[data-testid*="column-broadClick"]') || row.querySelector('[data-testid*="column-exactClick"]') || row.querySelector('[data-testid*="column-click"]');

          const roasStatus = roasActualCell?.querySelector('.roas-status-badge')?.innerText || '-';
          const cpoStatus = costCell?.querySelector('.cpo-status-badge')?.innerText || '-';
          const impStatus = impCell?.querySelector('.imp-status-badge')?.innerText || '-';

          const impValNum = getValNum(impCell);
          const orderValNum = getValNum(orderCell);
          const costValNum = getValNum(costCell);
          const marginValNum = parseFloat(inMargin.replace(/\./g, "")) || 0;

          const cpmValNum = impValNum > 0 ? (costValNum / impValNum) * 1000 : 0;
          const orderPer1kNum = impValNum > 0 ? (orderValNum / impValNum) * 1000 : 0;
          const targetCpmNum = orderPer1kNum * marginValNum;

          let cpmStatusText = dict.statusNoData;
          if (marginValNum === 0) cpmStatusText = dict.statusMarginEmpty;
          else if (impValNum > 0) {
            cpmStatusText = (cpmValNum < targetCpmNum) ? dict.statusHealthy : dict.statusDanger;
          }

          const _opex = inOpex.replace(/\./g, '');
          const _price = inPrice.replace(/\./g, '');
          const _margin = inMargin.replace(/\./g, '');
          const _targetRoas = targetRoasEl ? targetRoasEl.innerText : '0';
          const _roasReal = getVal(roasActualCell).replace(/\./g, '').replace(',', '.');
          const _imp = getVal(impCell).replace(/\./g, '');
          const _click = getVal(clickCell).replace(/\./g, '');
          const _order = getVal(orderCell).replace(/\./g, '');
          const _gmv = getVal(gmvCell).replace(/\./g, '');
          const _cost = getVal(costCell).replace(/\./g, '');
          const _cpm = cpmValNum.toFixed(0);
          const _targetCpm = targetCpmNum.toFixed(0);

          csvContent += `"${namaProduk}",${_opex},${_price},${_margin},${_targetRoas},${_roasReal},${roasStatus},${_imp},${_click},${_order},${_gmv},${_cost},${cpoStatus},${impStatus},${_cpm},${_targetCpm},${cpmStatusText}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Shopee_Ads_Summary_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
      document.body.appendChild(csvExportBtn);
    }
    
    csvExportBtn.innerText = dict.exportBtn;
    csvExportBtn.style.display = isExportHidden ? 'none' : 'block';

    const mainRows = document.querySelectorAll('.eds-table__main-body tr.eds-table__row');
    const fixedRows = document.querySelectorAll('.eds-table__fix-body tr.eds-table__row');

    mainRows.forEach((row, index) => {
      const fixedRow = fixedRows[index];
      if (!fixedRow) return;

      const namaProdukEl = fixedRow.querySelector('.ellipsis-content');
      const namaProduk = namaProdukEl ? namaProdukEl.innerText.trim() : 'Produk-' + index;

      const targetRoasEl = row.querySelector('.roi-value');
      const roasActualCell = row.querySelector('[data-testid*="column-broadRoi"]') || row.querySelector('[data-testid*="column-exactRoi"]') || row.querySelector('[data-testid*="column-roi"]');
      const gmvCell = row.querySelector('[data-testid*="column-broadGmv"]') || row.querySelector('[data-testid*="column-exactGmv"]') || row.querySelector('[data-testid*="column-gmv"]');
      const costCell = row.querySelector('[data-testid*="column-cost"]');
      const orderCell = row.querySelector('[data-testid*="column-broadOrder"]') || row.querySelector('[data-testid*="column-exactOrder"]') || row.querySelector('[data-testid*="column-order"]');
      const impCell = row.querySelector('[data-testid*="column-broadImpression"]') || row.querySelector('[data-testid*="column-exactImpression"]') || row.querySelector('[data-testid*="column-impression"]');
      const clickCell = row.querySelector('[data-testid*="column-broadClick"]') || row.querySelector('[data-testid*="column-exactClick"]') || row.querySelector('[data-testid*="column-click"]');

      const productInfoArea = fixedRow.querySelector('.info-text');
      if (productInfoArea) {
        let container = productInfoArea.querySelector('.custom-shopee-extension-group');

        if (container && container.dataset.product !== namaProduk) {
          container.remove();
          container = null;
        }

        if (!container) {
          container = document.createElement('div');
          container.dataset.product = namaProduk;
          container.className = 'custom-shopee-extension-group custom-extension-added';
          container.style.cssText = "margin-top: 8px; display: flex; align-items: center; gap: 5px; font-family: ShopeeSans, Roboto, sans-serif;";

          const createInputHTML = (className, placeholder) => `
            <div class="wrapper-${className}" style="display: inline-flex; align-items: center; background: #fff; border: 1px solid #e5e5e5; border-radius: 2px; padding: 0 4px; height: 22px; cursor: help; transition: border-color 0.2s;">
              <span style="font-size: 9px; color: #555; font-weight: 500; margin-right: 2px; pointer-events: none;">Rp</span>
              <input type="text" class="${className}" placeholder="${placeholder}" style="width: 48px; font-size: 11px; border: none; background: transparent; outline: none; padding: 0; color: #333;">
            </div>
          `;

          container.innerHTML = `
            <div class="inputs-sub-group" style="display: flex; gap: 5px; align-items: center;">
               ${createInputHTML('input-hpp-field', dict.opexPlaceholder)}
               ${createInputHTML('input-price-field', dict.pricePlaceholder)}
               ${createInputHTML('input-margin-field', dict.marginPlaceholder)}
            </div>
            <div class="ai-summary-btn" style="background: ${protectionColor}; color: white; font-size: 10px; font-weight: 500; padding: 0 10px; height: 22px; line-height: 22px; border-radius: 2px; cursor: pointer; white-space: nowrap; transition: background 0.2s;">
              ${dict.summaryBtn}
            </div>
          `;
          productInfoArea.appendChild(container);

          const inOpex = container.querySelector('.input-hpp-field');
          const inPrice = container.querySelector('.input-price-field');
          const inMargin = container.querySelector('.input-margin-field');
          const summaryBtn = container.querySelector('.ai-summary-btn');

          const addFocusEffect = (input) => {
            const wrap = input.parentElement;
            input.onfocus = () => wrap.style.borderColor = "#ee4d2d";
            input.onblur = () => wrap.style.borderColor = "#e5e5e5";
          };
          addFocusEffect(inOpex); addFocusEffect(inPrice); addFocusEffect(inMargin);

          const createMiniTip = (color) => {
            const el = document.createElement('div');
            el.className = 'custom-extension-added';
            el.style.cssText = `position: fixed; z-index: 1000006; background: white; border: 1px solid ${color}; border-radius: 4px; padding: 4px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); display: none; color: ${color}; font-size: 10px; font-weight: bold; pointer-events: none; white-space: nowrap; font-family: sans-serif;`;
            document.body.appendChild(el);
            return el;
          };

          const tipOpex = createMiniTip('#555');
          const tipPrice = createMiniTip(protectionColor);
          const tipMargin = createMiniTip('#ee4d2d');

          const setupHover = (trigger, tooltip, textFn) => {
            const wrap = trigger.parentElement;
            wrap.addEventListener('mouseenter', () => {
              tooltip.innerText = textFn();
              tooltip.style.display = 'block';
              const r = wrap.getBoundingClientRect();
              tooltip.style.top = (r.top - 32) + 'px';
              tooltip.style.left = r.left + 'px';
            });
            wrap.addEventListener('mouseleave', () => tooltip.style.display = 'none');
          };

          setupHover(inOpex, tipOpex, () => dict.tipOpex);
          setupHover(inPrice, tipPrice, () => dict.tipPrice);
          setupHover(inMargin, tipMargin, () => dict.tipMargin);

          chrome.storage.local.get([namaProduk], (res) => {
            if (res[namaProduk]) {
              inOpex.value = formatRupiah(res[namaProduk].hpp || "");
              inPrice.value = formatRupiah(res[namaProduk].price || "");
              inMargin.value = formatRupiah(res[namaProduk].margin || "");
            } else {
              chrome.storage.local.set({
                [namaProduk]: { hpp: "0", price: "0", margin: "0" }
              });
            }
          });

          [inOpex, inPrice, inMargin].forEach(input => {
            input.addEventListener('input', (e) => {
              e.target.value = formatRupiah(e.target.value);
              chrome.storage.local.set({
                [namaProduk]: {
                  hpp: inOpex.value.replace(/\./g, ""),
                  price: inPrice.value.replace(/\./g, ""),
                  margin: inMargin.value.replace(/\./g, "")
                }
              });
            });
          });

          const summaryTooltip = document.createElement('div');
          summaryTooltip.className = 'custom-ai-tooltip custom-extension-added';
          summaryTooltip.style.cssText = popupStyle;
          document.body.appendChild(summaryTooltip);

          summaryBtn.addEventListener('mouseenter', () => {
            const getVal = (cell) => cell ? cell.querySelector('.report-format-number')?.innerText || '0' : '0';

            const roasBadge = roasActualCell?.querySelector('.roas-status-badge');
            const cpoBadge = costCell?.querySelector('.cpo-status-badge');
            const impBadge = impCell?.querySelector('.imp-status-badge');

            const roasStatus = roasBadge?.innerText || '-';
            const roasColor = roasBadge?.style.backgroundColor || '#ccc';

            const cpoStatus = cpoBadge?.innerText || '-';
            const cpoColor = cpoBadge?.style.backgroundColor || '#ccc';

            const impStatus = impBadge?.innerText || '-';
            const impColor = impBadge?.style.backgroundColor || '#ccc';

            const impValNum = parseShopeeNumber(impCell?.querySelector('.report-format-number')?.innerText || "0", true);
            const orderValNum = parseShopeeNumber(orderCell?.querySelector('.report-format-number')?.innerText || "0", true);
            const costValNum = parseShopeeNumber(costCell?.querySelector('.report-format-number')?.innerText || "0", true);
            const marginValNum = parseFloat(inMargin.value.replace(/\./g, "")) || 0;

            const cpmValNum = impValNum > 0 ? (costValNum / impValNum) * 1000 : 0;
            const orderPer1kNum = impValNum > 0 ? (orderValNum / impValNum) * 1000 : 0;
            const targetCpmNum = orderPer1kNum * marginValNum;

            let cpmStatusText = dict.statusNoData;
            let cpmColor = "#ccc";

            if (marginValNum === 0) {
              cpmStatusText = dict.statusMarginEmpty;
              cpmColor = "#888";
            } else if (impValNum > 0) {
              if (cpmValNum < targetCpmNum) {
                cpmStatusText = dict.statusHealthy;
                cpmColor = "#52c41a";
              } else {
                cpmStatusText = dict.statusDanger;
                cpmColor = "#ff4d4f";
              }
            }

            summaryTooltip.innerHTML = `
              <div style="font-weight: bold; font-size: 13px; margin-bottom: 10px; color: ${protectionColor}; border-bottom: 1px solid #f5f5f5; padding-bottom: 5px;">${dict.perfSummary}</div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.opexPlaceholder}:</span> <b>Rp${inOpex.value || '0'}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblSellPrice}</span> <b>Rp${inPrice.value || '0'}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.marginPlaceholder}:</span> <b style="color: #ee4d2d;">Rp${inMargin.value || '0'}</b></div>
              
              <div style="background: #fcfcfc; padding: 6px; border-radius: 2px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;"><span>${dict.lblStatusRoas}</span> <b style="color: white; background: ${roasColor}; padding: 2px 6px; border-radius: 3px;">${roasStatus}</b></div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-top: 5px;"><span>${dict.lblStatusCpo}</span> <b style="color: white; background: ${cpoColor}; padding: 2px 6px; border-radius: 3px;">${cpoStatus}</b></div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-top: 5px;"><span>${dict.lblStatusIto}</span> <b style="color: white; background: ${impColor}; padding: 2px 6px; border-radius: 3px;">${impStatus}</b></div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-top: 5px;"><span>${dict.lblStatusCpm}</span> <b style="color: white; background: ${cpmColor}; padding: 2px 6px; border-radius: 3px;">${cpmStatusText}</b></div>
              </div>

              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblTargetRoas}</span> <b>${targetRoasEl ? targetRoasEl.innerText : '0'}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>${dict.lblRoasActual}</span> <b>${getVal(roasActualCell)}</b></div>
              
              <div style="background: #fcfcfc; padding: 6px; border-radius: 2px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px;"><span>${dict.lblTotalImp}</span> <span>${getVal(impCell)}</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 11px;"><span>${dict.lblClicks}</span> <span>${getVal(clickCell)}</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 11px;"><span>${dict.lblConversion}</span> <span>${getVal(orderCell)}</span></div>
              </div>
              
              <div style="display: flex; justify-content: space-between; margin-top: 8px; margin-bottom: 4px;"><span>${dict.lblSales}</span> <b>${getVal(gmvCell)}</b></div>
              <div style="display: flex; justify-content: space-between;"><span>${dict.lblAdCost}</span> <b>${getVal(costCell)}</b></div>
            `;
            summaryTooltip.style.display = 'block';
            const rect = summaryBtn.getBoundingClientRect();
            summaryTooltip.style.top = (rect.top - summaryTooltip.offsetHeight - 8) + 'px';
            summaryTooltip.style.left = rect.left + 'px';
          });
          summaryBtn.addEventListener('mouseleave', () => summaryTooltip.style.display = 'none');

          summaryBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const cleanText = summaryTooltip.innerText.replace(dict.perfSummary + "\n", "");
            navigator.clipboard.writeText(`Produk: ${namaProduk}\n${cleanText}`).then(() => {
              summaryBtn.innerText = 'COPIED';
              summaryBtn.style.background = "#52c41a"; 
              setTimeout(() => {
                summaryBtn.innerText = dict.summaryBtn;
                summaryBtn.style.background = protectionColor; 
              }, 1000);
            });
          });
        } else {
           // Update translations of inputs for existing containers if language changes
           container.querySelector('.input-hpp-field').placeholder = dict.opexPlaceholder;
           container.querySelector('.input-price-field').placeholder = dict.pricePlaceholder;
           container.querySelector('.input-margin-field').placeholder = dict.marginPlaceholder;
           container.querySelector('.ai-summary-btn').innerText = dict.summaryBtn;
        }

        const group = container.querySelector('.inputs-sub-group');
        if (group) group.style.display = isHidden ? 'none' : 'flex';
      }

      if (targetRoasEl) {
        const targetRoasCellNode = targetRoasEl.closest('td');
        if (targetRoasCellNode && !targetRoasCellNode.querySelector('.target-roas-btn')) {
          const targetBtn = document.createElement('span');
          targetBtn.className = 'target-roas-btn custom-extension-added';
          targetBtn.innerText = 'S';
          targetBtn.style.cssText = `display: inline-flex; align-items: center; justify-content: center; margin-left: 6px; background: ${protectionColor}; color: white; font-size: 9px; font-weight: bold; width: 14px; height: 14px; border-radius: 3px; cursor: help; vertical-align: middle;`;
          targetRoasEl.after(targetBtn);

          const roasTooltip = document.createElement('div');
          roasTooltip.className = 'custom-ai-tooltip custom-extension-added';
          roasTooltip.style.cssText = popupStyle;
          document.body.appendChild(roasTooltip);

          targetBtn.addEventListener('mouseenter', () => {
            const jual = parseFloat(fixedRow.querySelector('.input-price-field')?.value.replace(/\./g, "")) || 0;
            const margin = parseFloat(fixedRow.querySelector('.input-margin-field')?.value.replace(/\./g, "")) || 0;
            const roasImpas = (jual > 0 && margin > 0) ? (jual / margin).toFixed(2) : 0;

            roasTooltip.innerHTML = `
              <div style="font-weight: bold; font-size: 13px; margin-bottom: 10px; color: ${protectionColor}; border-bottom: 1px solid #f5f5f5; padding-bottom: 5px; display: flex; align-items: center; gap: 5px;">
                <span>🎯</span> ${dict.roasStrategy}
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.roasImpas}</span> <b>${roasImpas}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.sa} (x${mult.sa}):</span> <b>${(roasImpas * mult.sa).toFixed(2)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.a} (x${mult.a}):</span> <b>${(roasImpas * mult.a).toFixed(2)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.m} (x${mult.m}):</span> <b>${(roasImpas * mult.m).toFixed(2)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.k} (x${mult.k}):</span> <b>${(roasImpas * mult.k).toFixed(2)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;"><span>${dict.s} (x${mult.s}):</span> <b>${(roasImpas * mult.s).toFixed(2)}</b></div>
              <div style="font-size: 9px; color: #ccc; text-align: center; border-top: 1px solid #f5f5f5; padding-top: 6px;">${dict.pluginBy}</div>
            `;

            roasTooltip.style.display = 'block';
            const r = targetBtn.getBoundingClientRect();
            roasTooltip.style.top = (r.top - roasTooltip.offsetHeight - 8) + 'px';
            roasTooltip.style.left = (r.left - 100) + 'px';
          });
          targetBtn.addEventListener('mouseleave', () => roasTooltip.style.display = 'none');
        }
      }

      if (targetRoasEl && roasActualCell) {
        let statusBadge = roasActualCell.querySelector('.roas-status-badge');

        if (!statusBadge) {
          statusBadge = document.createElement('div');
          statusBadge.className = 'roas-status-badge custom-extension-added';
          statusBadge.style.cssText = "font-size: 10px; margin-top: 4px; font-weight: bold; padding: 2px 6px; border-radius: 3px; display: inline-block; color: white; cursor: help;";
          roasActualCell.appendChild(statusBadge);

          statusBadge.addEventListener('mouseenter', () => {
            const targetVal = parseShopeeNumber(targetRoasEl.innerText, false);
            const actualVal = parseShopeeNumber(roasActualCell.querySelector('.report-format-number')?.innerText, false);

            const jual = parseFloat(fixedRow.querySelector('.input-price-field')?.value.replace(/\./g, "")) || 0;
            const margin = parseFloat(fixedRow.querySelector('.input-margin-field')?.value.replace(/\./g, "")) || 0;
            const roasImpas = (jual > 0 && margin > 0) ? (jual / margin) : 0;

            let currentStatusText = dict.statusNoData;
            let statusColor = "#ccc";

            if (actualVal > 0 && roasImpas > 0) {
              if (actualVal >= roasImpas * mult.s) { currentStatusText = dict.statusSaving; statusColor = "#52c41a"; }
              else if (actualVal >= roasImpas * mult.k) { currentStatusText = dict.statusConservative; statusColor = "#52c41a"; }
              else if (actualVal >= roasImpas * mult.m) { currentStatusText = dict.statusModerate; statusColor = "#1890ff"; }
              else if (actualVal >= roasImpas * mult.a) { currentStatusText = dict.statusAggressive; statusColor = "#faad14"; }
              else if (actualVal >= roasImpas * mult.sa) { currentStatusText = dict.statusVeryAggressive; statusColor = "#faad14"; }
              else if (actualVal >= roasImpas) { currentStatusText = dict.statusBreakEven; statusColor = "#fa541c"; }
              else { currentStatusText = dict.statusLoss; statusColor = "#ff4d4f"; }
            } else if (actualVal > 0 && roasImpas === 0) {
              currentStatusText = dict.statusOpexEmpty;
              statusColor = "#888";
            }

            globalAnalysisTooltip.innerHTML = `
              <div style="font-weight: bold; font-size: 13px; margin-bottom: 10px; color: ${protectionColor}; border-bottom: 1px solid #f5f5f5; padding-bottom: 5px; display: flex; align-items: center; gap: 5px;">
                <span>📊</span> ${dict.analysisRoas}
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblTargetRoas}</span> <b>${targetVal.toFixed(2)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.roasImpas}</span> <b>${roasImpas.toFixed(2)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>${dict.lblRoasActual}</span> <b style="color: ${protectionColor};">${actualVal.toFixed(2)}</b></div>
              <hr style="border:none; border-top: 1px dashed #eee; margin: 8px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${dict.lblStatus}</span> 
                <b style="color: white; background: ${statusColor}; padding: 3px 8px; border-radius: 4px; font-size: 10px;">${currentStatusText.toUpperCase()}</b>
              </div>
            `;

            globalAnalysisTooltip.style.display = 'block';
            const r = statusBadge.getBoundingClientRect();
            globalAnalysisTooltip.style.top = (r.top - globalAnalysisTooltip.offsetHeight - 8) + 'px';
            globalAnalysisTooltip.style.left = (r.left - 80) + 'px';
          });

          statusBadge.addEventListener('mouseleave', () => globalAnalysisTooltip.style.display = 'none');
        }

        const targetVal = parseShopeeNumber(targetRoasEl.innerText, false);
        const actualVal = parseShopeeNumber(roasActualCell.querySelector('.report-format-number')?.innerText, false);

        if (actualVal >= targetVal) {
          statusBadge.innerText = dict.statusHealthy;
          statusBadge.style.backgroundColor = "#52c41a";
        } else if (actualVal > 0) {
          statusBadge.innerText = dict.statusWarning;
          statusBadge.style.backgroundColor = "#faad14";
        } else {
          statusBadge.innerText = dict.statusNoData;
          statusBadge.style.backgroundColor = "#ccc";
        }
      }

      if (costCell && orderCell) {
        let cpoBadge = costCell.querySelector('.cpo-status-badge');

        if (!cpoBadge) {
          cpoBadge = document.createElement('div');
          cpoBadge.className = 'cpo-status-badge custom-extension-added';
          cpoBadge.style.cssText = "font-size: 10px; margin-top: 4px; font-weight: bold; padding: 2px 6px; border-radius: 3px; display: inline-block; color: white; cursor: help;";
          costCell.appendChild(cpoBadge);

          cpoBadge.addEventListener('mouseenter', () => {
            const rawCost = costCell.querySelector('.report-format-number')?.innerText || "0";
            const costVal = parseShopeeNumber(rawCost, true);

            const rawOrder = orderCell.querySelector('.report-format-number')?.innerText || "0";
            const orderVal = parseShopeeNumber(rawOrder, true);

            const jualVal = parseFloat(fixedRow.querySelector('.input-price-field')?.value.replace(/\./g, "")) || 0;
            const marginVal = parseFloat(fixedRow.querySelector('.input-margin-field')?.value.replace(/\./g, "")) || 0;

            let cpo = orderVal > 0 ? costVal / orderVal : costVal;
            let cpoPercent = jualVal > 0 ? (cpo / jualVal) * 100 : 0;

            let sisaMargin = marginVal - cpo;
            let sisaMarginColor = sisaMargin >= 0 ? "#52c41a" : "#ff4d4f";
            let sisaMarginText = sisaMargin >= 0 ? `+Rp${formatRupiah(sisaMargin.toFixed(0))}` : `-Rp${formatRupiah(Math.abs(sisaMargin).toFixed(0))}`;

            let statusText = dict.statusNoData;
            let statusColor = "#ccc";

            if (jualVal === 0) {
              statusText = dict.statusPriceEmpty;
              statusColor = "#888";
            } else if (costVal === 0) {
              statusText = dict.statusNoCostYet;
              statusColor = "#ccc";
            } else if (orderVal === 0 && costVal > 0) {
              statusText = dict.statusDanger0Conv;
              statusColor = "#ff4d4f";
            } else {
              if (cpoPercent <= cpoLimit.sehat) {
                statusText = dict.statusHealthy;
                statusColor = "#52c41a";
              } else if (cpoPercent <= cpoLimit.waspada) {
                statusText = dict.statusWarning;
                statusColor = "#faad14";
              } else {
                statusText = dict.statusDanger;
                statusColor = "#ff4d4f";
              }
            }

            globalAnalysisTooltip.innerHTML = `
              <div style="font-weight: bold; font-size: 13px; margin-bottom: 10px; color: ${protectionColor}; border-bottom: 1px solid #f5f5f5; padding-bottom: 5px; display: flex; align-items: center; gap: 5px;">
                <span>📈</span> ${dict.analysisCpo}
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblAdCost}</span> <b>Rp${formatRupiah(costVal.toFixed(0))}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblConversion}</span> <b>${orderVal}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblCpo}</span> <b>Rp${formatRupiah(cpo.toFixed(0))}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblProductMargin}</span> <b>Rp${formatRupiah(marginVal.toFixed(0))}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>${dict.lblMarginCpo}</span> <b style="color: ${sisaMarginColor};">${sisaMarginText}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 11px;"><span>${dict.lblRatioPrice}</span> <b style="color: ${statusColor};">${cpoPercent.toFixed(2)}%</b></div>
              <hr style="border:none; border-top: 1px dashed #eee; margin: 8px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${dict.lblStatus}</span> 
                <b style="color: white; background: ${statusColor}; padding: 3px 8px; border-radius: 4px; font-size: 10px;">${statusText}</b>
              </div>
            `;

            globalAnalysisTooltip.style.display = 'block';
            const r = cpoBadge.getBoundingClientRect();
            globalAnalysisTooltip.style.top = (r.top - globalAnalysisTooltip.offsetHeight - 8) + 'px';
            globalAnalysisTooltip.style.left = (r.left - 80) + 'px';
          });

          cpoBadge.addEventListener('mouseleave', () => globalAnalysisTooltip.style.display = 'none');
        }

        const costVal = parseShopeeNumber(costCell.querySelector('.report-format-number')?.innerText, true);
        const orderVal = parseShopeeNumber(orderCell.querySelector('.report-format-number')?.innerText, true);
        const jualVal = parseFloat(fixedRow.querySelector('.input-price-field')?.value.replace(/\./g, "")) || 0;

        let cpo = orderVal > 0 ? costVal / orderVal : costVal;
        let cpoPercent = jualVal > 0 ? (cpo / jualVal) * 100 : 0;

        let badgeText = dict.statusNoData;
        let badgeColor = "#ccc";

        if (jualVal === 0) {
          badgeText = dict.statusPriceEmpty2;
          badgeColor = "#888";
        } else if (costVal === 0) {
          badgeText = dict.statusSafe;
          badgeColor = "#ccc";
        } else if (orderVal === 0 && costVal > 0) {
          badgeText = dict.statusDanger;
          badgeColor = "#ff4d4f";
        } else {
          if (cpoPercent <= cpoLimit.sehat) { badgeText = dict.statusHealthy; badgeColor = "#52c41a"; }
          else if (cpoPercent <= cpoLimit.waspada) { badgeText = dict.statusWarning; badgeColor = "#faad14"; }
          else { badgeText = dict.statusDanger; badgeColor = "#ff4d4f"; }
        }

        cpoBadge.innerText = badgeText;
        cpoBadge.style.backgroundColor = badgeColor;
      }

      if (impCell && orderCell) {
        let impBadge = impCell.querySelector('.imp-status-badge');

        if (!impBadge) {
          impBadge = document.createElement('div');
          impBadge.className = 'imp-status-badge custom-extension-added';
          impBadge.style.cssText = "font-size: 10px; margin-top: 4px; font-weight: bold; padding: 2px 6px; border-radius: 3px; display: inline-block; color: white; cursor: help;";
          impCell.appendChild(impBadge);

          impBadge.addEventListener('mouseenter', () => {
            const rawImp = impCell.querySelector('.report-format-number')?.innerText || "0";
            const impVal = parseShopeeNumber(rawImp, true);

            const rawOrder = orderCell.querySelector('.report-format-number')?.innerText || "0";
            const orderVal = parseShopeeNumber(rawOrder, true);

            const rawCost = costCell?.querySelector('.report-format-number')?.innerText || "0";
            const costVal = parseShopeeNumber(rawCost, true);

            let cpmVal = impVal > 0 ? (costVal / impVal) * 1000 : 0;
            let orderPer1k = impVal > 0 ? (orderVal / impVal) * 1000 : 0;

            let statusText = dict.statusNoData;
            let statusColor = "#ccc";
            let subText = "";

            if (impVal === 0) {
              statusText = dict.statusNotAired;
              statusColor = "#ccc";
            } else {
              if (orderPer1k >= itoLimit.sehat) {
                statusText = dict.statusHealthy;
                statusColor = "#52c41a";
                subText = dict.subProfit;
              } else if (orderPer1k >= itoLimit.waspada && orderPer1k < itoLimit.sehat) {
                statusText = dict.statusWarning;
                statusColor = "#faad14";
                subText = dict.subBep;
              } else {
                statusText = dict.statusDanger;
                statusColor = "#ff4d4f";
                subText = dict.subLoss;
              }
            }

            const marginVal = parseFloat(fixedRow.querySelector('.input-margin-field')?.value.replace(/\./g, "")) || 0;
            let targetCpm = orderPer1k * marginVal;

            let cpmStatusText = dict.statusNoData;
            let cpmStatusColor = "#ccc";

            if (marginVal === 0) {
              cpmStatusText = dict.statusMarginEmpty;
              cpmStatusColor = "#888";
            } else if (impVal > 0) {
              if (cpmVal < targetCpm) {
                cpmStatusText = dict.statusHealthy;
                cpmStatusColor = "#52c41a";
              } else {
                cpmStatusText = dict.statusDanger;
                cpmStatusColor = "#ff4d4f";
              }
            }

            globalAnalysisTooltip.innerHTML = `
              <div style="font-weight: bold; font-size: 13px; margin-bottom: 10px; color: ${protectionColor}; border-bottom: 1px solid #f5f5f5; padding-bottom: 5px; display: flex; align-items: center; gap: 5px;">
                <span>👁️</span> ${dict.analysisImp}
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblTotalImp}</span> <b>${formatRupiah(impVal)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblTotalOrder}</span> <b>${orderVal}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblOrder1k}</span> <b style="color: ${statusColor};">${orderPer1k.toFixed(2)}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>${dict.lblCost1k}</span> <b>Rp${formatRupiah(cpmVal.toFixed(0))}</b></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 11px;"><span>${dict.lblMaxCpm}</span> <b>Rp${formatRupiah(targetCpm.toFixed(0))}</b></div>
              <hr style="border:none; border-top: 1px dashed #eee; margin: 8px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span>${dict.lblStatusIto}</span> 
                <div style="text-align: right;">
                  <div style="color: white; background: ${statusColor}; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; display: inline-block;">${statusText}</div>
                  <div style="font-size: 9px; color: #888; margin-top: 4px;">${subText}</div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${dict.lblStatusCpm}</span> 
                <div style="text-align: right;">
                  <div style="color: white; background: ${cpmStatusColor}; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; display: inline-block;">${cpmStatusText}</div>
                </div>
              </div>
            `;

            globalAnalysisTooltip.style.display = 'block';
            const r = impBadge.getBoundingClientRect();
            globalAnalysisTooltip.style.top = (r.top - globalAnalysisTooltip.offsetHeight - 8) + 'px';
            globalAnalysisTooltip.style.left = (r.left - 80) + 'px';
          });

          impBadge.addEventListener('mouseleave', () => globalAnalysisTooltip.style.display = 'none');
        }

        const rawImp = impCell.querySelector('.report-format-number')?.innerText || "0";
        const impVal = parseShopeeNumber(rawImp, true);
        const rawOrder = orderCell.querySelector('.report-format-number')?.innerText || "0";
        const orderVal = parseShopeeNumber(rawOrder, true);

        let orderPer1k = impVal > 0 ? (orderVal / impVal) * 1000 : 0;

        let badgeText = dict.statusNoData;
        let badgeColor = "#ccc";

        if (impVal === 0) {
          badgeText = dict.status0Aired;
          badgeColor = "#ccc";
        } else {
          if (orderPer1k >= itoLimit.sehat) { badgeText = dict.statusHealthy; badgeColor = "#52c41a"; }
          else if (orderPer1k >= itoLimit.waspada && orderPer1k < itoLimit.sehat) { badgeText = dict.statusWarning; badgeColor = "#faad14"; }
          else { badgeText = dict.statusDanger; badgeColor = "#ff4d4f"; }
        }

        impBadge.innerText = badgeText;
        impBadge.style.backgroundColor = badgeColor;
      }
    });
  });
}

setInterval(updateShopeeAdsDashboard, 3000);