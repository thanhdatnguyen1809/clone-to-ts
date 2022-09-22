import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../db/config";
import { Task } from "../entity/Task";
import { BadRequest } from "../errors/bad-request";
import { CustomError } from "../errors/custom-error";

const taskRepository = AppDataSource.getRepository(Task);

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allTasks = await taskRepository.find();
    res.status(200).json(allTasks);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body as Task;
    const taskCreate = taskRepository.create({ name, completed: false });
    const task = await taskRepository.save(taskCreate);

    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
};

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskRepository.findOneBy({ id: Number(req.params.id) });
    if (!task) {
      return next(new BadRequest("Not found that task"));
    }
    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskFound = await taskRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (!taskFound) {
      return next(new BadRequest("Not found that task"));
    }
    const task = await taskRepository.delete({ id: Number(req.params.id) });
    res.status(200).json({ task });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskFound = await taskRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (!taskFound) {
      return next(new BadRequest("Not found that task"));
    }
    const { name, completed } = req.body as Task;
    taskFound.completed = completed;
    taskFound.name = name;
    await taskRepository.save(taskFound);
    res.status(200).json(taskFound);
  } catch (err) {
    next(err);
  }
};

export { getAllTasks, createTask, getTask, deleteTask, updateTask };
