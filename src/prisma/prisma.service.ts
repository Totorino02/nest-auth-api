import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources:{
                db:{
                    url: "postgresql://postgres:@pg_password@localhost:5432/nest-auth-api?schema=public"
                }
            }
        })
    }
}