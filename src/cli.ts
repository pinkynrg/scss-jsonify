#!/usr/bin/env node

import fs from 'fs'
import _yargs from 'yargs';
import through2 from 'through2'
import { hideBin } from 'yargs/helpers';
import { toCSS } from './toCSS';
import { toJSON } from './toJSON';
const yargs = _yargs(hideBin(process.argv));

(async () => {
  const argv = await yargs
    .usage('Usage: $0 input_file [--to-css] [--output|-o output_file]')
    .example('cssjson input.css -o output.json', 'Convert css to json')
    .example('cssjson input.js --to-css -o output.css', 'Convert json to css')
    .demand(1)
    .describe('to-css', 'Convert json input to css output')
    .alias('o', 'output')
    .nargs('o', 1)
    .describe('o', 'Output file (stdout if not provided)')
    .help('h')
    .alias('h', 'help')
    .argv

  const isToCSS = argv['to-css']
  // @ts-expect-error - fiix
  const inputStream = fs.createReadStream(argv._[0])
  // @ts-expect-error - fiix
  const outputStream = argv.output ? fs.createWriteStream(argv.output) : process.stdout

  const _buffer: string[] = []
  const convertStream = through2(function (chunk, enc, callback) {
    _buffer.push(chunk.toString('utf8'))
    callback()
  }, function (callback) {
    const data = _buffer.join('')
    const convertedObj = isToCSS ? toCSS(JSON.parse(data)) : JSON.stringify(toJSON(data))
    // var converted = new Buffer(convertedObj)
    this.push(convertedObj)
    callback()
  })

  // pipe it!
  inputStream
    .pipe(convertStream)
    .pipe(outputStream)
})()