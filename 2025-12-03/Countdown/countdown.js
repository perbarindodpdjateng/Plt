// UBAH TANGGAL/JAM TARGET DI SINI
const targetDate = new Date("2025-11-26T00:00:00").getTime();

const els = {
  d: document.getElementById('d'),
  h: document.getElementById('h'),
  m: document.getElementById('m'),
  s: document.getElementById('s')
};

function pad(n){ return n.toString().padStart(2,'0'); }

function tick(){
  const now = Date.now();
  let diff = targetDate - now;

  if(diff <= 0){
    clearInterval(interval);
    Object.values(els).forEach(el=>el.textContent="00");
    document.getElementById('countdown').innerHTML=
      '<div class="box" style="min-width:180px"><div class="num">Waktu Habis!</div></div>';
    return;
  }

  const days    = Math.floor(diff / (1000*60*60*24));
  const hours   = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);

  els.d.textContent = pad(days);
  els.h.textContent = pad(hours);
  els.m.textContent = pad(minutes);
  els.s.textContent = pad(seconds);
}

tick(); // langsung jalan sekali
const interval = setInterval(tick, 1000);
