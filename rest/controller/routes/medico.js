const medicoRepository = require("../../model/repositories/medico");
module.exports = function (app) {
  app.get("/cadastro", function (req, res) {
    res.render("medico/cadastro");
  });

  app.post("/cadastro/medico/edit/salvar", async (req, res) => {
    var Medico = {
      nome: req.body.nome,
      crm: req.body.crm,
      telefone: req.body.telefone,
    };
    try {
      await medicoRepository.salvarOuAtualizarMedico(Medico);
      res.redirect("../../../lista/medico");
    } catch (error) {
      console.info(error);
      res.render("medico/error", { mensagem: "Erro no cadastrado" });
    }
    try {
      var medicoCaregado = await medicoRepository.buscarMedicoId(req.body.crm);
      await medicoRepository.salvarOuAtualizarMedico(req.body);
      if (medicoCaregado != null) {
        res.json({ mensagem: "Alterado com sucesso" });
      } else {
        res.json({ mensagem: "Cadastrado com sucesso" });
      }
    } catch (error) {
      console.info(error);
      res.status(500).json({ erro: error.mensagem });
    }
  });

  app.post("/cadastro/medico/salvar", async (req, res) => {
    var Medico = {
      nome: req.body.nome,
      crm: req.body.crm,
      telefone: req.body.telefone,
    };
    try {
      await medicoRepository.inserirMedico(Medico);
      res.redirect("../../../../lista/medico");
    } catch (error) {
      res.render("medico/error", { mensagem: "Erro no cadastrado" });
    }
  });

  app.get("/delete/medico/:id", async (req, res) => {
    try {
      var id = req.params.id;
      await medicoRepository.deletarMedico(id);
      res.redirect("../../lista/medico");
    } catch (err) {
      res.render("medico/error", { mensagem: "Erro ao deletar" });
    }
  });

  app.get("/edit/medico/:id", async (req, res, next) => {
    try {
      var id = req.params.id;
      const value = await medicoRepository.buscarMedicoId(id);
      res.render("medico/edit", value.get(0));
    } catch (err) {
      next(err);
    }
  });

  app.get("/lista/medico", async (req, res, next) => {
    try {
      const docs = await medicoRepository.buscarTodosMedicos();
      res.render("medico/list", { mensagem: "Lista de Médicos", docs });
    } catch (err) {
      next(err);
    }
  });

  app.get("/buscar/medido/:id", async (req, res, next) => {
    try {
      let id = req.params.id;
      const value = await medicoRepository.buscarMedicoId(id);
      if (value != null) {
        res.json(value);
      } else {
        res.status(500).json({ erro: "Médico não encontrado!!!" });
      }
    } catch (error) {
      res.status(400).json({ erro: "Erro ao buscar o médico" });
    }
  });
};
