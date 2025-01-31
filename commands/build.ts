import dbParse, { DBConnection } from "../parsers/dbParser.ts";
import { Spinner } from '@std/cli/unstable-spinner';

export default function build(paths: string[], options: Record<string, unknown>) {
    const cssRegex = /^(?:.+\/)?[^\/]+\.css$/;

    if (paths.length === 0 || !cssRegex.test(paths[0])) {
      console.error('expected a css file');
      return;
    }
    
    const spinner = new Spinner({ message: "Parsing file ${paths[0]}", color: "yellow" });

    console.log("parsing file ${paths[0]}");
    try {
        const file = Deno.readTextFileSync(paths[0]);
        try {
            const getDatabase = dbParse(file);
        } catch (error) {
            console.error(`error parsing database from file: ${error}`);
        }

    } catch (error) {
        console.error(`error reading file: ${error}`);
    }

  }
  