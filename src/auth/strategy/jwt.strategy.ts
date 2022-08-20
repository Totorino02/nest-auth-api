import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private prisma : PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async getUser(email: string): Promise<User>{
        return await this.prisma.user.findUnique({
            where: {
                "email": email
            }
        });
    }
    
    async validate(payload: any){
        const user = await this.getUser(payload.email);
        if(!user.isConfirm) throw new ForbiddenException("User account is not confirm");
        return user;
    }
}