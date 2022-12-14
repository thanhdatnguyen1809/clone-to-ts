import { Router } from "express";
import { getAllTasks, createTask, getTask, deleteTask, updateTask } from "../controllers/taskController";
const router = Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask);

export default router;