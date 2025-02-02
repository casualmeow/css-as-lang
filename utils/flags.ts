export type BuildFlags =
  | '-log'
  | '-l'
  | '--log'
  | '--l'
  | '-nodb'
  | '-nd'
  | '--nodb'
  | '--nd'; // this should be reused & **refactored inside diffrerent files for opts for make better matching/quality

interface CommandFlagConfig {
  command: string;
  allowedFlags: string[];
}

const commandFlagConfigs: CommandFlagConfig[] = [
  {
    command: "build",
    allowedFlags: ["-log", "-l", "--log", "--l", "-nodb", "-nd", "--nodb", "--nd"],
  }, // should be edited (for help command rn)
];

export function getFlags(
  command: string,
  parsed: Record<string, unknown>
): string[] {
  const config = commandFlagConfigs.find((c) => c.command === command);
  if (!config) {
    return [];
  }
  const flags: string[] = [];
  for (const flag of config.allowedFlags) {
    // Remove leading dashes to get the key that parseArgs would have stored.
    const key = flag.replace(/^-+/, "");
    // If the flag property is set in parsed, add the original flag string.
    if (parsed[key]) {
      flags.push(flag);
    }
  }
  return flags;
}
