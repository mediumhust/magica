import { mkdir, ls, test } from 'shelljs';
import { compile } from 'ejs';
import { readFileSync, writeFileSync } from 'fs';
import { Options, defaultOptions } from './main';
import { join } from 'path';

export interface Context {
  type?: 'debug'|'production'
  /** If true it won't remove the $PREFIX folder before start. This is useful to re-use a prefix folder generated by a previous run so project's won't be downloaded / cloned again and existing sources will be used instead. Not recommended to release. */
  dontCleanPrefix?: boolean
  /** the greater the more memory it consumes */
  quantumDepth?: '8'|'16'|'32',
  /** impact speed */
  noHdri?: boolean
  /** Name of the folder inside `outputFolder` where scripts will be generated */
  scriptsFolder?: string
  templatesFolder?: string
}

export const defaultContext: Required<Context> = {
  type: 'production',
  dontCleanPrefix: false,
  quantumDepth: '16',
  noHdri: false,
  scriptsFolder: 'emscripten-scripts',
  templatesFolder: join(__dirname, '..', 'src', 'templates')
}

export function renderTemplates(context: Required<Options> = defaultOptions) {
  context = { ...defaultContext, ...context }
  mkdir('-p', `${context.outputFolder}/${context.scriptsFolder}`);
  ls(context.templatesFolder)
    .filter(f => test('-f', `${context.templatesFolder}/${f}`) && f.endsWith('.ejs'))
    .map(f => ({ src: `${context.templatesFolder}/${f}`, dest: `${context.outputFolder}/${context.scriptsFolder}/${f.substring(0, f.length - '.ejs'.length)}` })).forEach(o => {
      const t = compile(readFileSync(o.src).toString());
      const result = t(context);
      writeFileSync(o.dest, result);
    });
}
