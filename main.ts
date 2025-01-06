import { program } from 'commander';

program
  .name('css-as-lang')
  .version('0.0.1')

program.command('test')
    .description('test')
    .option('-t, --test', 'test')

program.parse(Deno.args)