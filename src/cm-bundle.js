// CodeMirror 6 bundle entry - all exports from a single build
// This ensures exactly ONE copy of @codemirror/state exists
import {EditorView, basicSetup} from 'codemirror';
import {EditorState} from '@codemirror/state';
import {keymap} from '@codemirror/view';
import {indentWithTab} from '@codemirror/commands';
import {markdown} from '@codemirror/lang-markdown';
import {python} from '@codemirror/lang-python';
import {javascript} from '@codemirror/lang-javascript';
import {json as jsonLang} from '@codemirror/lang-json';
import {oneDark} from '@codemirror/theme-one-dark';

// Helper: create an editor inside a given DOM element
function createEditor(parentEl, {value = '', lang = 'markdown', readOnly = false, lineWrapping = true, onChange = null, minHeight = '300px'} = {}) {
  const langMap = {
    markdown: markdown(),
    python: python(),
    javascript: javascript(),
    json: jsonLang(),
    js: javascript(),
    py: python(),
    md: markdown(),
  };
  const extensions = [
    basicSetup,
    oneDark,
    keymap.of([indentWithTab]),
    EditorView.theme({
      '&': { minHeight, fontSize: '13px' },
      '.cm-scroller': { overflow: 'auto' },
      '.cm-content': { fontFamily: "'SF Mono','Fira Code','Consolas',monospace", padding: '12px 0' },
      '.cm-gutters': { background: 'var(--bg)', border: 'none', color: 'var(--text-dim)' },
      '.cm-activeLineGutter': { background: 'var(--bg-hover)' },
      '.cm-activeLine': { background: 'rgba(88,166,255,0.06)' },
      '&.cm-focused': { outline: 'none' },
      '.cm-selectionBackground': { background: 'rgba(88,166,255,0.2) !important' },
      '&.cm-focused .cm-selectionBackground': { background: 'rgba(88,166,255,0.3) !important' },
    }),
  ];
  if (lineWrapping) extensions.push(EditorView.lineWrapping);
  if (langMap[lang]) extensions.push(langMap[lang]);
  if (readOnly) extensions.push(EditorState.readOnly.of(true));
  if (onChange) {
    extensions.push(EditorView.updateListener.of(update => {
      if (update.docChanged) onChange(update.state.doc.toString());
    }));
  }

  const state = EditorState.create({ doc: value, extensions });
  const view = new EditorView({ state, parent: parentEl });
  return view;
}

// Expose on window for non-module scripts
window.CM = {
  EditorView, EditorState, basicSetup, markdown, python, javascript, json: jsonLang, oneDark, keymap, indentWithTab,
  create: createEditor
};
window.dispatchEvent(new Event('cm-ready'));
