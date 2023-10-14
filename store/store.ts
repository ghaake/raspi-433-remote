import { readFileSync, writeFileSync } from 'fs';

const statesFile = "./store/states/states.json";
const commandsFile = "./store/states/codes.json";

type States = {
    [key: string]: string
}

type Command = {
    on: number,
    off: number
}

type Commands = {
    [key: string]: Command
}

export function readStates() : States {
    return JSON.parse( readFileSync( statesFile, 'utf8' ) );
}

export function updateState( id: string, state: boolean ) {
    const states = readStates();

    states[id] = state ? "1" :  "0";

    writeFileSync( statesFile, JSON.stringify( states ) );
}

export function getCommands() : Commands {
    return JSON.parse( readFileSync( commandsFile, 'utf8' ) );
}