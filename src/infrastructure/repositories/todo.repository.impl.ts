import { CreateTodoDto, TodoDatasources, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasources
    ){}

    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}
