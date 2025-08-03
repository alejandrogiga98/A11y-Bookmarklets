
/* Minimal client to render the catalog and produce bookmarklet links */
const state = {
  items: [],
};

function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function minifyLight(src) {
  // Remove /* */ comments and leading/trailing spaces per line, then collapse whitespace.
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]+|[ \t]+$/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function toBookmarklet(code) {
  let body = code.trim();
  if (!body.startsWith('(function')) {
    // Wrap in IIFE if not already
    body = `(function(){ ${body} })()`;
  }
  const compact = minifyLight(body);
  // Encode minimal set
  const href = 'javascript:' + encodeURIComponent(compact);
  return { href, compact };
}

function copy(text) {
  navigator.clipboard.writeText(text).then(()=>{
    alert('Copied');
  }, ()=>{
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    alert('Copied');
  });
}

function render(items) {
  const grid = $('#grid');
  grid.innerHTML = '';
  for (const it of items) {
    const { href } = toBookmarklet(it.code);
    const card = document.createElement('section');
    card.className = 'card';
    card.innerHTML = `
      <h3>${it.name}</h3>
      <div class="meta">
        <span class="tag">${it.category}</span>
        ${it.ai ? '<span class="tag">AI</span>' : ''}
      </div>
      <p class="desc">${it.description}</p>
      <div class="actions">
        <a class="btn drag" href="${href}" draggable="true" title="Drag to your bookmarks bar">Drag me</a>
        <button class="copy">Copy URL</button>
        <button class="view">View code</button>
        <button class="info">Info</button>
      </div>
    `;
    grid.appendChild(card);
    card.querySelector('.copy').addEventListener('click', ()=>copy(href));
    card.querySelector('.view').addEventListener('click', ()=>showCode(it));
    card.querySelector('.info').addEventListener('click', ()=>showInfo(it));
  }
}

function showCode(it) {
  const d = document.createElement('dialog');
  const compact = toBookmarklet(it.code).compact;
  d.innerHTML = `
    <div class="dlg">
      <h4>${it.name} code</h4>
      <div class="row">
        <label>Bookmarklet body (IIFE, compact)</label>
        <textarea rows="10" readonly>${compact}</textarea>
      </div>
      <div class="actions">
        <button data-act="copy">Copy body</button>
        <button data-act="close">Close</button>
      </div>
    </div>`;
  document.body.appendChild(d);
  d.showModal();
  d.querySelector('[data-act="copy"]').addEventListener('click', ()=>copy(compact));
  d.querySelector('[data-act="close"]').addEventListener('click', ()=>d.close());
  d.addEventListener('close', ()=>d.remove());
}

function showInfo(it) {
  const d = document.createElement('dialog');
  d.innerHTML = `
    <div class="dlg">
      <h4>${it.name}</h4>
      <div class="row"><small class="code">${it.id}</small></div>
      <p>${it.long || it.description}</p>
      <div class="actions">
        <button data-act="close">Close</button>
      </div>
    </div>`;
  document.body.appendChild(d);
  d.showModal();
  d.querySelector('[data-act="close"]').addEventListener('click', ()=>d.close());
  d.addEventListener('close', ()=>d.remove());
}

function initCatalog() {
  // catalog is defined in catalog.js
  state.items = catalog.slice();
  const cats = ['all', ...Array.from(new Set(state.items.map(x=>x.category)))];
  for (const c of cats) {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c[0].toUpperCase() + c.slice(1);
    $('#category').appendChild(opt);
  }

  const apply = () => {
    const q = $('#search').value.trim().toLowerCase();
    const c = $('#category').value;
    const filtered = state.items.filter(it => {
      const inCat = c === 'all' ? true : it.category === c;
      const inText = (it.name + ' ' + it.description + ' ' + (it.long||'')).toLowerCase().includes(q);
      return inCat && inText;
    });
    render(filtered);
  };

  $('#search').addEventListener('input', apply);
  $('#category').addEventListener('change', apply);

  apply();
}

window.addEventListener('DOMContentLoaded', initCatalog);
