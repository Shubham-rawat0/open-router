import { prisma } from "db";
import bcrypt from "bcrypt";
export class AuthService {
    static async signup(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return user.id.toString();
    }
    static async signin(email, password) {
        const user = await prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            return { correctCredentials: false };
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return { correctCredentials: false };
        }
        return {
            correctCredentials: true,
            userId: user.id.toString(),
        };
    }
    static async getUserDetails(id) {
        return prisma.user.findFirst({
            where: { id },
            select: {
                credits: true,
            },
        });
    }
}
