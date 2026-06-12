import { WEBSITE_URL } from "@jiwen/lib/constants";
import {
  type JWTPayload,
  type JWTVerifyOptions,
  jwtVerify,
  SignJWT,
} from "jose";
import { serverEnv } from "@/env/server";

const encodedSecret = new TextEncoder().encode(serverEnv.JWT_SECRET);

export function signJwt({
  payload,
  expirationTime = "5m",
}: {
  payload: JWTPayload;
  expirationTime?: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(WEBSITE_URL)
    .setExpirationTime(expirationTime)
    .sign(encodedSecret);
}

export function verifyJwt({
  token,
  options,
}: {
  token: string;
  options?: JWTVerifyOptions;
}) {
  return jwtVerify(token, encodedSecret, {
    ...options,
    algorithms: ["HS256"],
    issuer: WEBSITE_URL,
  });
}
