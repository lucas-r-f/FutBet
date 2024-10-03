const teams = [
    './img/brasil.png',
    './img/camaroes.png',
    './img/croacia.png',
    './img/mexico.png'
]

let rounds = 5;
let currentRound = 0;
let usedImages = [];
let scoreboardTeam1 = 0;
let scoreboardTeam2 = 0;

function iniciar(){

    this.alterarVisibilidade();
    this.randomizarImagens();

    localStorage.setItem('score', JSON.stringify(0))
}

function randomizarImagens(){
    if (usedImages.length >= teams.length) {
        usedImages = [];
    }

    let availebleTeams = teams.filter(img => !usedImages.includes(img));

    let selectedTeams = [];

    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * availebleTeams.length);
        selectedTeams.push(availebleTeams[randomIndex]);
        availebleTeams.splice(randomIndex, 1)
    }

    document.getElementById('team1').src = selectedTeams[0];
    document.getElementById('team2').src = selectedTeams[1];

    scoreboardTeam1 = Math.floor(Math.random() * 5);
    scoreboardTeam2 = Math.floor(Math.random() * 5);

    usedImages.push(...selectedTeams);
}

function nextRound(){
    if(currentRound < rounds) {
        randomizarImagens();
        document.querySelector('.btnPalpite').style.display = 'flex';
        document.getElementById('btnProxGame').style.display = 'none';
        document.getElementById('guessTeam1').value = '';
        document.getElementById('guessTeam2').value = '';
        document.getElementById('result').style.display = 'none';

        currentRound++;

    } else {
        let score = JSON.parse(localStorage.getItem('score'));
        alert(`Fim de jogo! Sua pontuação total é ${score}`)
    }
}

function enviarPalpite(){
    const guess1 = parseInt(document.getElementById('guessTeam1').value);
    const guess2 = parseInt(document.getElementById('guessTeam2').value);

    let score = JSON.parse(localStorage.getItem('score'));
    let scoreRound = 0;

    if(guess1 === scoreboardTeam1 && guess2 === scoreboardTeam2){
        scoreRound = 10;
    }else if(guess1 === scoreboardTeam1 || guess2 === scoreboardTeam2) {
        scoreRound = 5;
    }

    score += scoreRound;

    localStorage.setItem('score', JSON.stringify(score));

    const resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = `<p class="result">O placar foi de ${scoreboardTeam1} x ${scoreboardTeam2}</p>
                              <p class="result">Você fez ${scoreRound} pontos neste round.</p>`;
    resultDiv.style.display = 'flex';

    document.querySelector('.btnPalpite').style.display = 'none'
    document.getElementById('btnProxGame').style.display= 'block';
}

function alterarVisibilidade(){
    document.getElementById('card-home').style.display = 'none';
     document.getElementById('iniciar').style.display= 'none';
    document.getElementById('card-jogo').style.display = 'flex';
}

