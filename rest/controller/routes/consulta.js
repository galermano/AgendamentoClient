const consultaRepository = require("../../model/repositories/consulta");
module.exports = function (app) {
  app.get("/cadastro/consulta", function (req, res) {
    res.render("consulta/cadastro");
  });

  app.post("/cadastro/consulta/edit/salvar", async (req, res) => {
    var Consulta = {
      data: req.body.data,
      id_medico: req.body.crm,
      id_paciente: req.body.cpf,
      id: req.body.id,
    };
    try {
      await consultaRepository.salvarOuAtualizarConsulta(Consulta);
      res.redirect("../../../lista/consulta");
    } catch (error) {
      console.info(error);
      res.render("consulta/error", { mensagem: "Erro no cadastrado!" });
    }
  });

  app.post("/cadastro/consulta/salvar", async (req, res) => {
    var Consulta = {
      data: req.body.data,
      id_medico: req.body.crm,
      id_paciente: req.body.cpf,
    };
    try {
      await consultaRepository.inserirConsulta(Consulta);
      res.redirect("../../../../lista/consulta");
    } catch (error) {
      console.info(error);
      res.render("consulta/error", { mensagem: "Erro no cadastrado" });
    }
  });

  app.get("/delete/consulta/:id", async (req, res) => {
    try {
      var id = req.params.id;
      await consultaRepository.deletarConsulta(id);
      res.redirect("../../lista/consulta");
    } catch (error) {
      console.info(error);
      res.render("consulta/error", { mensagem: "Erro ao deletar" });
    }
  });

  app.get("/edit/consulta/:id", async (req, res, next) => {
    try {
      var id = req.params.id;
      const value = await consultaRepository.buscarConsultaId(id);
      res.render("consulta/edit", value.get(0));
    } catch (error) {
      next(error);
    }
  });

  app.get("/lista/consulta", async (req, res, next) => {
    try {
      const docs = await consultaRepository.buscarTodasConsultas();
      res.render("consulta/list", { mensagem: "Lista de Médicos", docs });
    } catch (error) {
      next(error);
    }
  });
};
