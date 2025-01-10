import { parseArgs } from '@std/cli/parse-args'; //cliffy still sucks

const parsed = parseArgs(Deno.args);
const [command, ...restArgs] = parsed._ as string[];

if (parsed._.length === 0 || command === 'help' || command === '--help' || command === '-h') {
  Deno.exit(1);
}

const cmdName = command ?? 'help';

try {
  const module = await import(`./commands/${command}.ts`);

  if (module.default instanceof Function) {
    module.default(restArgs, parsed);
  } else {
    console.log (`bro literally pissed off in ${cmdName}`);
    Deno.exit(1);
  }
} catch (_e) {
  console.error(`Command ${cmdName} not found`);
  Deno.exit(1);
}

