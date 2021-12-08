const express = require('express');
const  router = express.Router();
const middleware_role = require('../middleware/role');

const controller = require('../controller/rotinaController');

router.put('/exercicio/:id_exercicio/registrar',controller.registrarExercicio)
router.get('/:id',controller.encontrarRotina);

//router.use(middleware_role.validarTokenAdm);

router.get('/',controller.listar);

router.post('/',controller.adicionar);

router.put('/:id', controller.atualizar);
router.put('/:id/exercicio/adicionar',controller.adicionarExercicio)

router.put('/exercicio/:id_exercicio/atualizar',controller.atualizarExercicio)

router.delete('/:id', controller.excluir);


module.exports = router;