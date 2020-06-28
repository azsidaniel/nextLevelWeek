import { Request, Response } from 'express';
import knex from '../database/connection';

class RecyclerController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const recyclers = await knex('recycler')
        .join('recycler_item', 'recycler.id', '=', 'recycler_item.recycler_id')
        .whereIn('recycler_item.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('recycler.*')

        const serializedItems = recyclers.map((recycler) => {
            return {
                ...recycler,
                image_url: `http://192.168.1.20:3333/uploads/${recycler.image}` ,
            };
        });
    

        return response.json(serializedItems)
    }

    async show(request: Request, response: Response) {
        const {id} = request.params;

        const recyclerFiltered = await knex('recycler').where('id', id).first();
        
        if (!recyclerFiltered) {
            return response.status(400).json({message: 'Recycler not found!'})
        }

        const serializedItem =  {
            ...recyclerFiltered,
            image_url: `http://192.168.1.20:3333/uploads/${recyclerFiltered.image}` , 
        };

        const items = await knex('item')
        .join('recycler_item', 'item.id', '=', 'recycler_item.item_id')
        .where('recycler_item.recycler_id', id)
        .select('item.title');

        return response.json({recyclerFiltered: serializedItem, items});
        
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();
        
        const recyler = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('recycler').insert(recyler);
    
        const recycler_id = insertedIds[0];
        const recyclerItem = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    recycler_id: recycler_id
                };
        });
    
        await trx('recycler_item').insert(recyclerItem)
    
        await trx.commit();

        return response.json({
            id: recycler_id,
            ...recyler
        });
    };
}

export default RecyclerController;