import path from 'path';
import { fileURLToPath } from 'url';

// Utility function to get the equivalent of __dirname in an ES module environment
export const getDirname = (metaUrl) => {
    const __filename = fileURLToPath(metaUrl);
    const __dirname = path.dirname(__filename);
    return __dirname;
};