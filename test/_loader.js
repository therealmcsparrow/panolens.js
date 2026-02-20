import { existsSync, readFileSync } from 'fs';
import { resolve as pathResolve } from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

export async function resolve(specifier, context, nextResolve) {
    // Only handle relative imports without extensions
    if (specifier.startsWith('.') && !specifier.endsWith('.js') && !specifier.endsWith('.json')) {
        const parentPath = context.parentURL ? fileURLToPath(context.parentURL) : process.cwd();
        const parentDir = parentPath.endsWith('.js') ? pathResolve(parentPath, '..') : parentPath;
        const resolved = pathResolve(parentDir, specifier + '.js');
        if (existsSync(resolved)) {
            return { url: pathToFileURL(resolved).href, shortCircuit: true };
        }
    }
    // Handle .json imports
    if (specifier.endsWith('.json') && specifier.startsWith('.')) {
        const parentPath = context.parentURL ? fileURLToPath(context.parentURL) : process.cwd();
        const parentDir = parentPath.endsWith('.js') || parentPath.endsWith('.json') ? pathResolve(parentPath, '..') : parentPath;
        const resolved = pathResolve(parentDir, specifier);
        if (existsSync(resolved)) {
            return { url: pathToFileURL(resolved).href, shortCircuit: true };
        }
    }
    return nextResolve(specifier, context);
}

const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

export async function load(url, context, nextLoad) {
    // Transform JSON imports into ESM modules
    if (url.endsWith('.json')) {
        const filePath = fileURLToPath(url);
        const json = readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(json);
        const namedExports = Object.keys(parsed)
            .filter(key => validIdentifier.test(key))
            .map(key => `export const ${key} = ${JSON.stringify(parsed[key])};`)
            .join('\n');
        return {
            format: 'module',
            shortCircuit: true,
            source: `export default ${json};\n${namedExports}`
        };
    }
    return nextLoad(url, context);
}
