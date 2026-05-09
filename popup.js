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
btnExport.addEventListener('click', () => {
  chrome.storage.local.get(null, (items) => {
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Backup_Shopee_Tracker_${new Date().toISOString().slice(0, 10)}.json`;
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
      const importedData = JSON.parse(event.target.result);
      chrome.storage.local.set(importedData, () => {
        btnImport.innerText = "✅ Sukses!";
        btnImport.style.background = "#52c41a";
        btnImport.style.color = "white";
        setTimeout(() => {
          alert("Data berhasil direstore! Silakan Refresh halaman Shopee Anda.");
          location.reload(); 
        }, 500);
      });
    } catch (err) {
      alert("Gagal Import! Pastikan file yang dipilih adalah file Backup berformat .json yang benar.");
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