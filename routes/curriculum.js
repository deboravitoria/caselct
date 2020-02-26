const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index");

const Curriculum = require("../models/curriculum");

router.get('/form', (req, res) => {
    res.render('curriculum/new');
});

router.post('/form', (req, res) => {
    Curriculum.create(new Curriculum(req.body.curriculum), (err, result) => {
        if(err){
            console.log(err)
            req.flash("error", "Não foi possível enviar o formulário. :(");
            return res.redirect("/curriculum/form");
        }
        
        req.flash("success", "Seu curriculum foi enviado com sucesso. :)");
        res.redirect("/");
    });
});

router.get('/lista', middleware.isLoggedIn, (req, res) => {
    Curriculum.find(req.query.nome ? {name:req.query.nome}: {}, (err, result) =>{
        if(err){
            console.log(err);
            req.flash("error", "Erro na busca de dados. :(");
            return res.redirect("/curriculum/lista");
        }
        
        if(result.length === 0){
            req.flash("error", "Candidato não encontrado. :(");
            return res.redirect("/curriculum/lista");
        }
        
        res.render("curriculum/view", {curriculums: result});
    });
});

router.delete('/lista/:id', middleware.isLoggedIn, (req, res) => {
    Curriculum.remove({_id: req.params.id}, (err) => {
        if(err){
            console.log(err);
            req.flash("error", "Erro ao deletar dados. :(");
            return res.redirect("/curriculum/lista");
        }
        
        req.flash("success", "Curriculum removido.");
        res.redirect("/curriculum/lista");
    });
});

router.get('/lista/:id', middleware.isLoggedIn, (req, res) => {
    Curriculum.find({_id: req.params.id}, (err, result) =>{
        if(err || result.length === 0){
            console.log(err);
            req.flash("error", "Erro na busca de dados. :(");
            return res.redirect("/curriculum/lista");
        }
        
        res.render("curriculum/curriculum", {curriculum: result[0]});
    });
});

router.put('/lista/:id', middleware.isLoggedIn, (req, res) => {
    Curriculum.update({_id:req.params.id}, req.body.curriculum, (err) => {
        if(err){
            console.log(err);
            req.flash("error", "Erro na busca de dados. :(");
            return res.redirect("/curriculum/lista");
        }
        
        req.flash("success", "Curriculum atualizado.");
        res.redirect("/curriculum/lista");
    });
});

module.exports = router;
