import React, { Fragment, memo } from 'react';

/**
 * Yengil, xavfsiz Markdown renderer (dangerouslySetInnerHTML ishlatilmaydi).
 * Qo'llab-quvvatlanadi: #..#### sarlavhalar, paragraflar, - / 1. ro'yxatlar,
 * > iqtibos/eslatma, ``` kod bloklari, | jadvallar |, ---, **qalin**, *kursiv*, `kod`.
 */

function renderInline(text, keyPrefix = 'i') {
  const out = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (tok.startsWith('`')) {
      out.push(
        <code key={key} className="px-1.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-cyan-300 font-mono text-[0.85em] break-words">
          {tok.slice(1, -1)}
        </code>,
      );
    } else if (tok.startsWith('**')) {
      out.push(<strong key={key} className="font-semibold text-white">{tok.slice(2, -2)}</strong>);
    } else {
      out.push(<em key={key} className="italic text-slate-200">{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function parseBlocks(src) {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l);
  const isListItem = (l) => /^\s*([-*]|\d+\.)\s+/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // Code block
    if (line.trim().startsWith('```')) {
      const body = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) body.push(lines[i++]);
      i++;
      blocks.push({ type: 'code', text: body.join('\n') });
      continue;
    }

    // Heading
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      blocks.push({ type: 'heading', level: h[1].length, text: h[2] });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^\s*---+\s*$/.test(line)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Table
    if (isTableRow(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      const split = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const header = split(line);
      i += 2;
      const rows = [];
      while (i < lines.length && isTableRow(lines[i])) rows.push(split(lines[i++]));
      blocks.push({ type: 'table', header, rows });
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const body = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        body.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: body.join(' ') });
      continue;
    }

    // List
    if (isListItem(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items = [];
      while (i < lines.length && isListItem(lines[i])) {
        let item = lines[i].replace(/^\s*([-*]|\d+\.)\s+/, '');
        i++;
        // continuation lines (indented, not a new item)
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !isListItem(lines[i])) {
          item += ' ' + lines[i].trim();
          i++;
        }
        items.push(item);
      }
      blocks.push({ type: ordered ? 'ol' : 'ul', items });
      continue;
    }

    // Paragraph
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s/.test(lines[i]) &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !isListItem(lines[i]) &&
      !isTableRow(lines[i])
    ) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length) blocks.push({ type: 'p', text: para.join(' ') });
    else i++;
  }
  return blocks;
}

const headingClass = {
  1: 'text-2xl sm:text-3xl font-extrabold text-white mt-2',
  2: 'text-xl sm:text-2xl font-bold text-white mt-8 pb-2 border-b border-slate-800',
  3: 'text-lg font-bold text-slate-100 mt-6',
  4: 'text-base font-semibold text-slate-200 mt-4',
};

function Markdown({ source, className = '' }) {
  const blocks = parseBlocks(source || '');
  return (
    <div className={`space-y-4 text-[15px] leading-7 text-slate-300 ${className}`}>
      {blocks.map((b, idx) => {
        const key = `b-${idx}`;
        switch (b.type) {
          case 'heading': {
            const Tag = `h${Math.min(b.level + 1, 6)}`;
            return <Tag key={key} className={headingClass[b.level]}>{renderInline(b.text, key)}</Tag>;
          }
          case 'p':
            return <p key={key}>{renderInline(b.text, key)}</p>;
          case 'ul':
            return (
              <ul key={key} className="space-y-1.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-cyan-500/80 flex-shrink-0" aria-hidden />
                    <span>{renderInline(it, `${key}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={key} className="space-y-1.5 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="mt-0.5 min-w-6 h-6 rounded-md bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 flex items-center justify-center flex-shrink-0">
                      {j + 1}
                    </span>
                    <span>{renderInline(it, `${key}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );
          case 'code':
            return (
              <pre key={key} className="rounded-xl bg-slate-950 border border-slate-800 p-4 overflow-x-auto text-[13px] leading-6 font-mono text-emerald-300/90">
                <code>{b.text}</code>
              </pre>
            );
          case 'quote': {
            const warn = b.text.startsWith('⚠️');
            return (
              <blockquote
                key={key}
                className={`rounded-xl border-l-4 px-4 py-3 ${
                  warn ? 'border-amber-500 bg-amber-500/5 text-amber-100/90' : 'border-cyan-500 bg-cyan-500/5 text-slate-200'
                }`}
              >
                {renderInline(b.text, key)}
              </blockquote>
            );
          }
          case 'table':
            return (
              <div key={key} className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-sm">
                  <thead className="bg-slate-900">
                    <tr>
                      {b.header.map((c, j) => (
                        <th key={j} className="text-left font-semibold text-slate-200 px-3 py-2 border-b border-slate-800 whitespace-nowrap">
                          {renderInline(c, `${key}-h${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="odd:bg-slate-950/40">
                        {r.map((c, k) => (
                          <td key={k} className="px-3 py-2 border-b border-slate-800/60 align-top">
                            {renderInline(c, `${key}-${j}-${k}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'hr':
            return <hr key={key} className="border-slate-800" />;
          default:
            return <Fragment key={key} />;
        }
      })}
    </div>
  );
}

export default memo(Markdown);
