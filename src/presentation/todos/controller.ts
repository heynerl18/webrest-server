
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
  { id: 1, text: 'By milk', createdAt: new Date() },
  { id: 2, text: 'By bread', createdAt: null },
  { id: 3, text: 'By butter', createdAt: new Date() },
];

export class TodosController {

  // * Inyeccion de dependencias
  constructor(){
  }

  public getTodos = async(req:Request, res:Response) => {

    const todos = await prisma.todo.findMany();
 
    return res.json(todos);
  }

  public getTodoById = async(req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'Argumento ID no es un numero' });

    const todo = await prisma.todo.findFirst({
      where: { id: Number(id) },
    });
    
    (todo) ? res.json(todo) : res.status(404).json(`TODO con el id ${id} no encontrado.`);
  }


  public createTodo = async(req:Request, res:Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if(error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.json(todo);
  }

  public updateTodo = async(req:Request, res:Response) => {

    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if(error) return res.status(400).json({ error });

    if (isNaN(id)) return res.status(400).json({ error: 'Argumento ID no es un numero' });

    const todo = await prisma.todo.findFirst({
      where: { id: Number(id) },
    });

    if(!todo) return res.status(404).json({ error: `Todo whit id ${id} not found` });

    const updatedTodo =  await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values
    });

    res.json(updatedTodo);
    
  }

  public deleteTodo = async(req:Request, res:Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: 'Argumento ID no es un numero' });

    const todo = await prisma.todo.findFirst({
      where: { id: Number(id) },
    });
    if(!todo) return res.status(404).json({ error: `Todo whit id ${id} not found` });

    const deleted = await prisma.todo.delete({
      where: { id }
    });

    (deleted)
    ? res.json(deleted)
    : res.status(400).json({ error: `Todo with id ${id} not found.` });

  }
} 