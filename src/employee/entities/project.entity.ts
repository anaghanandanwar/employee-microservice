import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.entity";

@ObjectType()
@Directive('@extends') // employee service does not own Project object
@Directive('@key(fields: "id")')
export class Project {
    @Field((type)=>ID)
    @Directive('@external')
    id: string

    @Field((type)=>[Employee])
    employees: Employee[]
}