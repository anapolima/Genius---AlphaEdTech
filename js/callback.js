// FUNÇÕES QUE SERÃO PASSADAS COMO CALLBACK À CLASS GENIUS OU PLAYER
//test

/* ****** Exibe animação do início do jogo ******
 * function start_animation
 * ação: exibe a animação do início do jogo e reproduz seu respectivo áudio
 */
function start_animation() {
    let color = genius.startAnimationSequence[genius.sequenceIndex];

    document.getElementById(`${color}`).classList.add(`${color}light`);
    setTimeout(() => {
        genius.startAudio.play();
        document.getElementById(`${color}`).classList.remove(`${color}light`);
    }, 500 * .75);
}

/* ****** Exibe a rodada ******
 * function buttons_light_audio
 * ação: exibe a rodada iluminando os botões e reproduzindo seus respectivos áudios
 */
function buttons_light_audio() {
    let color = genius.sequence[genius.sequenceIndex];

    document.getElementById(`${color}`).classList.add(`${color}light`);

    setTimeout(() => {
        if (color == 'blue') genius.blueAudio.play();
        if (color == 'green') genius.greenAudio.play();
        if (color == 'red') genius.redAudio.play();
        if (color == 'yellow') genius.yellowAudio.play();
        document.getElementById(`${color}`).classList.remove(`${color}light`)
    }, genius.geniusInterval() * .75);
}

/* ****** Permite clicks no Genius ******
 * function allow_click
 * ação: adiciona aos botoes o atributo onclick
 */
function allow_click() {
    document.getElementById('blue').setAttribute('onclick', 'player.round(this.id), lightcolor("blue"), genius.blueAudio.play()');
    document.getElementById('green').setAttribute('onclick', 'player.round(this.id), lightcolor("green"), genius.greenAudio.play()');
    document.getElementById('red').setAttribute('onclick', 'player.round(this.id), lightcolor("red"), genius.redAudio.play()');
    document.getElementById('yellow').setAttribute('onclick', 'player.round(this.id), lightcolor("yellow"), genius.yellowAudio.play()');
    if(genius.mode == 'strict') {
        document.getElementById("end-strict").classList.remove("inativo");
    }
}

/* ****** Desabilita clicks no Genius ******
 * function remoe_click
 * ação: remove o atributo onclick dos botões
 */
function remove_click() {
    document.getElementById("red").removeAttribute("onclick");
    document.getElementById("yellow").removeAttribute("onclick");
    document.getElementById("blue").removeAttribute("onclick");
    document.getElementById("green").removeAttribute("onclick");
}

function lightcolor(color) {
    document.getElementById(`${color}`).classList.add(`${color}light`)
    setTimeout(() => {
        document.getElementById(`${color}`).classList.remove(`${color}light`)
    }, 200)
}

/* ****** Define a dificuldade do jogo ******
 * function game_difficult
 * ação: Verifica a dificuldade escolhida, e baseado nisso define quantas rodadas o jogo terá
 */
function game_difficult() {
    let selectElement = document.getElementById("escolher-dificuldade");
    let difficulty = selectElement.options[selectElement.selectedIndex].value;
    let text = selectElement.options[selectElement.selectedIndex].text;

    document.getElementById("difficulty").innerHTML = text;

    if (difficulty == "facil") genius.maxRound = 7
    else if (difficulty == "medio") genius.maxRound = 15
    else if (difficulty == "dificil") genius.maxRound = 31
}

/* ****** Define o modo do jogo ******
 * function game_mode
 * ação: Verifica e define o modo de jogo escolhido.
 * Normal: Errou a sequência um vez = lose
 * Strict: Errou a sequência = repete ela de novo
 */
function game_mode() {
    let selectElement = document.getElementById("escolher-modo-de-jogo");
    let mode = selectElement.options[selectElement.selectedIndex].value;
    let text = selectElement.options[selectElement.selectedIndex].text;

    document.getElementById("game-mode").innerHTML = text;

    if (mode == "normal") genius.mode = "normal"
    else if (mode == "strict") genius.mode = "strict"
}

/* ****** Define o tempo para cada clique do jogo ******
 * function set_timing
 * ação: A cada 1 segundo, é diminuido 1 segundo do timing definido na classe, caso o usuário não faça nenhum clique até 0, o jogo acaba
 */
function set_timing() {
    genius.timing = setInterval(() => {
        this.time--;
        document.getElementById("timing").innerHTML = `${this.time}`;

        if (this.time <= 0 || genius.geniusRound == 0) {
            if (player.sequence.length != this.geniusRound) {
                player.round(null);
                clearInterval(this.timing);
                document.getElementById("timing").innerHTML = `0`;
                return;
            }
            else {
                clearInterval(this.timing); 
                document.getElementById("timing").innerHTML = `0`;
            }
        }
    }, 1000)
}

/* ****** Permite jogada pelos atalhos do teclado ******
 * function active_key_shortcut
 * ação: adiciona event listener ao documento para identificar teclas pressionadas
 */
function active_key_shortcut() {
    document.addEventListener('keydown', pressed_key = (e) => {
        if (!e.repeat) {

            if (e.key == keyBlue || e.key == keyGreen || e.key == keyRed || e.key == keyYellow) {
                let keyElement = document.querySelector(`[key="${e.key}"]`).getAttribute('key');
                let id = document.querySelector(`[key="${e.key}"]`).getAttribute('id');

                if (keyElement == keyBlue) {
                    genius.blueAudio.play();
                    document.querySelector(`[key="${e.key}"]`).classList.add('bluelight');
                    player.round(id);
                }

                if (keyElement == keyGreen) {
                    genius.greenAudio.play();
                    document.querySelector(`[key="${e.key}"]`).classList.add('greenlight');
                    player.round(id);
                }

                if (keyElement == keyRed) {
                    genius.redAudio.play();
                    document.querySelector(`[key="${e.key}"]`).classList.add('redlight');
                    player.round(id);
                }

                if (keyElement == keyYellow) {
                    genius.yellowAudio.play();
                    document.querySelector(`[key="${e.key}"]`).classList.add('yellowlight');
                    player.round(id);
                }

            }

            document.addEventListener('keyup', (e) => {
                if (e.key == keyBlue || e.key == keyGreen || e.key == keyRed || e.key == keyYellow) {
                    let keyElement = document.querySelector(`[key="${e.key}"]`).getAttribute('key');

                    if (keyElement == keyBlue)
                        document.querySelector(`[key="${e.key}"]`).classList.remove('bluelight');

                    if (keyElement == keyGreen)
                        document.querySelector(`[key="${e.key}"]`).classList.remove('greenlight');

                    if (keyElement == keyRed)
                        document.querySelector(`[key="${e.key}"]`).classList.remove('redlight');

                    if (keyElement == keyYellow)
                        document.querySelector(`[key="${e.key}"]`).classList.remove('yellowlight');
                }

            });
        }
    });
}

/* ****** Compara a sequência do Genius com a sequência do usuário ******
 * function compare_player_and_genius_sequences
 * ação: compara, em tempo real, cada item da sequência do usuário com o seu respectivo
 * na sequência do Genius e exibe mensagens de vitória ou derrota
 */
function compare_player_and_genius_sequences() {
    if (player.sequence[player.hits] == genius.sequence[player.hits]) {
        player.hits++;

        if (player.hits == genius.geniusRound) {
            player.score += 1;
            document.getElementById('score').innerHTML = `${player.score}`;

            if (player.score == genius.maxRound) {
                genius.winAudio.play();

                Swal.fire({
                    title: 'VICTORY',
                    imageUrl: 'https://pbs.twimg.com/media/Clsu1JdXIAAKPBU.jpg',
                    backdrop: ` rgba(0,0,123,0.4)
                                url("img/win.gif")
                                repeat`,
                    html: `<p>Você venceu!</p>` +
                        `<p>Seu placar foi de ${player.score} ponto(s)</p>`,
                    showConfirmButton: false,
                    timer: 16000,
                    allowOutsideClick: false,
                })

                document.getElementById('play').disabled = false;
                document.getElementById('play').classList.remove("hover_blocked")
                document.getElementById('play').classList.add("play_button")
                player.sequence = [];
                player.hits = 0;
                player.score = 0;

                genius.geniusRound = 0;
                document.getElementById('score').innerHTML = `${player.score}`;
                document.getElementById("difficulty").innerHTML = `Não definido`;
                document.getElementById("game-mode").innerHTML = `Não definido`;
                document.getElementById("end-strict").classList.add("inativo");
            }
            else {
                document.removeEventListener('keydown', pressed_key);
                genius.callbackRemoveClick();
                genius.geniusRound += 1;

                player.sequence = []
                player.hits = 0;

                setTimeout(() => {
                    genius.setRound(genius.geniusRound);
                    genius.round();
                }, 2000);
            }
        }
    }
    else if ((player.sequence[player.hits] != genius.sequence[player.hits]) && genius.mode == "strict") {
        genius.strictAudio.play();
        document.removeEventListener('keydown', pressed_key);
        genius.callbackRemoveClick();
        clearInterval(genius.geniusClearTime())
        document.getElementById('score').innerHTML = '!!';
        
        setTimeout(() => {
            player.hits = 0;
            player.sequence = [];
            genius.round();
        }, 2000);
    }
    else {
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
        player.sequence = [];

        document.removeEventListener('keydown', pressed_key);
        document.getElementById('play').disabled = false;
        document.getElementById('play').classList.remove("hover_blocked")
        document.getElementById('play').classList.add("play_button")

        for (let keyInput of document.getElementsByClassName('keyInput')) {
            keyInput.disabled = false;
        }

        for (let resetButton of document.getElementsByClassName('reset')) {
            resetButton.disabled = false;
        }
    }
}

// DEFINE CALLBACKS DO GENIUS E DO PLAYER

genius.setCallBackInterval(buttons_light_audio);
genius.setCallBackRemoveClick(remove_click);
genius.setCallbackStartInterval(start_animation);
genius.setAllowClick(allow_click);
genius.setGeniusShortcut(active_key_shortcut);
genius.setCallBackDifficulty(game_difficult);
genius.setCallBackMode(game_mode);
genius.setCallBackGeniusTime(set_timing);

player.setCallbackRound(compare_player_and_genius_sequences);
