import { OrionClient } from "../utils/OrionClient";

export default {
  name: "ready",
  once: true,
  execute(client: OrionClient) {
    console.log(`${client.user?.tag} is ready!`);
  },
};
