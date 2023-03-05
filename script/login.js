const formulario = document.querySelector("#formLogin")
const usuarioesperado = "admin"
const senhaesperada = "21232f297a57a5a743894a0e4a801fc3"
const esqueciasenha = document.querySelector("#senhaesquecida")
const respostasubmit = document.querySelector("#labelaviso")
//Variaveis Globais definidas
document.querySelector("#input_usuario").focus() //Foco para o usuário
formulario.addEventListener("submit", (evt) => 
{
    evt.preventDefault() //Impede que a página seja atualizada 2 vezes ao submeter
    const usuario = formulario.querySelector("#input_usuario").value
    const senha = formulario.querySelector("#input_senha").value
    //As entradas são armazenadas e pegas pelo seu ID
    if (ValidaDados(usuario, senha)){
        sessionStorage.setItem("controle.usuariologado", true) //Defini o usuario como logado
        window.location = "index.html"
    }
    else{
        sessionStorage.setItem("controle.usuariologado", false) //Bloqueia o usuario 
        labelaviso.innerHTML = "Usuario ou senha incorretos!"
        esqueciasenha.style.display = "block" //Habilita a opção "Esqueci a senha"
    }
})

function md5(senha) //Ciptografa a senha de forma simples
{
    if (senha == "admin")
    {
        return "21232f297a57a5a743894a0e4a801fc3"
    }
    else 
    {
        return senha
    }
}

function ValidaDados(usuario, senha) //Retorna true se o usuario e senha estiverem certos
{
    let usuario_valido = usuario == usuarioesperado
    let senha_valida = md5(senha) == senhaesperada
  

    return usuario_valido && senha_valida
}

esqueciasenha.addEventListener("click", ()=> 
{
    alert("Para os testadores da aplicação: Usuario: admin / Senha: admin")
})