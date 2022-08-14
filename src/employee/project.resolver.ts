import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { EmployeeService } from "./employee.service";
import { Employee } from "./entities/employee.entity";
import { Project } from "./entities/project.entity";

@Resolver((of)=>Project)
export class ProjectResolver{

    constructor(private readonly employeeService: EmployeeService){}

    @ResolveField((of)=>[Employee])
    employees(@Parent() project:Project):Promise<Employee[]>{
        return this.employeeService.forProject(project.id)
    }
}