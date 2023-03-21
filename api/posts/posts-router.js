// posts için gerekli routerları buraya yazın
const express = require("express");

const router = express.Router();
const Posts=require("./posts-model")

router.get("/", async (req,res)=>{
    try {
        let allPosts=await Posts.find();
        res.json(allPosts);
    } catch(error){
        res.status(500).json({message:"Gönderiler alınamadı"})
    }

})

router.post("/", async(req, res)=>{
    try{
        let {title, contents}=req.body;
        if(!title || !contents){
        res.status(400).json({message:"Lütfen gönderi için bir title ve contents sağlayın"})
        }else{
            let {id} = await Posts.insert({title:title,contents:contents})
            let insertedPost= await Posts.findById(id)    
            res.status(201).json(insertedPost)
            }
        }
        catch(error){
            res.status(500).json({message:"Veritabanına kaydedilirken bir hata oluştu"})
        }
    });

router.get("/:id", async (req,res)=>{
const {id}= req.params;
        try {
            let onePost=await Posts.findById(id);
            if(!onePost){
                res.status(404).json({message:"Belirtilen ID'li gönderi bulunamadı"})
            }else{
                res.status(200).json(onePost)
            }
            
        } catch(error){
            res.status(500).json({message:"Gönderi bilgisi alınamadı"})
        }
    
    });

router.put("/:id", async (req,res)=>{
        //const {id}=req.params.id;
        try {
            let putOne=await Posts.findById(req.params.id);
            if(!putOne){
                res.status(404).json({message:"Belirtilen ID'li kullanıcı bulunamadı"})
            } 
            else{
                let updatedRecord=req.body;
                if(!updatedRecord.title || !updatedRecord.contents){
                res.status(400).json({message:"Lütfen kullanıcı için name ve bio sağlayın"})
                }else{
                let updatedPost=await Posts.update(req.params.id, updatedRecord)
                res.status(200).json(updatedPost)
                }
        }
    }
        catch(err){
            res.status(500).json({message:"Kullanıcı bilgisi alınamadı"})
        }
        });
        
router.delete("/:id", async (req,res)=>{
    const {id}=req.params;
        try {
            let post=await Posts.findById(id);
            if(!post){
                res.status(404).json({message:"Belirtilen ID li gönderi bulunamadı"})
            }else{
                await Posts.remove(id);
                res.status(200).json(post)
            }
        } catch(err){
            res.status(500).json({message:"Gönderi silinemedi"})
        }
    
    })

router.get("/:id/comments", async (req,res)=>{
    const {id}=req.params;
        try {
            let post=await Posts.findById(id);
            if(!post){
                res.status(404).json({message:"Girilen ID'li gönderi bulunamadı."})
            }else{
                let comments=await Posts.findPostComments(id)
                res.status(200).json(comments)
            }
        } catch(err){
            res.status(500).json({message:"Yorumlar bilgisi getirilemedi"})
        }
    
    })    


module.exports=router;