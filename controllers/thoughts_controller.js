const {thought,user} = require('../models');


module.exports = {
  getAllthought(req,res) {
    thought.find()
   
    .then(dbthoughtData => res.json(dbthoughtData))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },
  getthoughtById({params},res) {
    thought.findOne({_id: params.id })
    .populate({
        path: 'reactions',
        select: '-__v'
      })
   
       // return if no user is found 
    .then(dbthoughtData=> {
        if(!dbthoughtData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return; 
        }
        res.json(dbthoughtData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })

  },

  createthought({params,body},res) {
   thought.create(body) 
   .then(dbthoughtData => {
     res.json(".hasbeencreated")
   })
   .catch(err => res.json(err));
  },

  updatethought({params, body},res) {

    thought.findOneAndUpdate({ _id : params.id}, body, {new: true})
    .then(dbthoughtData => {
      if(dbthoughtData == null)
      res.status(404).json("thought not found");
      else
      res.json(dbthoughtData);
    })
    .catch(err => res.json(err));
  },

  deletethought({ params }, res) 
  {
    thought.findByIdAndDelete({_id: params.id})
    .then(dbthoughtData => {
      res.json(".hasbeendeleted")
       }
       )
       .catch(err => res.json(err));
  },


  addReaction({params, body}, res) {
    thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbthoughtData => {
    if (!dbthoughtData) {
        res.status(404).json({message: 'No thoughts with this particular ID!'});
        return;
    }
    res.json(dbthoughtData);
    })
    .catch(err => res.status(400).json(err))

  
}

}