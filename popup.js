const checkbox = document.getElementById('toggleStatus');
const hideCheckbox = document.getElementById('hideInputs');
const hideCsvCheckbox = document.getElementById('hideExportCSV');

const btnSettings = document.getElementById('btnSettings');
const settingsContent = document.getElementById('settingsContent');

const btnSettingsCPO = document.getElementById('btnSettingsCPO');
const settingsContentCPO = document.getElementById('settingsContentCPO');

const btnSettingsITO = document.getElementById('btnSettingsITO');
const settingsContentITO = document.getElementById('settingsContentITO');

const backupContent = document.getElementById('backupContent');
const btnExport = document.getElementById('btnExport');
const btnImport = document.getElementById('btnImport');
const fileImport = document.getElementById('fileImport');

const inputsROAS = ['m_s_agresif', 'm_agresif', 'm_moderat', 'm_konservatif', 'm_saving'];
const inputsCPO = ['cpo_sehat', 'cpo_waspada'];
const inputsITO = ['ito_sehat', 'ito_waspada'];
const allInputs = [...inputsROAS, ...inputsCPO, ...inputsITO];

const langSelect = document.getElementById('langSelect');
let currentLang = 'en';

const i18nPopup = {
  en: {
    lblLang: "Language",
    csvHeader: "Product Name,OPEX,Selling Price,Margin\n",
    lblExtStatus: "Extension Status",
    lblHideInputs: "Hide Inputs Info",
    lblHideCsv: "Hide Export CSV",
    btnSettingsRoas: "⚙️ ROAS Strategy Settings",
    btnSettingsRoasClose: "🔼 Close ROAS Settings",
    lblRoasSa: "Very Aggressive",
    lblRoasA: "Aggressive",
    lblRoasM: "Moderate",
    lblRoasK: "Conservative",
    lblRoasS: "Saving",
    btnSettingsCpo: "⚙️ CPO Strategy Settings",
    btnSettingsCpoClose: "🔼 Close CPO Settings",
    lblCpoSehat: "Healthy Limit (≤ %)",
    lblCpoWaspada: "Warning Limit (≤ %)",
    lblCpoDesc: "*More than Warning Limit = DANGER",
    btnSettingsIto: "⚙️ Impression-to-Order Settings",
    btnSettingsItoClose: "🔼 Close ITO Settings",
    lblItoSehat: "Healthy Limit (≥ Order/1K)",
    lblItoWaspada: "Warning Limit (≥ Order/1K)",
    lblItoDesc: "*Less than Warning Limit = DANGER",
    lblBackupDesc: "📊 Bulk Edit Product Data (CSV)",
    btnExportText: "📥 Export CSV",
    btnImportText: "📤 Import CSV",
    lblBackupWarn: "<b>⚠️ IMPORTANT:</b> Do not use comma (,) for nominal numbers in Excel to avoid CSV corruption.",
    btnSupportText: "❤️ Support Extension Development",
    alertImportSuccess: "Product Data successfully imported! Please Refresh your Shopee page.",
    alertImportFail: "Import Failed! Make sure CSV format is correct (Product Name, OPEX, Selling Price, Margin).",
    btnImportSuccess: "✅ Success!"
  },
  id: {
    lblLang: "Bahasa",
    csvHeader: "Nama Produk,OPEX,Harga Jual,Margin\n",
    lblExtStatus: "Extension Status",
    lblHideInputs: "Hide Inputs Info",
    lblHideCsv: "Hide Export CSV",
    btnSettingsRoas: "⚙️ ROAS Strategy Settings",
    btnSettingsRoasClose: "🔼 Close ROAS Settings",
    lblRoasSa: "Sangat Agresif",
    lblRoasA: "Agresif",
    lblRoasM: "Moderat",
    lblRoasK: "Konservatif",
    lblRoasS: "Saving",
    btnSettingsCpo: "⚙️ CPO Strategy Settings",
    btnSettingsCpoClose: "🔼 Close CPO Settings",
    lblCpoSehat: "Batas Sehat (≤ %)",
    lblCpoWaspada: "Batas Waspada (≤ %)",
    lblCpoDesc: "*Lebih dari Batas Waspada = BAHAYA",
    btnSettingsIto: "⚙️ Impression-to-Order Settings",
    btnSettingsItoClose: "🔼 Close ITO Settings",
    lblItoSehat: "Batas Sehat (≥ Order/1K)",
    lblItoWaspada: "Batas Waspada (≥ Order/1K)",
    lblItoDesc: "*Kurang dari Batas Waspada = BAHAYA",
    lblBackupDesc: "📊 Bulk Edit Data Produk (CSV)",
    btnExportText: "📥 Export CSV",
    btnImportText: "📤 Import CSV",
    lblBackupWarn: "<b>⚠️ PENTING:</b> Jangan gunakan tanda koma (,) pada angka nominal di Excel agar format CSV tidak rusak.",
    btnSupportText: "❤️ Bantu Kembangkan Ekstensi",
    alertImportSuccess: "Data Produk berhasil di-import! Silakan Refresh halaman Shopee Anda.",
    alertImportFail: "Gagal Import! Pastikan format CSV sesuai (Nama Produk, OPEX, Harga Jual, Margin).",
    btnImportSuccess: "✅ Sukses!"
  }
};

function applyLanguage(lang) {
  currentLang = lang;
  const dict = i18nPopup[lang];
  document.getElementById('langLabel').innerText = dict.lblLang;
  document.getElementById('lblExtStatus').innerText = dict.lblExtStatus;
  document.getElementById('lblHideInputs').innerText = dict.lblHideInputs;
  document.getElementById('lblHideCsv').innerText = dict.lblHideCsv;
  
  if (settingsContent.style.display === 'block') {
    btnSettings.innerText = dict.btnSettingsRoasClose;
  } else {
    btnSettings.innerText = dict.btnSettingsRoas;
  }
  document.getElementById('lblRoasSa').innerText = dict.lblRoasSa;
  document.getElementById('lblRoasA').innerText = dict.lblRoasA;
  document.getElementById('lblRoasM').innerText = dict.lblRoasM;
  document.getElementById('lblRoasK').innerText = dict.lblRoasK;
  document.getElementById('lblRoasS').innerText = dict.lblRoasS;

  if (settingsContentCPO.style.display === 'block') {
    btnSettingsCPO.innerText = dict.btnSettingsCpoClose;
  } else {
    btnSettingsCPO.innerText = dict.btnSettingsCpo;
  }
  document.getElementById('lblCpoSehat').innerText = dict.lblCpoSehat;
  document.getElementById('lblCpoWaspada').innerText = dict.lblCpoWaspada;
  document.getElementById('lblCpoDesc').innerText = dict.lblCpoDesc;

  if (settingsContentITO.style.display === 'block') {
    btnSettingsITO.innerText = dict.btnSettingsItoClose;
  } else {
    btnSettingsITO.innerText = dict.btnSettingsIto;
  }
  document.getElementById('lblItoSehat').innerText = dict.lblItoSehat;
  document.getElementById('lblItoWaspada').innerText = dict.lblItoWaspada;
  document.getElementById('lblItoDesc').innerText = dict.lblItoDesc;

  document.getElementById('lblBackupDesc').innerText = dict.lblBackupDesc;
  document.getElementById('btnExport').innerText = dict.btnExportText;
  document.getElementById('btnImport').innerText = dict.btnImportText;
  document.getElementById('lblBackupWarn').innerHTML = dict.lblBackupWarn;
  document.getElementById('btnSupport').innerText = dict.btnSupportText;
}

langSelect.addEventListener('change', (e) => {
  chrome.storage.local.set({ extLang: e.target.value });
  applyLanguage(e.target.value);
});

// Fungsi untuk mengecek apakah backup harus disembunyikan
function updateBackupVisibility() {
  const isRoasOpen = settingsContent.style.display === 'block';
  const isCpoOpen = settingsContentCPO.style.display === 'block';
  const isItoOpen = settingsContentITO.style.display === 'block';
  backupContent.style.display = (isRoasOpen || isCpoOpen || isItoOpen) ? 'none' : 'block';
}

// Toggle Menu ROAS
btnSettings.addEventListener('click', () => {
  const isDisplayed = settingsContent.style.display === 'block';
  settingsContent.style.display = isDisplayed ? 'none' : 'block';
  btnSettings.innerText = isDisplayed ? i18nPopup[currentLang].btnSettingsRoas : i18nPopup[currentLang].btnSettingsRoasClose;
  updateBackupVisibility();
});

// Toggle Menu CPO
btnSettingsCPO.addEventListener('click', () => {
  const isDisplayed = settingsContentCPO.style.display === 'block';
  settingsContentCPO.style.display = isDisplayed ? 'none' : 'block';
  btnSettingsCPO.innerText = isDisplayed ? i18nPopup[currentLang].btnSettingsCpo : i18nPopup[currentLang].btnSettingsCpoClose;
  updateBackupVisibility();
});

// Toggle Menu ITO
btnSettingsITO.addEventListener('click', () => {
  const isDisplayed = settingsContentITO.style.display === 'block';
  settingsContentITO.style.display = isDisplayed ? 'none' : 'block';
  btnSettingsITO.innerText = isDisplayed ? i18nPopup[currentLang].btnSettingsIto : i18nPopup[currentLang].btnSettingsItoClose;
  updateBackupVisibility();
});

// Load data saat popup dibuka
chrome.storage.local.get(['isActive', 'hideInputs', 'hideExportCSV', 'extLang', ...allInputs], (result) => {
  checkbox.checked = result.isActive !== false;
  hideCheckbox.checked = result.hideInputs === true;
  hideCsvCheckbox.checked = result.hideExportCSV === true;
  
  if (result.extLang) {
    langSelect.value = result.extLang;
    applyLanguage(result.extLang);
  } else {
    langSelect.value = 'en';
    applyLanguage('en');
  }

  allInputs.forEach(id => {
    if (result[id]) document.getElementById(id).value = result[id];
  });
});

// Save Switch Status
checkbox.addEventListener('change', () => chrome.storage.local.set({ isActive: checkbox.checked }));
hideCheckbox.addEventListener('change', () => chrome.storage.local.set({ hideInputs: hideCheckbox.checked }));
hideCsvCheckbox.addEventListener('change', () => chrome.storage.local.set({ hideExportCSV: hideCsvCheckbox.checked }));

// Save semua input otomatis
allInputs.forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => {
    chrome.storage.local.set({ [id]: e.target.value });
  });
});

// --- LOGIKA EXPORT & IMPORT ---
const settingsKeys = ['isActive', 'hideInputs', 'hideExportCSV', 'extLang', ...allInputs];

btnExport.addEventListener('click', () => {
  chrome.storage.local.get(null, (items) => {
    const dict = i18nPopup[currentLang];
    let csvContent = dict.csvHeader;
    for (let key in items) {
      if (!settingsKeys.includes(key)) {
        const data = items[key];
        if (data && typeof data === 'object') {
          const pName = key.replace(/"/g, '""');
          csvContent += `"${pName}",${data.hpp || '0'},${data.price || '0'},${data.margin || '0'}\n`;
        }
      }
    }
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Data_Produk_Shopee_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});

btnImport.addEventListener('click', () => fileImport.click());

fileImport.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const text = event.target.result;
      const lines = text.split('\n');
      const newData = {};
      
      if (lines.length > 0) {
        const separator = lines[0].includes(';') ? ';' : ',';

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          let parts = [];
          let inQuotes = false;
          let currentPart = '';
          for(let char of line) {
            if (char === '"') inQuotes = !inQuotes;
            else if (char === separator && !inQuotes) {
              parts.push(currentPart);
              currentPart = '';
            } else {
              currentPart += char;
            }
          }
          parts.push(currentPart);

          if (parts.length >= 4) {
            let name = parts[0].trim();
            if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, -1).replace(/""/g, '"');
            
            let hpp = parts[1].replace(/[^0-9]/g, '') || "0";
            let price = parts[2].replace(/[^0-9]/g, '') || "0";
            let margin = parts[3].replace(/[^0-9]/g, '') || "0";
            
            newData[name] = { hpp, price, margin };
          }
        }
      }
      
      chrome.storage.local.set(newData, () => {
        const dict = i18nPopup[currentLang];
        btnImport.innerText = dict.btnImportSuccess;
        btnImport.style.background = "#52c41a";
        btnImport.style.color = "white";
        setTimeout(() => {
          alert(dict.alertImportSuccess);
          location.reload(); 
        }, 500);
      });
    } catch (err) {
      const dict = i18nPopup[currentLang];
      alert(dict.alertImportFail);
      fileImport.value = ""; 
    }
  };
  reader.readAsText(file);
});

// Support Button
const btnSupport = document.getElementById('btnSupport');
if (btnSupport) {
  btnSupport.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://trakteer.id/fitroh_satrio/' });
  });
}