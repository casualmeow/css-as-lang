import { parseArgs } from '@std/cli/parse-args';
import { getFlags } from './utils/flags.ts'; 

const parsed = parseArgs(Deno.args);
const [command, file] = parsed._ as string[];

// Create an array of flags from the named properties
const flags = getFlags(command, parsed);

const cmdName = command ?? 'help';

try {
  const module = await import(`./commands/${command}.ts`);

  if (module.default instanceof Function) {
    module.default([file], flags);
  } else {
    console.error(`Command ${cmdName} does not export a function.`);
    Deno.exit(1);
  }
} catch (_e) {
  console.error(`Command ${cmdName} not found`);
  Deno.exit(1);
}
