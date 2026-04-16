/* eslint-disable @typescript-eslint/no-explicit-any */


const buttonStyle = (active:any) => ({
    fontWeight: active ? 'bold' : 'normal',
    background: active ? '#f3f4f6' : 'transparent',
    border: 'none',
    borderRadius: 4,
    padding: '4px 8px',
    cursor: 'pointer',
    color: '#222',
    outline: 'none',
    transition: 'background 0.2s',
});

interface ToolbarProps {
    editor: any; // Replace 'any' with the correct type from your editor library if available
}

const Toolbar = ({ editor }: ToolbarProps) => {
    if (!editor) return null;
    return (
        <div style={{ borderBottom: '1px solid #eee', marginBottom: 8, padding: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <button type="button" style={buttonStyle(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
            <button type="button" style={buttonStyle(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
            <button type="button" style={buttonStyle(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
            <button type="button" style={buttonStyle(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
            <button type="button" style={buttonStyle(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
            <button type="button" style={buttonStyle(editor.isActive('underline'))} onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
            <button type="button" style={buttonStyle(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝</button>
            <button type="button" style={buttonStyle(editor.isActive('code'))} onClick={() => editor.chain().focus().toggleCode().run()}>Code</button>
            <button type="button" style={buttonStyle(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
            <button type="button" style={buttonStyle(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
            <button type="button" style={buttonStyle(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()}>―</button>
            <button type="button" style={buttonStyle(false)} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>Clear</button>
            <button type="button" style={buttonStyle(false)} onClick={() => editor.chain().focus().undo().run()}>Undo</button>
            <button type="button" style={buttonStyle(false)} onClick={() => editor.chain().focus().redo().run()}>Redo</button>
            {/* Link and Image buttons (prompt for URL) */}
            <button type="button" style={buttonStyle(editor.isActive('link'))} onClick={() => {
                const url = window.prompt('Enter link URL');
                if (url) editor.chain().focus().setLink({ href: url }).run();
            }}>🔗</button>
            <button type="button" style={buttonStyle(editor.isActive('image'))} onClick={() => {
                const url = window.prompt('Enter image URL');
                if (url) editor.chain().focus().setImage({ src: url }).run();
            }}>🖼️</button>
        </div>
    );
};

export default Toolbar;
