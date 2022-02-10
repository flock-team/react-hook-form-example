import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useController, UseControllerProps } from 'react-hook-form';

const Editor = (props: UseControllerProps<any>) => {
  const { field, fieldState, formState } = useController(props);

  const editor = useEditor({
    extensions: [StarterKit],
    content: field.value,
    onBlur() {
      field.onBlur();
    },
    onUpdate({ editor }) {
      field.onChange(editor.getText());
    },
  });

  // エラー時にフォーカス
  useEffect(() => {
    if (fieldState.invalid) {
      editor?.commands?.focus();
    }
  }, [fieldState.invalid, formState.submitCount]);

  return (
    <div>
      <EditorContent editor={editor} />
      {fieldState.error?.type === 'required' && '必須入力です'}
      {fieldState.error?.type === 'maxLength' && '400文字以内にしてください'}
    </div>
  );
};

export default Editor;
