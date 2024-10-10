import { Router } from "express";

const suspeitosRoutes = Router();

// Array com candidatos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 1000),
    nome: "Capitã Lucimara",
    profissão: "Capitã da PM",
    envolvimento: "Sim",
    nivelSuspeito: "Baixo"
  },
  {
    id: Math.floor(Math.random() * 1000),
    nome: "Pablo Marçal",
    profissão: "Quase prefeito de SP",
    envolvimento: "Não",
    nivelSuspeito: "Médio"
  },
  {
    id: Math.floor(Math.random() * 1000),
    nome: "Bombeiro Zé",
    profissão: "Vereador",
    envolvimento: "Não",
    nivelSuspeito: "Baixo"
  },
  
  
];

// Rota para listar todos os candidatos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo candidato
suspeitosRoutes.post("/", (req, res) => {
    const { nome, profissao, envolvimento, nivelSuspeito } = req.body;

  // Validação dos campos nome e partido
  if (!nome || !profissao || !nivelSuspeito) {
    return res.status(400).send({
      message: "O nome, profissão ou nivel de suspeito não foi preenchido, Por favor preencha !!",
    });
  }



  // Criação de um novo candidato
  const novoSuspeito = {
    id: Math.floor(Math.random() * 1000),
    nome,
    
  };

  // Adiciona o novo candidato ao array de candidatos
  suspeitos.push(novoSuspeito);

  return res.status(201).json({
    message: "Suspeito cadastrado!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeito pelo id
suspeitostosRoutes.get("/:id", (req, res) => {
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

  // Busca um candidato pelo id no array de candidatos
  const suspeito = suspeitos.find((Indeliquente) => Indeliquente.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `Suspeito com id ${id} não encontrado!` });
  }

  // Validação dos campos envolvimento e níveld e suspeita
  if (!envolvimento || !nivelSuspeito  ) {
    return res.status(400).send({
      message: "O envolvimento ou o nível de suspeita não foi preenchido, Por favor preencha!!",
    });
  }

  suspeito.nome = nome;
  suspeito.profissao = profissao;
  suspeito.envolvimento = envolvimento;
  suspeito.nivelSuspeito = NivelSuspeito;

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

  // Remove o candidato do array de candidatos
  suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

  return res.status(200).json({
    message: "Suspeito removido com sucesso!",
    suspeito,
  });
});

export default suspeitosRoutes;