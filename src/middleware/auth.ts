import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { IRoles } from "../entities/User";

export function authJWT(roles: IRoles[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.method === "OPTIONS") {
            return next();
        }

        if (!req.headers.authorization) {
            throw res.status(400).json({ error: "Authentication failed!" });
        }

        const headerAuth = req.headers.authorization!;

        const token = headerAuth.split(" ")[1]; // Authorization: 'Bearer TOKEN'

        if (!token) {
            throw res.status(400).json({ error: "Authentication failed!" });
        }

        const decoded = verify(token, `${process.env.JWT_SECRET}`) as JwtPayload;

        const authorized = roles.includes(decoded.user)

        if (!authorized) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        return next();
    }
}