const targetDate = new Date("2025-11-25T00:00:00").getTime();

const els = {
  d: document.getElementById('d'),
  h: document.getElementById('h'),
  m: document.getElementById('m'),
  s: document.getElementById('s')
};

function pad(n){ return n.toString().padStart(2,'0'); }

function tick(){
  const diff = targetDate - Date.now();
  if(diff <= 0){
    clearInterval(interval);
    Object.values(els).forEach(el=>el.textContent="00");
    document.getElementById('countdown').innerHTML=
      '<div class="box" style="max-width:18rem;margin-inline:auto"><span class="num">Waktu Habis!</span></div>';
    return;
  }
  const days    = Math.floor(diff / 86_400_000);
  const hours   = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  els.d.textContent = pad(days);
  els.h.textContent = pad(hours);
  els.m.textContent = pad(minutes);
  els.s.textContent = pad(seconds);
}

tick();
const interval = setInterval(tick,1000);
