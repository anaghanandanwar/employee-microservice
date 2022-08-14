import { Field, InputType } from "@nestjs/graphql"

@InputType() // this is going to use in mutations
export class EmployeeCreateDTO {
    @Field()
    firstName:string

    @Field()
    lastName:string

    @Field()
    designation: string

    @Field({nullable: true})
    city:string

    @Field()
    projectId:string

    @Field()
    locationId: string
}