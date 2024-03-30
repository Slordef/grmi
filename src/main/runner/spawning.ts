import { spawn } from 'child_process';
import { ChildProcessWithoutNullStreams, SpawnOptionsWithoutStdio } from 'node:child_process';

export class Spawning {
  private ps: ChildProcessWithoutNullStreams;
  constructor(command: string, args: string[], options: SpawnOptionsWithoutStdio) {
    this.ps = spawn(command, args, options);
  }

  kill(): void {
    this.ps.kill();
  }

  onExit(callback: (code: number | null) => void): void {
    this.ps.on('exit', (code) => {
      callback(code);
    });
  }

  stdout(callback: (string: string) => void): void {
    this.ps.stdout.on('data', (data) => {
      callback(data.toString());
    });
  }

  stderr(callback: (string: string) => void): void {
    this.ps.stderr.on('data', (data) => {
      callback(data.toString());
    });
  }

  onString(includes: string, callback: () => void): void {
    this.ps.stdout.on('data', (data) => {
      if (data.toString().includes(includes)) {
        callback();
      }
    });
  }
}
