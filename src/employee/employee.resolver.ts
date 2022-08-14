import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { Location } from './entities/location.entity';
import { Project } from './entities/project.entity';

@Resolver((of) => Employee)
export class EmployeeResolver {
    constructor(private employeeService: EmployeeService) { }

    @Query(() => [Employee], { name: 'getAllEmployees' })
    findAll() {
        return this.employeeService.findAll()
    }

    @Mutation(() => Employee, { name: 'createEmployee' })
    create(@Args('employeeInput') employeeCreateDto: EmployeeCreateDTO) {
        return this.employeeService.create(employeeCreateDto)
    }

    @ResolveField((of) => Project)
    project(@Parent() employee: Employee) {
        return { __typename: 'Project', id: employee.projectId };
    }

    @ResolveField((of) => Location)
    location(@Parent() employee: Employee) {
        return { __typename: 'Location', id: employee.locationId };
    }

    // @ResolveField(()=>Project)
    // project(@Parent() employee: Employee){
    //     return this.employeeService.getProject(employee.projectId)
    // }
}
