> **[magica](../README.md)**

[Globals](../README.md) / ["types"](../modules/_types_.md) / [Options](_types_.options.md) /

# Interface: Options

## Hierarchy

  * [NativeOptions](_types_.nativeoptions.md)

  * **Options**

  * [CliOptions](_types_.clioptions.md)

## Index

### Properties

* [command](_types_.options.md#command)
* [debug](_types_.options.md#optional-debug)
* [disableNodeFs](_types_.options.md#optional-disablenodefs)
* [emscriptenNodeFsRoot](_types_.options.md#emscriptennodefsroot)
* [inputFiles](_types_.options.md#optional-inputfiles)
* [nodeFsLocalRoot](_types_.options.md#nodefslocalroot)
* [outputDir](_types_.options.md#outputdir)
* [protectOutputFiles](_types_.options.md#optional-protectoutputfiles)

## Properties

###  command

• **command**: *string | string[]*

*Defined in [types.ts:65](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L65)*

An ImageMagick command, for example: `['convert', 'foo/bar.png', '-scale', '50%', 'out.gif']`

___

### `Optional` debug

• **debug**? : *undefined | false | true*

*Inherited from void*

*Defined in [types.ts:51](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L51)*

___

### `Optional` disableNodeFs

• **disableNodeFs**? : *undefined | false | true*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[disableNodeFs](_types_.nativeoptions.md#optional-disablenodefs)*

*Defined in [types.ts:47](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L47)*

Don't use system's filesystem in Node.js but memory filesystem (just like in the browser). This could be
faster if read/write many images but consumes more memory.

___

###  emscriptenNodeFsRoot

• **emscriptenNodeFsRoot**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[emscriptenNodeFsRoot](_types_.nativeoptions.md#emscriptennodefsroot)*

*Defined in [types.ts:36](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L36)*

Internal root FS directed path. This should rarely be configured by users.

___

### `Optional` inputFiles

• **inputFiles**? : *string | [IFile](_types_.ifile.md)[]*

*Defined in [types.ts:72](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L72)*

The list of input files referenced in given [command](_types_.options.md#command). It's important that the name of this files match
the file names given in the command. If string and a file exists (node.js) then that file will be used.
Otherwise it will be considered a url. In later cases, the filename will be the base name of file or url.

___

###  nodeFsLocalRoot

• **nodeFsLocalRoot**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[nodeFsLocalRoot](_types_.nativeoptions.md#nodefslocalroot)*

*Defined in [types.ts:31](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L31)*

(Node.js and CLI only). In Node.js the local file system will be used to read/write files instead of
memory (like in the browser). This folder will be used for that, by default, ./working_tmp. IMPORTANT:
the content of this folder will be removed each time the tool is executed.

___

###  outputDir

• **outputDir**: *string*

*Inherited from [NativeOptions](_types_.nativeoptions.md).[outputDir](_types_.nativeoptions.md#outputdir)*

*Defined in [types.ts:41](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L41)*

(CLI only). Output files will be written in this folder. By default is current directory.

___

### `Optional` protectOutputFiles

• **protectOutputFiles**? : *undefined | false | true*

*Defined in [types.ts:60](https://github.com/cancerberoSgx/magica/blob/ddf46a3/src/types.ts#L60)*

Will register output files as protected files so they are not deleted in the future calls. Are managed by the user.

Notice that protected files are not returned as [[output files]]