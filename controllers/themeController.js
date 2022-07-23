const { themeModel: shoeModel } = require('../models');
const { newPost } = require('./postController')

function getShoes(req, res, next) {
    shoeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getShoe(req, res, next) {
    const { themeId } = req.params;

    shoeModel.findById(themeId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(theme => res.json(theme))
        .catch(next);
}

function createShoe(req, res, next) {
    const { themeName, postText } = req.body;
    const { _id: userId } = req.user;

    shoeModel.create({ themeName, userId, subscribers: [userId] })
        .then(theme => {
            newPost(postText, userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    shoeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

module.exports = {
    getThemes: getShoes,
    createTheme: createShoe,
    getTheme: getShoe,
    subscribe,
}
