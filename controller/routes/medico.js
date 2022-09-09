const medicoRepository =require('../../model/repositories/medico'); 
module.exports = function (app){

app.get("/cadastro",  function(req, res){
       res.render('medico/cadastro');
});

app.post('/cadastro/medico/edit/salvar', async (req, res) => {
    var Medico = {nome: req.body.nome,
        crm: req.body.crm,
        telefone: req.body.telefone}; 
      try {
      await medicoRepository.salvarOuAtualizarMedico(Medico);
           res.redirect('../../../lista/medico');
    } catch (error) {
         console.info(error);
      res.render('medico/error', {mensagem: 'Erro no cadastrado' });
     
    }
});

app.post('/cadastro/medico/salvar', async (req, res) => {
  var Medico = {nome: req.body.nome,
        crm: req.body.crm,
        telefone: req.body.telefone}; 
    try {
        await medicoRepository.inserirMedico(Medico);
         res.redirect('../../../../lista/medico');   
    } catch (error) {
      res.render('medico/error', {mensagem: 'Erro no cadastrado' });
    }
});

app.get('/delete/medico/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await  medicoRepository.deletarMedico(id);
    res.redirect('../../lista/medico');
  } catch (err) {
    res.render('medico/error', {mensagem: 'Erro ao deletar' });
  }
});

app.get('/edit/medico/:id', async (req, res, next) => {
  try {
    var id = req.params.id;
    const value = await medicoRepository.buscarMedicoId(id);
    res.render('medico/edit', value.get(0));
  } catch (err) {
    next(err);
  }
});

app.get('/lista/medico', async (req, res, next) => {
  try {
    const docs = await medicoRepository.buscarTodosMedicos();
    res.render('medico/list', { mensagem: 'Lista de Médicos', docs });
  } catch (err) {
    next(err);
  }
});
}