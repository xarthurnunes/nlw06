import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { RepositoryNotFoundError } from "typeorm";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Receber o Token
  const authToken = request.headers.authorization;

  //Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).json({ message: "Token Missing" });
  }

  const [, token] = authToken.split(" ");

  try {
    //Validar se o token é válido
    const { sub } = verify(
      token,
      "26d1f820845ed9423d5b97a25b47982f"
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
  //Recuperar informações do usuário
}
