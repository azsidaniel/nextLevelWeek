import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate';

import RecyclerController from './controllers/RecyclerController';
import ItemController from './controllers/ItemController';

const routes = express.Router();
const upload = multer(multerConfig);

//index, show, create, update, delete.
const recyclerController = new RecyclerController();
const itemController = new ItemController()

routes.get('/items', itemController.index)

routes.get('/recycler', recyclerController.index);
routes.get('/recycler/:id', recyclerController.show);

routes.post(
    '/recycler',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          whatsapp: Joi.number().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
          city: Joi.string().required(),
          uf: Joi.string().required().max(2),
          items: Joi.string().required(),
        })
    }, {
      abortEarly: false,
    }), 
    recyclerController.create);


export default routes; 