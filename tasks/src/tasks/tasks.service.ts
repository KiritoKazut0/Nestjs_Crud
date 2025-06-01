import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { user_id, ...taskData } = createTaskDto;

    return this.taskRepository.save({
      ...taskData,
      user: { id: user_id } 
    });

    } catch (error) {
      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(userId: string): Promise<Task[]> {
    try {
        return  await this.taskRepository.find({
          where: {
            user: {id: userId}
          }
        })
    } catch (error) {
      throw new HttpException(
        'Error retrieving tasks. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
     try {
     
      const existingTask = await this.taskRepository.findOneBy({ id });
      if (!existingTask) {
        throw new HttpException(
          `Task with ID ${id} not found`,
          HttpStatus.NOT_FOUND
        );
      }
      

      const updateResult = await this.taskRepository.update(id, updateTaskDto);
      
      if (updateResult.affected === 0) {
        throw new HttpException(
          'Task could not be updated',
          HttpStatus.BAD_REQUEST
        );
      }
      

     return await this.taskRepository.findOneBy({ id });

      
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
        
      throw new HttpException(
        'Error updating task. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: string):Promise<{ message: string }> {
    try {

      const task = await this.taskRepository.findOneBy({ id });
      if (!task) {
        throw new HttpException('task not found', HttpStatus.NOT_FOUND);
      }

      await this.taskRepository.delete(id);
      return { message: 'Tasks deleted successfully' };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error deleting Tasks', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
