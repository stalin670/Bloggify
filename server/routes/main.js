const express = require('express');
const router = express.Router();

// Routes
router.get('/', (req, res) => {
    const locals = {
        title : "NodeJs Blog",
        description : "Simple Blog created with NodeJs , Express and MongoDB."
    }

    res.render('index', { locals });
});

module.exports = router;