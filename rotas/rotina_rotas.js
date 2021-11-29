const express = require('express');
const  router = express.Router();
const middleware_role = require('../middleware/role');

const controller = require('../controller/rotinaController');

router.put('/exercicio/:id_exercicio/registrar',controller.registrarExercicio)
router.get('/:id',controller.encontrarRotina);

router.use(middleware_role.validarTokenAdm);
router.get('/',controller.listar);

router.post('/',controller.adicionar);

router.put('/exercicio/atualizar/:id_exercicio',controller.atualizarExercicio)
router.put('/exercicio/adicionar/:id',controller.adicionarExercicio)
router.put('/:id', controller.atualizar);

router.delete('/:id', controller.excluir);


module.exports = router;