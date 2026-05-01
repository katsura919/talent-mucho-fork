'use client';

import type React from 'react';

export function Editable({ value, editMode, onSave, style, tagName = 'span' }: {
  value: string;
  editMode: boolean;
  onSave: (next: string) => void;
  style?: React.CSSProperties;
  tagName?: 'span' | 'div';
}) {
  const editClass = editMode ? 'os-editable' : undefined;
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.currentTarget.innerHTML;
    if (next !== value) onSave(next);
  };
  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && tagName === 'span') {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
  };
  const props = {
    className: editClass,
    contentEditable: editMode,
    suppressContentEditableWarning: true,
    onBlur: handleBlur,
    onKeyDown: handleKey,
    dangerouslySetInnerHTML: { __html: value },
    style,
  };
  if (tagName === 'div') return <div {...props} />;
  return <span {...props} />;
}
