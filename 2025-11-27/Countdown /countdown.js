const target = new Date("2025-11-25T00:00:00").getTime();
const d=document.getElementById('d'),h=document.getElementById('h'),
      m=document.getElementById('m'),s=document.getElementById('s');

function pad(n){return n.toString().padStart(2,'0')}
function tick(){
  const diff=target-Date.now();
  if(diff<=0){clearInterval(i);d.textContent=h.textContent=m.textContent=s.textContent="00";return}
  const days=Math.floor(diff/86_400_000);
  const hrs =Math.floor((diff%86_400_000)/3_600_000);
  const mins=Math.floor((diff%3_600_000)/60_000);
  const secs=Math.floor((diff%60_000)/1000);
  d.textContent=pad(days);h.textContent=pad(hrs);m.textContent=pad(mins);s.textContent=pad(secs);
}
tick();
const i=setInterval(tick,1000);
