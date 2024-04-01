import fs from 'fs';
import path from 'path';

export class FileManager {
  static dirPath = path.join(process.cwd(), 'config');

  static async exists(filepath: string): Promise<boolean> {
    return fs.existsSync(path.join(this.dirPath, filepath));
  }

  static async read<T>(filepath: string): Promise<T> {
    const content = fs.readFileSync(path.join(this.dirPath, filepath), { encoding: 'utf-8' });
    return JSON.parse(content);
  }

  static async write<T>(filepath: string, data: T): Promise<void> {
    fs.writeFileSync(path.join(this.dirPath, filepath), JSON.stringify(data, null, 2));
  }

  static async delete(filepath: string): Promise<void> {
    fs.unlinkSync(path.join(this.dirPath, filepath));
  }
}
