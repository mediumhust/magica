import { NativeResult } from './imageMagick/createMain'

/**
 * Representation of input and output files. Use [[File]] class static methods to easily build files from
 * filesystem files or urls .
 */
export interface IFile {
  /**
   * Name for this file. Commands referencing this file must do so using this exact name.
   */
  name: string;

  /**
   * The content of the file. 
   */
  content: ArrayBufferView

  // isUrl?: boolean

}

export interface NativeOptions extends BaseOptions {
  /**
   * (Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of
   * memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT:
   * the content of this folder will be removed each time the tool is executed.
   */
  nodeFsLocalRoot: string

  /**
   * Internal root FS directed path. This should rarely be configured by users.
   */
  emscriptenNodeFsRoot: string

  /**
   * (CLI only). Output files will be written in this folder. By default is current directory.
   */
  outputDir: string

  /**
   * Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be
   * faster if read/write many images but consumes more memory.
   */
  disableNodeFs?: boolean

  /**
   * If true and when running on node.js, and only if image magick commands are available in the local system, it will execute the commands using the local native ImageMagick commands, instead of running them though the emscripten port (which is slower and support less capabilities).
   */
  useNative?: boolean

  /**
   * main() commands are queued and this defines de limit of running commands at the same time. it's no so important since the main() call is synch but files/urls are resolved also so this has an impact on those async operations
   */
  mainConcurrency: number,
  /**
   * main() commands are queued and this is the milliseconds to wait before starting a new main command
   */
  mainInterval: 0

  customCommandPrefix?: string
}

interface BaseOptions {
  debug?: boolean
}

export interface Options extends NativeOptions {
  /**
   * Will register output files as protected files so they are not deleted in the future calls. Are managed by the user.
   * 
   * Notice that protected files are not returned as [[output files]]
   */
  protectOutputFiles?: boolean

  /**
   * An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`
   */
  command: string | string[]

  /**
   * The list of input files referenced in given [[command]]. It's important that the name of this files match
   * the file names given in the command. If string and a file exists (node.js) then that file will be used.
   * Otherwise it will be considered a url. In later cases, the filename will be the base name of file or url.
   */
  inputFiles?: (string | IFile | undefined)[]

  /**
   * Will automatically add -verbose to convert command and parse stdout returning a verbose object in the Result.
   */
  verbose?: boolean

}

export interface Result<T extends IFile = IFile> extends NativeResult {
  outputFiles: T[]
  times?: { total: number }
  verbose?: VerboseInfo[]
}

interface VerboseInfo {
  inputName: string;
  outputName: string;
  inputFormat: string;
  inputSize: {
    width: number;
    height: number;
  };
  outputSize: {
    width: number;
    height: number;
  };
}

export interface CliOptions extends Options {
  help?: boolean
  input: string[]
}

export interface ScriptEvent {
  name: 'beforeCommand' | 'afterCommand' | 'onScriptStart' | 'onScriptEnd'
  stopPropagation: boolean
  scriptOptions: RunOptions
  scriptInterrupt: boolean
  commandOptions?: Partial<Options>
  commandResult?: Result
}

// interface FilesCreatedEvent extends ScriptEvent {
//   name: 'filesCreated'
//   files: IFile[]
// }

export interface RunOptions extends Partial<Options> {
  // /**
  //  * Register a script run event listener that will be notified when new files are created, before or after commands are executed, etc. Listeners can set `stopPropagation` property to true to prevent the event to propagate to other listeners. Also they could set the property `abortScript` to true to cancel the script execution.
  //  */
  // scriptListener?: ScriptListener

  /**
   * Takes precedence over [[Options.command]]. If not provided then  [[Options.command]] is used.
   *
   * If an array of string is given each item will be executed just like main's [[Options.command]].
   *
   * If a string is provided, then it will be parsed as shell script with 1 or more command, each on a line)
   *
   * IMPORTANT: If you need to escape arguments like file names with spaces, use single quotes `'`, like the
   * output file in the previous example `'star inward.gif'`.
   *
   * Examples:
   *
   * ```js
   * const result = await run({script: `
   *
   * # lines starting with # like this one are omitted (like shell script comments)
   * convert rose: -sharpen 0x1 reconstruct.jpg
   *
   * # The next command will be executed with an inputFile 'reconstruct.jpg' 
   * #which was the previous command's output file:
   * compare rose: reconstruct.jpg difference.png
   *
   * # This last command will be executed with two input files 'reconstruct.jpg' 
   * # and 'difference.jpg' which were generated by previous commands:
   * compare -compose src rose: reconstruct.jpg difference.png finalOutput.tiff
   * `})
   * ```
   *
   * It supports like shell scripts, breaking the same command in multiple lines by using `\` like in:
   *
   * ```js
   * const result = await run({script:`
   * convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
   *   -negate -channel RG -separate +channel \\
   *   \( +clone \) -compose multiply -flatten \\
   *   -virtual-pixel Tile -background Black \\
   *   -blur 0x.6 -motion-blur 0x15-90 -normalize \\
   *   +distort Polar 0 +repage 'star inward.gif'
   * `})
   * ```
   */
  script?: string | string[]

  // /** if true it won't execute any command  */
  // onlyPreprocessing?: boolean
}

/**
 * Represent the result of executing a sequence of commands. In this case outputFiles are the output files of
 * just the last command, while stdout, stderr are the concatenation of all commands output. 
 */
export interface RunResult<T extends IFile = IFile> extends Result<T> {

  /**
   * Sequence of results for each command found in the script, in order.
   */
  results: Result[],

  /**
   * The command sequence decoded from given script.
   */
  commands: string[][],

  // /**
  //  * Las command output files
  //  */
  // outputFiles: TY[]
}

export interface CommandPreprocessor<O extends RunOptions = RunOptions, O2 extends O = O, RO extends Options = Options> {
  name: string,
  fnCompileTime?(context: O): Promise<O2>
  fnRuntime?(commandOptions: RO, commandIndex: number, runOptions: O): Promise<void>
}



export interface Size {
  width: number
  height: number
}

export interface Point {
  x: number
  y: number
}

export interface Rectangle extends Size, Point{

}

export interface Rgba {
r: number, g: number, b: number, a: number
}