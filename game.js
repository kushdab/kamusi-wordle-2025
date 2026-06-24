const MANENO = ['macho', 'mbuni', 'punda', 'mamba', 'simba', 'nyoka', 'mlima', 'shule', 'chuma', 'barua', 'fursa', 'jamvi', 'tunda', 'upepo', 'asili', 'bwana', 'chama', 'ndovu', 'nyota', 'mzigo'];
let siri = MANENO[Math.floor(Math.random() * MANENO.length)].toUpperCase();
let jaribio = 0, herufi = '', mwisho = false;

const style = document.createElement('style');
style.textContent = `body{background:#121213;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center} #grid{display:grid;grid-template-rows:repeat(6,1fr);gap:5px;margin:20px} .row{display:grid;grid-template-columns:repeat(5,1fr);gap:5px} .cell{width:50px;height:50px;border:2px solid #3a3a3c;display:flex;justify-content:center;align-items:center;font-size:2rem;font-weight:bold;text-transform:uppercase} .correct{background:#538d4e;border:none} .present{background:#b59f3b;border:none} .absent{background:#3a3a3c;border:none}`;
document.head.appendChild(style);

document.body.innerHTML = '<h1>Kamusi Wordle 2025</h1><div id="grid"></div><div id="msg"></div>';
const grid = document.getElementById('grid');
for (let i = 0; i < 30; i++) {
    const div = document.createElement('div');
    div.className = 'cell';
    div.id = 'c' + i;
    if (i % 5 === 0) {
        const row = document.createElement('div');
        row.className = 'row';
        row.appendChild(div);
        grid.appendChild(row);
    } else {
        grid.lastChild.appendChild(div);
    }
}

function updateBoard() {
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById('c' + (jaribio * 5 + i));
        cell.textContent = herufi[i] || '';
    }
}

function kagua() {
    if (herufi.length < 5) return;
    let nakalaSiri = siri.split('');
    let matokeo = Array(5).fill('absent');
    let herufiArr = herufi.split('');

    herufiArr.forEach((h, i) => {
        if (h === siri[i]) {
            matokeo[i] = 'correct';
            nakalaSiri[i] = null;
        }
    });

    herufiArr.forEach((h, i) => {
        if (matokeo[i] !== 'correct' && nakalaSiri.includes(h)) {
            matokeo[i] = 'present';
            nakalaSiri[nakalaSiri.indexOf(h)] = null;
        }
    });

    matokeo.forEach((cls, i) => {
        document.getElementById('c' + (jaribio * 5 + i)).classList.add(cls);
    });

    if (herufi === siri) {
        document.getElementById('msg').textContent = 'Hongera! Umeshinda!';
        mwisho = true;
    } else if (jaribio === 5) {
        document.getElementById('msg').textContent = 'Pole! Neno lilikuwa: ' + siri;
        mwisho = true;
    } else {
        jaribio++;
        herufi = '';
    }
}

window.addEventListener('keydown', (e) => {
    if (mwisho) return;
    if (e.key === 'Enter') kagua();
    else if (e.key === 'Backspace') { herufi = herufi.slice(0, -1); updateBoard(); }
    else if (herufi.length < 5 && /^[a-zA-Z]$/.test(e.key)) {
        herufi += e.key.toUpperCase();
        updateBoard();
    }
});