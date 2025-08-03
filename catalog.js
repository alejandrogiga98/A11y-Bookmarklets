const catalog = [
  {
    "id": "focus-outline-boost",
    "name": "Toggle strong focus outline",
    "category": "core",
    "description": "Thick outline on :focus and visible markers for focusable elements.",
    "long": "Click to add a bolder outline for keyboard focus and dashed outlines on focusable controls. Click again to remove.",
    "ai": false,
    "code": "\n      const ID='a11y-focus-bk';\n      const old=document.getElementById(ID);\n      if(old){ old.remove(); alert('Focus outline off'); return; }\n      const s=document.createElement('style');\n      s.id=ID;\n      s.textContent=`:focus{outline:3px solid #f00 !important; outline-offset:2px !important}\n      a,button,input,select,textarea,[tabindex]{outline:2px dashed #00f !important; outline-offset:2px !important}`;\n      document.head.appendChild(s);\n      alert('Focus outline on');\n    "
  },
  {
    "id": "tab-order-map",
    "name": "Tab order map",
    "category": "core",
    "description": "Numbered overlays for the tab sequence and click to test focus.",
    "long": "Draws numbered badges over elements in the tab order. Click a badge to move focus there. Click again to clear.",
    "ai": false,
    "code": "\n      const ID='a11y-tabmap';\n      const old=document.getElementById(ID);\n      if(old){ old.remove(); return; }\n      const wrap=document.createElement('div');\n      wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';\n      const focusables=Array.from(document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex=\"-1\"])'))\n        .filter(el=>!el.hasAttribute('disabled') && el.offsetParent!==null);\n      let n=1;\n      for(const el of focusables){\n        const r=el.getBoundingClientRect();\n        const b=document.createElement('button');\n        b.textContent=n++;\n        b.style=`position:absolute;left:${Math.max(0, r.left+window.scrollX)}px;top:${Math.max(0, r.top+window.scrollY)}px;\n                 transform:translate(-6px,-6px);min-width:24px;height:24px;border-radius:14px;border:1px solid #333;\n                 background:#ffe08a;font:12px/1 monospace;pointer-events:auto;cursor:pointer`;\n        b.title='Focus this element';\n        b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();el.focus({preventScroll:false});}, {capture:true});\n        wrap.appendChild(b);\n      }\n      document.body.appendChild(wrap);\n    "
  },
  {
    "id": "headings-map",
    "name": "Headings map",
    "category": "core",
    "description": "Fixed panel listing H1 to H6 in order, with quick jump.",
    "ai": false,
    "code": "\n      const ID='a11y-headings';\n      let p=document.getElementById(ID);\n      if(p){ p.remove(); return; }\n      const hs=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];\n      p=document.createElement('div');\n      p.id=ID;\n      p.setAttribute('style','position:fixed;z-index:2147483647;top:8px;right:8px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ccc;padding:8px;border-radius:8px;font:12px monospace;');\n      const ul=document.createElement('ul'); ul.style='list-style:none;padding:0;margin:0;';\n      hs.forEach((h,i)=>{\n        const li=document.createElement('li');\n        const a=document.createElement('a'); a.href='#'; a.textContent=h.tagName+' '+h.textContent.trim().slice(0,80);\n        a.style='display:block;padding:4px 6px;border-radius:4px;text-decoration:none;color:#00c;';\n        a.addEventListener('click',e=>{e.preventDefault(); h.scrollIntoView({block:\"center\"}); h.focus({preventScroll:true});});\n        li.appendChild(a); ul.appendChild(li);\n      });\n      if(!hs.length){ ul.innerHTML='<li>No headings</li>'; }\n      const close=document.createElement('button'); close.textContent='×'; close.title='Close';\n      close.style='position:absolute;top:0;right:0;border:0;background:#eee;border-radius:0 8px 0 8px;padding:4px 6px;cursor:pointer';\n      close.onclick=()=>p.remove();\n      p.append(close, ul);\n      document.body.appendChild(p);\n    "
  },
  {
    "id": "alt-missing",
    "name": "Mark images missing alt",
    "category": "core",
    "description": "Outline images with empty or missing alt, with count alert.",
    "ai": false,
    "code": "\n      const imgs=[...document.images];\n      const bad=imgs.filter(i=>!i.hasAttribute('alt') || i.getAttribute('alt')==='');\n      bad.forEach(i=>{ i.style.outline='3px solid red'; i.title='Missing alt'; });\n      alert(bad.length+' images missing alt');\n    "
  },
  {
    "id": "pause-motion",
    "name": "Pause motion",
    "category": "core",
    "description": "Disable CSS animations and transitions, set auto scroll behavior.",
    "ai": false,
    "code": "\n      const ID='a11y-reduced-motion';\n      let s=document.getElementById(ID);\n      if(s){ s.remove(); return; }\n      s=document.createElement('style'); s.id=ID;\n      s.textContent='*{animation:none !important;transition:none !important;scroll-behavior:auto !important}';\n      document.head.appendChild(s);\n    "
  },
  {
    "id": "landmarks",
    "name": "Landmarks highlighter",
    "category": "core",
    "description": "Outline main, nav, banner, contentinfo, complementary, form, search, region.",
    "ai": false,
    "code": "\n      const ID='a11y-landmarks';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const roles=['main','navigation','banner','contentinfo','complementary','form','search','region'];\n      const elms=[...document.querySelectorAll('main,nav,header[role=banner],footer[role=contentinfo],aside,[role]')].filter(e=>{\n        const r=e.getAttribute('role'); return roles.includes(r)||['MAIN','NAV','ASIDE'].includes(e.tagName);\n      });\n      const style=document.createElement('style'); style.id=ID;\n      style.textContent=roles.map(r=>`[role=\"${r}\"]{outline:3px solid #0a0 !important; outline-offset:2px}`).join('')\n        + ' main{outline:3px solid #0aa !important;outline-offset:2px} nav{outline:3px solid #a0a !important;outline-offset:2px} aside{outline:3px solid #aa0 !important;outline-offset:2px}';\n      document.head.appendChild(style);\n      alert(elms.length+' landmark elements outlined');\n    "
  },
  {
    "id": "lang-check",
    "name": "Language check",
    "category": "core",
    "description": "Report the page lang and elements with lang mismatches.",
    "ai": false,
    "code": "\n      const pageLang=document.documentElement.getAttribute('lang')||'(none)';\n      const diffs=[...document.querySelectorAll('[lang]')].filter(el=>el.closest('[lang]')===el).map(el=>`${el.tagName.toLowerCase()} lang=\"${el.getAttribute('lang')}\"`);\n      alert('Page lang: '+pageLang+'\\nTop-level elements with lang: \\n'+(diffs[0]?diffs.join('\\n'):'(none)'));\n    "
  },
  {
    "id": "contrast-spot",
    "name": "Contrast spot-check",
    "category": "core",
    "description": "Click any text to compute contrast ratio and pass/fail for AA.",
    "long": "After running, click a text element to get color, background, ratio, and pass/fail at AA and AAA for normal and large text. Press Esc to end.",
    "ai": false,
    "code": "\n      function parseColor(c){const ctx=document.createElement('canvas').getContext('2d');ctx.fillStyle=c;return ctx.fillStyle;}\n      function rgbToArray(c){const m=c.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);return m?[+m[1],+m[2],+m[3]]:[0,0,0];}\n      function relLum([r,g,b]){[r,g,b]=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*r+0.7152*g+0.0722*b;}\n      function contrast(c1,c2){const L1=relLum(rgbToArray(parseColor(c1))),L2=relLum(rgbToArray(parseColor(c2)));const [a,b]=L1>L2?[L1,L2]:[L2,L1];return (a+0.05)/(b+0.05)}\n      const onClick=e=>{\n        e.preventDefault(); e.stopPropagation();\n        const el=e.target;\n        const cs=getComputedStyle(el);\n        const fg=cs.color;\n        let bg=cs.backgroundColor;\n        let p=el;\n        while(bg==='rgba(0, 0, 0, 0)'||bg==='transparent'){ p=p.parentElement; if(!p) {bg='rgb(255,255,255)';break;} bg=getComputedStyle(p).backgroundColor; }\n        const r=contrast(fg,bg).toFixed(2);\n        const size=parseFloat(cs.fontSize); const bold=parseInt(cs.fontWeight,10)>=700;\n        const large = (size>=18) || (size>=14 && bold);\n        const passAA = large ? r>=3 : r>=4.5;\n        const passAAA = large ? r>=4.5 : r>=7;\n        alert(`Text: ${el.textContent.trim().slice(0,60)||el.tagName}\\ncolor ${fg} on ${bg}\\nratio ${r}:1\\nAA ${passAA?'pass':'fail'}  AAA ${passAAA?'pass':'fail'}`);\n        end();\n      };\n      function end(){ document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey, true); }\n      function onKey(e){ if(e.key==='Escape'){ end(); alert('Contrast check ended'); } }\n      document.addEventListener('click', onClick, true);\n      document.addEventListener('keydown', onKey, true);\n      alert('Click a text element to check contrast. Press Esc to stop.');\n    "
  },
  {
    "id": "tooltips-view",
    "name": "Show title tooltips",
    "category": "core",
    "description": "Reveal elements that rely on title attributes for help text.",
    "ai": false,
    "code": "\n      const els=[...document.querySelectorAll('[title]')];\n      els.forEach(el=>{ el.style.outline='2px dotted #c0c'; el.insertAdjacentHTML('afterend', `<small style=\"background:#ffe;border:1px solid #cc9;border-radius:4px;padding:2px 4px;margin-left:4px\">${el.getAttribute('title')}</small>`); });\n      alert(els.length+' elements with title attribute highlighted');\n    "
  },
  {
    "id": "roles-viewer",
    "name": "ARIA roles viewer",
    "category": "core",
    "description": "Badge elements that have a role with their role name and label.",
    "ai": false,
    "code": "\n      const ID='a11y-roles-view';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:999999';\n      const els=[...document.querySelectorAll('[role]')];\n      els.forEach(el=>{\n        const r=el.getAttribute('role'); const l=el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')||'';\n        const b=document.createElement('div'); const rect=el.getBoundingClientRect();\n        b.textContent=r+(l?` (${l})`:'');\n        b.style=`position:absolute;left:${rect.left+scrollX}px;top:${rect.top+scrollY}px;background:#eef;border:1px solid #99f;border-radius:4px;padding:2px 4px;font:11px monospace;pointer-events:none`;\n        wrap.appendChild(b);\n      });\n      document.body.appendChild(wrap);\n    "
  },
  {
    "id": "keyboard-trap-scout",
    "name": "Keyboard trap scout",
    "category": "core",
    "description": "Warn when focus moves back to the same element for 3 consecutive Tabs.",
    "ai": false,
    "code": "\n      let last=null, count=0;\n      function onKey(e){\n        if(e.key==='Tab'){\n          const now=document.activeElement;\n          if(last===now){ count++; if(count>=3){ alert('Possible keyboard trap near '+(now.tagName||'element')); count=0; } }\n          else { count=1; last=now; }\n        }\n      }\n      alert('Press Tab a few times. This will warn if focus cycles on the same element 3 times.');\n      document.addEventListener('keydown', onKey, true);\n      setTimeout(()=>document.removeEventListener('keydown', onKey, true), 20000);\n    "
  },
  {
    "id": "prefers-reduced",
    "name": "Toggle prefers-reduced-motion",
    "category": "core",
    "description": "Inject CSS to simulate reduced motion user preference.",
    "ai": false,
    "code": "\n      const ID='a11y-prm';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const s=document.createElement('style'); s.id=ID;\n      s.textContent='@media (prefers-reduced-motion: reduce){*{animation:none !important;transition:none !important}}';\n      document.head.appendChild(s);\n    "
  },
  {
    "id": "cvd-filters",
    "name": "Color vision filters",
    "category": "core",
    "description": "Apply protanopia, deuteranopia, tritanopia simulation filters.",
    "long": "Runs an SVG filter over the page. Click repeatedly to cycle modes. Modes: none, protanopia, deuteranopia, tritanopia.",
    "ai": false,
    "code": "\n      const ID='a11y-cvd';\n      const old=document.getElementById(ID);\n      if(old){\n        const mode=old.getAttribute('data-mode')||'none';\n        const order=['none','protanopia','deuteranopia','tritanopia'];\n        const next=order[(order.indexOf(mode)+1)%order.length];\n        old.setAttribute('data-mode', next);\n        document.documentElement.style.filter = next==='none' ? '' : `url(#${next})`;\n        alert('Mode: '+next);\n        return;\n      }\n      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');\n      svg.setAttribute('id', ID);\n      svg.setAttribute('style','position:fixed;width:0;height:0;');\n      svg.innerHTML=`\n        <filter id=\"protanopia\">\n          <feColorMatrix type=\"matrix\" values=\"0.567 0.433 0    0 0 0.558 0.442 0    0 0 0    0.242 0.758 0 0 0 0 1 0\"/>\n        </filter>\n        <filter id=\"deuteranopia\">\n          <feColorMatrix type=\"matrix\" values=\"0.625 0.375 0    0 0 0.7   0.3   0    0 0 0    0.3   0.7   0 0 0 0 1 0\"/>\n        </filter>\n        <filter id=\"tritanopia\">\n          <feColorMatrix type=\"matrix\" values=\"0.95  0.05  0    0 0 0    0.433 0.567 0 0 0.475 0.525 0 0 0 0 1 0\"/>\n        </filter>`;\n      document.body.appendChild(svg);\n      svg.setAttribute('data-mode','protanopia');\n      document.documentElement.style.filter='url(#protanopia)';\n      alert('Mode: protanopia');\n    "
  },
  {
    "id": "ai-alt-suggest",
    "name": "AI alt text suggester",
    "category": "ai",
    "description": "Panel for images missing alt with a Suggest button that calls your endpoint.",
    "long": "Opens a panel that lists images lacking alt. Paste model endpoint and key. Click Suggest to request alt text. The code calls fetch with {imgUrl, surroundingText} and expects {alt}. You can wire it to any service.",
    "ai": true,
    "code": "\n      const ID='a11y-ai-alt';\n      if(document.getElementById(ID)){ document.getElementById(ID).remove(); return; }\n      const panel=document.createElement('div'); panel.id=ID;\n      panel.style='position:fixed;z-index:2147483647;right:8px;top:8px;width:360px;max-height:80vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px/1.4 ui-monospace,monospace;padding:10px';\n      panel.innerHTML=`<div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:8px\">\n        <strong>AI alt text suggester</strong>\n        <button id=\"close\" style=\"border:0;background:#eee;border-radius:6px;padding:4px 8px;cursor:pointer\">Close</button>\n      </div>\n      <div style=\"display:grid;gap:6px\">\n        <input id=\"ep\" placeholder=\"Model endpoint URL\" value=\"${sessionStorage.getItem('a11y_ai_ep')||''}\">\n        <input id=\"key\" placeholder=\"API key\" value=\"${sessionStorage.getItem('a11y_ai_key')||''}\">\n      </div>\n      <hr>\n      <div id=\"list\" style=\"display:grid;gap:8px\"></div>`;\n      panel.querySelector('#close').onclick=()=>panel.remove();\n      document.body.appendChild(panel);\n      const epI=panel.querySelector('#ep'), keyI=panel.querySelector('#key');\n      epI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_ep', epI.value));\n      keyI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_key', keyI.value));\n      const imgs=[...document.images].filter(i=>!i.getAttribute('alt'));\n      const list=panel.querySelector('#list');\n      if(!imgs.length){ list.textContent='No images without alt'; }\n      imgs.forEach((img,idx)=>{\n        const row=document.createElement('div'); row.style='display:grid;grid-template-columns:56px 1fr auto;gap:6px;align-items:center';\n        const t=document.createElement('img'); t.src=img.currentSrc||img.src; t.width=56; t.height=38; t.style='object-fit:cover;border:1px solid #ddd;border-radius:6px';\n        const info=document.createElement('div'); info.innerHTML=`<div style=\"white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">${t.src}</div><small>Click Suggest to fetch alt</small>`;\n        const btn=document.createElement('button'); btn.textContent='Suggest'; btn.style='padding:6px 10px;border-radius:8px;border:1px solid #ccc;background:#fafafa;cursor:pointer';\n        btn.onclick=async()=>{\n          try{\n            const around=img.closest('figure')?.innerText || img.parentElement?.innerText || document.title || '';\n            const payload={imgUrl:t.src, surroundingText:around.slice(0,400)};\n            if(!epI.value){ alert('Set endpoint URL'); return; }\n            const res=await fetch(epI.value, { method:'POST', headers:{'Content-Type':'application/json','Authorization':keyI.value?('Bearer '+keyI.value):undefined}, body:JSON.stringify(payload) });\n            if(!res.ok){ throw new Error('HTTP '+res.status); }\n            const data=await res.json();\n            const alt=data.alt || data.caption || data.text || '(no alt returned)';\n            img.setAttribute('alt', alt);\n            info.innerHTML=`<div>${alt}</div><small>Applied to image</small>`;\n          }catch(err){ alert('Error: '+err.message); }\n        };\n        row.append(t, info, btn);\n        list.appendChild(row);\n      });\n    "
  },
  {
    "id": "ai-summary",
    "name": "AI page summary",
    "category": "ai",
    "description": "Create a short page summary aimed at screen reader users.",
    "long": "Collects main text and sends to your endpoint. Expects {summary}. Saves endpoint and key in sessionStorage. Injects the summary at top of body in a live region.",
    "ai": true,
    "code": "\n      const ID='a11y-ai-summary';\n      const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      const main=document.querySelector('main')||document.body;\n      const text=main.innerText.replace(/\\s+/g,' ').trim().slice(0, 12000);\n      fetch(ep, {method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:text, task:'a11y_page_summary'}) })\n        .then(r=>r.json()).then(data=>{\n          const s=data.summary || data.output || '(no summary)';\n          let live=document.getElementById(ID);\n          if(!live){ live=document.createElement('div'); live.id=ID; live.setAttribute('role','region'); live.setAttribute('aria-live','polite'); live.style='border:2px solid #4b8;border-radius:8px;padding:8px;margin:8px;background:#efe'; document.body.prepend(live); }\n          live.innerHTML='<strong>Page summary:</strong> '+s;\n        })\n        .catch(e=>alert('Error: '+e.message));\n    "
  },
  {
    "id": "ai-aria-advisor",
    "name": "AI ARIA advisor",
    "category": "ai",
    "description": "Send a compact DOM snapshot and get role hints and fixes.",
    "ai": true,
    "code": "\n      const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      function domWalk(root, depth=0){\n        if(depth>3) return '';\n        let out='';\n        for(const el of root.children){\n          const role=el.getAttribute('role'); const name=el.getAttribute('aria-label')||'';\n          out += `<${el.tagName.toLowerCase()}${role?` role=\"${role}\"`:''}${name?` name=\"${name}\"`:''}>`;\n          out += domWalk(el, depth+1);\n        }\n        return out;\n      }\n      const snapshot=domWalk(document.body);\n      fetch(ep, {method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:snapshot, task:'a11y_aria_hints'}) })\n        .then(r=>r.json()).then(data=>{\n          const tips=data.tips || data.output || JSON.stringify(data);\n          const pre=document.createElement('pre'); pre.style='position:fixed;left:8px;bottom:8px;right:8px;max-height:50vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;padding:10px;z-index:2147483647;font:12px monospace';\n          pre.textContent=tips;\n          document.body.appendChild(pre);\n        })\n        .catch(e=>alert('Error: '+e.message));\n    "
  },
  {
    "id": "ai-plain-language",
    "name": "AI plain language mode",
    "category": "ai",
    "description": "Rewrite selected text blocks to plain language with toggle back.",
    "long": "Double click any paragraph to rewrite. The original HTML is stored and can be restored with another double click. Works on P and LI elements.",
    "ai": true,
    "code": "\n      const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      const ATTR='data-a11y-plain-orig';\n      function onDbl(e){\n        const el=e.target.closest('p,li');\n        if(!el) return;\n        if(el.hasAttribute(ATTR)){ el.innerHTML=el.getAttribute(ATTR); el.removeAttribute(ATTR); return; }\n        const text=el.innerText.slice(0,800);\n        fetch(ep,{method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:text, task:'plain_language'}) })\n          .then(r=>r.json()).then(data=>{ const out=data.text||data.output||data.summary||'(no change)'; el.setAttribute(ATTR, el.innerHTML); el.innerText=out; })\n          .catch(e=>alert('Error: '+e.message));\n      }\n      document.addEventListener('dblclick', onDbl, true);\n      alert('Double click a paragraph or list item to rewrite. Double click again to revert.');\n      setTimeout(()=>document.removeEventListener('dblclick', onDbl, true), 600000);\n    "
  },
  {
    "id": "form-autolabel",
    "name": "Form autolabel helper",
    "category": "ai",
    "description": "Collect unlabeled inputs and propose labels. AI optional.",
    "long": "Lists inputs without labels and allows quick aria-label assignment. If you provide an endpoint, it will request label suggestions based on nearby text.",
    "ai": true,
    "code": "\n      const ID='a11y-form-autolabel';\n      if(document.getElementById(ID)){ document.getElementById(ID).remove(); return; }\n      const panel=document.createElement('div'); panel.id=ID;\n      panel.style='position:fixed;z-index:2147483647;left:8px;bottom:8px;width:380px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px/1.4 ui-monospace,monospace;padding:10px';\n      panel.innerHTML=`<div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:8px\">\n        <strong>Form autolabel</strong>\n        <button id=\"close\" style=\"border:0;background:#eee;border-radius:6px;padding:4px 8px;cursor:pointer\">Close</button>\n      </div>\n      <div style=\"display:grid;gap:6px\">\n        <input id=\"ep\" placeholder=\"Model endpoint URL\" value=\"${sessionStorage.getItem('a11y_ai_ep')||''}\">\n        <input id=\"key\" placeholder=\"API key\" value=\"${sessionStorage.getItem('a11y_ai_key')||''}\">\n      </div>\n      <hr>\n      <div id=\"list\" style=\"display:grid;gap:8px\"></div>`;\n      panel.querySelector('#close').onclick=()=>panel.remove();\n      document.body.appendChild(panel);\n      const epI=panel.querySelector('#ep'), keyI=panel.querySelector('#key');\n      epI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_ep', epI.value));\n      keyI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_key', keyI.value));\n      function surrounding(el){ return (el.closest('label')?.innerText || el.parentElement?.innerText || '').trim().slice(0,200); }\n      const inputs=[...document.querySelectorAll('input:not([type=hidden]),textarea,select')].filter(i=>{\n        if(i.id && document.querySelector(`label[for=\"${i.id}\"]`)) return false;\n        if(i.closest('label')) return false;\n        return true;\n      });\n      const list=panel.querySelector('#list');\n      if(!inputs.length){ list.textContent='No unlabeled inputs'; }\n      inputs.forEach((el,idx)=>{\n        const row=document.createElement('div'); row.style='display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center';\n        const info=document.createElement('div');\n        const near=surrounding(el);\n        info.innerHTML=`<div><strong>${el.tagName.toLowerCase()}</strong> name=\"${el.name||''}\" placeholder=\"${el.placeholder||''}\"</div>\n                        <small>Nearby: ${near||'(none)'}</small>\n                        <div><input data-i=\"${idx}\" placeholder=\"aria-label text\" style=\"width:100%\"></div>`;\n        const btn=document.createElement('button'); btn.textContent='Suggest'; btn.style='padding:6px 10px;border-radius:8px;border:1px solid #ccc;background:#fafafa;cursor:pointer';\n        btn.onclick=async()=>{\n          if(!epI.value){ alert('Set endpoint URL'); return; }\n          try{\n            const payload={input: near || el.placeholder || el.name || '', task:'form_label'};\n            const res=await fetch(epI.value,{method:'POST', headers:{'Content-Type':'application/json','Authorization':keyI.value?('Bearer '+keyI.value):undefined}, body:JSON.stringify(payload)});\n            const data=await res.json();\n            const label=data.text||data.label||data.output||'';\n            const box=info.querySelector(`input[data-i=\"${idx}\"]`); box.value=label;\n            el.setAttribute('aria-label', label);\n          }catch(e){ alert('Error: '+e.message); }\n        };\n        row.append(info, btn);\n        list.appendChild(row);\n      });\n    "
  },
  {
    "id": "tap-target-heat",
    "name": "Tap target heatmap",
    "category": "touch",
    "description": "Flag small targets and items too close for touch.",
    "long": "Red border shows target under 44px. Orange glow marks neighbors closer than 8px.",
    "ai": false,
    "code": "\n      const ID='a11y-tap-heat';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';\n      const isInteractive=el=>el.matches('a[href],button,input:not([type=hidden]),select,textarea,[role=\"button\"],[tabindex]:not([tabindex=\"-1\"])');\n      const els=[...document.querySelectorAll('a,button,input,select,textarea,[role=\"button\"],[tabindex]')].filter(isInteractive).filter(e=>e.offsetParent);\n      const min=44, pad=8;\n      for(const el of els){\n        const r=el.getBoundingClientRect();\n        const small=(r.width<min||r.height<min);\n        let close=false;\n        for(const other of els){ if(other===el) continue;\n          const o=other.getBoundingClientRect();\n          const dx=Math.max(0, Math.max(o.left - r.right, r.left - o.right));\n          const dy=Math.max(0, Math.max(o.top - r.bottom, r.top - o.bottom));\n          const dist=Math.hypot(dx,dy);\n          if(dist<pad){ close=true; break; }\n        }\n        const b=document.createElement('div');\n        b.style=`position:absolute;left:${r.left+scrollX}px;top:${r.top+scrollY}px;width:${r.width}px;height:${r.height}px;border:${small?'3px solid #e00':'2px solid #0a0'};box-shadow:${close?'0 0 0 4px rgba(255,165,0,.6)':'none'};pointer-events:none`;\n        b.title=`${small?'Small target':''}${close?(small?' and ':'')+(close?'Too close to neighbor':'' ):''}`;\n        wrap.appendChild(b);\n      }\n      document.body.appendChild(wrap);\n      alert('Red = small target, orange glow = too close');\n    "
  },
  {
    "id": "source-order-tracer",
    "name": "Source order tracer",
    "category": "reading",
    "description": "Number visible blocks to visualize read order.",
    "ai": false,
    "code": "\n      const ID='a11y-order'; const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';\n      const blocks='p,h1,h2,h3,h4,h5,h6,li,dt,dd,section,article,aside,main,header,footer,nav,blockquote,pre';\n      let n=1;\n      for(const el of document.querySelectorAll(blocks)){\n        if(!el.offsetParent) continue;\n        const text=(el.innerText||'').trim(); if(!text) continue;\n        const r=el.getBoundingClientRect();\n        const tag=el.tagName.toLowerCase();\n        const badge=document.createElement('div');\n        badge.textContent=n++ + ' ' + tag;\n        badge.style=`position:absolute;left:${r.left+scrollX}px;top:${r.top+scrollY}px;background:#ffe08a;border:1px solid #333;border-radius:12px;padding:2px 6px;font:12px monospace;pointer-events:none`;\n        wrap.appendChild(badge);\n      }\n      document.body.appendChild(wrap);\n    "
  },
  {
    "id": "headings-gap-detector",
    "name": "Headings gap detector",
    "category": "reading",
    "description": "Flag heading level jumps like H2 to H4.",
    "ai": false,
    "code": "\n      const hs=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];\n      let problems=[];\n      hs.forEach((h,i)=>{\n        if(i===0) return;\n        const prev=hs[i-1];\n        const a=+prev.tagName[1], b=+h.tagName[1];\n        if(b>a+1){\n          h.style.outline='3px solid #e00';\n          problems.push(`${prev.tagName} → ${h.tagName}: \"${h.textContent.trim().slice(0,80)}\"`);\n        }\n      });\n      alert(problems.length?('Heading jumps:\\n'+problems.join('\\n')):'No heading level jumps found');\n    "
  },
  {
    "id": "accessible-name-badges",
    "name": "Accessible name badges",
    "category": "core",
    "description": "Badge interactive elements with computed names.",
    "ai": false,
    "code": "\n      const ID='a11y-name-badges'; const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';\n      const q='a[href],button,input,select,textarea,[role],[tabindex]:not([tabindex=\"-1\"])';\n      function nameOf(el){\n        const byId=id=>id&&document.getElementById(id)?.innerText.trim();\n        if(el.hasAttribute('aria-label')) return el.getAttribute('aria-label').trim();\n        const lb=el.getAttribute('aria-labelledby'); if(lb){ return lb.split(/\\s+/).map(byId).filter(Boolean).join(' ').trim(); }\n        if(el.alt) return el.alt.trim();\n        if(el.placeholder) return el.placeholder.trim();\n        const own=(el.innerText||'').trim();\n        return own.slice(0,80);\n      }\n      for(const el of document.querySelectorAll(q)){\n        if(!el.offsetParent) continue;\n        const r=el.getBoundingClientRect(); const nm=nameOf(el)||'(no name)';\n        const tag=el.tagName.toLowerCase();\n        const b=document.createElement('div');\n        b.textContent=`${tag}: ${nm}`;\n        b.style=`position:absolute;left:${r.left+scrollX}px;top:${r.top+scrollY}px;background:#eef;border:1px solid #99f;border-radius:4px;padding:2px 4px;font:11px monospace;pointer-events:none`;\n        wrap.appendChild(b);\n      }\n      document.body.appendChild(wrap);\n    "
  },
  {
    "id": "media-captions-checker",
    "name": "Media captions checker",
    "category": "media",
    "description": "Report captions, autoplay, and controls for media elements.",
    "ai": false,
    "code": "\n      const vids=[...document.querySelectorAll('video')];\n      const auds=[...document.querySelectorAll('audio')];\n      let msg=[];\n      function check(el){\n        const tracks=[...el.textTracks||[]];\n        const hasCaptions=tracks.some(t=>/captions|subtitles/i.test(t.kind||'')||/captions|subs/i.test(t.label||''));\n        const auto=el.autoplay; const controls=el.controls;\n        msg.push(`${el.tagName} captions:${hasCaptions?'yes':'no'} autoplay:${auto?'yes':'no'} controls:${controls?'yes':'no'}`);\n      }\n      vids.forEach(check); auds.forEach(check);\n      alert((msg.length?msg.join('\\n'):'No media found'));\n    "
  },
  {
    "id": "motion-inspector",
    "name": "Motion inspector",
    "category": "motion",
    "description": "List animations and controls to pause, play, or slow them.",
    "ai": false,
    "code": "\n      const ID='a11y-motion-inspector';\n      if(document.getElementById(ID)){ document.getElementById(ID).remove(); return; }\n      const panel=document.createElement('div'); panel.id=ID;\n      panel.style='position:fixed;z-index:2147483647;right:8px;bottom:8px;width:360px;max-height:60vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px ui-monospace,monospace;padding:10px';\n      const list=document.createElement('div'); list.style='display:grid;gap:6px';\n      const controls=document.createElement('div'); controls.style='display:flex;gap:6px;margin-bottom:8px';\n      const btn=(t,fn)=>{ const b=document.createElement('button'); b.textContent=t; b.style='padding:6px 8px;border:1px solid #ccc;border-radius:8px;background:#fafafa;cursor:pointer'; b.onclick=fn; return b; };\n      const anims=document.getAnimations?document.getAnimations():[];\n      const refresh=()=>{\n        list.innerHTML='';\n        anims.forEach((a,i)=>{\n          const d=document.createElement('div');\n          const dur=(a.effect?.getTiming?.().duration)||'auto';\n          const it=(a.effect?.getTiming?.().iterations)||1;\n          d.textContent=`#${i+1} ${a.playState} duration:${dur} iters:${it} rate:${a.playbackRate}`;\n          list.appendChild(d);\n        });\n        if(!anims.length){ list.textContent='No animations found'; }\n      };\n      controls.append(\n        btn('Pause all', ()=>{anims.forEach(a=>a.pause()); refresh();}),\n        btn('Play all', ()=>{anims.forEach(a=>a.play()); refresh();}),\n        btn('Half speed', ()=>{anims.forEach(a=>a.playbackRate=0.5); refresh();}),\n        btn('Normal speed', ()=>{anims.forEach(a=>a.playbackRate=1); refresh();})\n      );\n      panel.append(controls, list);\n      document.body.appendChild(panel);\n      refresh();\n    "
  },
  {
    "id": "text-readability-grade",
    "name": "Text readability grade",
    "category": "readability",
    "description": "Estimate Flesch Kincaid grade of selection or main text.",
    "ai": false,
    "code": "\n      function syllables(w){ w=w.toLowerCase().replace(/[^a-z]/g,''); if(!w) return 0; if(w.length<=3) return 1;\n        w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,'').replace(/^y/,'');\n        const m=w.match(/[aeiouy]{1,2}/g); return m?m.length:1; }\n      function grade(text){\n        const sents=Math.max(1,(text.match(/[.!?]+\\s/g)||[]).length+1);\n        const words=text.trim().split(/\\s+/).filter(Boolean);\n        const syll=words.reduce((a,w)=>a+syllables(w),0);\n        const W=words.length, S=sents;\n        return 0.39*(W/S)+11.8*(syll/W)-15.59;\n      }\n      let text=window.getSelection().toString().trim();\n      if(!text){\n        const main=document.querySelector('main')||document.body;\n        text=main.innerText.replace(/\\s+/g,' ').trim().slice(0,3000);\n      }\n      const g=grade(text);\n      alert('Estimated grade level: '+g.toFixed(1));\n    "
  },
  {
    "id": "palette-contrast-extractor",
    "name": "Palette contrast extractor",
    "category": "color",
    "description": "List common color pairs in viewport sorted by contrast.",
    "ai": false,
    "code": "\n      function parseColor(c){const ctx=document.createElement('canvas').getContext('2d');ctx.fillStyle=c;return ctx.fillStyle;}\n      function rgbToArray(c){const m=c.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);return m?[+m[1],+m[2],+m[3]]:[0,0,0];}\n      function relLum([r,g,b]){[r,g,b]=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*r+0.7152*g+0.0722*b;}\n      function contrast(c1,c2){const L1=relLum(rgbToArray(parseColor(c1))),L2=relLum(rgbToArray(parseColor(c2)));const [a,b]=L1>L2?[L1,L2]:[L2,L1];return (a+0.05)/(b+0.05)}\n      const els=[...document.querySelectorAll('body *')].filter(e=>e.offsetParent);\n      const pairs=new Map();\n      for(const el of els){\n        const cs=getComputedStyle(el);\n        const fg=cs.color; let bg=cs.backgroundColor; let p=el;\n        while((bg==='rgba(0, 0, 0, 0)'||bg==='transparent') && (p=p.parentElement)){ bg=getComputedStyle(p).backgroundColor; }\n        const key=fg+' on '+bg;\n        const text=(el.innerText||'').trim();\n        if(text){ pairs.set(key, (pairs.get(key)||0)+1); }\n      }\n      const out=[...pairs.entries()].map(([k,c])=>{\n        const [fg,_,bg]=k.split(' ');\n        return {k, c, r: contrast(fg,bg)};\n      }).sort((a,b)=>a.r-b.r).slice(0,20).map(x=>`${x.r.toFixed(2)}:1  ${x.k}  (${x.c})`).join('\\n');\n      alert(out || 'No pairs found');\n    "
  },
  {
    "id": "forced-colors-preview",
    "name": "Forced colors preview",
    "category": "color",
    "description": "Approximate a high contrast forced-colors view.",
    "ai": false,
    "code": "\n      const ID='a11y-forced-colors';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const s=document.createElement('style'); s.id=ID;\n      s.textContent=`*{background:transparent !important; box-shadow:none !important}\n        body{background:#000 !important; color:#fff !important}\n        a{color:#0ff !important; text-decoration:underline !important}\n        button,input,select,textarea{background:#000 !important; color:#fff !important; border:2px solid #fff !important}\n        img,video,svg{filter:grayscale(100%) contrast(120%) !important}`;\n      document.head.appendChild(s);\n    "
  },
  {
    "id": "focus-path-recorder",
    "name": "Focus path recorder",
    "category": "forms",
    "description": "Record Tab path and download a short report. Press Esc to end.",
    "ai": false,
    "code": "\n      const events=[];\n      function labelOf(el){ return el.getAttribute('aria-label')||el.id||el.name||el.alt||el.innerText?.slice(0,40)||el.tagName; }\n      function onKey(e){\n        if(e.key==='Tab'){\n          const el=document.activeElement;\n          events.push({time:new Date().toISOString(), el:el.tagName.toLowerCase(), label:labelOf(el)});\n        }else if(e.key==='Escape'){\n          document.removeEventListener('keydown', onKey, true);\n          const text=events.map(x=>`${x.time}  ${x.el}  ${x.label}`).join('\\n');\n          const blob=new Blob([text||'No events recorded'], {type:'text/plain'});\n          const url=URL.createObjectURL(blob);\n          const a=document.createElement('a'); a.href=url; a.download='focus-path.txt'; a.click();\n          setTimeout(()=>URL.revokeObjectURL(url), 1000);\n          alert('Saved focus-path.txt');\n        }\n      }\n      alert('Recording Tab navigation. Press Esc to save.');\n      document.addEventListener('keydown', onKey, true);\n    "
  },
  {
    "id": "form-error-reveal",
    "name": "Form error reveal",
    "category": "forms",
    "description": "Mark required empty fields and focus the first one.",
    "ai": false,
    "code": "\n      const inputs=[...document.querySelectorAll('input,textarea,select')];\n      let first=null, count=0;\n      inputs.forEach(el=>{\n        const required=el.required || el.getAttribute('aria-required')==='true';\n        const empty=!(el.value||'').trim();\n        if(required && empty){\n          el.setAttribute('aria-invalid','true');\n          if(!el.nextElementSibling || !el.nextElementSibling.matches('.a11y-msg')){\n            const m=document.createElement('div'); m.className='a11y-msg';\n            m.style='color:#b00020;font:12px/1.3 ui-monospace,monospace;margin:4px 0';\n            m.textContent='Required';\n            el.insertAdjacentElement('afterend', m);\n          }\n          if(!first) first=el;\n          count++;\n        }\n      });\n      if(first){ first.focus(); }\n      alert(count?count+' required fields need input':'No empty required fields');\n    "
  },
  {
    "id": "ai-alt-vs-image-check",
    "name": "AI alt vs image check",
    "category": "ai",
    "description": "Send image and current alt to get a yes/no with fix suggestion.",
    "ai": true,
    "code": "\n      const ID='a11y-ai-alt-vs';\n      if(document.getElementById(ID)){ document.getElementById(ID).remove(); return; }\n      const panel=document.createElement('div'); panel.id=ID;\n      panel.style='position:fixed;z-index:2147483647;right:8px;top:8px;width:380px;max-height:80vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px ui-monospace,monospace;padding:10px';\n      panel.innerHTML=`<div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:8px\">\n        <strong>AI alt vs image</strong>\n        <button id=\"close\" style=\"border:0;background:#eee;border-radius:6px;padding:4px 8px;cursor:pointer\">Close</button>\n      </div>\n      <div style=\"display:grid;gap:6px\">\n        <input id=\"ep\" placeholder=\"Model endpoint URL\" value=\"${sessionStorage.getItem('a11y_ai_ep')||''}\">\n        <input id=\"key\" placeholder=\"API key\" value=\"${sessionStorage.getItem('a11y_ai_key')||''}\">\n      </div>\n      <hr>\n      <div id=\"list\" style=\"display:grid;gap:8px\"></div>`;\n      panel.querySelector('#close').onclick=()=>panel.remove();\n      document.body.appendChild(panel);\n      const epI=panel.querySelector('#ep'), keyI=panel.querySelector('#key');\n      epI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_ep', epI.value));\n      keyI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_key', keyI.value));\n      const imgs=[...document.images].filter(i=>i.getAttribute('alt'));\n      const list=panel.querySelector('#list');\n      if(!imgs.length){ list.textContent='No images with alt'; }\n      imgs.forEach((img,idx)=>{\n        const row=document.createElement('div'); row.style='display:grid;grid-template-columns:56px 1fr auto;gap:6px;align-items:center';\n        const t=document.createElement('img'); t.src=img.currentSrc||img.src; t.width=56; t.height=38; t.style='object-fit:cover;border:1px solid #ddd;border-radius:6px';\n        const info=document.createElement('div'); const alt=img.getAttribute('alt')||'';\n        info.innerHTML=`<div style=\"white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">${t.src}</div><small>Alt: ${alt||'(empty)'}</small>`;\n        const btn=document.createElement('button'); btn.textContent='Check'; btn.style='padding:6px 10px;border-radius:8px;border:1px solid #ccc;background:#fafafa;cursor:pointer';\n        btn.onclick=async()=>{\n          try{\n            if(!epI.value){ alert('Set endpoint URL'); return; }\n            const payload={imgUrl:t.src, alt, task:'alt_validation'};\n            const res=await fetch(epI.value, { method:'POST', headers:{'Content-Type':'application/json','Authorization':keyI.value?('Bearer '+keyI.value):undefined}, body:JSON.stringify(payload) });\n            const data=await res.json();\n            const ok = data.ok ?? data.valid ?? false;\n            const fix = data.fix || data.suggested || '';\n            info.innerHTML=`<div>${ok?'Looks good':'Needs fix'}</div><small>${fix||''}</small>`;\n            if(!ok && fix){ img.setAttribute('alt', fix); }\n          }catch(err){ alert('Error: '+err.message); }\n        };\n        row.append(t, info, btn);\n        list.appendChild(row);\n      });\n    "
  },
  {
    "id": "ai-tone-bullets",
    "name": "AI tone simplifier to bullets",
    "category": "ai",
    "description": "Rewrite selected text into short bullet points.",
    "ai": true,
    "code": "\n      const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      const sel=window.getSelection().toString().trim();\n      if(!sel){ alert('Select some text first'); return; }\n      fetch(ep,{method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:sel, task:'plain_bullets'}) })\n        .then(r=>r.json()).then(data=>{\n          const out=data.text||data.output||'(no change)';\n          alert(out);\n        }).catch(e=>alert('Error: '+e.message));\n    "
  },
  {
    "id": "ai-control-purpose-hints",
    "name": "AI control purpose hints",
    "category": "ai",
    "description": "Suggest short label and longer description for unlabeled inputs.",
    "ai": true,
    "code": "\n      const inputs=[...document.querySelectorAll('input:not([type=hidden]),textarea,select')].filter(i=>{\n        if(i.id && document.querySelector(`label[for=\"${i.id}\"]`)) return false;\n        if(i.closest('label')) return false;\n        return true;\n      });\n      const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      let first=null;\n      for(const el of inputs){\n        const near=(el.closest('label')?.innerText || el.parentElement?.innerText || el.placeholder || '').slice(0,200);\n        fetch(ep,{method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:near, task:'control_purpose'})})\n          .then(r=>r.json()).then(data=>{\n            const label=data.label||data.text||'';\n            const desc=data.description||'';\n            if(label){ el.setAttribute('aria-label', label); }\n            if(desc){\n              const d=document.createElement('div'); d.id='a11y-desc-'+Math.random().toString(36).slice(2);\n              d.className='a11y-msg'; d.style='font:12px ui-monospace,monospace;margin:4px 0'; d.textContent=desc;\n              el.insertAdjacentElement('afterend', d);\n              el.setAttribute('aria-describedby', (el.getAttribute('aria-describedby')||'') + ' ' + d.id);\n            }\n            if(!first) first=el;\n          }).catch(e=>console.warn(e));\n      }\n      if(first) first.focus();\n      alert(inputs.length?('Processed '+inputs.length+' inputs'):'No unlabeled inputs');\n    "
  },
  {
    "id": "session-recorder",
    "name": "Session recorder",
    "category": "workflow",
    "description": "Start a log of actions and notes. Copy or download when done.",
    "ai": false,
    "code": "\n      const ID='a11y-session-rec';\n      if(document.getElementById(ID)){ document.getElementById(ID).remove(); return; }\n      const panel=document.createElement('div'); panel.id=ID;\n      panel.style='position:fixed;z-index:2147483647;left:8px;top:8px;width:360px;max-height:80vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px ui-monospace,monospace;padding:10px';\n      const log=window.__a11yLog = window.__a11yLog || [];\n      const area=document.createElement('textarea'); area.rows=8; area.style='width:100%'; area.placeholder='Notes...';\n      const list=document.createElement('pre'); list.style='max-height:30vh;overflow:auto;background:#f7f7f7;border:1px solid #eee;border-radius:8px;padding:8px';\n      const btn=(t,fn)=>{ const b=document.createElement('button'); b.textContent=t; b.style='padding:6px 8px;border:1px solid #ccc;border-radius:8px;background:#fafafa;cursor:pointer;margin-right:6px'; b.onclick=fn; return b; };\n      function render(){ list.textContent=log.map(x=>`[${x.time}] ${x.msg}`).join('\\n'); }\n      function add(msg){ log.push({time:new Date().toLocaleString(), msg}); render(); }\n      add('Session started');\n      panel.append(area, document.createElement('div'));\n      const row=panel.lastChild;\n      row.append(btn('Add note', ()=>{ if(area.value.trim()){ add(area.value.trim()); area.value=''; } }),\n                 btn('Copy log', ()=>{ navigator.clipboard.writeText(list.textContent); alert('Copied'); }),\n                 btn('Download', ()=>{ const blob=new Blob([list.textContent], {type:'text/plain'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='a11y-session.txt'; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 1000); }),\n                 btn('Close', ()=>panel.remove()));\n      panel.append(list);\n      document.body.appendChild(panel);\n      render();\n    "
  },

  {
    id: "focus-graph-analyzer",
    name: "Focus graph analyzer",
    category: "analysis",
    description: "Model keyboard tab order as a graph. Highlight traps and unreachable items.",
    long: "Approximates native tab order from tabindex and DOM order, builds forward and backward edges, flags positive tabindex, and shows quick stats.",
    ai: false,
    code: `
    const ID='a11y-focus-graph'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    const focusables=[...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')]
      .filter(e=>!e.disabled && e.tabIndex!==-1 && e.offsetParent);
    const withTab = focusables.map((el,dom)=>({el, dom, ti: el.tabIndex||0}));
    const pos = withTab.filter(x=>x.ti>0).sort((a,b)=>a.ti-b.ti || a.dom-b.dom);
    const zero = withTab.filter(x=>x.ti===0).sort((a,b)=>a.dom-b.dom);
    const seq = [...pos, ...zero].map(x=>x.el);
    const idx = new Map(seq.map((el,i)=>[el,i]));
    const edgesF = new Map(seq.map((el,i)=>[el, seq[(i+1)%seq.length]||null]));
    const edgesB = new Map(seq.map((el,i)=>[el, seq[(i-1+seq.length)%seq.length]||null]));
    let traps=0, unreachable=0, riskyPos=pos.length;
    if(!seq.length){ alert('No focusable elements'); return; }
    const seen=new Set(seq);
    const root=seq[0]; const rects=[];
    for(const el of seq){
      const r=el.getBoundingClientRect();
      const badge=document.createElement('div');
      const f=edgesF.get(el), b=edgesB.get(el);
      badge.textContent=(idx.get(el)+1)+'→'+(f?idx.get(f)+1:'×');
      badge.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;background:#ffe08a;border:1px solid #333;border-radius:10px;padding:2px 6px;font:12px monospace\`;
      wrap.appendChild(badge);
      rects.push(r);
    }
    // crude trap heuristic: element whose forward and backward targets equal itself
    for(const el of seq){ const f=edgesF.get(el), b=edgesB.get(el); if(f===el && b===el) traps++; }
    // unreachable heuristic: focusables not in seq (tabindex -1 or hidden) but still interactive
    const allInteractive=[...document.querySelectorAll('a,button,input,select,textarea,[tabindex]')].filter(e=>e.offsetParent);
    unreachable = allInteractive.filter(e=>!idx.has(e) && e.tabIndex!==-1).length;
    document.body.appendChild(wrap);
    alert(\`Focus nodes: \${seq.length}\\nPositive tabindex: \${riskyPos}\\nTrap candidates: \${traps}\\nUnreachable candidates: \${unreachable}\`);
  `
  },
  {
    id: "reading-order-correlator",
    name: "Reading order correlator",
    category: "reading",
    description: "Compare visual flow to DOM order using Kendall tau.",
    long: "Lists text blocks, orders them by visual position, compares to DOM index, reports tau and inversions, and highlights large inversions.",
    ai: false,
    code: `
    const ID='a11y-read-corr'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const qs='p,h1,h2,h3,h4,h5,h6,li,dt,dd,section,article,aside,main,header,footer,nav,blockquote,pre';
    const blocks=[...document.querySelectorAll(qs)].filter(e=>e.offsetParent && (e.innerText||'').trim());
    if(!blocks.length){ alert('No readable blocks'); return; }
    const domOrder=new Map(blocks.map((e,i)=>[e,i]));
    const visual=[...blocks].sort((a,b)=>{const ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect(); if(Math.abs(ra.top-rb.top)>8) return ra.top-rb.top; return ra.left-rb.left;});
    let inversions=0, n=visual.length;
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){ if(domOrder.get(visual[i])>domOrder.get(visual[j])) inversions++; }
    const denom=n*(n-1)/2; const tau=denom? 1-(2*inversions/denom):1;
    const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    // flag large inversions
    visual.forEach((el,i)=>{
      const diff=Math.abs(domOrder.get(el)-i);
      if(diff>=5){ const r=el.getBoundingClientRect(); const b=document.createElement('div'); b.textContent='↕'; b.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;color:#e00;font:16px monospace\`; wrap.appendChild(b); }
    });
    document.body.appendChild(wrap);
    alert(\`Kendall tau: \${tau.toFixed(2)}  inversions: \${inversions}\`);
  `
  },
  {
    id: "rendered-contrast-heatmap",
    name: "Rendered contrast heatmap",
    category: "color",
    description: "Sample contrast on visible text and overlay a pass or fail heatmap.",
    long: "Estimates foreground and effective background for text nodes and overlays red fail, yellow borderline, green pass. Uses computed styles with ancestor fallback.",
    ai: false,
    code: `
    function parseColor(c){const ctx=document.createElement('canvas').getContext('2d');ctx.fillStyle=c;return ctx.fillStyle;}
    function rgbToArray(c){const m=c.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);return m?[+m[1],+m[2],+m[3]]:[0,0,0];}
    function relLum([r,g,b]){[r,g,b]=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*r+0.7152*g+0.0722*b;}
    function contrast(c1,c2){const L1=relLum(rgbToArray(parseColor(c1))),L2=relLum(rgbToArray(parseColor(c2)));const [a,b]=L1>L2?[L1,L2]:[L2,L1];return (a+0.05)/(b+0.05)}
    const ID='a11y-contrast-heat'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    const texts=[...document.querySelectorAll('body *')].filter(e=>e.offsetParent && (e.innerText||'').trim());
    let pass=0, borderline=0, fail=0;
    for(const el of texts){
      const cs=getComputedStyle(el);
      const fg=cs.color;
      let bg=cs.backgroundColor, p=el;
      while((bg==='rgba(0, 0, 0, 0)'||bg==='transparent') && (p=p.parentElement)) bg=getComputedStyle(p).backgroundColor;
      const r=el.getBoundingClientRect(); if(!r.width||!r.height) continue;
      const ratio=contrast(fg,bg);
      let color='rgba(0,255,0,.22)'; // pass
      const size=parseFloat(cs.fontSize); const bold=parseInt(cs.fontWeight,10)>=700; const large=(size>=18)||(size>=14&&bold);
      const need=large?3:4.5;
      if(ratio<need){ color='rgba(255,0,0,.25)'; fail++; }
      else if(ratio<need+1){ color='rgba(255,200,0,.22)'; borderline++; }
      else pass++;
      const box=document.createElement('div');
      box.title=\`\${ratio.toFixed(2)}:1\`;
      box.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;width:\${r.width}px;height:\${r.height}px;background:\${color}\`;
      wrap.appendChild(box);
    }
    document.body.appendChild(wrap);
    alert(\`Pass \${pass}  Borderline \${borderline}  Fail \${fail}\`);
  `
  },
  {
    id: "keyboard-unit-tester",
    name: "Keyboard behavior unit tester",
    category: "analysis",
    description: "Check Enter and Space on controls. Report silent elements.",
    long: "Emulates Enter and Space where allowed, watches for click and activation. Flags elements that ignore both keys.",
    ai: false,
    code: `
    const ID='a11y-keytest'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const q='a[href],button,[role="button"],input[type="checkbox"],input[type="radio"]';
    const els=[...document.querySelectorAll(q)].filter(e=>e.offsetParent);
    const silent=[];
    for(const el of els){
      let activated=false;
      const onClick=()=>activated=true;
      el.addEventListener('click', onClick, {once:true});
      el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));
      el.dispatchEvent(new KeyboardEvent('keyup',{key:'Enter',bubbles:true}));
      el.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}));
      el.dispatchEvent(new KeyboardEvent('keyup',{key:' ',bubbles:true}));
      setTimeout(()=>{ if(!activated) silent.push(el); }, 30);
    }
    setTimeout(()=>{
      alert(silent.length? \`Silent on Enter and Space: \${silent.length}\` : 'All tested controls responded');
    }, 220);
  `
  },
  {
    id: "form-error-exerciser",
    name: "Form error exerciser",
    category: "forms",
    description: "Trigger invalid states and check error focus and associations.",
    long: "Finds a form, empties required fields, runs reportValidity, checks :invalid count, focus placement, and aria-describedby links.",
    ai: false,
    code: `
    const form=document.querySelector('form')||document.querySelector('[role="form"]');
    if(!form){ alert('No form found'); return; }
    const fields=[...form.querySelectorAll('input,select,textarea')].filter(f=>!f.disabled);
    for(const f of fields){ if(f.required || f.getAttribute('aria-required')==='true'){ try{ f.value=''; }catch{} } }
    const before=document.activeElement;
    const ok=form.reportValidity ? form.reportValidity() : form.checkValidity();
    const invalid=[...form.querySelectorAll(':invalid')];
    let firstFocus=(document.activeElement&&document.activeElement!==before)? document.activeElement : null;
    // association check
    const badAssoc=invalid.filter(f=>{
      const ids=(f.getAttribute('aria-describedby')||'').trim().split(/\\s+/).filter(Boolean);
      return ids.length && !ids.every(id=>document.getElementById(id));
    }).length;
    alert(\`Valid: \${ok}  Invalid fields: \${invalid.length}\\nFirst error focus: \${firstFocus?firstFocus.name||firstFocus.id||firstFocus.tagName:'(none)'}\\nBad aria-describedby refs: \${badAssoc}\`);
  `
  },
  {
    id: "live-region-monitor",
    name: "Live region monitor",
    category: "live",
    description: "Watch aria-live and alert regions. Show update latency and dedup.",
    long: "Observes live regions, logs unique messages, timestamps them, and estimates time since start.",
    ai: false,
    code: `
    const ID='a11y-live-mon'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const panel=document.createElement('div'); panel.id=ID;
    panel.style='position:fixed;right:8px;top:8px;width:360px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;padding:8px;z-index:2147483647;font:12px monospace';
    panel.innerHTML='<b>Live region monitor</b><hr><div id="log"></div>';
    document.body.appendChild(panel);
    const log=panel.querySelector('#log'); const t0=performance.now(); const seen=new Set();
    const lives=[...document.querySelectorAll('[aria-live], [role="alert"]')];
    function add(t){ const row=document.createElement('div'); row.textContent=((performance.now()-t0)|0)+'ms: '+t; log.appendChild(row); }
    add(\`Watching \${lives.length} regions\`);
    const mo=new MutationObserver(ms=>{
      ms.forEach(m=>{
        const target=lives.find(l=>l.contains(m.target));
        if(target){
          const text=(target.innerText||target.textContent||'').trim().slice(0,160);
          if(text && !seen.has(text)){ seen.add(text); add(text); }
        }
      });
    });
    mo.observe(document.body,{subtree:true, childList:true, characterData:true});
  `
  },
  {
    id: "zoom-400-stress",
    name: "400% zoom stress test",
    category: "zoom",
    description: "Simulate 320 CSS px and 400 percent zoom. Flag horizontal scroll and overlaps.",
    long: "Wraps page content to emulate narrow viewport and high zoom, checks for x axis scroll and overlapping text blocks.",
    ai: false,
    code: `
    const ID='a11y-zoom-wrap'; const old=document.getElementById(ID);
    if(old){ old.remove(); document.documentElement.style.overflow=''; alert('Zoom test off'); return; }
    const wrap=document.createElement('div'); wrap.id=ID; while(document.body.firstChild){ wrap.appendChild(document.body.firstChild); }
    document.body.appendChild(wrap);
    wrap.style.transformOrigin='top left'; wrap.style.transform='scale(4)';
    wrap.style.width='320px'; document.documentElement.style.overflow='auto';
    setTimeout(()=>{
      const doc=document.documentElement;
      const hasX=doc.scrollWidth>doc.clientWidth+1;
      // overlap heuristic
      const blocks=[...document.querySelectorAll('p,li,div,section,article,main,header,footer,nav')].filter(e=>e.offsetParent && (e.innerText||'').trim());
      let overlaps=0;
      for(let i=0;i<Math.min(200,blocks.length);i++){
        const a=blocks[i].getBoundingClientRect();
        for(let j=i+1;j<Math.min(200,blocks.length);j++){
          const b=blocks[j].getBoundingClientRect();
          if(a.top<b.bottom && b.top<a.bottom && a.left<b.right && b.left<a.right){ overlaps++; break; }
        }
      }
      alert(\`Horizontal scroll: \${hasX?'yes':'no'}  Overlap pairs (sample): \${overlaps}\`);
    }, 300);
  `
  },
  {
    id: "nontext-contrast-auditor",
    name: "Non text contrast auditor",
    category: "color",
    description: "Check focus ring thickness and contrast on focusable controls.",
    long: "Focus each control, read outline or box shadow color and width, compare to parent background, and flag rings under 2 px or contrast under 3:1.",
    ai: false,
    code: `
    function parseColor(c){const ctx=document.createElement('canvas').getContext('2d');ctx.fillStyle=c;return ctx.fillStyle;}
    function rgbToArray(c){const m=c.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);return m?[+m[1],+m[2],+m[3]]:[0,0,0];}
    function relLum([r,g,b]){[r,g,b]=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*r+0.7152*g+0.0722*b;}
    function contrast(c1,c2){const L1=relLum(rgbToArray(parseColor(c1))),L2=relLum(rgbToArray(parseColor(c2)));const [a,b]=L1>L2?[L1,L2]:[L2,L1];return (a+0.05)/(b+0.05)}
    const ID='a11y-nontext-contrast'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    const els=[...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(e=>e.offsetParent);
    let low=0, thin=0;
    for(const el of els){
      const prev=document.activeElement; el.focus(); const cs=getComputedStyle(el);
      const ow=parseFloat(cs.outlineWidth)||0; const oc=cs.outlineColor; let bg=cs.backgroundColor, p=el;
      while((bg==='rgba(0, 0, 0, 0)'||bg==='transparent') && (p=p.parentElement)) bg=getComputedStyle(p).backgroundColor;
      const ratio=contrast(oc,bg);
      if(ow<2) thin++;
      if(ratio<3) low++;
      const r=el.getBoundingClientRect(); const b=document.createElement('div');
      b.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;width:\${r.width}px;height:\${r.height}px;border:2px solid \${ratio<3?'#e00':'#0a0'}\`;
      b.title=\`ring \${ow}px, contrast \${ratio.toFixed(2)}:1\`;
      wrap.appendChild(b);
      if(prev&&prev.focus) prev.focus();
    }
    document.body.appendChild(wrap);
    alert(\`Low contrast rings: \${low}  Thin rings: \${thin}\`);
  `
  },
  {
    id: "name-consistency-oracle",
    name: "Accessible name consistency",
    category: "analysis",
    description: "Compare computed name to nearby label text and score similarity.",
    long: "Computes a simple accessible name, finds closest visible label text, scores similarity, flags big mismatches.",
    ai: false,
    code: `
    function nameOf(el){
      const byId=id=>id&&document.getElementById(id)?.innerText.trim();
      if(el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
      const lb=el.getAttribute('aria-labelledby'); if(lb){ return lb.split(/\\s+/).map(byId).filter(Boolean).join(' ').trim(); }
      if(el.alt) return el.alt.trim();
      if(el.placeholder) return el.placeholder.trim();
      const own=(el.innerText||'').trim(); return own.slice(0,80);
    }
    function lev(a,b){const m=a.length,n=b.length,d=Array.from({length:m+1},(_,i)=>Array(n+1).fill(0)); for(let i=0;i<=m;i++) d[i][0]=i; for(let j=0;j<=n;j++) d[0][j]=j;
      for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){ const c=a[i-1]===b[j-1]?0:1; d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+c);} return d[m][n]; }
    const ID='a11y-name-oracle'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    const els=[...document.querySelectorAll('a[href],button,input,select,textarea,[role],[tabindex]:not([tabindex="-1"])')].filter(e=>e.offsetParent);
    let bad=0;
    for(const el of els){
      const nm=nameOf(el)||''; // visible label guess
      let vis=''; const lab = el.id && document.querySelector(\`label[for="\${el.id}"]\`); if(lab) vis=lab.innerText.trim();
      if(!vis){ const near=el.closest('label'); if(near) vis=near.innerText.trim(); }
      if(!vis){ const p=el.parentElement; if(p) vis=(p.querySelector('label')?.innerText||'').trim(); }
      const dist=lev(nm.toLowerCase(), vis.toLowerCase()); const max=Math.max(nm.length, vis.length)||1; const ratio=1 - (dist/max);
      const r=el.getBoundingClientRect(); const b=document.createElement('div');
      const good = ratio>=0.6 || (!vis && nm);
      b.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;border:2px solid \${good?'#0a0':'#e00'};width:\${r.width}px;height:\${r.height}px\`;
      b.title=\`name "\${nm}" vs label "\${vis}" score \${ratio.toFixed(2)}\`;
      wrap.appendChild(b);
      if(!good) bad++;
    }
    document.body.appendChild(wrap);
    alert(\`Low similarity items: \${bad}\`);
  `
  },
  {
    id: "role-constraint-solver",
    name: "Role constraint solver",
    category: "analysis",
    description: "Check basic ARIA ownership and required props. Propose small fixes.",
    long: "Validates a few common structures like listbox, tablist, menu. Suggests role or attribute patches to satisfy minimal rules.",
    ai: false,
    code: `
    const rules={
      listbox:{ owns:['option'] },
      tablist:{ owns:['tab'] },
      menu:{ owns:['menuitem','menuitemcheckbox','menuitemradio'] }
    };
    const findings=[];
    for(const role of Object.keys(rules)){
      const parents=[...document.querySelectorAll(\`[role="\${role}"]\`)];
      for(const el of parents){
        const owns=rules[role].owns;
        const has=owns.some(r=>el.querySelector('[role="'+r+'"]'));
        if(!has){
          const child=el.firstElementChild;
          findings.push({el, role, fix: child? \`Add role="\${owns[0]}" to first child\` : 'Add a child with the required role'});
        }
      }
    }
    let msg = findings.length? findings.map(f=>\`[\${f.role}] \${f.fix}\`).join('\\n') : 'No ownership gaps found';
    alert(msg);
  `
  },
  {
    id: "interaction-state-fuzzer",
    name: "Interaction state fuzzer",
    category: "analysis",
    description: "Explore key and click sequences on common widgets to find failures.",
    long: "Heuristically identifies dialogs, menus, and disclosure buttons, runs short input sequences, and reports items that do not close or toggle as expected.",
    ai: false,
    code: `
    const issues=[];
    // dialogs
    const dialogs=[...document.querySelectorAll('[role="dialog"],dialog')];
    dialogs.forEach(d=>{
      if(d.open===false && d.showModal) try{ d.showModal(); }catch{}
      const before = d.open||getComputedStyle(d).display!=='none';
      d.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      const after = d.open||getComputedStyle(d).display!=='none';
      if(before && after) issues.push('Dialog did not close on Escape');
      if(d.close) try{ d.close(); }catch{}
    });
    // menus
    const menus=[...document.querySelectorAll('[role="menu"],[role="menubar"]')];
    menus.forEach(m=>{
      const items=[...m.querySelectorAll('[role^="menuitem"]')];
      if(items.length){
        items[0].focus();
        items[0].dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
        items[0].dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      }
    });
    // disclosures
    const toggles=[...document.querySelectorAll('[aria-expanded]')];
    toggles.forEach(t=>{
      const before=t.getAttribute('aria-expanded');
      t.click();
      const after=t.getAttribute('aria-expanded');
      if(before===after) issues.push('Toggle did not change aria-expanded');
    });
    alert(issues.length? issues.join('\\n') : 'No issues found in quick pass');
  `
  },
  {
    id: "icon-only-detector",
    name: "Visual only icon detector",
    category: "analysis",
    description: "Find icon only controls with weak or missing names.",
    long: "Scans small square controls with only SVG or background image and no visible text. Flags missing or low quality accessible names.",
    ai: false,
    code: `
    const ID='a11y-icon-only'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    function nameOf(el){ return el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('aria-labelledby')||''; }
    const q='button,a,[role="button"]';
    const els=[...document.querySelectorAll(q)].filter(e=>e.offsetParent);
    let risk=0;
    els.forEach(el=>{
      const r=el.getBoundingClientRect();
      const hasText=(el.innerText||'').trim().length>0;
      const hasSvg=el.querySelector('svg');
      const hasBg=/url\\(/.test(getComputedStyle(el).backgroundImage||'');
      const small = r.width<=40 && r.height<=40;
      const nm=(nameOf(el)||'').trim();
      const bad = small && !hasText && (hasSvg||hasBg) && nm.length<3;
      if(bad){ risk++; const b=document.createElement('div'); b.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;width:\${r.width}px;height:\${r.height}px;border:3px solid #e00\`; b.title='Suspect icon only control'; wrap.appendChild(b); }
    });
    document.body.appendChild(wrap);
    alert(\`Icon only risk count: \${risk}\`);
  `
  },
  {
    id: "multilingual-bidi-audit",
    name: "Multilingual and bidi audit",
    category: "reading",
    description: "Check lang tags and direction vs actual script runs.",
    long: "Finds mixed script runs, flags elements where dir or lang is missing or conflicts with content script.",
    ai: false,
    code: `
    const rtl=/[\\u0590-\\u05FF\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF]/; // Hebrew, Arabic ranges
    const ID='a11y-bidi'; const old=document.getElementById(ID); if(old){ old.remove(); }
    const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    const nodes=[...document.querySelectorAll('p,span,div,li,th,td,h1,h2,h3,h4,h5,h6')].filter(e=>e.offsetParent && (e.innerText||'').trim());
    let issues=0;
    for(const el of nodes){
      const text=el.innerText.trim();
      const hasRTL=rtl.test(text);
      const dirAttr=(el.dir||document.documentElement.dir||'ltr').toLowerCase();
      const lang=el.closest('[lang]')?.getAttribute('lang') || document.documentElement.getAttribute('lang') || '';
      if(hasRTL && dirAttr!=='rtl'){ const r=el.getBoundingClientRect(); const b=document.createElement('div'); b.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;width:\${r.width}px;height:\${r.height}px;border:3px solid #e00\`; b.title='RTL text without dir=rtl'; wrap.appendChild(b); issues++; }
      if(!lang){ const r=el.getBoundingClientRect(); const b=document.createElement('div'); b.style=\`position:absolute;left:\${r.left+scrollX}px;top:\${r.top+scrollY}px;width:\${r.width}px;height:\${r.height}px;border:2px dashed #f80\`; b.title='Missing lang'; wrap.appendChild(b); issues++; }
    }
    document.body.appendChild(wrap);
    alert(\`Language or dir issues: \${issues}\`);
  `
  },
  {
    id: "first-accessible-paint",
    name: "First accessible paint",
    category: "analysis",
    description: "Estimate when the page becomes keyboard usable.",
    long: "From the moment you run it, watches for the first landmark and a focusable item that accepts focus, then reports elapsed time.",
    ai: false,
    code: `
    const t0=performance.now();
    function hasLandmark(){ return document.querySelector('main,[role="main"],nav,[role="navigation"],[role="region"],header,footer'); }
    function hasFocusable(){ return document.querySelector('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'); }
    if(hasLandmark() && hasFocusable()){ alert('Already usable. Elapsed '+((performance.now()-t0)|0)+'ms'); return; }
    const mo=new MutationObserver(()=>{
      if(hasLandmark() && hasFocusable()){
        mo.disconnect();
        // try to focus the first item to confirm
        const f=document.querySelector('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])'); try{ f.focus(); }catch{}
        alert('Usable after '+((performance.now()-t0)|0)+'ms');
      }
    });
    mo.observe(document.body,{subtree:true,childList:true});
  `
  },
  {
    id: "voice-command-readiness",
    name: "Voice command readiness",
    category: "analysis",
    description: "Check name uniqueness and brevity for voice control targeting.",
    long: "Builds a set of control names, finds duplicates and long names. Reports clusters that need clearer microcopy.",
    ai: false,
    code: `
    function nameOf(el){
      const byId=id=>id&&document.getElementById(id)?.innerText.trim();
      if(el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
      const lb=el.getAttribute('aria-labelledby'); if(lb){ return lb.split(/\\s+/).map(byId).filter(Boolean).join(' ').trim(); }
      const t=(el.innerText||'').trim(); return t || el.getAttribute('title') || '';
    }
    const ctrls=[...document.querySelectorAll('a[href],button,[role="button"],input,select,textarea')].filter(e=>e.offsetParent);
    const names=ctrls.map(el=>nameOf(el).toLowerCase().replace(/\\s+/g,' ').trim()).map(s=>s.slice(0,60));
    const map=new Map(); names.forEach((n,i)=>{ if(!n) return; const arr=map.get(n)||[]; arr.push(ctrls[i]); map.set(n,arr); });
    const dups=[...map.entries()].filter(([n,els])=>els.length>1 && n.length>0);
    const longNames=names.filter(n=>n && n.split(' ').length>6).length;
    alert(\`Duplicate names: \${dups.length}  Long names: \${longNames}\`);
  `
  },
  {
    id: "caption-quality-heuristics",
    name: "Caption quality heuristics",
    category: "media",
    description: "Analyze <track> cues for density, gaps, and lag.",
    long: "Parses caption tracks on page videos, computes words per minute, average gap, and overlap counts.",
    ai: false,
    code: `
    const vids=[...document.querySelectorAll('video')];
    if(!vids.length){ alert('No videos'); return; }
    let reports=[];
    vids.forEach(v=>{
      const tracks=[...v.textTracks||[]].filter(t=>/captions|subtitles/i.test(t.kind||''));
      tracks.forEach(t=>{
        const cues=[...t.cues||[]];
        let words=0, gaps=0, overlap=0, totalDur=0;
        for(let i=0;i<cues.length;i++){
          const c=cues[i]; const next=cues[i+1];
          words += (c.text||'').trim().split(/\\s+/).filter(Boolean).length;
          totalDur += (c.endTime-c.startTime);
          if(next){ const gap=next.startTime - c.endTime; if(gap>0) gaps+=gap; if(gap<0) overlap++; }
        }
        const dur = v.duration && isFinite(v.duration) ? v.duration : totalDur;
        const wpm = dur ? (words/dur)*60 : 0;
        reports.push({track:t.label||'captions', wpm: wpm.toFixed(0), gaps: gaps.toFixed(1), overlap});
      });
    });
    alert(reports.length? reports.map(r=>\`\${r.track}: \${r.wpm} wpm, gaps \${r.gaps}s, overlaps \${r.overlap}\`).join('\\n') : 'No caption tracks');
  `
  },
  {
    id: "table-structure-verifier",
    name: "Table structure verifier",
    category: "analysis",
    description: "Validate header associations and scope in data tables.",
    long: "Builds header sets per data cell using scope and headers attributes, flags cells with missing or extra associations.",
    ai: false,
    code: `
    const tables=[...document.querySelectorAll('table')];
    if(!tables.length){ alert('No tables'); return; }
    let issues=0;
    function headersForCell(td, table){
      const ths=[...table.querySelectorAll('th')];
      const viaHeaders=(td.getAttribute('headers')||'').split(/\\s+/).filter(Boolean).map(id=>document.getElementById(id)).filter(Boolean);
      if(viaHeaders.length) return new Set(viaHeaders);
      // scope based
      const set=new Set();
      const row=td.parentElement;
      const colIndex=[...row.children].indexOf(td);
      for(const th of ths){
        const scope=(th.getAttribute('scope')||'').toLowerCase();
        if(scope==='col'){ const r=[...th.parentElement.children].indexOf(th); if(r===colIndex) set.add(th); }
        else if(scope==='row'){ if(th.parentElement===row) set.add(th); }
      }
      return set;
    }
    tables.forEach(table=>{
      const tds=[...table.querySelectorAll('td')];
      tds.forEach(td=>{
        const set=headersForCell(td, table);
        if(!set.size){ td.style.outline='3px solid #e00'; issues++; }
      });
    });
    alert(\`Cells without clear headers: \${issues}\`);
  `
  }



];
