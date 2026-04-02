let numeroSorteado = Math.floor(Math.random() * 10) + 1;
let tentativas = 0;
const maxTentativas = 3;
let confetesAtivos = false;

function criarConfetes() {
    confetesAtivos = true;
    for (let i = 0; i < 100; i++) {
        const confete = document.createElement('div');
        confete.classList.add('confete');
        confete.style.left = Math.random() * window.innerWidth + 'px';
        confete.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 50%)`;
        const tamanho = 5 + Math.random() * 10;
        confete.style.width = confete.style.height = tamanho + 'px';
        confete.style.animationDuration = (2 + Math.random() * 3) + 's';
        document.body.appendChild(confete);
    }
}

function removerConfetes() {
    confetesAtivos = false;
    document.querySelectorAll('.confete').forEach(c => c.remove());
}

function verificarPalpite() {
    const palpite = Number(document.getElementById('palpite').value);
    const mensagem = document.getElementById('mensagem');
    tentativas++;

    if (!palpite || palpite < 1 || palpite > 10) {
        mensagem.textContent = "Digite um número válido entre 1 e 10!";
        mensagem.style.color = "red";
        tentativas--;
        return;
    }

    if (palpite === numeroSorteado) {
        mensagem.textContent = `🎉 Parabéns! Você acertou em ${tentativas} tentativa(s)!`;
        mensagem.style.color = "green";
        document.getElementById('chutarBtn').disabled = true;
        if (!confetesAtivos) criarConfetes();
    } else if (tentativas >= maxTentativas) {
        mensagem.textContent = `❌ Acabaram as tentativas! O número era ${numeroSorteado}.`;
        mensagem.style.color = "red";
        document.getElementById('chutarBtn').disabled = true;
        if (!confetesAtivos) criarConfetes();
    } else {
        const diferenca = Math.abs(numeroSorteado - palpite);
        if (diferenca === 1) {
            mensagem.textContent = "🔥 Quente! Você está quase lá!";
            mensagem.style.color = "red";
        } else if (diferenca <= 3) {
            mensagem.textContent = "🌞 Morno! Continue tentando!";
            mensagem.style.color = "orange";
        } else {
            mensagem.textContent = "❄️ Frio! Tente um número bem diferente.";
            mensagem.style.color = "blue";
        }
    }
}

function recomecarJogo() {
    numeroSorteado = Math.floor(Math.random() * 10) + 1;
    tentativas = 0;
    document.getElementById('palpite').value = '';
    document.getElementById('mensagem').textContent = '';
    document.getElementById('chutarBtn').disabled = false;
    removerConfetes();
}