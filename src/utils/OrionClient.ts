import { Client, Collection, ClientOptions } from "discord.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export class OrionClient extends Client {
  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();

    this.loadEvents(this);
    this.loadSlashCommands(this);
  }

  commands: Collection<string, any>;

  async loadEvents(client: OrionClient) {
    const eventFiles = fs
      .readdirSync(path.join(__dirname, "dist", "events"))
      .filter((file: string) => file.endsWith(".js"));
    for (const file of eventFiles) {
      try {
        const event = (
          await import(path.join(__dirname, "dist", "events", file))
        ).default;
        console.log(`Loading event file: ${file}`);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
          client.on(event.name, (...args) => event.execute(client, ...args));
        }
      } catch (error) {
        console.error("There was an error loading the event file: ", error);
      }
    }
  }

  async loadSlashCommands(client: OrionClient) {}
}
