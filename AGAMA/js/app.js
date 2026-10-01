/* ==========================================================================
   WEDA QUEST - APP CORE & LOCAL STORAGE MANAGER
   ========================================================================== */

const STORAGE_KEY = 'weda_quest_darsana_state';

// State Default
let appState = {
    userProfile: {
        name: "Penjelajah Kebijaksanaan",
        class: "XI SMA",
        school: "SMA Negeri Nusantara",
        avatar: "fa-shield-halved"
    },
    progress: {
        xp: 0,
        level: 1,
        completedQuests: [1], // Quest 1 default terbuka
        readMaterials: [],
        masteredFlashcards: [],
        gemsCollected: { nyaya: false, waisesika: false, samkhya: false, yoga: false, mimamsa: false, vedanta: false },
        badges: ["Penjelajah Darsana"]
    },
    quizHistory: { tryoutScore: 0, completedQuizzes: [] }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadAppState();
    setupNavigation();
    updateGlobalDashboard();
});

function loadAppState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try { appState = JSON.parse(saved); } catch(e) { console.error("Err loading state", e); }
    } else {
        saveAppState();
    }
}

function saveAppState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    updateGlobalDashboard();
}

function addXP(amount) {
    appState.progress.xp += amount;
    // Check Level Up (Every 200 XP = 1 Level)
    const newLevel = Math.floor(appState.progress.xp / 200) + 1;
    if (newLevel > appState.progress.level) {
        appState.progress.level = newLevel;
        alert(`🎉 SELAMAT! Anda naik ke LEVEL ${newLevel}! Kebijaksanaan Anda meningkat!`);
    }
    saveAppState();
}

function updateGlobalDashboard() {
    const dashName = document.getElementById('dashUserName');
    const dashSchool = document.getElementById('dashUserSchool');
    const dashXpText = document.getElementById('dashXpText');
    const dashXpBar = document.getElementById('dashXpBar');
    const dashLevel = document.getElementById('dashLevelBadge');

    if (dashName) dashName.textContent = appState.userProfile.name;
    if (dashSchool) dashSchool.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${appState.userProfile.school}`;
    if (dashXpText) dashXpText.textContent = `${appState.progress.xp} XP`;
    if (dashLevel) dashLevel.textContent = `Lvl ${appState.progress.level}`;
    
    if (dashXpBar) {
        const pct = Math.min((appState.progress.xp % 200) / 2, 100);
        dashXpBar.style.width = `${pct}%`;
    }
}

function setupNavigation() {
    const toggleBtn = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}