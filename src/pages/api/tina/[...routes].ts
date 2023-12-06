import { LocalBackendAuthProvider, TinaNodeBackend } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";

import { IncomingMessage, ServerResponse } from "http";
import databaseClient from "../../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET as string,
        }),
      }),
  databaseClient,
});

export default (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  return handler(req, res);
};
