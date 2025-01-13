/**
 * @deprecated
 */

export default function urlParse(source: string) {
    const url = source.match(/@url\s+(\w+);/) || 'http://localhost:3000';

    return url;
}   