import '../../scss/tiptap.scss'

import {EditorProvider, useCurrentEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import {useLaravelReactI18n} from "laravel-react-i18n";
import TextAlign from '@tiptap/extension-text-align'

const MenuBar = () => {
    const { editor } = useCurrentEditor()
    const {t} = useLaravelReactI18n();

    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group">
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
                    className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('bold') ? 'is-active' : '')}>
                    {t('Bold')}
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
                    className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('italic') ? 'is-active' : '')}>
                    {t('Italic')}
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    type={"button"}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('strike') ? 'is-active' : '')}>
                    {t('Strike')}
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    type={"button"}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('code') ? 'is-active' : '')}>
                    {t('Code')}
                </button>
                <button type={"button"} onClick={() => editor.chain().focus().unsetAllMarks().run()}
                        className="my-2 mx-1 btn btn-primary btn-sm fw-bold">
                    {t('Clear marks')}
                </button>
                <button type={"button"} onClick={() => editor.chain().focus().clearNodes().run()}
                        className="my-2 mx-1 btn btn-primary btn-sm fw-bold">
                    {t('Clear nodes')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().setParagraph().run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('paragraph') ? 'is-active' : '')}>
                    {t('Paragraph')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive({textAlign: 'left'}) ? 'is-active' : '')}>
                    {t('Align left')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive({textAlign: 'center'}) ? 'is-active' : '')}>
                    {t('Align center')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive({textAlign: 'right'}) ? 'is-active' : '')}>
                    {t('Align right')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('heading', {level: 1}) ? 'is-active' : '')}>
                    H1
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('heading', {level: 2}) ? 'is-active' : '')}>
                    H2
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('heading', {level: 3}) ? 'is-active' : '')}>
                    H3
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('bulletList') ? 'is-active' : '')}>
                    {t('Bullet list')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('orderedList') ? 'is-active' : '')}>
                    {t('Ordered list')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('codeBlock') ? 'is-active' : '')}>
                    {t('Code Block')}
                </button>
                <button type={"button"}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={"my-2 mx-1 btn btn-primary btn-sm fw-bold " + (editor.isActive('blockquote') ? 'is-active' : '')}>
                    {t('Blockquote')}
                </button>
                <button
                    type={"button"}
                    onClick={() => editor.chain().focus().undo().run()}
                    className={"my-2 mx-1 btn btn-primary btn-sm fw-bold"}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    {t('Undo')}
                </button>
                <button
                    type={"button"}
                    onClick={() => editor.chain().focus().redo().run()}
                    className={"my-2 mx-1 btn btn-primary btn-sm fw-bold"}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    {t('Redo')}
                </button>
            </div>
        </div>
    )
}

const extensions = [
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
]

export default ({content, setEditorContent}: { content?: string, setEditorContent(text: string): void }) => {
    return (
        <EditorProvider slotBefore={<MenuBar/>} extensions={extensions} content={content}
                        onUpdate={(props) => setEditorContent(props.editor.getHTML())}></EditorProvider>
    )
}
