import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const all = async (req: Request, res: Response) => {
  const list = await Todo.findAll();
  res.json({ list });
}

export const add = async (req: Request, res: Response) => {
  if (req.body.title) {// Se tiver algum titulo

    let newTodo = await Todo.create({// Cria tarefa
      title: req.body.title,// Pega tarefa
      done: req.body.done ? true : false// Se tem done true senão false
    });

    res.status(201).json({ item: newTodo });// Deu certo e inseriu dados

  } else {
    res.json({ error: 'Dados não enviados' });
  } 
}

export const update = async (req: Request, res: Response) => {
  let id: string = req.params.id;// Pega o ID

  let todo = await Todo.findByPk(id);// Verifica se tem o ID
  if(todo) {// se achou o item

    if(req.body.title) {// Se tiver mudado titulo
      todo.title = req.body.title// Troca
    }
    if(req.body.done) {// Se tiver mudado done
      switch(req.body.done.toLowerCase()) {//Tudo minusculo
        case 'true':
          case '1':
            todo.done = true;
            break;
        case 'false':
          case '0':
            todo.done = false;
            break;
      }
    }

    await todo.save();// Salva
    res.json({ item: todo });// Retorna atualizado
  } else {
    res.json({ error: 'Esta tarefa não existe' });
  }
}
export const remove = async (req: Request, res: Response) => {
  let id: string = req.params.id;// Pega o ID
  let todo = await Todo.findByPk(id);
  if(todo) {// Se achou
    await todo.destroy();
  }
    res.json({});
}