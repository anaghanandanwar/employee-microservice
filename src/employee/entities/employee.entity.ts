import { Directive, Field, ID, ObjectType } from "@nestjs/graphql"
// import { Project } from "src/project/entities/project.entity"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Location } from "./location.entity"
import { Project } from "./project.entity"

@ObjectType() //Nest on startup reads all object type and generate graphql schema for those
@Directive('@key(fields:"id")')
@Entity() //used by database
export class Employee {
    @Field((type)=>ID) //Fields to inclue in schema
    @PrimaryGeneratedColumn('uuid') //everytime we create a record, databse will generate a uuid as primary key
    id: string

    @Field()
    @Column()
    firstName:string

    @Field()
    @Column()
    lastName:string

    @Field()
    @Column()
    designation: string

    @Field({nullable: true})
    @Column({nullable: true})
    city:string

    @Field(()=>Project)
    // @ManyToOne(()=>Project, project=>project.employees)
    project:Project

    @Field()
    @Column()
    projectId: string

    @Field()
    @Column()
    locationId: string

    @Field(()=>Location)
    location:Location
}