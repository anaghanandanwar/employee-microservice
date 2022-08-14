import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
    // @InjectRepository() - typeorm  comes with repository api, it comes with standard methods like find, findall, create, update, delete etc
    //                       We can use this repository by injecting in our service
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        // private projectService: ProjectService
    ) { }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    //TODO: findOne

    async create(employee: EmployeeCreateDTO): Promise<Employee> {
        let emp = this.employeeRepository.create(employee)
        return this.employeeRepository.save(emp)
    }

    async forProject(id:string) {
        return this.employeeRepository.find({where:{projectId:id}})
    }

    async forLocation(id:string){
        return this.employeeRepository.find({where:{locationId:id}})
    }
}
