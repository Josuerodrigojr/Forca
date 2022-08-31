let letrasErradas = [];
let segredo = [];
let palavra = "";
// Se for tirar a variavel chance como uma variavel global, colocar "chance" como parametro na função "LetraErrada"

let derrota = 0;
let vitoria = 0;


let alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "Ç"];



let categorias = {
    Catego: ["Cor", "Fruta", "Animal"],
    Cor: ["ABOBORA", "AÇAFRAO", "AMARELO", "AMBAR", "AMEIXA", "AMÊNDOA", "AMETISTA", "ANIL", "AZUL", "BEGE", "BORDÔ", "BRANCO", "BRONZE", "CAQUI", "CARAMELO", "CARMESIM", "CARMIM", "CASTANHO", "CEREJA", "CHOCOLATE", "CIANO", "CINZA", "CINZENTO", "COBRE", "CORAL", "CREME", "DAMASCO", "DOURADO", "ESCARLATE", "ESMERALDA", "FERRUGEM", "FÚCSIA", "GELO", "GRENÁ", "GRIS", "ÍNDIGO", "JADE", "JAMBO", "LARANJA", "LAVANDA", "LILÁS", "LIMAO", "LOIRO", "MAGENTA", "MALVA", "MARFIM", "MARROM", "MOSTARDA", "NEGRO", "OCRE", "OLIVA", "OURO","PÊSSEGO", "PRATA", "PRETO", "PÚRPURA", "ROSA", "ROXO", "RUBRO", "SALMÃO", "SÉPIA", "TERRACOTA", "TIJOLO", "TURQUESA", "UVA", "VERDE", "VERMELHO", "VINHO", "VIOLETA"],
    Fruta: ["ABACATE","ABACAXI","AÇAI","ACEROLA","AMEIXA","CAQUI","CARAMBOLA","CEREJA","DAMASCO","FRAMBOESA","GOIABA","GRAVIOLA","JABOTICABA","LARANJA","LICHIA","MANGA","MEXERICA","MIRTILO","NECTARINA","TAMARINDO"],
    Animal:["CAMALEAO", "CAPIVARA", "CAMELO", "TARTARUGA", "LEBRE", "GUAXINIM", "GIRAFA", "TUCANO", "OURIÇO", "CISNE", "SAGUI", "ORANGOTANGO", "HIPOPOTAMO", "HIENA", "GUEPARDO", "MOSCA", "MOSQUITO", "CAMARAO", "PACA", "RAPOSA", "BAIACU", "DRAGAO", "MARIPOSA", "UNICORNIO", "NARVAL", "OCAPI", "CEGONHA", "PELICANO", "LACRAIA", "LEMURE", "IGUANA", "CHINCHILA", "CACATUA", "PAVAO", "TARANTULA", "KOALA", "CANGURU", "CALOPSITA", "DINOSSAURO", "TIRANOSSAURO"],
    sorteio(){  
        random = Math.floor(Math.random() * categorias.Catego.length);  
        categoria = categorias.Catego[random];

        random = Math.floor(Math.random() * categorias[categoria].length)
        
        palavra = categorias[categoria][random]
        secreta = new Palavra(categoria, palavra)
    }
}

class variaveisLocais{
    constructor(chance){
        this.chance = chance;

    }
}

class Palavra {
    constructor(categoria,palavra){
        this.categoria = categoria
        this.palavra = palavra
    }
}

class Pessoas {
    constructor (nome, email, vitoria = 0, derrota = 0){
        this.nome = nome 
        this.email = email
        this.vitoria = vitoria 
        this.derrota = derrota
    }   
    
}

function cadastrar() {
    user = document.getElementById("usuario").value;
    mail = document.getElementById("email").value;
    cadastro01 = new Pessoas(user,mail)
    usuario.value= '';
    email.value = '';    
    document.getElementById("vitoria").textContent = cadastro01.vitoria;
    document.getElementById("derrota").textContent = cadastro01.derrota;
    reset();
}

function botaoTodos (a1,a2,a3 = false) {
    for (let index = 0; index < alfabeto.length; index++) {
    let a = `btn${alfabeto[index]}`
    document.getElementById(a).style.backgroundColor = `#${a1}`;
    document.getElementById(a).style.opacity = `${a2}`;
    document.getElementById(a).disabled = a3;
    }
}

function botaoUnico (b){
    let a = `btn${b}`;
        document.getElementById(a).style.backgroundColor = "black";
        document.getElementById(a).style.opacity = "0.2";
        document.getElementById(a).disabled = true;
}

function reset() {
    variaveis = new variaveisLocais(0)
    variaveis.chance = 0;
    document.getElementById("letrasErradas").value = "";
    document.getElementById("palavraSecreta").value = ""; 
    document.getElementById("trocarimg").style.visibility = "hidden";
    segredo = [];
    letrasErradas=[];    
    
    botaoTodos(612726, 1, false)
    categorias.sorteio()
    
    document.getElementById("categoria").value = secreta.categoria;

    for (let i = 1; i <= palavra.length; i++){
        segredo.push("____")
    }
    document.getElementById("secreto").innerHTML = segredo.join("  ");    
};

function verificarLetra(letraEscolhida){   

    let acerto = false;
    

       

    for (let j = 0; j < palavra.length; j++){

        if(palavra[j] == letraEscolhida){
            acerto = true;
            segredo[j] = letraEscolhida;
            document.getElementById("secreto").innerHTML = segredo.join(" ");
            comparar = segredo.find(element => element == "____");
            botaoUnico(letraEscolhida)

            if (comparar == undefined){
                vitoria = vitoria + 1;
                document.getElementById("vitoria").textContent = vitoria;
                botaoTodos(808080, 0.2, true)
            }
        }
    }

    Errado(acerto,letraEscolhida)
    

}

function Errado(verificacaoDaLetra, letraEscolhida){
    if (verificacaoDaLetra === false){
        letrasErradas.push(letraEscolhida)
        document.getElementById("letrasErradas").value = letrasErradas;
        variaveis.chance += 1;
        botaoUnico(letraEscolhida);
    }
    letraErrada();

    

}

function letraErrada(){
    if (variaveis.chance != 0) {
        document.getElementById("trocarimg").style.visibility = "visible"
    }

    if (variaveis.chance >= 1 && variaveis.chance <= 6){
        document.getElementById("trocarimg").src=`Imagens/0${variaveis.chance}.png`;
    } else if (variaveis.chance == 7) {
        derrota = derrota + 1;
        document.getElementById("derrota").textContent = derrota;
        document.getElementById("trocarimg").src=`Imagens/07.png`;
        document.getElementById("palavraSecreta").value = palavra; 
        botaoTodos(808080, 0.2, true)            
        }
}



