<script lang="ts">
    import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
        rectangularSelection, crosshairCursor,
        lineNumbers, highlightActiveLineGutter, EditorView} from "@codemirror/view"
    import {EditorState, Text} from "@codemirror/state"
    import {defaultHighlightStyle, syntaxHighlighting} from "@codemirror/language"
    import {defaultKeymap, history, historyKeymap} from "@codemirror/commands"
    import {searchKeymap} from "@codemirror/search"
    import { onMount, tick } from "svelte";
    import Statusbar from "./Statusbar.svelte";
    
    let editor;
    let editorView;
    export let content = "";
    onMount(() => {
        editorView = new EditorView({
            parent: editor,
            state: EditorState.create({
                extensions: [
                    lineNumbers(),
                    highlightActiveLineGutter(),
                    highlightSpecialChars(),
                    highlightActiveLine(),
                    dropCursor(),
                    history(),
                    drawSelection(),
                    crosshairCursor(),
                    rectangularSelection(),
                    EditorState.allowMultipleSelections.of(true),
                    syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
                    keymap.of([
                        ...defaultKeymap,
                        ...historyKeymap,
                        ...searchKeymap,
                    ])
                ],
                doc: content
            })
        })
        file = $file_info;
    });

    async function updateContent() {
        await tick();
        let content = "";
        for (const text of editorView.state.doc) {
            content += `${text}`;
        }
        file.content = content;
        if (!$unsaved) {
            unsaved.set(true);
        }
    }

    function getLineInfo() {
        let linenumber = editorView.state.doc.lineAt(editorView.state.selection.main.head).number;
        let colnumber = editorView.state.selection.ranges[0].head - editorView.state.doc.lineAt(editorView.state.selection.main.head).from;
        line_info.set({ln: linenumber.toString(), col: (colnumber + 1).toString()});
    }

    let timeout = null;
    function getDocInfo() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let wordcount = 0;
            let charcount = 0;
            let words = file.content.split(/\s/gm).filter(z => z !== '');
            wordcount = words.length;
            for (const word of words) {
                charcount += word.length;
            }
            doc_info.set({words: wordcount, chars: charcount});
        }, 500)
    }
</script>
<script lang="ts" context="module">
    import { writable } from "svelte/store";
    export let line_info = writable({ln: "-", col: "-"});
    export let doc_info = writable({words: 0, chars: 0});
    export let file = {filename: "untitled.txt", path: "", content: ""};
    export let file_info = writable(file);
    export let unsaved = writable(false);

    export function updateFileInfo(fileinfo: { filename: string; path: string; content: string; }, modified = false) {
        file = fileinfo;
        file_info.set(file);
        unsaved.set(modified);
    }

    export function setZoom(value) {
        const editorContainer = document.querySelector(".cm-scroller") as HTMLElement;
        editorContainer.style.setProperty("font-size", `${value - 2}px`, "important")
    }
</script>
<div id="editor" bind:this={editor} 
    on:input={(e) => {
        getLineInfo();
        getDocInfo();
        updateContent();
    }}
    on:mousedown={(e) => {getLineInfo()}}
    on:keydown={(e) => {
        let key = e.code;
        switch(key) {
            case "Backspace": case "Enter":
                getLineInfo();
                getDocInfo();
                break;
            case "ArrowRight": case "ArrowLeft": case "ArrowDown": case "ArrowUp":
                getLineInfo();
                break;
        }
    }}
/>
<Statusbar line_info={line_info} doc_info={doc_info} unsaved={unsaved}></Statusbar>

<style lang="scss">
    #editor {
        width: 100%;
        height: calc(100% - 25px);
    }
    :global(.cm-editor),
    :global(.cm-wrap) {
        cursor: text;
        height: 100%;
    }
    :global(.cm-scroller) {
        font-size: 14px !important;
        line-height: 1.3;
    }
</style>