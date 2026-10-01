/* ==========================================================================
   WEDA QUEST - LOGIKA HALAMAN MATERI (RENDER SEMUA 7 ALIRAN DARSANA)
   ========================================================================== */

// Array daftar menu materi lengkap (7 Bagian Utama)
const ALL_MATERI_LIST = [
    {
        id: "pengantar",
        code: "gate",
        icon: "fa-door-open",
        title: "BAB 1: Pengantar Darsana",
        summary1Min: "Darsana berasal dari akar kata 'Drś' (melihat/memahami). Darsana adalah cara pandang ilmiah-spiritual Hindu untuk memahami kebenaran dan mengakhiri penderitaan (Duhkha). Terbagi dua: Astika (Menerima Weda) dan Nastika (Menolak Weda).",
        subtopics: DARSANA_DATA.chapters[0].subtopics
    },
    {
        id: "nyaya",
        code: "nyaya",
        icon: "fa-brain",
        title: "1. Nyaya Darsana (Logika)",
        summary1Min: "Dipelopori Maharsi Gautama. Berfokus pada sistem logika rasional dan 4 Catur Pramana (Pratyaksa, Anumana, Upamana, Sabda) untuk memperoleh pengetahuan yang benar (Prama).",
        subtopics: [DARSANA_DATA.chapters[1].subtopics[0]]
    },
    {
        id: "waisesika",
        code: "waisesika",
        icon: "fa-atom",
        title: "2. Waisesika Darsana (Atom)",
        summary1Min: "Dipelopori Maharsi Kanada. Mengajarkan bahwa semesta terbentuk dari unit terkecil yang tidak terbagi yaitu Atom (Anu), serta membagi realitas ke dalam 7 Padartha.",
        subtopics: [DARSANA_DATA.chapters[1].subtopics[1]]
    },
    {
        id: "samkhya",
        code: "samkhya",
        icon: "fa-yin-yang",
        title: "3. Samkhya Darsana (Dualisme)",
        summary1Min: "Dipelopori Maharsi Kapila. Berfokus pada dualisme realistis antara Purusa (Kesadaran Abadi) dan Prakerti (Materi/Tri Guna) melalui 25 Tattwa.",
        subtopics: [DARSANA_DATA.chapters[1].subtopics[2]]
    },
    {
        id: "yoga",
        code: "yoga",
        icon: "fa-spa",
        title: "4. Yoga Darsana (Meditasi)",
        summary1Min: "Dipelopori Maharsi Patanjali. Berfokus pada praktik 'Yogas Citta Vritti Nirodha' (mengendalikan gejolak pikiran) melalui disiplin 8 Tangga Astangga Yoga.",
        subtopics: [DARSANA_DATA.chapters[1].subtopics[3]]
    },
    {
        id: "mimamsa",
        code: "mimamsa",
        icon: "fa-scroll",
        title: "5. Mimamsa Darsana (Ritual)",
        summary1Min: "Dipelopori Maharsi Jaimini (Purwa Mimamsa). Menekankan kewajiban pelaksanaan Dharma, keagungan Weda, Yajna, dan potensi pahala gaib (Apurva).",
        subtopics: [DARSANA_DATA.chapters[1].subtopics[4]]
    },
    {
        id: "vedanta",
        code: "vedanta",
        icon: "fa-sun",
        title: "6. Wedanta Darsana (Filsafat)",
        summary1Min: "Dipelopori Maharsi Badarayana/Wyasa (Uttara Mimamsa). Puncak filsafat Upanisad tentang Brahman, Atman, dan Moksa. Terbagi menjadi Advaita, Visistadvaita, dan Dvaita.",
        subtopics: [DARSANA_DATA.chapters[1].subtopics[5]]
    }
];

let activeMateriIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Cek parameter URL jika datang dari Peta Quest (misal: materi.html?bab=yoga)
    const urlParams = new URLSearchParams(window.location.search);
    const babParam = urlParams.get('bab');

    if (babParam) {
        const foundIdx = ALL_MATERI_LIST.findIndex(m => m.code === babParam || m.id === babParam);
        if (foundIdx !== -1) {
            activeMateriIndex = foundIdx;
        }
    }

    renderSidebarMenu();
    displayMateri(activeMateriIndex);
});

// Render tombol sidebar untuk SEMUA 7 materi
function renderSidebarMenu() {
    const menuList = document.getElementById('materiMenuList');
    if (!menuList) return;

    menuList.innerHTML = '';
    ALL_MATERI_LIST.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = `materi-menu-btn ${index === activeMateriIndex ? 'active' : ''}`;
        btn.innerHTML = `<i class="fa-solid ${item.icon}"></i> ${item.title}`;
        btn.onclick = () => {
            activeMateriIndex = index;
            updateSidebarActiveState();
            displayMateri(index);
        };
        menuList.appendChild(btn);
    });
}

function updateSidebarActiveState() {
    const btns = document.querySelectorAll('.materi-menu-btn');
    btns.forEach((btn, idx) => {
        if (idx === activeMateriIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Tampilkan isi materi sesuai indeks tombol yang diklik
function displayMateri(index) {
    const display = document.getElementById('materiContentDisplay');
    if (!display) return;

    const materi = ALL_MATERI_LIST[index];
    const isCompleted = appState.progress.readMaterials.includes(materi.id);

    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
            <h2 style="color: var(--secondary-dark); font-size: 1.8rem;"><i class="fa-solid ${materi.icon}" style="color:var(--primary-gold);"></i> ${materi.title}</h2>
            ${isCompleted ? '<span style="background:#D1FAE5; color:#10B981; padding: 6px 12px; border-radius:20px; font-size:0.85rem; font-weight:700;"><i class="fa-solid fa-check-circle"></i> Selesai Dibaca</span>' : ''}
        </div>

        <div class="quick-1min-box">
            <h4><i class="fa-solid fa-clock"></i> PAHAMI DALAM 1 MENIT:</h4>
            <p>${materi.summary1Min}</p>
        </div>
    `;

    materi.subtopics.forEach(sub => {
        html += `
            <div class="subtopic-block">
                <h3>${sub.title}</h3>
                <div>${sub.content}</div>
            </div>
        `;
    });

    // Tombol aksi dan navigasi bawah
    const prevIdx = index > 0 ? index - 1 : null;
    const nextIdx = index < ALL_MATERI_LIST.length - 1 ? index + 1 : null;

    html += `
        <div class="materi-footer-nav">
            <div>
                ${prevIdx !== null 
                    ? `<button class="btn btn-secondary" onclick="navigateMateri(${prevIdx})"><i class="fa-solid fa-arrow-left"></i> ${ALL_MATERI_LIST[prevIdx].title.split(':')[0]}</button>` 
                    : ''}
            </div>
            <div>
                <button class="btn btn-primary ${isCompleted ? 'btn-secondary' : ''}" onclick="completeMateri('${materi.id}')">
                    <i class="fa-solid ${isCompleted ? 'fa-check' : 'fa-graduation-cap'}"></i> ${isCompleted ? 'Sudah Selesai (+50 XP)' : 'Tandai Selesai (+50 XP)'}
                </button>
            </div>
            <div>
                ${nextIdx !== null 
                    ? `<button class="btn btn-primary" onclick="navigateMateri(${nextIdx})">${ALL_MATERI_LIST[nextIdx].title.split(':')[0]} <i class="fa-solid fa-arrow-right"></i></button>` 
                    : ''}
            </div>
        </div>
    `;

    display.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateMateri(newIndex) {
    activeMateriIndex = newIndex;
    updateSidebarActiveState();
    displayMateri(newIndex);
}

function completeMateri(materiId) {
    if (!appState.progress.readMaterials.includes(materiId)) {
        appState.progress.readMaterials.push(materiId);
        addXP(50);
        alert("🎉 Luar Biasa! Anda telah menyelesaikan modul ini dan mendapatkan +50 XP!");
        displayMateri(activeMateriIndex);
    } else {
        alert("Anda sudah menyelesaikan modul ini sebelumnya.");
    }
}