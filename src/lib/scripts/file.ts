import { dialog, fs, path } from "@tauri-apps/api";
import { file, updateFileInfo } from "../Editor.svelte";
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
    updateFileInfo({filename: name, path: _path, content: content});
}