type ItemProperties = Record<string, string>
  
interface Item {
    guid: string;
    name: string;
    path: string[];
    properties: ItemProperties;
}

export type Items = Item[]