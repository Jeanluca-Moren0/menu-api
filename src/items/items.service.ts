import { BaseItem, Item } from "./item.types";
import { Items } from "./items.types";

let items : Items = {}

const findAll = async(): Promise<Item[]> => Object.values(items)

const find = async(id: number): Promise<Item> => items[id]

const create = async(newItem: BaseItem): Promise<Item> => {
  const id = new Date().valueOf()

  items[id] = {
    id,
    ...newItem,
  }

  return items[id]
}

const update = async(
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id)

  if(!item){
    return null
  }
  items[id] = {id, ...itemUpdate}

  return items[id]
}

const remove = async (id: number): Promise<null | void> => {
  const item = await find(id)

  if(!item){
    return null
  }

  delete items[id]
  
}

export { find, findAll, create, update, remove }