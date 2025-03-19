import type { PublicExplorer } from "cosmiconfig"
import { cosmiconfig } from "cosmiconfig"
import packageJson from "../package.json" with { type: "json" }

export interface Config {}

export class ConfigManager {
  private explorer: PublicExplorer
  private config: Config | undefined

  constructor() {
    // if begins with @ split at / and keep last element
    const packageName = packageJson.name.startsWith("@")
      ? packageJson.name.split("/").pop()
      : packageJson.name

    if (!packageName) {
      throw new Error("Package name is not valid")
    }

    this.explorer = cosmiconfig(packageName)
  }

  public getConfig(): Config | undefined {
    return this.config
  }

  public async load(filepath: string): Promise<Config | undefined> {
    try {
      this.explorer.load(filepath)
    }
    catch (error: unknown) {
      throw error instanceof Error
        ? error
        : typeof error === "string"
          ? new Error(error)
          : new Error("An error occurred while loading the configuration")
    }
  }

  public search(): Config | undefined {}
}
