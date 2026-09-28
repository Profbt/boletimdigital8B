// ============================================================
// DADOS BRUTOS DAS DISCIPLINAS (dados fictícios do 8º Ano)
// ============================================================
// Aqui temos um ARRAY (lista) de OBJETOS. Cada objeto representa
// uma disciplina e tem suas notas e faltas.
const disciplinas = [
  { disciplina: "Língua Portuguesa", tri1: 82, tri2: "7,8", tri3: 85, faltas: [2, 1, 1] },
  { disciplina: "Matemática", tri1: 52, tri2: "5,8", tri3: null, faltas: [3, 2, 1] },
  { disciplina: "Ciências", tri1: "8,1", tri2: 76, tri3: 8.0, faltas: [1, 2, 0] },
  { disciplina: "História", tri1: 7.0, tri2: 84, tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Geografia", tri1: 68, tri2: 7.3, tri3: "7,9", faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 86, tri2: "8,1", tri3: 8.7, faltas: [1, 0, 0] },
  { disciplina: "Arte", tri1: 9.0, tri2: 92, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 95, tri2: 9.0, tri3: "9,4", faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 88, tri2: 9.1, tri3: 93, faltas: [1, 0, 1] },
  { disciplina: "Educação Financeira", tri1: 74, tri2: "7,8", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Estudo Orientado", tri1: 8.0, tri2: 83, tri3: "8,5", faltas: [0, 1, 0] },
  { disciplina: "Redação e Leitura", tri1: 62, tri2: "6,8", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 48, tri2: 5.6, tri3: "6,0", faltas: [2, 2, 1] },
  { disciplina: "Literatura Arte e Movimento", tri1: "7,7", tri2: 80, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Práticas Experimentais", tri1: 58, tri2: "6,2", tri3: 6.4, faltas: [1, 1, 1] }
];

// ============================================================
// FUNÇÃO: normalizarNota
// ============================================================
// Converte qualquer formato de nota para a escala 0–10.
// Regras:
//   - vazio/null/undefined => null (nota ainda não lançada)
//   - 0 a 10 => mantém igual
//   - maior que 10 e até 100 => divide por 10
//   - aceita ponto ou vírgula decimal
//   - valores fora das regras => null (inválido)
function normalizarNota(valor) {
  // Se estiver vazio, nulo ou indefinido, ainda não foi lançada
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Converte vírgula em ponto (ex.: "7,8" vira "7.8")
  const texto = String(valor).replace(",", ".");
  const numero = parseFloat(texto);

  // Se não for um número válido, retorna null
  if (isNaN(numero)) {
    return null;
  }

  // Valores entre 0 e 10 permanecem iguais
  if (numero >= 0 && numero <= 10) {
    return numero;
  }

  // Valores maiores que 10 e até 100 são divididos por 10
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  // Qualquer valor fora das regras é inválido
  return null;
}

// ============================================================
// FUNÇÃO: calcularMedia
// ============================================================
// Recebe uma lista de notas já normalizadas (0–10 ou null)
// e devolve a média considerando apenas as notas disponíveis.
// Uma nota ausente NUNCA vira zero.
function calcularMedia(notas) {
  const validas = notas.filter(function (n) {
    return n !== null;
  });

  // Se não houver nenhuma nota válida, não há média
  if (validas.length === 0) {
    return null;
  }

  let soma = 0;
  validas.forEach(function (n) {
    soma += n;
  });

  return soma / validas.length;
}

// ============================================================
// FUNÇÃO: somarFaltas
// ============================================================
// Soma os números inteiros de faltas dos três trimestres.
function somarFaltas(lista) {
  let total = 0;
  lista.forEach(function (f) {
    total += f;
  });
  return total;
}

// ============================================================
// FUNÇÃO: definirSituacao
// ============================================================
// Define a situação da disciplina com base na média.
//   - null => "Nota ainda não disponível"
//   - >= 6.0 => "Bom desempenho"
//   - < 6.0  => "Atenção"
function definirSituacao(media) {
  if (media === null) {
    return "Nota ainda não disponível";
  }
  if (media >= 6.0) {
    return "Bom desempenho";
  }
  return "Atenção";
}

// ============================================================
// FUNÇÃO: formatarNota
// ============================================================
// Mostra a nota com uma casa decimal (ex.: 8.2 => "8.2")
// ou "—" quando a nota não existe.
function formatarNota(nota) {
  if (nota === null) {
    return "—";
  }
  return nota.toFixed(1).replace(".", ",");
}

// ============================================================
// FUNÇÃO: criarCelula
// ============================================================
// Cria uma célula <td> da tabela com o texto informado.
// Opcionalmente recebe uma classe CSS.
function criarCelula(texto, classe) {
  const td = document.createElement("td");
  td.textContent = texto;
  if (classe) {
    td.classList.add(classe);
  }
  return td;
}

// ============================================================
// FUNÇÃO: preencherTabela
// ============================================================
// Cria automaticamente uma linha para cada disciplina,
// com notas normalizadas, média, faltas e situação.
function preencherTabela() {
  const corpo = document.getElementById("corpo-tabela");

  disciplinas.forEach(function (item) {
    // Normaliza as três notas do trimestre
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);

    // Calcula a média usando apenas as notas disponíveis
    const media = calcularMedia([n1, n2, n3]);

    // Soma as faltas dos três trimestres
    const faltas = somarFaltas(item.faltas);

    // Define a situação com base na média
    const situacao = definirSituacao(media);

    // Cria a linha <tr> e as células <td>
    const tr = document.createElement("tr");
    tr.appendChild(criarCelula(item.disciplina));
    tr.appendChild(criarCelula(formatarNota(n1)));
    tr.appendChild(criarCelula(formatarNota(n2)));
    tr.appendChild(criarCelula(formatarNota(n3)));
    tr.appendChild(criarCelula(formatarNota(media)));
    tr.appendChild(criarCelula(faltas));

    // Aplica a classe de cor conforme a situação
    if (situacao === "Bom desempenho") {
      tr.appendChild(criarCelula(situacao, "situacao-bom"));
    } else if (situacao === "Atenção") {
      tr.appendChild(criarCelula(situacao, "situacao-atencao"));
    } else {
      tr.appendChild(criarCelula(situacao, "situacao-indisponivel"));
    }

    corpo.appendChild(tr);
  });
}

// ============================================================
// FUNÇÃO: preencherCards
// ============================================================
// Calcula e mostra os valores dos cards de resumo:
// média geral, total de faltas, disciplinas em bom desempenho,
// disciplinas que precisam de atenção e frequência demonstrativa.
function preencherCards() {
  let somaMedias = 0;
  let totalMedias = 0;
  let totalFaltas = 0;
  let bomDesempenho = 0;
  let atencao = 0;

  disciplinas.forEach(function (item) {
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);
    const media = calcularMedia([n1, n2, n3]);

    // Média geral considera só disciplinas com média válida
    if (media !== null) {
      somaMedias += media;
      totalMedias++;
    }

    // Total de faltas da escola toda
    totalFaltas += somarFaltas(item.faltas);

    // Contagem por situação
    if (media !== null && media >= 6.0) {
      bomDesempenho++;
    } else if (media !== null && media < 6.0) {
      atencao++;
    }
  });

  // Média geral (se não houver nenhuma média, mostra "—")
  const mediaGeral = totalMedias > 0 ? somaMedias / totalMedias : null;

  // Preenche os elementos dos cards pelo ID
  document.getElementById("media-geral").textContent = formatarNota(mediaGeral);
  document.getElementById("total-faltas").textContent = totalFaltas;
  document.getElementById("bom-desempenho").textContent = bomDesempenho;
  document.getElementById("atencao").textContent = atencao;

  // Frequência FICTÍCIA e apenas demonstrativa.
  // No futuro, esse valor será calculado de outra forma.
  const frequenciaDemonstrativa = 92;
  document.getElementById("frequencia").textContent = frequenciaDemonstrativa + "%";
}

// ============================================================
// EXECUÇÃO
// ============================================================
// Quando a página terminar de carregar, preenche cards e tabela.
preencherCards();
preencherTabela();