export default function portParse(source: string) {
    const port = source.match(/@port\s+(\d+);/) || 3000;
    // dotenv logic should be provided
    return port;
}