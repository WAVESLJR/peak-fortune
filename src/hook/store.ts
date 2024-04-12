import { writable, type Writable } from "svelte/store";

export let discoverd: Writable<string[]> = writable([])

type Record = {
    highest: number;
    total: number;
    attempts: number;
    remain: number;
}

export let record: Writable<Record> = writable({ 
    highest: 0, 
    total: 0, 
    attempts: 0,
    remain: 30
 })

