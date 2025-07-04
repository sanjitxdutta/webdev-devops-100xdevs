const fs = require ("fs");

const { Command } = require('commander');
const program = new Command();

program
  .name('file-related-cli')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('count')
  .description('Count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
        if(err){
            console.log(err);
        } else {
            const words = data.split(" ").length;
            console.log(`There are ${words} words in ${file}`);
        }
    });
  });

program.parse();