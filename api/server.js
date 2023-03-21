// server için gerekli olanları burada ayarlayın

// posts router'ını buraya require edin ve bağlayın
const express = require("express");

const server=express();
const postRoutes=require("./posts/posts-router")

server.use("/api/posts", postRoutes)

server.use(express.json());

    

module.exports=server;