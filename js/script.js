/* ==========================================================================
   PORTFÓLIO TRADICIONAL — script.js

   Diferente da versão em terminal, aqui o conteúdo já está todo escrito
   no HTML. O JavaScript só cuida de três comportamentos:

   1. Abrir/fechar o menu no celular
   2. Marcar o link do menu da seção que está visível na tela
   3. Fazer as seções aparecerem com uma animação suave ao rolar a página

   E uma linha solta no fim para atualizar o ano do rodapé.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. MENU DO CELULAR
   O botão (#menuBtn) e o menu (#nav) já existem no HTML. Aqui a gente só
   liga um ao outro: clicar no botão alterna a classe "aberto" no menu,
   que é o gatilho que o CSS usa pra mostrar/esconder (ver style.css).
   -------------------------------------------------------------------------- */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function alternarMenu(forcarFechado = false) {
  // Se forcarFechado for true, o menu sempre fecha (abrir = false).
  // Caso contrário, inverte o estado atual: se estava aberto, fecha; se
  // estava fechado, abre.
  const abrir = forcarFechado ? false : !nav.classList.contains("aberto");

  nav.classList.toggle("aberto", abrir);
  menuBtn.setAttribute("aria-expanded", String(abrir));
}

menuBtn.addEventListener("click", () => alternarMenu());

// Fecha o menu automaticamente quando o visitante clica em um link,
// senão o painel ficaria aberto cobrindo a seção pra qual ele acabou de ir.
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => alternarMenu(true));
});


/* --------------------------------------------------------------------------
   2. LINK ATIVO NO MENU CONFORME A ROLAGEM
   IntersectionObserver "observa" um elemento e avisa quando ele entra ou
   sai da área visível da tela — sem precisar calcular posição de scroll
   manualmente. Aqui a gente observa cada <section id="..."> e, quando uma
   delas fica visível, marca o link correspondente do menu como ativo.
   -------------------------------------------------------------------------- */
const secoes = document.querySelectorAll("main section[id]");
const linksNav = document.querySelectorAll(".nav-link");

const observadorMenu = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;

      const id = entrada.target.id;
      linksNav.forEach((link) => {
        // link.hash é a parte "#sobre" do href; comparamos sem o "#"
        link.classList.toggle("ativo", link.hash === "#" + id);
      });
    });
  },
  {
    // rootMargin "encolhe" a área considerada visível: -45% em cima e embaixo
    // faz a seção só ser contada como "ativa" perto do meio da tela, em vez
    // de já marcar assim que a borda dela aparece.
    rootMargin: "-45% 0px -45% 0px",
  }
);

secoes.forEach((secao) => observadorMenu.observe(secao));


/* --------------------------------------------------------------------------
   3. ANIMAÇÃO AO ROLAR (reveal on scroll)
   Todo elemento com a classe .reveal começa invisível (isso está definido
   no CSS). Aqui a gente observa esses elementos e adiciona a classe
   .visivel na primeira vez que cada um aparece na tela — o CSS cuida da
   transição suave entre os dois estados.
   -------------------------------------------------------------------------- */
const elementosReveal = document.querySelectorAll(".reveal");

const observadorReveal = new IntersectionObserver(
  (entradas, observador) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add("visivel");
      observador.unobserve(entrada.target); // já apareceu uma vez, não precisa mais observar
    });
  },
  { threshold: 0.15 } // dispara quando 15% do elemento já estiver visível
);

elementosReveal.forEach((el) => observadorReveal.observe(el));


/**
 * evento para salvar o ultimo tema que o usuario escolheu
 * 
 * se na primeira vez que entrou, ele muda para o 
 * tema escuro, na proxima vez que entrar ele 
 * já vai entrar com o tema escuro ativado ao inves do
 * tema branco padrão, isso se ele não apagar o localStorage até lá
 */
const btnTema = document.querySelector("#btnTema");
const htmlTag = document.documentElement;

btnTema.addEventListener("click", function(event){

  const temaAtual = htmlTag.getAttribute('data-theme');
  const novoTema = temaAtual === "tema-escuro" ? "tema-claro" : "tema-escuro";

  htmlTag.classList.add("trocando-tema");

  htmlTag.setAttribute("data-theme",novoTema);

  try{
    localStorage.setItem("tema",novoTema);
  }catch(e){}

  setTimeout(function(){
    htmlTag.classList.remove("trocando-tema");
  }, 400);
});

/* --------------------------------------------------------------------------
   4. ANO DO RODAPÉ
   Pega o ano atual do sistema, pra você nunca precisar lembrar de
   atualizar o "© 2026" manualmente ano que vem.
   -------------------------------------------------------------------------- */
document.getElementById("ano").textContent = new Date().getFullYear();