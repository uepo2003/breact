import {app} from "@/app";
import {DatabaseManager} from "@/db";

export const runServer = (): void => {
  const port = process.env.BACKEND_PORT || 4444;

  const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
  });

  const shutDown = async (): Promise<void> => {
    console.log("Received kill signal, shutting down gracefully");
    await new DatabaseManager().close();
    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutDown);
  process.on("SIGINT", shutDown);
};
