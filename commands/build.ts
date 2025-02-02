import dbParse, { DBConnection } from "../parsers/dbParser.ts";
import { Spinner } from '@std/cli/unstable-spinner';

export default async function build(path: string[], flags: string[]) {
  const cssRegex = /^(?:.+\/)?[^\/]+\.css$/;
  let dbconnection: DBConnection | undefined;

  if (path.length === 0 || !cssRegex.test(path[0])) {
    console.error('Usage: ... build [file] [optional flags]');
    return;
  }
  
  const spinner = new Spinner({ message: `Parsing file ${path[0]}`, color: "yellow" });
  spinner.start();

  try {
    const file = await Deno.readTextFile(path[0]);
    spinner.message = `parsing database from file ${path[0]}`;
    try {
      dbconnection = await dbParse(file);
    } catch (error) {
      console.error(`error parsing database from file: ${error}`);
    }
  } catch (error) {
    console.error(`error reading file: ${error}`);
  }

  spinner.stop();

  // Process flags
  if (
    flags.includes('-log') ||
    flags.includes('-l') ||
    flags.includes('--log') ||
    flags.includes('--l')
  ) {
    console.log('database connection:', dbconnection);
  } else if (
    flags.includes('-nodb') ||
    flags.includes('-nd') ||
    flags.includes('--nodb') ||
    flags.includes('--nd')
  ) {
    console.log('skipping database parsing');
  } else {
    console.log('build complete');
  }
}
