import { dialog, fs, path } from "@tauri-apps/api";
import Editor, { file, updateFileInfo } from "../Editor.svelte";

let editor: Editor;

export function mountEditor() {
    editor = new Editor({target: document.getElementById("container")});
}
export async function saveFile(saveAs = false) {
    let _path = file.path;
    let name = file.filename === "" ? "*" : file.filename;  
    if (_path === "" || saveAs) {
        _path = await dialog.save({defaultPath: `${name.split(".")[0]}.txt`});
        name = _path.split(path.sep).pop();
    }
    await fs.writeFile(_path, file.content);
    updateFileInfo({filename: name, path: _path, content: file.content});
}

export async function openFile() {
    let _path = await dialog.open() as string;
    let name = _path.split(path.sep).pop();
    let content = await fs.readTextFile(_path);
    editor.$destroy();
    editor = new Editor({target: document.getElementById("container"), props:{content: content}});
    updateFileInfo({filename: name, path: _path, content: content});
}