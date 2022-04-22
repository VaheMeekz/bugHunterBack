var express = require('express');
var router = express.Router();

const Lang = require('../models').Lang;

router.get('/:page', async function(req, res, next) {
    const langs = await Lang.findAll({
        where: {
            page: req.params['page'],
        }
    });

   res.json(langs)
});

router.post('/', async function(req,res, next) {
    const {
        selector,
        langEng,
        langRu,
        langArm,
        page
    } = req.body;

    if (!(selector && langEng && langRu && langArm && page)) {
        return res.json({
            error: ['All fields are required']
        });
    }

    let newLang;
    try {
        newLang = await Lang.create({
            selector,
            langEng,
            langRu,
            langArm,
            page
        });
    } catch (e) {
        return res.json({
            error: e.errors.map(i => i.message)
        })
    }

    res.json(newLang);
});

module.exports = router;