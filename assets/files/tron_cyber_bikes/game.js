const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const W = canvas.width, H = canvas.height;
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const livesEl = document.getElementById("lives");
const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

const keys = {};
let running = false;
let score = 0;
let best = Number(localStorage.getItem("neonVelocityBest") || 0);
let lives = 3;
let lastTime = 0;
let spawnTimer = 0;
let difficulty = 1;
let shake = 0;

bestEl.textContent = String(best).padStart(6, "0");

const DIRS = {
  up:    {x:0, y:-1},
  down:  {x:0, y:1},
  left:  {x:-1, y:0},
  right: {x:1, y:0}
};

function clamp(v,a,b){ return Math.max(a, Math.min(b,v)); }
function dist(a,b){ return Math.hypot(a.x-b.x,a.y-b.y); }

class Trail {
  constructor(x,y,color) {
    this.points = [{x,y}];
    this.color = color;
  }
  add(x,y){
    const p = this.points[this.points.length-1];
    if (!p || Math.hypot(x-p.x,y-p.y)>5) this.points.push({x,y});
    if(this.points.length>900) this.points.shift();
  }
  draw(alpha=1){
    if(this.points.length<2) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap="round";
    ctx.lineJoin="round";
    ctx.shadowBlur=22;
    ctx.shadowColor=this.color;
    ctx.strokeStyle=this.color;
    ctx.lineWidth=10;
    ctx.beginPath();
    this.points.forEach((p,i)=> i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
    ctx.stroke();
    ctx.shadowBlur=0;
    ctx.lineWidth=3;
    ctx.strokeStyle="#ffffff";
    ctx.globalAlpha=.8*alpha;
    ctx.stroke();
    ctx.restore();
  }
}

class Bike {
  constructor(x,y,color,isPlayer=false) {
    this.x=x; this.y=y; this.color=color; this.isPlayer=isPlayer;
    this.dir={x:1,y:0}; this.nextDir={x:1,y:0};
    this.speed=isPlayer?235:150;
    this.radius=9;
    this.trail=new Trail(x,y,color);
    this.alive=true;
    this.turnCooldown=0;
  }
  setDirection(d){
    if (d.x===-this.dir.x && d.y===-this.dir.y) return;
    if (d.x===-this.dir.x && d.y===-this.dir.y) return;
    this.nextDir=d;
  }
  update(dt){
    if(!this.alive) return;
    this.turnCooldown-=dt;
    if(this.turnCooldown<=0 && (this.nextDir.x!==this.dir.x || this.nextDir.y!==this.dir.y)){
      this.dir=this.nextDir;
      this.turnCooldown=.08;
    }
    this.x += this.dir.x*this.speed*dt;
    this.y += this.dir.y*this.speed*dt;
    this.trail.add(this.x,this.y);
  }
  draw(){
    if(!this.alive) return;
    ctx.save();
    ctx.translate(this.x,this.y);
    const angle=Math.atan2(this.dir.y,this.dir.x);
    ctx.rotate(angle);
    ctx.shadowColor=this.color;
    ctx.shadowBlur=28;
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.moveTo(19,0); ctx.lineTo(-11,-7); ctx.lineTo(-16,0); ctx.lineTo(-11,7); ctx.closePath();
    ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle="#061019";
    ctx.beginPath();
    ctx.moveTo(8,0); ctx.lineTo(-8,-5); ctx.lineTo(-10,0); ctx.lineTo(-8,5); ctx.closePath();
    ctx.fill();
    ctx.fillStyle="#fff";
    ctx.globalAlpha=.85;
    ctx.fillRect(4,-2,11,4);
    ctx.restore();
  }
}

let player, enemies=[], particles=[], stars=[];

function resetWorld(){
  score=0; lives=3; difficulty=1; spawnTimer=.8; shake=0;
  player=new Bike(180,H/2,"#00f6ff",true);
  enemies=[];
  particles=[];
  stars=Array.from({length:100},()=>({
    x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.2,a:Math.random()*.7+.1
  }));
  updateHUD();
}

function updateHUD(){
  scoreEl.textContent=String(Math.floor(score)).padStart(6,"0");
  livesEl.textContent = "♥ ".repeat(lives).trim() || "—";
}

function spawnEnemy(){
  const side=Math.floor(Math.random()*4);
  let x,y,dir;
  if(side===0){x=30;y=Math.random()*H;dir=DIRS.right;}
  else if(side===1){x=W-30;y=Math.random()*H;dir=DIRS.left;}
  else if(side===2){x=Math.random()*W;y=30;dir=DIRS.down;}
  else{x=Math.random()*W;y=H-30;dir=DIRS.up;}
  const colors=["#ff168b","#a52cff","#ff5b24"];
  const b=new Bike(x,y,colors[Math.floor(Math.random()*colors.length)]);
  b.dir=dir;b.nextDir=dir;b.speed=135+Math.random()*55+difficulty*8;
  enemies.push(b);
}

function burst(x,y,color,n=35){
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2, s=50+Math.random()*260;
    particles.push({
      x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,
      life:.35+Math.random()*.7,max:.9+Math.random()*.4,color
    });
  }
}

function hitPlayer(){
  if(!player.alive) return;
  player.alive=false;
  burst(player.x,player.y,player.color,65);
  shake=14;
  lives--;
  updateHUD();
  if(lives<=0){
    setTimeout(endGame,600);
    return;
  }
  setTimeout(()=>{
    player=new Bike(180,H/2,"#00f6ff",true);
  },650);
}

function collisionWithTrail(x,y,trail,ignoreLast=25){
  const pts=trail.points;
  for(let i=0;i<pts.length-ignoreLast;i+=2){
    if(Math.hypot(x-pts[i].x,y-pts[i].y)<13) return true;
  }
  return false;
}

function handleEnemyAI(e,dt){
  // Grid-aware steering: enemies periodically choose a perpendicular turn
  // when near an edge or randomly, but never reverse.
  if(e.turnCooldown>0) return;
  const nearEdge = e.x<90||e.x>W-90||e.y<90||e.y>H-90;
  if(nearEdge || Math.random()<dt*.75){
    const options=[];
    if(e.dir.x!==0) options.push(e.dir.y===0?DIRS.up:DIRS.down, e.dir.y===0?DIRS.down:DIRS.up);
    else options.push(e.dir.x===0?DIRS.left:DIRS.right, e.dir.x===0?DIRS.right:DIRS.left);
    // Prefer direction that does not immediately hit a trail/border.
    const valid=options.filter(d=>{
      const nx=e.x+d.x*70, ny=e.y+d.y*70;
      return nx>35&&nx<W-35&&ny>35&&ny<H-35 &&
        !collisionWithTrail(nx,ny,e.trail,0) &&
        !collisionWithTrail(nx,ny,player.trail,0);
    });
    if(valid.length) e.setDirection(valid[Math.floor(Math.random()*valid.length)]);
  }
}

function update(dt){
  difficulty += dt*.018;
  score += dt*(8+difficulty*2);
  spawnTimer-=dt;
  if(spawnTimer<=0){
    spawnEnemy();
    spawnTimer=Math.max(.65,2.1-difficulty*.12);
  }

  player.update(dt);
  if(player.x<28||player.x>W-28||player.y<28||player.y>H-28) hitPlayer();
  if(collisionWithTrail(player.x,player.y,player.trail,30)) hitPlayer();

  for(const e of enemies){
    handleEnemyAI(e,dt);
    e.update(dt);
    if(e.x<20||e.x>W-20||e.y<20||e.y>H-20){
      e.dir={x:-e.dir.x,y:-e.dir.y}; e.nextDir=e.dir;
    }
    if(collisionWithTrail(e.x,e.y,player.trail,18) ||
       collisionWithTrail(e.x,e.y,e.trail,22) ||
       collisionWithTrail(player.x,player.y,e.trail,18)){
      burst(e.x,e.y,e.color,28);
      e.alive=false;
      score+=250;
    }
  }
  enemies=enemies.filter(e=>e.alive);

  for(const p of particles){
    p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.97;p.vy*=.97;p.life-=dt;
  }
  particles=particles.filter(p=>p.life>0);
  shake*=.88;
  updateHUD();
}

function drawGrid(){
  ctx.fillStyle="#02030a";
  ctx.fillRect(0,0,W,H);

  const grad=ctx.createRadialGradient(W/2,H/2,30,W/2,H/2,700);
  grad.addColorStop(0,"rgba(16,10,48,.75)");
  grad.addColorStop(.6,"rgba(2,8,25,.65)");
  grad.addColorStop(1,"rgba(0,0,4,1)");
  ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

  ctx.save();
  for(const s of stars){
    ctx.globalAlpha=s.a;
    ctx.fillStyle="#9eeeff";
    ctx.fillRect(s.x,s.y,s.r,s.r);
  }
  ctx.globalAlpha=1;
  ctx.strokeStyle="rgba(0,246,255,.11)";
  ctx.lineWidth=1;
  const size=60;
  const ox=(performance.now()*.018)%size;
  const oy=(performance.now()*.01)%size;
  for(let x=-size+ox;x<W+size;x+=size){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=-size+oy;y<H+size;y+=size){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  ctx.restore();

  // arena border
  ctx.save();
  ctx.shadowColor="#00f6ff";ctx.shadowBlur=22;
  ctx.strokeStyle="#00f6ff";ctx.globalAlpha=.7;ctx.lineWidth=2;
  ctx.strokeRect(25,25,W-50,H-50);
  ctx.restore();
}

function draw(){
  ctx.save();
  if(shake>1) ctx.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
  drawGrid();

  player.trail.draw();
  for(const e of enemies)e.trail.draw(.9);
  for(const p of particles){
    ctx.save();ctx.globalAlpha=Math.max(0,p.life/p.max);
    ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=14;
    ctx.fillRect(p.x,p.y,3,3);ctx.restore();
  }
  player.draw();
  for(const e of enemies)e.draw();

  // scanline
  ctx.fillStyle="rgba(255,255,255,.018)";
  for(let y=0;y<H;y+=5)ctx.fillRect(0,y,W,1);
  ctx.restore();
}

function loop(t){
  const dt=Math.min(.033,(t-lastTime)/1000||0);
  lastTime=t;
  if(running) update(dt);
  draw();
  requestAnimationFrame(loop);
}

function startGame(){
  resetWorld();
  running=true;
  startScreen.classList.add("hidden");
  gameOver.classList.add("hidden");
}

function endGame(){
  running=false;
  const s=Math.floor(score);
  if(s>best){best=s;localStorage.setItem("neonVelocityBest",best);}
  finalScore.textContent=s;
  bestEl.textContent=String(best).padStart(6,"0");
  gameOver.classList.remove("hidden");
}

window.addEventListener("keydown",e=>{
  keys[e.key.toLowerCase()]=true;
  const k=e.key.toLowerCase();
  if(["w","a","s","d","r"].includes(k)) e.preventDefault();
  if(k==="w")player?.setDirection(DIRS.up);
  if(k==="s")player?.setDirection(DIRS.down);
  if(k==="a")player?.setDirection(DIRS.left);
  if(k==="d")player?.setDirection(DIRS.right);
  if(k==="r")startGame();
});
window.addEventListener("keyup",e=>keys[e.key.toLowerCase()]=false);

document.getElementById("startBtn").addEventListener("click",startGame);
document.getElementById("restartBtn").addEventListener("click",startGame);

resetWorld();
requestAnimationFrame(loop);
