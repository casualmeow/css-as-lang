import { parseArgs } from '@std/cli/parse-args'; //cliffy sucks

const parsed = parseArgs(Deno.args);
const [command, ...restArgs] = parsed._ as string[];

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
  console.error(`Command ${cmdName} not found`); //refactor
  Deno.exit(1);
}

