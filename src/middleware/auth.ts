import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export function authJWT(req: Request, res: Response, next: NextFunction) {
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

    console.log(decoded)

    Object.assign(req.query.user, decoded);

    return next();
}