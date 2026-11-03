import { chromium } from 'playwright';
const OUT='assets/shots';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
const p = await ctx.newPage();
await p.goto('file://'+process.cwd()+'/../site/index.html',{waitUntil:'load'});
await p.addStyleTag({content:'html{scroll-behavior:auto!important}.js .reveal{opacity:1!important;transform:none!important;transition:none!important}*{animation:none!important}'});
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(600);
for (let i=0;i<5;i++){ const el=p.locator('.cred-list li').nth(i); await el.scrollIntoViewIfNeeded(); await el.screenshot({path:`${OUT}/cred_${i}.png`}); console.log('cred',i,JSON.stringify(await el.boundingBox()));}
const bt=p.locator('.hero .btn-primary'); await bt.scrollIntoViewIfNeeded(); await bt.screenshot({path:`${OUT}/btn.png`});
const ph=p.locator('.hero .btn-ghost'); await ph.screenshot({path:`${OUT}/btn_call.png`});
const note=p.locator('.hero-note'); await note.screenshot({path:`${OUT}/note.png`});
const cheads=p.locator('.cred-head'); await cheads.screenshot({path:`${OUT}/cred_head.png`});
await b.close();
