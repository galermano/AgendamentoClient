const pacienteRepository =require('../../model/repositories/paciente'); 
module.exports = function (app){

app.get("/cadastro/paciente",  function(req, res){
       res.render('paciente/cadastro');
});

app.post('/cadastro/paciente/edit/salvar', async (req, res) => {
    var Paciente = {nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        rg:req.body.rg,
        endereco: req.body.endereco}; 
      try {
      await pacienteRepository.salvarOuAtualizarPaciente(Paciente);
           res.redirect('../../../lista/paciente');
    } catch (error) {
         console.info(error);
      res.render('paciente/error', {mensagem: 'Erro no cadastrado' });
    }
});

app.post('/cadastro/paciente/salvar', async (req, res) => {
  var Paciente = {nome: req.body.nome,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    rg:req.body.rg,
    endereco: req.body.endereco}; 
    try {
        await pacienteRepository.inserirPaciente(Paciente);
         res.redirect('../../../../lista/paciente');   
    } catch (error) {
      res.render('paciente/error', {mensagem: 'Erro no cadastrado' });
    }
});

app.get('/delete/paciente/:id', async (req, res) => {
  try {
    var id = req.params.id;
    await  pacienteRepository.deletarPaciente(id);
    res.redirect('../../lista/paciente');
  } catch (err) {
    res.render('paciente/error', {mensagem: 'Erro ao deletar' });
  }
});

app.get('/edit/paciente/:id', async (req, res, next) => {
  try {
    var id = req.params.id;
    const value = await pacienteRepository.buscarPacienteId(id);
    res.render('paciente/edit', value.get(0));
  } catch (err) {
    next(err);
  }
});

app.get('/lista/paciente', async (req, res, next) => {
  try {
    const docs = await pacienteRepository.buscarTodosPacientes();
    res.render('paciente/list', { mensagem: 'Lista de Médicos', docs });
  } catch (err) {
    next(err);
  }
});
}