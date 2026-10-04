let tema = null;

try{
    tema = localStorage.getItem("tema");
}catch(e){

}

if(tema !== "tema-claro" && tema !== "tema-escuro"){
    let temaAtual = window.matchMedia("(prefers-color-scheme: dark)").matches;
    tema = temaAtual ? "tema-escuro" : "tema-claro";
}

document.documentElement.setAttribute("data-theme",tema);