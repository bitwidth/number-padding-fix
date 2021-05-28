"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getDirectoryName = (currentDefaultPath, argv) => {
    let directoryName = '';
    if (argv == undefined) {
        directoryName = currentDefaultPath;
    }
    else {
        directoryName = argv;
    }
    return directoryName;
};
const getTotalPlaces = (argv, defaultNumberofPlaces = 3) => {
    if (argv == undefined) {
        return Number(defaultNumberofPlaces);
    }
    return Number(argv);
};
const getProperName = (fileName, delimiter) => {
    const indexOfDelimiter = fileName.indexOf(delimiter);
    // if(indexOfDelimiter === -1 || (path.extname(fileName) === fileName.substr(indexOfDelimiter))){
    if (indexOfDelimiter === -1 || (fileName.substr(0, indexOfDelimiter) === '')) {
        return fileName;
    }
    const oldNumbering = fileName.substr(0, indexOfDelimiter);
    const newNumbering = oldNumbering.padStart(paddingPlaces, '0');
    return newNumbering + fileName.substr(indexOfDelimiter);
};
const getDelimiter = (delimiter) => {
    if (delimiter == undefined) {
        return '.';
    }
    else {
        return delimiter;
    }
};
const parentFolder = getDirectoryName(__dirname, process.argv[2]);
const level = 1;
const paddingPlaces = getTotalPlaces(process.argv[3]);
const delimiter = getDelimiter(process.argv[4]);
const renameTheNumbers = (directoryName, level) => {
    fs_1.default.readdir(directoryName, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err.code, err.message);
        }
        else {
            for (const content of files) {
                process.stdout.write('  '.repeat(level));
                const newDirectoryName = getProperName(content.name, delimiter);
                console.log('|_' + '__' + ' ' + newDirectoryName);
                if (content.isDirectory()) {
                    fs_1.default.rename(path_1.default.join(directoryName, content.name), path_1.default.join(directoryName, newDirectoryName), (err) => {
                        if (err) {
                            console.log('Could not rename the file/directory. File/Directory: ' + content.name);
                            console.log(err.code, err.message);
                        }
                        else {
                            renameTheNumbers(path_1.default.join(directoryName, newDirectoryName), level + 1);
                        }
                    });
                }
                else {
                    fs_1.default.rename(path_1.default.join(directoryName, content.name), path_1.default.join(directoryName, newDirectoryName), (err) => {
                        if (err) {
                            console.log('Could not rename the file/directory. File/Directory: ' + content.name);
                            console.log(err.code, err.message);
                        }
                    });
                }
            }
        }
    });
};
renameTheNumbers(parentFolder, level);
