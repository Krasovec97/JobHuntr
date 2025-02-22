import '../../scss/tiptap.scss'

import {
    EditorProvider,
    useCurrentEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import TextAlign from '@tiptap/extension-text-align'
import {Placeholder} from "@tiptap/extension-placeholder";
import {CharacterCount} from "@tiptap/extension-character-count";

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="col-12">
            <div className="d-flex control-group rounded-top-3 bg-primary justify-content-start">
                <div className="col-auto button-group pe-0">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        type={"button"}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={"my-2 btn btn-primary btn-sm fw-bold rounded-0 rounded-start " + (editor.isActive('bold') ? 'is-active' : '')}>
                        <i className="fa-solid fa-bold"></i>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        type={"button"}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={"my-2 btn btn-primary btn-sm fw-bold rounded-0 rounded-end " + (editor.isActive('italic') ? 'is-active' : '')}>
                        <i className="fa-solid fa-italic"></i>
                    </button>
                </div>
                <div className="col-auto button-group pe-0">
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={"my-2 btn btn-primary btn-sm fw-bold rounded-0 rounded-start " + (editor.isActive('bulletList') ? 'is-active' : '')}>
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={"my-2 btn btn-primary btn-sm fw-bold rounded-0 rounded-end " + (editor.isActive('orderedList') ? 'is-active' : '')}>
                        <i className="fa-solid fa-list-ol"></i>
                    </button>
                </div>
                <div className="col-auto button-group pe-0">
                    <button
                        type={"button"}
                        onClick={() => editor.chain().focus().undo().run()}
                        className={"my-2 btn btn-primary btn-sm fw-bold rounded-start"}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .undo()
                                .run()
                        }>
                        <i className="fa-solid fa-rotate-left"></i>
                    </button>
                    <button
                        type={"button"}
                        onClick={() => editor.chain().focus().redo().run()}
                        className={"my-2 btn btn-primary btn-sm fw-bold rounded-end"}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .redo()
                                .run()
                        }>
                        <i className="fa-solid fa-rotate-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

interface TipTapInterface {
    content?: string,
    setEditorContent(text: string): void,
    placeholder: string,
    characterLimit: number
}

export default ({content, setEditorContent, placeholder, characterLimit}: TipTapInterface) => {
    const extensions = [
        Placeholder.configure({
            emptyEditorClass: 'is-editor-empty opacity-50',
            placeholder: placeholder
        }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            }
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        CharacterCount.configure({
            limit: characterLimit
        })
    ]

    return (
        <EditorProvider slotBefore={<MenuBar/>} extensions={extensions} content={content}
                        onUpdate={(props) => setEditorContent(props.editor.getHTML())}>
        </EditorProvider>
    )
}
