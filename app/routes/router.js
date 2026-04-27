const express = require("express");
const router = express.Router();
const moment = require("moment");
moment.locale('pt-br');


const { body, validationResult } = require("express-validator");

const { tarefasModel } = require("../models/tarefasModel");



router.get("/", async (req, res) => {
    res.locals.moment = moment;
    try {
        const lista = await tarefasModel.findAll();
        res.render("pages/index", { "linhasTabela": lista, erros: [] });
    } catch (error) {
        console.log(error);
    }
});


router.get("/nova-tarefa", async (req, res) => {
    res.locals.moment = moment;
    res.render("pages/cadastro", {
        tarefa: { id_tarefa: "", nome_tarefa: "", prazo_tarefa: "", situacao_tarefa: 1 },
        tituloAba: "Nova Tarefa",
        tituloPagina: "Inserção de Tarefa",
        id_tarefa: "0",
        erros: []
    });
});

router.get("/editar", async (req, res) => {
    res.locals.moment = moment;
    const id = req.query.id;
    try {
        const dadosTarefa = await tarefasModel.findById(id);
        console.log(dadosTarefa[0]);
        res.render("pages/cadastro", {
            tarefa: dadosTarefa[0],
            tituloAba: "Edição de Tarefa",
            tituloPagina: "Alteração de Tarefa",
            id_tarefa: id,
            erros: []
        });
    } catch (erro) {
        console.log(erro);
    }
});



const regrasTarefa = [
    body("tarefa")
        .trim()
        .notEmpty().withMessage("O nome da tarefa é obrigatório.")
        .isLength({ min: 3 }).withMessage("O nome deve ter pelo menos 3 caracteres."),
    body("prazo")
        .notEmpty().withMessage("O prazo é obrigatório.")
        .isDate().withMessage("Informe uma data válida para o prazo."),
    body("situacao")
        .notEmpty().withMessage("A situação é obrigatória.")
        .isInt({ min: 0, max: 4 }).withMessage("Situação inválida.")
];

router.post("/nova-tarefa", regrasTarefa, async (req, res) => {
    res.locals.moment = moment;

     const erros = validationResult(req);

    if (!erros.isEmpty()) {
         const id_tarefa = req.body.id_tarefa || "0";
        let tarefa;

        if (id_tarefa !== "0") {
            const dadosTarefa = await tarefasModel.findById(id_tarefa);
            tarefa = dadosTarefa[0];
        } else {
            tarefa = {
                id_tarefa: "",
                nome_tarefa: req.body.tarefa,
                prazo_tarefa: req.body.prazo,
                situacao_tarefa: req.body.situacao
            };
        }

        return res.render("pages/cadastro", {
            tarefa,
            tituloAba: id_tarefa !== "0" ? "Edição de Tarefa" : "Nova Tarefa",
            tituloPagina: id_tarefa !== "0" ? "Alteração de Tarefa" : "Inserção de Tarefa",
            id_tarefa,
            erros: erros.array()
        });
    }

     
    const id_tarefa = req.body.id_tarefa;
    const dadosForm = {
        nome: req.body.tarefa,
        prazo: req.body.prazo,
        situacao: req.body.situacao
    };

    try {
        if (id_tarefa && id_tarefa !== "0") {
             dadosForm.id = id_tarefa;
            await tarefasModel.update(dadosForm);
            console.log("Tarefa atualizada:", id_tarefa);
        } else {
             const insert = await tarefasModel.create(dadosForm);
            console.log("Tarefa criada:", insert);
        }
        res.redirect("/");
    } catch (erro) {
        console.log(erro);
    }
});
 
router.get("/excluir-logico", async (req, res) => {
    const id = req.query.id;
    try {
        const resultado = await tarefasModel.deleteLogico(id);
        console.log("Delete lógico realizado:", resultado);
        res.redirect("/");
    } catch (erro) {
        console.log(erro);
    }
});


router.get("/teste-delete", async (req, res) => {
    const id = req.query.id;
    try {
        const resultado = await tarefasModel.deleteFisico(id);
        console.log("Delete físico realizado:", resultado);
        res.send(`Delete físico realizado com sucesso para id: ${id}`);
    } catch (erro) {
        console.log(erro);
        res.send("Erro no delete físico.");
    }
});


router.get("/teste-delete-logico", async (req, res) => {
    const id = req.query.id; 
    try {
        const resultado = await tarefasModel.deleteLogico(id);
        console.log("Delete lógico realizado:", resultado);
        res.send(`Delete lógico realizado com sucesso para id: ${id}`);
    } catch (erro) {
        console.log(erro);
        res.send("Erro no delete lógico.");
    }
});



router.get("/teste-create", async (req, res) => {
    let dadosInsert = {
        nome: "remover virus do PC 2 do 2B",
        prazo: "2026-04-10",
        situacao: 1
    };
    try {
        const resultInsert = await tarefasModel.create(dadosInsert);
        console.log(resultInsert);
        res.send("Insert realizado");
    } catch (erro) {
        console.log(erro);
    }
});


module.exports = router;