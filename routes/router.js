const express = require('express');
const router = express.Router();
const path = require('path');
let basepath=__dirname+"/components/";
basepath=basepath.replace("\\routes","");
const getRouter = () => {
   
router.get('/',function(req,res){
    res.sendFile(path.join(basepath+'index/index.html'));
  });
  
  router.get('/about',function(req,res){
    res.sendFile(path.join(basepath+'about/about.html'));
  });
  
  router.get('/sitemap',function(req,res){
    res.sendFile(path.join(basepath+'sitemap/sitemap.html'));
  });
    return router;
  };

  module.exports.getRouter=getRouter;