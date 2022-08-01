let combinaçõesVitórias = [[1, 5, 9], [3, 5, 7], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9]]
let posicoesOcupadas = []
let player1Positions = []
let player2Positions = []
let jogadorDaVez = 1

let iniciar = document.querySelector('#start')
iniciar.addEventListener('click', iniciarJogo)

let tabuleiro = document.querySelector('main')

let listaQuadrados = document.querySelectorAll('div')

listaQuadrados.forEach(quadrado => {
    let posicao = Number(quadrado.id) 
    quadrado.addEventListener('click', () => { mudaCor(quadrado, posicao) })   
});

let encerrar = document.getElementById('end')
encerrar.addEventListener('click', encerrarJogo)

function isPosicaoValida(posicao) {
    return (posicao > 0 && posicao <= 9) && (!posicoesOcupadas.includes(posicao))
}

function exibeResultado(jogador){
    let h3 = document.querySelector('h3')
    h3.style.display = 'block'
    h3.style.color = 'white'

    if(jogador == 1){
        h3.innerHTML = 'O jogador 1 <span>(vermelho)</span> venceu!'
        let span = document.querySelector('span')
        span.style.backgroundColor = 'red'
    }else if(jogador == 2){
        h3.innerHTML = 'O jogador 2 <span>(azul)</span> venceu!'
        let span = document.querySelector('span')
        span.style.backgroundColor = 'blue'
    }else{
        h3.innerHTML = 'Houve empate'
    }
}

function mudaCor(quadrado, posicao) {
    
    if (isPosicaoValida(posicao)) {
        if (jogadorDaVez == 1) {
            quadrado.style.backgroundColor = 'red'
            player1Positions.push(posicao)

            ehVitoria(player1Positions) ? exibeResultado(1) : jogadorDaVez = 2
        } else {
            quadrado.style.backgroundColor = 'blue'
            player2Positions.push(posicao)
            
            ehVitoria(player2Positions) ? exibeResultado(2) : jogadorDaVez = 1
        }
                
        quadrado.style.cursor = 'default'
        posicoesOcupadas.push(posicao)

        if(!(ehVitoria(player1Positions) || ehVitoria(player2Positions)) && posicoesOcupadas.length >= 9){
            exibeResultado(3)
        }
        
    }
}

function ehVitoria(jogador){
    let pontos = 0

    for(let i = 0; i < combinaçõesVitórias.length; i++){
        for(let j = 0; j < 3; j++){
            if(jogador.includes(combinaçõesVitórias[i][j])){
                pontos++
            }
        }
        if(pontos == 3){
            return true
        }
        pontos = 0
    }
    return false

}

function mostrarTabuleiro() {
    tabuleiro.style.visibility = 'visible'
    mostrarBotaoFinalizar()
}

function iniciarJogo() {
    mostrarTabuleiro()
}

function mostrarBotaoFinalizar() {
    encerrar.style.visibility = 'visible'
}

function ocultarBotaoFinalizar() {
    encerrar.style.visibility = 'hidden'
}

function ocultarTabuleiro() {
    tabuleiro.style.visibility = 'hidden'
}

function ocultarMensagemDeVitoria(){
    let h3 = document.querySelector('h3')
    h3.style.display = 'none'
}

function limpaTabuleiro() {
    let divColection = document.getElementsByTagName('div')

    for (const div of divColection) {
        div.style.backgroundColor = 'white'
        div.style.cursor = 'pointer'
    }
}

function encerrarJogo() {
    limpaTabuleiro()
    ocultarMensagemDeVitoria()
    ocultarTabuleiro()
    ocultarBotaoFinalizar()

    posicoesOcupadas = []
    player1Positions = []
    player2Positions = []
    jogadorDaVez = 1
}