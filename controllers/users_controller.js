const {thought,user} = require('../models');


const thoughtController = {
  getAllusers(req,res) {
    user.find()
   
    .then(dbuserData => res.json(dbuserData))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },

  getusersById({params},res) {
    user.findOne({_id: params.id })
    
   
       // return if no user is found 
    .then(dbuserData=> {
        if(!dbuserData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return; 
        }
        res.json(dbuserData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })

  },

  updateusers({params, body},res) {

    user.findOneAndUpdate({ _id : params.id}, body, {new: true})
    .then(dbuserData => {
      if(dbuserData == null)
      res.status(404).json("user not found");
      else
      res.json(dbuserData);
    })
    .catch(err => res.json(err));
  },

  createusers({body},res) {
    user.create(body) 
    .then(dbuserData => {
      res.json(".hasbeencreated")
    })
    .catch(err => res.json(err));
   },
   

  deleteusers({ params }, res) 
  {
    user.findByIdAndDelete({_id: params.id})
    .then(dbuserData => {
      res.json(".hasbeendeleted")
       }
       )
       .catch(err => res.json(err));
  },


  // Delete a current user by ID
  addFriend({params}, res) {
     user.findOneAndUpdate({_id: params.userId}, {$push: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(dbuserData => {
        if (!dbuserData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
    res.json(dbuserData);
    })
    .catch(err => res.json(err));
},

// Delete a current Friend
deleteFriend({ params }, res) {
    user.findOneAndUpdate({_id: params.userId}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbuserData => {
        if(!dbuserData) {
            res.status(404).json({message: 'No Friend with this particular ID!'});
            return;
        }
        res.json(dbuserData);
    })
    .catch(err => res.status(400).json(err));
}


};
module.exports = thoughtController;

