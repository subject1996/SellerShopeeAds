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

// Daftar ID input untuk ROAS dan CPO
const inputsROAS = ['m_s_agresif', 'm_agresif', 'm_moderat', 'm_konservatif', 'm_saving'];
const inputsCPO = ['cpo_sehat', 'cpo_waspada'];
const inputsITO = ['ito_sehat', 'ito_waspada'];
const allInputs = [...inputsROAS, ...inputsCPO, ...inputsITO];

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
  btnSettings.innerText = isDisplayed ? '⚙️ ROAS Strategy Settings' : '🔼 Close ROAS Settings';
  updateBackupVisibility();
});

// Toggle Menu CPO
btnSettingsCPO.addEventListener('click', () => {
  const isDisplayed = settingsContentCPO.style.display === 'block';
  settingsContentCPO.style.display = isDisplayed ? 'none' : 'block';
  btnSettingsCPO.innerText = isDisplayed ? '⚙️ CPO Strategy Settings' : '🔼 Close CPO Settings';
  updateBackupVisibility();
});

// Toggle Menu ITO
btnSettingsITO.addEventListener('click', () => {
  const isDisplayed = settingsContentITO.style.display === 'block';
  settingsContentITO.style.display = isDisplayed ? 'none' : 'block';
  btnSettingsITO.innerText = isDisplayed ? '⚙️ Impression-to-Order Settings' : '🔼 Close ITO Settings';
  updateBackupVisibility();
});

// Load data saat popup dibuka
chrome.storage.local.get(['isActive', 'hideInputs', 'hideExportCSV', ...allInputs], (result) => {
  checkbox.checked = result.isActive !== false;
  hideCheckbox.checked = result.hideInputs === true;
  hideCsvCheckbox.checked = result.hideExportCSV === true;
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
const settingsKeys = ['isActive', 'hideInputs', 'hideExportCSV', ...allInputs];

btnExport.addEventListener('click', () => {
  chrome.storage.local.get(null, (items) => {
    let csvContent = "Nama Produk,OPEX,Harga Jual,Margin\n";
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
        btnImport.innerText = "✅ Sukses!";
        btnImport.style.background = "#52c41a";
        btnImport.style.color = "white";
        setTimeout(() => {
          alert("Data Produk berhasil di-import! Silakan Refresh halaman Shopee Anda.");
          location.reload(); 
        }, 500);
      });
    } catch (err) {
      alert("Gagal Import! Pastikan format CSV sesuai (Nama Produk, OPEX, Harga Jual, Margin).");
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