import { Router } from "express";

const suspeitosRoutes = Router();

// Array com suspeitos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 10),
    nome: "Capitã Lucimara",
    profissão: "Capitã da PM",
    envolvimento: "Sim",
    nivelSuspeito: "Baixo"
  },
  {
    id: Math.floor(Math.random() * 10),
    nome: "Pablo Marçal",
    profissão: "Quase prefeito de SP",
    envolvimento: "Não",
    nivelSuspeito: "Médio"
  },
  {
    id: Math.floor(Math.random() * 10),
    nome: "Bombeiro Zé",
    profissão: "Vereador",
    envolvimento: "Não",
    nivelSuspeito: "Baixo"
  },
  
  
];

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
    const { nome, profissao, envolvimento, nivelSuspeito } = req.body;

  // Validação dos campos nome, profissão,nível de suspeito e envolvimento
  if (!nome || !profissao || !nivelSuspeito || !envolvimento) {
    return res.status(400).send({
      message: "O nome, profissão, nivel de suspeito ou envolvimento não foi preenchido, Por favor preencha !!",
    });
  }



  // Criação de um novo suspeito
  const novoSuspeito = {
    id: Math.floor(Math.random() * 1000),
    nome,
    profissao,
    envolvimento,
    nivelSuspeito
    
  };

  // Adiciona o novo suspeito ao array de suspeitos
  suspeitos.push(novoSuspeito);

  return res.status(201).json({
    message: "Suspeito cadastrado!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array
  const suspeito = suspeitos.find((Indeliquente) => Indeliquente.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `Suspeito com id ${id} não encontrado!` });
  }

  return res.status(200).json(suspeito);
});

// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
 const { nome, profissao, envolvimento, nivelSuspeito } = req.body;

  // Busca um suspeito pelo id 
  const suspeito = suspeitos.find((Indeliquente) => Indeliquente.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `Suspeito com id ${id} não encontrado!` });
  }



  suspeito.nome = nome;
  suspeito.profissao = profissao;
  suspeito.envolvimento = envolvimento;
  suspeito.nivelSuspeito = nivelSuspeito;

  return res.status(200).json({
    message: "Suspeito atualizado com sucesso!",
    suspeito,
  });
});

suspeitosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((Indeliquente) => Indeliquente.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não encontrado!` });
  }

  // Remove o suspeito do array de suspeitos 
  suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

  return res.status(200).json({
    message: "Suspeito removido com sucesso!",
    suspeito,
  });
});

export default suspeitosRoutes;