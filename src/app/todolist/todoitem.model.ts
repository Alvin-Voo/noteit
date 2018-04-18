export class ToDoItem{
  public item: string;
  public done: boolean;

  constructor(item: string, done:boolean){
    this.item = item;
    this.done = done;
  }
}
