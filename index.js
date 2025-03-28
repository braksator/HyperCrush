#!/usr/bin/env node
'use strict';

/**
 * @file
 * hypercrush - Crushes HTML or SVG code.
 */

const hypercrush = module.exports = {

  /**
   * Processes input string to crush HTML or SVG contained within.
   * @param {string} input - The input code as a string.
   * @returns {string} - The transformed input.
   */
  code: input => input
    .replace(/\s+/g, ' ') // Collapse all whitespace (newlines, tabs, multiple spaces) into a single space
    .replace(/>\s+</g, '><') // Remove spaces between tags - Gotcha: Can't rely on whitespace between tags for styling
    .replace(/(\w+)="([^"\s]+)"/g, (m, k, v) => `${k}=${v}`) // Remove " around attrs where possible
    .replace(/<(\w+)([^>]*)\s*\/?>/g, (m, t, a) => `<${t}${a.replace(/\s+(?=\w+=")/g, '')}>`) // Remove spaces after " in tags
  ,

  /**
   * CLI function to process files.
   * @param {string} inputFile - Input JS file path.
   * @param {string} outputFile - Output JS file path.
   */
  file: async (inputFile, outputFile) => {
    try {
      await fs.writeFile(outputFile, hypercrush.code(await fs.readFile(inputFile, 'utf8'), opts), 'utf8');
      console.log(`✅ HyperCrush processed: ${outputFile}`);
    }
    catch (error) {
      console.error('❌ HyperCrush Error:', error);
    }
  },

  /**
   * Gulp-compatible transform stream.
   * @returns {Transform} - A transform stream for Gulp.
   */
  gulp: () => {
    let { Transform } = require('stream'), PluginError = require('plugin-error');
    const PLUGIN_NAME = 'gulp-hypercrush';
    return new Transform({
      objectMode: true,
      transform(file, _, cb) {
        if (file.isNull()) return cb(null, file);
        if (file.isStream()) return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        try {
          file.contents = Buffer.from(hypercrush.code(file.contents.toString(), opts));
          cb(null, file);
        }
        catch (err) {
          cb(new PluginError(PLUGIN_NAME, err));
        }
      }
    });
  }
};

// CLI Usage
if (require.main === module) {
  var args = process.argv.slice(2), opts = {};
  // Ensure the arguments are correct
  if (args.length < 2) {
    console.log("Usage: hypercrush <inputfile> <outputfile>");
    process.exit(1);
  }
  // Pass options along with input and output file paths
  hypercrush.hypercrushFile(args[0], args[1], opts);
}