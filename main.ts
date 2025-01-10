import { parseArgs } from '@std/cli/parse-args'; //cliffy still sucks

const args = parseArgs(Deno.args);
const command = args._[0];

if (args._.length === 0 || command === 'help' ) {
  console.log('No command given');
  Deno.exit(1);
}