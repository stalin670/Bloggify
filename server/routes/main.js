const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes

router.get('', async (req, res) => {
    try {
      const locals = {
        title: "NodeJs Blog",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let perPage = 6;
      let page = req.query.page || 1;
  
      const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      // Count is deprecated - please use countDocuments
      // const count = await Post.count();
      const count = await Post.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('index', { 
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });
  



// router.get('/', async (req, res) => {
//     const locals = {
//         title : "NodeJs Blog",
//         description : "Simple Blog created with NodeJs , Express and MongoDB."
//     }

//     try {
//         const data = Post.find();
//         res.render('index', { locals, data });
//     } catch (error) {
//         console.log(error);
//     }
// });


router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = Post.findById({_id: slug});

        const locals = {
            title : data.title,
            description : "Simple Blog created with NodeJs , Express and MongoDB."
        }

        res.render('index', { locals, data });
    } catch (error) {
        console.log(error);
    }
});

// function insertPostDate () {
//     Post.insertMany([
//         {
//             title : "Building a Blog",
//             body : "This is just a body tag"
//         },
//         {
//             "title": "Building a Blog",
//             "body": "This is just a body tag"
//         },
//         {
//             "title": "Learning React",
//             "body": "React is a popular JavaScript library for building user interfaces."
//         },
//         {
//             "title": "Introduction to Node.js",
//             "body": "Node.js allows JavaScript to be used on the server side."
//         },
//         {
//             "title": "Exploring MongoDB",
//             "body": "MongoDB is a NoSQL database used for handling large amounts of unstructured data."
//         },
//         {
//             "title": "Understanding Express.js",
//             "body": "Express.js is a minimal and flexible Node.js web application framework."
//         },
//         {
//             "title": "Building RESTful APIs",
//             "body": "A RESTful API allows interaction between client and server through HTTP methods."
//         },
//         {
//             "title": "CSS Flexbox Guide",
//             "body": "Flexbox is a layout model in CSS designed to improve the alignment and distribution of items."
//         },
//         {
//             "title": "JavaScript ES6 Features",
//             "body": "ES6 introduced new features like arrow functions, promises, and template literals."
//         },
//         {
//             "title": "Version Control with Git",
//             "body": "Git is a distributed version control system to track code changes."
//         },
//         {
//             "title": "Deploying Applications",
//             "body": "Deployment involves moving an application to a live environment for users."
//         }
//     ]);
// }
// insertPostDate();

module.exports = router;