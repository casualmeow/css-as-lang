import terminalLink from 'terminal-link';

export default function help(_string: [], _options: Record<string, unknown>) {
    const githubRepo = terminalLink('click', 'https://github.com/casualmeow/css-as-lang'); //refactor no normal link / allow-sys flag expected
    console.log(githubRepo); 
}
