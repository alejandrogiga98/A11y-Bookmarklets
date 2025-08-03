const catalog = [
  {
    "id": "focus-outline-boost",
    "name": "Toggle strong focus outline",
    "category": "core",
    "description": "Thick outline on :focus and visible markers for focusable elements.",
    "long": "Click to add a bolder outline for keyboard focus and dashed outlines on focusable controls. Click again to remove.",
    "ai": false,
    "code": "const ID='a11y-focus-bk';\n      const old=document.getElementById(ID);\n      if(old){ old.remove(); alert('Focus outline off'); return; }\n      const s=document.createElement('style');\n      s.id=ID;\n      s.textContent=`:focus{outline:3px solid #f00 !important; outline-offset:2px !important}\n      a,button,input,select,textarea,[tabindex]{outline:2px dashed #00f !important; outline-offset:2px !important}`;\n      document.head.appendChild(s);\n      alert('Focus outline on');"
  },
  {
    "id": "tab-order-map",
    "name": "Tab order map",
    "category": "core",
    "description": "Numbered overlays for the tab sequence and click to test focus.",
    "long": "Draws numbered badges over elements in the tab order. Click a badge to move focus there. Click again to clear.",
    "ai": false,
    "code": "const ID='a11y-tabmap';\n      const old=document.getElementById(ID);\n      if(old){ old.remove(); return; }\n      const wrap=document.createElement('div');\n      wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:2147483647';\n      const focusables=Array.from(document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex=\"-1\"])'))\n        .filter(el=>!el.hasAttribute('disabled') && el.offsetParent!==null);\n      let n=1;\n      for(const el of focusables){\n        const r=el.getBoundingClientRect();\n        const b=document.createElement('button');\n        b.textContent=n++;\n        b.style=`position:absolute;left:${Math.max(0, r.left+window.scrollX)}px;top:${Math.max(0, r.top+window.scrollY)}px;\n                 transform:translate(-6px,-6px);min-width:24px;height:24px;border-radius:14px;border:1px solid #333;\n                 background:#ffe08a;font:12px/1 monospace;pointer-events:auto;cursor:pointer`;\n        b.title='Focus this element';\n        b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();el.focus({preventScroll:false});}, {capture:true});\n        wrap.appendChild(b);\n      }\n      document.body.appendChild(wrap);"
  },
  {
    "id": "headings-map",
    "name": "Headings map",
    "category": "core",
    "description": "Fixed panel listing H1 to H6 in order, with quick jump.",
    "ai": false,
    "code": "const ID='a11y-headings';\n      let p=document.getElementById(ID);\n      if(p){ p.remove(); return; }\n      const hs=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];\n      p=document.createElement('div');\n      p.id=ID;\n      p.setAttribute('style','position:fixed;z-index:2147483647;top:8px;right:8px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ccc;padding:8px;border-radius:8px;font:12px monospace;');\n      const ul=document.createElement('ul'); ul.style='list-style:none;padding:0;margin:0;';\n      hs.forEach((h,i)=>{\n        const li=document.createElement('li');\n        const a=document.createElement('a'); a.href='#'; a.textContent=h.tagName+' '+h.textContent.trim().slice(0,80);\n        a.style='display:block;padding:4px 6px;border-radius:4px;text-decoration:none;color:#00c;';\n        a.addEventListener('click',e=>{e.preventDefault(); h.scrollIntoView({block:\"center\"}); h.focus({preventScroll:true});});\n        li.appendChild(a); ul.appendChild(li);\n      });\n      if(!hs.length){ ul.innerHTML='<li>No headings</li>'; }\n      const close=document.createElement('button'); close.textContent='×'; close.title='Close';\n      close.style='position:absolute;top:0;right:0;border:0;background:#eee;border-radius:0 8px 0 8px;padding:4px 6px;cursor:pointer';\n      close.onclick=()=>p.remove();\n      p.append(close, ul);\n      document.body.appendChild(p);"
  },
  {
    "id": "alt-missing",
    "name": "Mark images missing alt",
    "category": "core",
    "description": "Outline images with empty or missing alt, with count alert.",
    "ai": false,
    "code": "const imgs=[...document.images];\n      const bad=imgs.filter(i=>!i.hasAttribute('alt') || i.getAttribute('alt')==='');\n      bad.forEach(i=>{ i.style.outline='3px solid red'; i.title='Missing alt'; });\n      alert(bad.length+' images missing alt');"
  },
  {
    "id": "pause-motion",
    "name": "Pause motion",
    "category": "core",
    "description": "Disable CSS animations and transitions, set auto scroll behavior.",
    "ai": false,
    "code": "const ID='a11y-reduced-motion';\n      let s=document.getElementById(ID);\n      if(s){ s.remove(); return; }\n      s=document.createElement('style'); s.id=ID;\n      s.textContent='*{animation:none !important;transition:none !important;scroll-behavior:auto !important}';\n      document.head.appendChild(s);"
  },
  {
    "id": "landmarks",
    "name": "Landmarks highlighter",
    "category": "core",
    "description": "Outline main, nav, banner, contentinfo, complementary, form, search, region.",
    "ai": false,
    "code": "const ID='a11y-landmarks';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const roles=['main','navigation','banner','contentinfo','complementary','form','search','region'];\n      const elms=[...document.querySelectorAll('main,nav,header[role=banner],footer[role=contentinfo],aside,[role]')].filter(e=>{\n        const r=e.getAttribute('role'); return roles.includes(r)||['MAIN','NAV','ASIDE'].includes(e.tagName);\n      });\n      const style=document.createElement('style'); style.id=ID;\n      style.textContent=roles.map(r=>`[role=\"${r}\"]{outline:3px solid #0a0 !important; outline-offset:2px}`).join('')\n        + ' main{outline:3px solid #0aa !important;outline-offset:2px} nav{outline:3px solid #a0a !important;outline-offset:2px} aside{outline:3px solid #aa0 !important;outline-offset:2px}';\n      document.head.appendChild(style);\n      alert(elms.length+' landmark elements outlined');"
  },
  {
    "id": "lang-check",
    "name": "Language check",
    "category": "core",
    "description": "Report the page lang and elements with lang mismatches.",
    "ai": false,
    "code": "const pageLang=document.documentElement.getAttribute('lang')||'(none)';\n      const diffs=[...document.querySelectorAll('[lang]')].filter(el=>el.closest('[lang]')===el).map(el=>`${el.tagName.toLowerCase()} lang=\"${el.getAttribute('lang')}\"`);\n      alert('Page lang: '+pageLang+'\\nTop-level elements with lang: \\n'+(diffs[0]?diffs.join('\\n'):'(none)'));"
  },
  {
    "id": "contrast-spot",
    "name": "Contrast spot-check",
    "category": "core",
    "description": "Click any text to compute contrast ratio and pass/fail for AA.",
    "long": "After running, click a text element to get color, background, ratio, and pass/fail at AA and AAA for normal and large text. Press Esc to end.",
    "ai": false,
    "code": "function parseColor(c){const ctx=document.createElement('canvas').getContext('2d');ctx.fillStyle=c;return ctx.fillStyle;}\n      function rgbToArray(c){const m=c.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);return m?[+m[1],+m[2],+m[3]]:[0,0,0];}\n      function relLum([r,g,b]){[r,g,b]=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return 0.2126*r+0.7152*g+0.0722*b;}\n      function contrast(c1,c2){const L1=relLum(rgbToArray(parseColor(c1))),L2=relLum(rgbToArray(parseColor(c2)));const [a,b]=L1>L2?[L1,L2]:[L2,L1];return (a+0.05)/(b+0.05)}\n      const onClick=e=>{\n        e.preventDefault(); e.stopPropagation();\n        const el=e.target;\n        const cs=getComputedStyle(el);\n        const fg=cs.color;\n        let bg=cs.backgroundColor;\n        let p=el;\n        while(bg==='rgba(0, 0, 0, 0)'||bg==='transparent'){ p=p.parentElement; if(!p) {bg='rgb(255,255,255)';break;} bg=getComputedStyle(p).backgroundColor; }\n        const r=contrast(fg,bg).toFixed(2);\n        const size=parseFloat(cs.fontSize); const bold=parseInt(cs.fontWeight,10)>=700;\n        const large = (size>=18) || (size>=14 && bold);\n        const passAA = large ? r>=3 : r>=4.5;\n        const passAAA = large ? r>=4.5 : r>=7;\n        alert(`Text: ${el.textContent.trim().slice(0,60)||el.tagName}\\ncolor ${fg} on ${bg}\\nratio ${r}:1\\nAA ${passAA?'pass':'fail'}  AAA ${passAAA?'pass':'fail'}`);\n        end();\n      };\n      function end(){ document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey, true); }\n      function onKey(e){ if(e.key==='Escape'){ end(); alert('Contrast check ended'); } }\n      document.addEventListener('click', onClick, true);\n      document.addEventListener('keydown', onKey, true);\n      alert('Click a text element to check contrast. Press Esc to stop.');"
  },
  {
    "id": "tooltips-view",
    "name": "Show title tooltips",
    "category": "core",
    "description": "Reveal elements that rely on title attributes for help text.",
    "ai": false,
    "code": "const els=[...document.querySelectorAll('[title]')];\n      els.forEach(el=>{ el.style.outline='2px dotted #c0c'; el.insertAdjacentHTML('afterend', `<small style=\"background:#ffe;border:1px solid #cc9;border-radius:4px;padding:2px 4px;margin-left:4px\">${el.getAttribute('title')}</small>`); });\n      alert(els.length+' elements with title attribute highlighted');"
  },
  {
    "id": "roles-viewer",
    "name": "ARIA roles viewer",
    "category": "core",
    "description": "Badge elements that have a role with their role name and label.",
    "ai": false,
    "code": "const ID='a11y-roles-view';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const wrap=document.createElement('div'); wrap.id=ID; wrap.style='position:fixed;inset:0;pointer-events:none;z-index:999999';\n      const els=[...document.querySelectorAll('[role]')];\n      els.forEach(el=>{\n        const r=el.getAttribute('role'); const l=el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')||'';\n        const b=document.createElement('div'); const rect=el.getBoundingClientRect();\n        b.textContent=r+(l?` (${l})`:'');\n        b.style=`position:absolute;left:${rect.left+scrollX}px;top:${rect.top+scrollY}px;background:#eef;border:1px solid #99f;border-radius:4px;padding:2px 4px;font:11px monospace;pointer-events:none`;\n        wrap.appendChild(b);\n      });\n      document.body.appendChild(wrap);"
  },
  {
    "id": "keyboard-trap-scout",
    "name": "Keyboard trap scout",
    "category": "core",
    "description": "Warn when focus moves back to the same element for 3 consecutive Tabs.",
    "ai": false,
    "code": "let last=null, count=0;\n      function onKey(e){\n        if(e.key==='Tab'){\n          const now=document.activeElement;\n          if(last===now){ count++; if(count>=3){ alert('Possible keyboard trap near '+(now.tagName||'element')); count=0; } }\n          else { count=1; last=now; }\n        }\n      }\n      alert('Press Tab a few times. This will warn if focus cycles on the same element 3 times.');\n      document.addEventListener('keydown', onKey, true);\n      setTimeout(()=>document.removeEventListener('keydown', onKey, true), 20000);"
  },
  {
    "id": "prefers-reduced",
    "name": "Toggle prefers-reduced-motion",
    "category": "core",
    "description": "Inject CSS to simulate reduced motion user preference.",
    "ai": false,
    "code": "const ID='a11y-prm';\n      const old=document.getElementById(ID); if(old){ old.remove(); return; }\n      const s=document.createElement('style'); s.id=ID;\n      s.textContent='@media (prefers-reduced-motion: reduce){*{animation:none !important;transition:none !important}}';\n      document.head.appendChild(s);"
  },
  {
    "id": "cvd-filters",
    "name": "Color vision filters",
    "category": "core",
    "description": "Apply protanopia, deuteranopia, tritanopia simulation filters.",
    "long": "Runs an SVG filter over the page. Click repeatedly to cycle modes. Modes: none, protanopia, deuteranopia, tritanopia.",
    "ai": false,
    "code": "const ID='a11y-cvd';\n      const old=document.getElementById(ID);\n      if(old){\n        const mode=old.getAttribute('data-mode')||'none';\n        const order=['none','protanopia','deuteranopia','tritanopia'];\n        const next=order[(order.indexOf(mode)+1)%order.length];\n        old.setAttribute('data-mode', next);\n        document.documentElement.style.filter = next==='none' ? '' : `url(#${next})`;\n        alert('Mode: '+next);\n        return;\n      }\n      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');\n      svg.setAttribute('id', ID);\n      svg.setAttribute('style','position:fixed;width:0;height:0;');\n      svg.innerHTML=`\n        <filter id=\"protanopia\">\n          <feColorMatrix type=\"matrix\" values=\"0.567 0.433 0    0 0 0.558 0.442 0    0 0 0    0.242 0.758 0 0 0 0 1 0\"/>\n        </filter>\n        <filter id=\"deuteranopia\">\n          <feColorMatrix type=\"matrix\" values=\"0.625 0.375 0    0 0 0.7   0.3   0    0 0 0    0.3   0.7   0 0 0 0 1 0\"/>\n        </filter>\n        <filter id=\"tritanopia\">\n          <feColorMatrix type=\"matrix\" values=\"0.95  0.05  0    0 0 0    0.433 0.567 0 0 0.475 0.525 0 0 0 0 1 0\"/>\n        </filter>`;\n      document.body.appendChild(svg);\n      svg.setAttribute('data-mode','protanopia');\n      document.documentElement.style.filter='url(#protanopia)';\n      alert('Mode: protanopia');"
  },
  {
    "id": "ai-alt-suggest",
    "name": "AI alt text suggester",
    "category": "ai",
    "description": "Panel for images missing alt with a Suggest button that calls your endpoint.",
    "long": "Opens a panel that lists images lacking alt. Paste model endpoint and key. Click Suggest to request alt text. The code calls fetch with {imgUrl, surroundingText} and expects {alt}. You can wire it to any service.",
    "ai": true,
    "code": "const ID='a11y-ai-alt';\n      if(document.getElementById(ID)){ document.getElementById(ID).remove(); return; }\n      const panel=document.createElement('div'); panel.id=ID;\n      panel.style='position:fixed;z-index:2147483647;right:8px;top:8px;width:360px;max-height:80vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px/1.4 ui-monospace,monospace;padding:10px';\n      panel.innerHTML=`<div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:8px\">\n        <strong>AI alt text suggester</strong>\n        <button id=\"close\" style=\"border:0;background:#eee;border-radius:6px;padding:4px 8px;cursor:pointer\">Close</button>\n      </div>\n      <div style=\"display:grid;gap:6px\">\n        <input id=\"ep\" placeholder=\"Model endpoint URL\" value=\"${sessionStorage.getItem('a11y_ai_ep')||''}\">\n        <input id=\"key\" placeholder=\"API key\" value=\"${sessionStorage.getItem('a11y_ai_key')||''}\">\n      </div>\n      <hr>\n      <div id=\"list\" style=\"display:grid;gap:8px\"></div>`;\n      panel.querySelector('#close').onclick=()=>panel.remove();\n      document.body.appendChild(panel);\n      const epI=panel.querySelector('#ep'), keyI=panel.querySelector('#key');\n      epI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_ep', epI.value));\n      keyI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_key', keyI.value));\n      const imgs=[...document.images].filter(i=>!i.getAttribute('alt'));\n      const list=panel.querySelector('#list');\n      if(!imgs.length){ list.textContent='No images without alt'; }\n      imgs.forEach((img,idx)=>{\n        const row=document.createElement('div'); row.style='display:grid;grid-template-columns:56px 1fr auto;gap:6px;align-items:center';\n        const t=document.createElement('img'); t.src=img.currentSrc||img.src; t.width=56; t.height=38; t.style='object-fit:cover;border:1px solid #ddd;border-radius:6px';\n        const info=document.createElement('div'); info.innerHTML=`<div style=\"white-space:nowrap;overflow:hidden;text-overflow:ellipsis\">${t.src}</div><small>Click Suggest to fetch alt</small>`;\n        const btn=document.createElement('button'); btn.textContent='Suggest'; btn.style='padding:6px 10px;border-radius:8px;border:1px solid #ccc;background:#fafafa;cursor:pointer';\n        btn.onclick=async()=>{\n          try{\n            const around=img.closest('figure')?.innerText || img.parentElement?.innerText || document.title || '';\n            const payload={imgUrl:t.src, surroundingText:around.slice(0,400)};\n            if(!epI.value){ alert('Set endpoint URL'); return; }\n            const res=await fetch(epI.value, { method:'POST', headers:{'Content-Type':'application/json','Authorization':keyI.value?('Bearer '+keyI.value):undefined}, body:JSON.stringify(payload) });\n            if(!res.ok){ throw new Error('HTTP '+res.status); }\n            const data=await res.json();\n            const alt=data.alt || data.caption || data.text || '(no alt returned)';\n            img.setAttribute('alt', alt);\n            info.innerHTML=`<div>${alt}</div><small>Applied to image</small>`;\n          }catch(err){ alert('Error: '+err.message); }\n        };\n        row.append(t, info, btn);\n        list.appendChild(row);\n      });"
  },
  {
    "id": "ai-summary",
    "name": "AI page summary",
    "category": "ai",
    "description": "Create a short page summary aimed at screen reader users.",
    "long": "Collects main text and sends to your endpoint. Expects {summary}. Saves endpoint and key in sessionStorage. Injects the summary at top of body in a live region.",
    "ai": true,
    "code": "const ID='a11y-ai-summary';\n      const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      const main=document.querySelector('main')||document.body;\n      const text=main.innerText.replace(/\\s+/g,' ').trim().slice(0, 12000);\n      fetch(ep, {method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:text, task:'a11y_page_summary'}) })\n        .then(r=>r.json()).then(data=>{\n          const s=data.summary || data.output || '(no summary)';\n          let live=document.getElementById(ID);\n          if(!live){ live=document.createElement('div'); live.id=ID; live.setAttribute('role','region'); live.setAttribute('aria-live','polite'); live.style='border:2px solid #4b8;border-radius:8px;padding:8px;margin:8px;background:#efe'; document.body.prepend(live); }\n          live.innerHTML='<strong>Page summary:</strong> '+s;\n        })\n        .catch(e=>alert('Error: '+e.message));"
  },
  {
    "id": "ai-aria-advisor",
    "name": "AI ARIA advisor",
    "category": "ai",
    "description": "Send a compact DOM snapshot and get role hints and fixes.",
    "ai": true,
    "code": "const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      function domWalk(root, depth=0){\n        if(depth>3) return '';\n        let out='';\n        for(const el of root.children){\n          const role=el.getAttribute('role'); const name=el.getAttribute('aria-label')||'';\n          out += `<${el.tagName.toLowerCase()}${role?` role=\"${role}\"`:''}${name?` name=\"${name}\"`:''}>`;\n          out += domWalk(el, depth+1);\n        }\n        return out;\n      }\n      const snapshot=domWalk(document.body);\n      fetch(ep, {method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:snapshot, task:'a11y_aria_hints'}) })\n        .then(r=>r.json()).then(data=>{\n          const tips=data.tips || data.output || JSON.stringify(data);\n          const pre=document.createElement('pre'); pre.style='position:fixed;left:8px;bottom:8px;right:8px;max-height:50vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;padding:10px;z-index:2147483647;font:12px monospace';\n          pre.textContent=tips;\n          document.body.appendChild(pre);\n        })\n        .catch(e=>alert('Error: '+e.message));"
  },
  {
    "id": "ai-plain-language",
    "name": "AI plain language mode",
    "category": "ai",
    "description": "Rewrite selected text blocks to plain language with toggle back.",
    "long": "Double click any paragraph to rewrite. The original HTML is stored and can be restored with another double click. Works on P and LI elements.",
    "ai": true,
    "code": "const ep=prompt('Model endpoint URL', sessionStorage.getItem('a11y_ai_ep')||'');\n      if(!ep) { alert('No endpoint'); return; }\n      sessionStorage.setItem('a11y_ai_ep', ep);\n      const key=prompt('API key (optional)', sessionStorage.getItem('a11y_ai_key')||'');\n      if(key) sessionStorage.setItem('a11y_ai_key', key);\n      const ATTR='data-a11y-plain-orig';\n      function onDbl(e){\n        const el=e.target.closest('p,li');\n        if(!el) return;\n        if(el.hasAttribute(ATTR)){ el.innerHTML=el.getAttribute(ATTR); el.removeAttribute(ATTR); return; }\n        const text=el.innerText.slice(0,800);\n        fetch(ep,{method:'POST', headers:{'Content-Type':'application/json','Authorization':key?('Bearer '+key):undefined}, body:JSON.stringify({input:text, task:'plain_language'}) })\n          .then(r=>r.json()).then(data=>{ const out=data.text||data.output||data.summary||'(no change)'; el.setAttribute(ATTR, el.innerHTML); el.innerText=out; })\n          .catch(e=>alert('Error: '+e.message));\n      }\n      document.addEventListener('dblclick', onDbl, true);\n      alert('Double click a paragraph or list item to rewrite. Double click again to revert.');\n      setTimeout(()=>document.removeEventListener('dblclick', onDbl, true), 600000);"
  },
  {
    "id": "form-autolabel",
    "name": "Form autolabel helper",
    "category": "ai",
    "description": "Collect unlabeled inputs and propose labels. AI optional.",
    "long": "Lists inputs without labels and allows quick aria-label assignment. If you provide an endpoint, it will request label suggestions based on nearby text.",
    "ai": true,
    "code": "const ID='a11y-form-autolabel';\n      if(document.getElementById(ID)){ document.getElementById(ID).remove(); return; }\n      const panel=document.createElement('div'); panel.id=ID;\n      panel.style='position:fixed;z-index:2147483647;left:8px;bottom:8px;width:380px;max-height:70vh;overflow:auto;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,.15);font:12px/1.4 ui-monospace,monospace;padding:10px';\n      panel.innerHTML=`<div style=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:8px\">\n        <strong>Form autolabel</strong>\n        <button id=\"close\" style=\"border:0;background:#eee;border-radius:6px;padding:4px 8px;cursor:pointer\">Close</button>\n      </div>\n      <div style=\"display:grid;gap:6px\">\n        <input id=\"ep\" placeholder=\"Model endpoint URL\" value=\"${sessionStorage.getItem('a11y_ai_ep')||''}\">\n        <input id=\"key\" placeholder=\"API key\" value=\"${sessionStorage.getItem('a11y_ai_key')||''}\">\n      </div>\n      <hr>\n      <div id=\"list\" style=\"display:grid;gap:8px\"></div>`;\n      panel.querySelector('#close').onclick=()=>panel.remove();\n      document.body.appendChild(panel);\n      const epI=panel.querySelector('#ep'), keyI=panel.querySelector('#key');\n      epI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_ep', epI.value));\n      keyI.addEventListener('change', ()=>sessionStorage.setItem('a11y_ai_key', keyI.value));\n      function surrounding(el){ return (el.closest('label')?.innerText || el.parentElement?.innerText || '').trim().slice(0,200); }\n      const inputs=[...document.querySelectorAll('input:not([type=hidden]),textarea,select')].filter(i=>{\n        if(i.id && document.querySelector(`label[for=\"${i.id}\"]`)) return false;\n        if(i.closest('label')) return false;\n        return true;\n      });\n      const list=panel.querySelector('#list');\n      if(!inputs.length){ list.textContent='No unlabeled inputs'; }\n      inputs.forEach((el,idx)=>{\n        const row=document.createElement('div'); row.style='display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center';\n        const info=document.createElement('div');\n        const near=surrounding(el);\n        info.innerHTML=`<div><strong>${el.tagName.toLowerCase()}</strong> name=\"${el.name||''}\" placeholder=\"${el.placeholder||''}\"</div>\n                        <small>Nearby: ${near||'(none)'}</small>\n                        <div><input data-i=\"${idx}\" placeholder=\"aria-label text\" style=\"width:100%\"></div>`;\n        const btn=document.createElement('button'); btn.textContent='Suggest'; btn.style='padding:6px 10px;border-radius:8px;border:1px solid #ccc;background:#fafafa;cursor:pointer';\n        btn.onclick=async()=>{\n          if(!epI.value){ alert('Set endpoint URL'); return; }\n          try{\n            const payload={input: near || el.placeholder || el.name || '', task:'form_label'};\n            const res=await fetch(epI.value,{method:'POST', headers:{'Content-Type':'application/json','Authorization':keyI.value?('Bearer '+keyI.value):undefined}, body:JSON.stringify(payload)});\n            const data=await res.json();\n            const label=data.text||data.label||data.output||'';\n            const box=info.querySelector(`input[data-i=\"${idx}\"]`); box.value=label;\n            el.setAttribute('aria-label', label);\n          }catch(e){ alert('Error: '+e.message); }\n        };\n        row.append(info, btn);\n        list.appendChild(row);\n      });"
  }
];