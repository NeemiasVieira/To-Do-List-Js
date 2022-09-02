
//Curso Dev Full Stack - FulltureSchool, Autor: Neemias Vieira Fernandes
//Programa de tarefas - Entrega Parcial
/*Os controles de cada objeto são feitos através de um atributo chamado ID, que é 
também atribuido como identificador no DOM e no array, foi feito dessa forma pois
eu ainda não conhecia o target e decidi manter assim pra ver se dava certo hehehe
Acabei até tendo mais trabalho atoa, mas valeu a pena :) */


let controle = JSON.parse(sessionStorage.getItem("controle.usuariologado"))
if (controle == true){ //verifica se o usuario está logado ou não
}
else {
    window.location = "login.html" //Se não estiver volta pra página de login
}
let tarefas = Array()
const formulario = document.querySelector("#formulario")
const botaoInserir = document.querySelector("#botaoInserir")
const listaTarefas = document.querySelector("#listaDeTarefas")
var selecao = document.querySelector("#selecao")
let atividadeArmazenada = localStorage.getItem("todolist.atividade")
let ids = []
//Definição das variáveis globais

if (atividadeArmazenada != null) //Se tiver alguma tarefa no storage ele coloca no DOM
{
    tarefas = JSON.parse(atividadeArmazenada);
    atualizaDOM()
}


selecao.addEventListener("change", () => //Quando o bloco é alterado ele reescreve o DOM
{
    apagaDOM();
    atualizaDOM()
})
// trazendo algumas mençoes do documentos que poderão ser utilizadas no script

formulario.addEventListener('submit', function(evt){
    evt.preventDefault() //Definindo que não atualize a página ao submeter o forumulario
    if (ValidaDados()){
        console.log("Entrada Validada!")
        InsereDados(document.getElementById("tarefa").value, "Não concluida") //Atribuindo por padrão a tarefa e que ela ainda não foi concluida pois acabou de ser adicionada
        //Caso a entrada seja valida ele insere a tarefa e como padrão "Não concluida"
    }
})

function ValidaDados() //Função que verifica se o campo não está vazio
{
    const entrada = document.getElementById("tarefa").value
    if (entrada === "")
    {
        alert("Preencha o campo para adicionar a tarefa desejada.")
        return false
    }else{
                
        return true
    }
}

function InsereDados(tarefa, conclusao) 
{
    let ObjTarefa = //Objeto que vai controlar as tarefas, e as suas interações com o Array e a página
    {
        "tarefa": tarefa,
        "statusdatarefa": conclusao,
        "id": Math.floor(Math.random() * 100000) //Criação do ID de controle
    }
    tarefas.push(ObjTarefa) //Coloca a tarefa no Array
    console.log("Item adicionado a lista de tarefas!")
    console.log({tarefas})
    AdicionarNaLista(ObjTarefa) //Adiciona a tarefa a página
    atualizaStorage();
    document.getElementById("tarefa").value = "" 
    document.getElementById("tarefa").focus() //Zera o campo e coloca o foco na nova tarefa
    return ObjTarefa
}

function AdicionarNaLista(ObjTarefa) //Função que adiciona a div da nova tarefa
{
    let div = CriarTagDiv(ObjTarefa) //Cria a tarefa no dom
    listaTarefas.appendChild(div) //Adiciona a tarefa ao array
    
}

function CriarTagDiv(ObjTarefa) //Função que cria a nova div(tarefa)
{
    let div = document.createElement('div') //Criação da Div
    div.id = ObjTarefa.id //Id de controle da Div
    div.classList.add("todo")

    let li = document.createElement('li') //Criação do item da lista em si
    li.classList.add("todo-item")
    li.innerHTML = ObjTarefa.tarefa     
    li.id = 'li'+ ObjTarefa.id.toString() //Id de controle para a conclusão da tarefa

    let buttoncheck = document.createElement("button") //Criação do botão check
    buttoncheck.classList.add("check-btn")
    buttoncheck.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>'
    buttoncheck.setAttribute('onclick', 'concluir(tarefas, '+ObjTarefa.id+')') //Define a função para quando o botão for pressionado
    

    let buttontrash = document.createElement("button") //Criação do botão excluir
    buttontrash.classList.add("trash-btn")
    buttontrash.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>'
    buttontrash.setAttribute('onclick', 'excluir('+ObjTarefa.id+')') //Define a função para quando o botão for pressionado

    div.appendChild(li)
    div.appendChild(buttoncheck)
    div.appendChild(buttontrash) //Adiciona os 3 elementos criados na nova div

    return div //Retorna a div para a função "AdicionarNaLista" colocar a div no documento


}
 
function excluir(idtarefa) //Exclui uma tarefa do DOM, do array e do storage
{
    div = document.getElementById(''+idtarefa+'') //Seleciona a div pelo Id de controle
    listaTarefas.removeChild(div) //Remove a div do documento           
    let pos = encontraObjetoPeloId(idtarefa)
    tarefas.splice(pos, 1)
    console.log("Item Excluido")
    console.log({tarefas}) //Atualiza o Array no console
    atualizaStorage() 
}

function concluir(lista, idli)
{
    let pos = encontraObjetoPeloId(idli) // encontra a posição do objeto no array
    let aux = -1 //Auxiliar para não entrar nos 2 ifs, entrar apenas em um
    let li = document.getElementById('li'+idli+'') //Seleciona a li pelo seu Id de controle
    if (lista[pos].statusdatarefa == "Não concluida"){ //Se a tarefa não estiver riscada quando o botão for pressionado: 
        li.classList.add("checked")     
        tarefas[encontraObjetoPeloId(idli)].statusdatarefa = "Concluida"
        console.log("O status da conclusão da tarefa foi atualizado para concluida")
        console.log({tarefas})
        aux = 0
        atualizaStorage()

    }
    if (lista[pos].statusdatarefa == "Concluida" && aux == -1){
        li.classList.remove("checked") //Se a tarefa já estiver riscada quando o botão for pressionado:       
        tarefas[encontraObjetoPeloId(idli)].statusdatarefa = "Não concluida"
        console.log("O status da conclusão da tarefa foi atualizado para não concluida")
        console.log({tarefas})
        atualizaStorage()
    }
}

function encontraObjetoPeloId(id)
{
    let pos = -1
        tarefas.forEach((valor, posicao) => 
        {
            //Função que varre o array até encontrar a posição que tem o id procurado
            
            if (valor.id == id)
            {
                pos = posicao
                
                
            }
            else{
                
            }
            
        })
    return pos
}

function excluirnoDOM(idtarefa) //Função que faz a exclusão tanto na página como no array
{
    //Utilizado o try para não dar erro caso ele tente excluir um objeto que não está ali
    try{
    div = document.getElementById(''+idtarefa+'') //Seleciona a div pelo Id de controle
    
    listaTarefas.removeChild(div) //Remove a div do documento           
    }
    catch{
        
    }
   
}

function apagaDOM()
{
    // ids é o array com todos os ids a serem excluidos
    
    tarefas.forEach( (valor) =>
    {
        ids.push(valor.id)
        
    })
    

    for (let j = 0; j< ids.length; j++)
    {
        
        excluirnoDOM(ids[j])
    }
    ids = [] //O array é resetado para evitar erros na aplicação
}

function atualizaDOM()
{ //Utilizado o switch para os 3 modos de exibição "Todos, Concluidas e não concluidas"
    switch (selecao.selectedIndex){
        case 0:
        tarefas.forEach((tarefa1) => 
        {
            reescreveDOM(tarefa1) //Aqui reescrevemos tudo 
        })
        break;

        case 1:
            tarefas.forEach((tarefa1) => 
        {
            if (tarefa1.statusdatarefa == "Concluida")
            {
            reescreveDOM(tarefa1)   //So é reescrito as concluidas
            }     
        })
        break;
        case 2:
            tarefas.forEach((tarefa1) => 
        {
            if (tarefa1.statusdatarefa == "Não concluida") //E agora só as não concluidas
            {
            reescreveDOM(tarefa1)   
            }     
        })
        break;
        
    }
    
}

function reescreveDOM(tarefa1) //Recebe um objeto e o reescreve no DOM
{
    let div = document.createElement('div') //Criação da Div
        div.id = tarefa1.id //Id de controle da Div
        div.classList.add("todo")

        let li = document.createElement('li') //Criação do item da lista em si
        if (tarefa1.statusdatarefa == "Não concluida"){
        li.classList.add("todo-item")
        }
        if (tarefa1.statusdatarefa == "Concluida"){
            li.classList.add("todo-item")
            li.classList.add("checked")
        }
        li.innerHTML = tarefa1.tarefa     
        li.id = 'li'+ tarefa1.id.toString() //Id de controle para a conclusão da tarefa

        let buttoncheck = document.createElement("button") //Criação do botão check
        buttoncheck.classList.add("check-btn")
        buttoncheck.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>'
        buttoncheck.setAttribute('onclick', 'concluir(tarefas,'+tarefa1.id+')') //Define a função para quando o botão for pressionado
        

        let buttontrash = document.createElement("button") //Criação do botão excluir
        buttontrash.classList.add("trash-btn")
        buttontrash.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>'
        buttontrash.setAttribute('onclick', 'excluir('+tarefa1.id+')') //Define a função para quando o botão for pressionado
        listaTarefas.appendChild(div)
        div.appendChild(li)
        div.appendChild(buttoncheck)
        div.appendChild(buttontrash) //Adiciona os 3 elementos criados na nova div
}

function atualizaStorage() //Aqui o própio nome da função já diz o que faz :) 
{
    localStorage.setItem("todolist.atividade", JSON.stringify(tarefas));
}
