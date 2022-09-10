import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EmployeeModule } from './employee/employee.module';
import { Location } from './employee/entities/location.entity';
import { Project } from './employee/entities/project.entity';

@Module({
  imports: [EmployeeModule, GraphQLModule.forRoot<ApolloFederationDriverConfig>(
    {
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      buildSchemaOptions:{
        orphanedTypes:[Project, Location] // employee-service has Project type but it is not maintained by employee service 
      }
    }
  ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'employee',
      entities: ["dist/**/*.entity{.ts,.js}"], //tell typeORM, look at this files and create a table for us
      synchronize: true, // only use  in dev env, if something is changed in entity then it will modify the database
    }),
    // ProjectModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
