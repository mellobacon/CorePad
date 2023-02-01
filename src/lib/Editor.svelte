<script lang="ts">
    import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
        rectangularSelection, crosshairCursor,
        lineNumbers, highlightActiveLineGutter, EditorView} from "@codemirror/view"
    import {EditorState} from "@codemirror/state"
    import {defaultHighlightStyle, syntaxHighlighting} from "@codemirror/language"
    import {defaultKeymap, history, historyKeymap} from "@codemirror/commands"
    import {searchKeymap} from "@codemirror/search"
    import { onMount } from "svelte";
    
    let editor;
    let editorview;
    onMount(() => {
        editorview = new EditorView({
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
                ]
            })
        })
    });
</script>

<div id="editor" bind:this={editor}></div>