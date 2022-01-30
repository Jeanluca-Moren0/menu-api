import express, {Request, Response} from 'express'
import * as ItemService from './items.service'
import { BaseItem, Item } from './item.types'

export const itemsRouter = express.Router()

itemsRouter.get('/', async (req: Request, res: Response) => {
  try{
    const items: Item[] =  await ItemService.findAll()

    res.status(200).send(items)
  } catch(err){
    res.status(500).send(err.message)
  }
})

itemsRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try{
      const item: Item =  await ItemService.find(id)

      if(item){
        return res.status(200).send(item)
      }

      res.status(404).send("Item not Found")
    } catch(err){
      res.status(500).send(err.message)
    }
})

itemsRouter.post("/", async(req: Request, res: Response) => {
  try{
    const item: BaseItem = req.body

    const newItem = await ItemService.create(item)

    res.status(201).json(newItem)
  } catch(err){
    res.status(500).send(err.message)
  }
})

itemsRouter.put("/:id", async(req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try{
    const itemUpdate: Item = req.body

    const existingItem: Item = await ItemService.find(id)

    if(existingItem){
      const updateItem = await ItemService.update(id, itemUpdate)
      return res.status(200).json(updateItem)
    }

    const newItem = await ItemService.create(itemUpdate)

    res.status(201).json(newItem)
  } catch(err){
    res.status(500).send(err.message)
  }
})

itemsRouter.delete("/:id", async(req: Request, res: Response) => {
  try{
    const id: number = parseInt(req.params.id, 10)
    await ItemService.remove(id)

    res.sendStatus(204)
  } catch(err) {
    res.status(500).send(err.message)
  }
})