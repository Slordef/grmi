import fs from 'fs';
import path from 'path';

export class FileManager {
    static dirPath = path.join(process.cwd(), 'config');

    static async read<T>(filepath: string): Promise<T> {
        const content = fs.readFileSync(path.join(this.dirPath, filepath), { encoding: 'utf-8' });
        return JSON.parse(content);
    }
}