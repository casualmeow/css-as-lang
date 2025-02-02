import terminalLink from 'terminal-link';

export default function help(_string: [], _options: Record<string, unknown>) {
    console.log(`Commands:
        build [file] [flags] - compiling the backend for css project.
           file flags: 
           -nodb - do not parse database (exchanges the build speed proecess)
           `)
}
