const express= require('express');
const router=express.Router();
const {handleGetAllUsers,handleGetUsersById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUser}= require('../controllers/user')


router// below the routes, the handlers which start with . are called controllers
.get('/',handleGetAllUsers )
router.route('/:id')
.get(handleGetUsersById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)
router.post('/',handleCreateNewUser)
module.exports= router;