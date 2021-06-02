// FUNÇÕES AUXILIARES

/* ****** Inicia o jogo ******
 * function start_game
 * ação: inicia o jogo e desabilita os inputs e botões de reset e play
 */
function start_game() {
    if (document.getElementById("game-mode").innerHTML == "Não definido" || document.getElementById("difficulty").innerHTML == "Não definido") {
        genius.errorselect.play();
    }
    else {
        document.getElementById('play').disabled = true;
        document.getElementById('play').classList.remove("play_button")
        document.getElementById('play').classList.add("hover_blocked")

        for (let keyInput of document.getElementsByClassName('keyInput')) {
            keyInput.disabled = true;
        }

        for (let resetButton of document.getElementsByClassName('reset')) {
            resetButton.disabled = true;
        }

        genius.start();

        setTimeout(() => {
            player.sequence = [];
            player.hits = 0;
            player.score = 0;

            genius.geniusRound = 0;
            genius.sequence = [];
            genius.setSequence();
            genius.setRound(1);
            genius.round();
        }, 5500);
    }
}

// VARIÁVEIS QUE VÃO RECEBER O VALOR DAS TECLAS DEFINIDAS COMO ATALHO
let keyBlue = '';
let keyGreen = '';
let keyRed = '';
let keyYellow = '';

/* ****** Captura as teclas que serão definidas como atalho ******
 * function capture_key
 * ação: captura as teclas que pressionadas pelo usuário
 * entrada: id do input selecionado pelo usuário
 */
function capture_key(_id) {
    input = document.getElementById(`${_id}`);

    input.addEventListener('keydown', get_key = (e) => {
        if (!e.repeat) {
            e.preventDefault();
            input.value = e.key;

            if (_id == 'blueInput') {
                keyBlue = e.key;

                if (keyBlue == keyGreen || keyBlue == keyRed || keyBlue == keyYellow) {
                    document.getElementById('blueDuplicada').classList.remove('inativo');
                    document.getElementById('blueInput').value = ``;
                }
                else {
                    document.getElementById('blueDuplicada').classList.add('inativo');
                    input.removeEventListener('keydown', get_key);
                }
            }

            if (_id == 'greenInput') {
                keyGreen = e.key;

                if (keyGreen == keyBlue || keyGreen == keyRed || keyGreen == keyYellow) {
                    document.getElementById('greenDuplicada').classList.remove('inativo');
                    document.getElementById('greenInput').value = ``;
                }
                else {
                    document.getElementById('greenDuplicada').classList.add('inativo');
                    input.removeEventListener('keydown', get_key);
                }
            }

            if (_id == 'redInput') {
                keyRed = e.key;

                if (keyRed == keyGreen || keyRed == keyYellow || keyRed == keyBlue) {
                    document.getElementById('redDuplicada').classList.remove('inativo');
                    document.getElementById('redInput').value = ``;
                }
                else {
                    document.getElementById('redDuplicada').classList.add('inativo');
                    input.removeEventListener('keydown', get_key);
                }
            }

            if (_id == 'yellowInput') {
                keyYellow = e.key;

                if (keyYellow == keyGreen || keyYellow == keyRed || keyYellow == keyBlue) {
                    document.getElementById('yellowDuplicada').classList.remove('inativo');
                    document.getElementById('yellowInput').value = ``;
                }
                else {
                    document.getElementById('yellowDuplicada').classList.add('inativo');
                    input.removeEventListener('keydown', get_key);
                }
            }
        }
    });
}

/* ****** Confirma inserção das teclas ******
 * function reset_key
 * ação: confirma inserção das teclas e adiciona atributo key aos botoes do Genius
 */
function confirm_keys() {
    document.getElementById('blue').setAttribute('key', `${keyBlue}`);
    document.getElementById('green').setAttribute('key', `${keyGreen}`);
    document.getElementById('red').setAttribute('key', `${keyRed}`);
    document.getElementById('yellow').setAttribute('key', `${keyYellow}`);
    modalContainer.classList.add("inativo");
}

/* ****** Reseta teclas definidas como atalho ******
 * function reset_key
 * ação: remove o atributo key dos botões do Genius e define os valores das variáveis para string vazia
 * entrada: nome do botão de reset clicado pelo usuário
 */
function reset_key(_nameInput) {
    document.getElementById(`${_nameInput}`).removeAttribute('key');

    if (_nameInput == 'blue') {
        keyBlue = '';
        document.getElementById('blueInput').value = '';
    }
    if (_nameInput == 'green') {
        keyGreen = '';
        document.getElementById('greenInput').value = '';
    }
    if (_nameInput == 'red') {
        keyRed = '';
        document.getElementById('redInput').value = '';
    }
    if (_nameInput == 'yellow') {
        keyYellow = '';
        document.getElementById('yellowInput').value = '';
    }
}

/* ****** Encerra o modo estrito ******
 * function reset_key
 * ação: sai do modo estrito permitindo que um novo jogo seja iniciado
 */
function end_strict() {
    genius.error.play();
    
    genius.geniusClearTime();
    genius.callbackRemoveClick();
    genius.geniusRound = 0;
    Swal.fire({
        title: 'GAME OVER',
        html: `<p>Você perdeu</p>` +
        `<p>Seu placar foi de ${player.score} ponto(s)</p>` +
        `<p>Mais sorte na próxima!</p>`,
        imageUrl: 'https://i1.sndcdn.com/artworks-000186467828-vkyo25-t500x500.jpg',
        showConfirmButton: false,
        timer: 6000,
        allowOutsideClick: false
    })
    
    player.hits = 0;
    player.score = 0;
    document.getElementById('score').innerHTML = `${player.score}`;
    document.getElementById("difficulty").innerHTML = `Não definido`;
    document.getElementById("game-mode").innerHTML = `Não definido`;
    document.getElementById("timing").innerHTML = `0`;
    player.sequence = [];
    
    document.removeEventListener('keydown', pressed_key);
    document.getElementById('play').disabled = false;
    document.getElementById('play').classList.remove("hover_blocked");
    document.getElementById('play').classList.add("play_button");
    document.getElementById("end-strict").classList.add("inativo");
    
    for (let keyInput of document.getElementsByClassName('keyInput')) {
        keyInput.disabled = false;
    }

    for (let resetButton of document.getElementsByClassName('reset')) {
        resetButton.disabled = false;
    }
}