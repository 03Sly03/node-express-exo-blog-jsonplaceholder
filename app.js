const express = require('express');
const path = require('path');
const axios = require('axios');

// initialisé l'application
const app = express();

// lier mon express.js à un moteur de templates. ici twig
// 1. On va récupérer mes templates dans le dossier views
app.set('views', path.join(__dirname,'views'));
// 2. connecter twig à express.js
app.set('view engine', 'twig');

// rendre dispo en url tous les fichier dans le dossier public
app.use(express.static('public'))

// définir le port
const port = 4400;

// Routing
app.get('/', (req, res) => {
    res.render('index', {title: 'Page d\'accureil'});
})

app.get('/contact', (req, res) => {
    res.render('contact', {mail: "jean-baptiste@pop.eu.com"});
})

app.get('/blog', (req, res) => {
    res.render('blog', {title: 'Mes Articles'});
})

// app.get('/blog/:id', (req, res) => {
//     res.render('article', {title: 'Mon Article'});
// })

// Ex: /utilisateurs/7
app.get('/blog/:id', (req,res) => {

    // Vient récupérer tout ce qu'il y a après /utilisateurs/
    // Et ça va le mettre dans :bachi
    // Et ça, ça le transvide dans req.params.bachi
    // Dans mon ex, id -> 7
   const id = req.params.id;

   // Récupérer les données de l'API JSON placeholder
   // POur un utilisateur précis
   // Ici, celui dont l'id correspond à req.params.bachi
   axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
   .then(resAxios => {
       console.log(resAxios.data);

       // Mes données de l'API que je reçois
       // Je les envoie dans le template twig
       // Avec un nom myUser qui permet de faire
       // Dans mon template
       // {{myUser.quelquechose}}
       res.render('article', {myArticle: resAxios.data});
   })
})

// Lancer le serveur
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});