import { register, unregisterAll } from '@tauri-apps/api/globalShortcut';
import { makeEmptyFile, openFile, openNewWindow, saveFile } from '../lib/scripts/file';
import config from "./config.json";
export async function setTheme(name) {
    let json = await import(`../config/Themes/${name}-theme.json`);
    const theme = Object.entries(json.theme);
    config.theme = name;
    for (const t of theme) {
        const property = `${t[0]}`;
        let value = t[1] as string;
        if (getComputedStyle(document.documentElement).getPropertyValue(`--${property}`)) {
            document.documentElement.style.setProperty(`--${property}`, value);
        }
    }
}

export async function getShortcuts() {
    const shortcuts = [
        {shortcut: "CommandOrControl+N", action: () => {makeEmptyFile()}},
        {shortcut: "CommandOrControl+Shift+N", action: async () => {await openNewWindow()}},
        {shortcut: "CommandOrControl+O", action: async () => {await openFile()}},
        {shortcut: "CommandOrControl+S", action: async () => {await saveFile()}},
        //{shortcut: "CommandOrControl+Shift+S", action: () => {console.log('Shortcut triggered3');}},
        {shortcut: "CommandOrControl+P", action: () => {window.print()}}
    ]
    for (const {shortcut, action} of shortcuts) {
        await register(shortcut, action);
    }
}