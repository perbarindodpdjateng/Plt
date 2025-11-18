/* ---------- konfigurasi paginasi ---------- */
const rowsPerPage = 25;
let currentPage   = 1;
/* ----------------------------------------- */

let previousData = '';
let lastRendered = [];
let originalData = [];

async function fetchData() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxAkCtFD1iHQcpJDrjlZE4EZhqHqVn0asvbeEhXNGORlNipbvacV84rnGsajR-ezCE3/exec', {
      cache: 'no-store'
    });
    const data = await response.json();
    const dataString = JSON.stringify(data);

    if (dataString !== previousData) {
      previousData = dataString;
      originalData = data;
      currentPage  = 1;               // reset ke hal-1 tiap data baru
      renderTable();
    }
    document.getElementById("loading").style.display = "none";
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("loading").textContent = "Gagal memuat data.";
  }
}

/* ---------- fungsi utama render ---------- */
function renderTable() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  /* filter berdasarkan search (kecuali header) */
  let filtered = originalData.filter((row, idx) => {
    if (idx === 0) return true;               // header selalu ikut
    return row.join(" ").toLowerCase().includes(search);
  });

  /* pecah per halaman */
  const header   = filtered[0];
  const bodyRows = filtered.slice(1);
  const totalPg  = Math.max(1, Math.ceil(bodyRows.length / rowsPerPage));

  /* jaga currentPage agar tidak overflow */
  if (currentPage > totalPg) currentPage = totalPg;

  const start    = (currentPage - 1) * rowsPerPage;
  const end      = start + rowsPerPage;
  const pageRows = [header, ...bodyRows.slice(start, end)];

  renderTablePage(pageRows);   // tampilkan ke table
  renderPagination(totalPg);   // tampilkan tombol
}

/* ---------- render isi table ---------- */
function renderTablePage(pageRows) {
  const thead = document.querySelector("#dataTable thead");
  const tbody = document.querySelector("#dataTable tbody");
  thead.innerHTML = "";
  tbody.innerHTML = "";

  pageRows.forEach((row, index) => {
    const tr = document.createElement("tr");

    /* animasi baris baru (hanya untuk data, bukan header) */
    if (index !== 0) {
      const isNew = !lastRendered.includes(JSON.stringify(row));
      if (isNew) {
        tr.classList.add("new-entry");
        lastRendered.push(JSON.stringify(row));
      }
    }

    row.forEach(cell => {
      const el = document.createElement(index === 0 ? "th" : "td");
      el.textContent = cell;
      tr.appendChild(el);
    });

    index === 0 ? thead.appendChild(tr) : tbody.appendChild(tr);
  });
}

/* ---------- render tombol halaman ---------- */
function renderPagination(totalPages) {
  let wrap = document.getElementById("paginationWrap");
  if (!wrap) {                              // buat wrapper sekali saja
    wrap = document.createElement("div");
    wrap.id = "paginationWrap";
    wrap.className = "pagination";
    document.querySelector(".card").appendChild(wrap);
  }

  wrap.innerHTML = `
    <button id="prevBtn">Previous</button>
    <span>Hal ${currentPage} / ${totalPages}</span>
    <button id="nextBtn">Next</button>
  `;

  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");

  prev.disabled = currentPage === 1;
  next.disabled = currentPage === totalPages;

  prev.onclick = () => { currentPage--; renderTable(); };
  next.onclick = () => { currentPage++; renderTable(); };
}

/* ---------- search handler ---------- */
document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;   // reset ke hal-1 saat search
  renderTable();
});

/* ---------- init & polling ---------- */
fetchData();
setInterval(fetchData, 5000);
