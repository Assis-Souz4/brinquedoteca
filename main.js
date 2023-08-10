const form = document.querySelector("form");
const resp = document.querySelector("pre");

const crianca = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = form.inNome.value;
  const idade = Number(form.inIdade.value);

  crianca.push({ nome, idade });

  form.reset();
  form.inNome.focus();
});

form.btnListar.addEventListener("click", () => {
  if (crianca.length === 0) {
    alert("Atenção!! Sem Crianças na Lista");
    return;
  }

  const listaAll = crianca.reduce(
    (acc, crianca) =>
      acc + crianca.nome + " - " + crianca.idade + " anos" + "\n",
    ""
  );

  resp.innerText = `${listaAll}\n`;
});

form.btnAgrupar.addEventListener("click", () => {
  if (crianca.length === 0) {
    alert("Atenção!! Para Agrupar é Preciso ter Crianças na Lista!!");
    return;
  }

  const copiaCrianca = [...crianca]

  copiaCrianca.sort((a, b) => a.idade - b.idade);

  let agrupar = "";
  let aux = copiaCrianca[0].idade;
  let nomes = [];

  for (const crianca of copiaCrianca) {
    const { nome, idade } = crianca;

    if (idade == aux) {
      nomes.push(nome);
    } else {
      agrupar += aux + " ano(s): " + nomes.length + " criança(s) - ";
      agrupar += ((nomes.length / copiaCrianca.length) * 100).toFixed(2) + "%\n";
      agrupar += '(' + nomes.join(', ') + ')\n\n'
      aux = idade;
      nomes = [];
      nomes.push(nome);
    }
  }
  agrupar += aux + " ano(s): " + nomes.length + " criança(s) - ";
  agrupar += ((nomes.length / copiaCrianca.length) * 100).toFixed(2) + "%\n";
  agrupar += '(' + nomes.join(', ') + ')\n\n'
  resp.innerText = agrupar;
});
