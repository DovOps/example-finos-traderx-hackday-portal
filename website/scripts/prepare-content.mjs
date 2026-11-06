import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import siteLocation from '../site-location.cjs';
const {baseUrl} = siteLocation();
import {execFileSync} from 'node:child_process';
const site=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=path.dirname(site);
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const config=read('portal/config.json');
config.registrationRequestUrl=config.repository+'/issues/new?'+new URLSearchParams({title:'Project registration: YOUR-PROJECT',body:'## Project registration request (exploring)\n\nProject ID and title:\nSummary / question:\nTeam repository URL:\nPushed 40-character commit SHA:\nManifest path (if prepared): hackday/project.yaml\nAny upstream starting state and full upstream pin:\nPinned starting-state guide / spec:\nServices, tools and operator support needed:\nExperiment state IDs:\nGuide / README:\nEvidence (optional while exploring):\nLimitations and next steps:\nMaintenance contact:\nConsented public profiles (optional):\nLicense and attribution:\n\nI understand this is an intake request, not an automatic portal listing.'}).toString();
const registry=read('registry/projects.json');
// Fail closed until immutable refs, consent and evidence checks are implemented.
if(registry.schemaVersion!==1 || !Array.isArray(registry.projects) || registry.projects.length) throw Error('Registration ingestion is not enabled; expected an empty version-1 registry');
const pin=execFileSync('git',['-C',path.join(root,'upstream/traderX'),'rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(pin!==config.upstreamPin) throw Error('Pinned upstream and portal configuration disagree');
config.upstreamCommitDate=execFileSync('git',['-C',path.join(root,'upstream/traderX'),'show','-s','--format=%cI',pin],{encoding:'utf8'}).trim();
config.upstreamCommitDateLabel=new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'America/New_York'}).format(new Date(config.upstreamCommitDate));
const upstream=read('upstream/traderX/catalog/state-catalog.json').states;
const lab=read('catalog/state-catalog.json').states;
for(const dir of ['content','static']) {fs.rmSync(path.join(site,dir),{recursive:true,force:true});fs.mkdirSync(path.join(site,dir),{recursive:true});}
const write=(p,s)=>{const dest=path.join(site,p);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,s)};
const route=p=>p==='specs/index.md'?'/specs':'/'+p.replace(/\.md$/,'');
function doc(rel,text,title){
 text=text.replaceAll('pathname:///', `pathname://${baseUrl}`)
   .replace(/(\bclick\s+\S+\s+")\/(?!\/)/g, `$1${baseUrl}`);
 text=text.replace(/^---\n[\s\S]*?\n---\n/,'');
 const heading=title || text.match(/^# (.+)$/m)?.[1] || path.basename(rel,'.md');
 write('content/'+rel,`---\ntitle: ${JSON.stringify(heading)}\nslug: ${JSON.stringify(route(rel))}\n---\n\n`+text);
}
function copyTree(dir){
 for(const item of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){
  const rel=dir+'/'+item.name;
  if(item.isDirectory()) copyTree(rel);
  else if(/\.(md|json)$/.test(rel)){
   const text=fs.readFileSync(path.join(root,rel),'utf8');write('static/source/'+rel,text);
   if(rel.endsWith('.md')){
    const linked=text.replace(/\]\(([^)]+)\)/g,(match,target)=>{
     if(/^(https?:|#)/.test(target))return match;
     const [file,anchor]=target.split('#');
     const dest=path.posix.normalize(path.posix.join(path.posix.dirname(rel),file));
     return ']('+ (dest.endsWith('.md')?route(dest):'pathname:///source/'+dest)+(anchor?'#'+anchor:'')+')';
    });
    doc(rel,linked+`\n\n---\n[Markdown source](pathname:///source/${rel})\n`);
   }
  }
 }
}
for(const dir of ['docs','specs','schemas','catalog','registry'])copyTree(dir);
const source=`https://github.com/finos/traderX/blob/${pin}`;
const all=[...upstream.map(s=>({...s,origin:'upstream'})),...lab.map(s=>({...s,origin:'lab'}))];
const ids=new Set(all.map(s=>s.id));
if(ids.size!==all.length) throw Error('State IDs must be globally unique');
for(const state of all){
 if(!/^[a-z0-9-]+$/.test(state.id)) throw Error('Invalid state ID');
 for(const parent of state.previous||[]) if(!ids.has(parent)) throw Error(`Missing parent ${parent}`);
}

for(const s of all){
 const isLab=s.origin==='lab';
 const guide=isLab?route(s.guide):`${source}/docs/learning/state-${s.id}.md`;
 const spec=isLab?route(s.featurePack+'/spec.md'):`${source}/${s.featurePack}/spec.md`;
 const parents=(s.previous||[]).map(p=>`[${p}](/states/${p})`).join(', ')||'Root state';
 doc(`states/${s.id}.md`,`# ${s.title}\n\n:::${isLab?'info':'note'} ${isLab?'LAB-OWNED EXPERIMENT':'UPSTREAM REFERENCE'}\n${isLab?'Owned by this hackday overlay. Consult the runtime evidence below; a local pass is not independent reproduction.':'Canonical FINOS TraderX state, referenced at the pinned revision. Upstream implementation status is not evidence of a successful local lab run.'}\n:::\n\n| Provenance | Value |\n| --- | --- |\n| State | ${s.id} |\n| Owner | ${isLab?s.owner:'FINOS TraderX'} |\n| Parent states | ${parents} |\n| Upstream revision | [${pin.slice(0,12)}](https://github.com/finos/traderX/tree/${pin}) |\n| Recommended starting point | ${s.isConvergence?`${s.convergenceLevel} convergence — combines exploration tracks`:"Specific exploration or Lab state; choose when needed"} |\n| Source maturity | ${s.maturity||s.status} |\n| Verified in this lab | ${s.runtimeEvidence?`[Local rehearsal passed](${route(s.runtimeEvidence.report)}) — ${s.runtimeEvidence.scope}`:"No runtime pass recorded"} |\n\n## Learn and inspect\n\n- [${isLab?'Lab learning guide':'Learning guide at pinned upstream revision'}](${guide})\n- [${isLab?'Lab specification':'Specification at pinned upstream revision'}](${spec})\n${isLab?`- [System contract](${route(s.featurePack+'/system/contract.md')})\n- [Implementation plan](${route(s.featurePack+'/plan.md')})\n- [Tasks](${route(s.featurePack+'/tasks.md')})`:`- [Official learning guide (latest)](https://traderx.finos.org/docs/learning/state-${s.id})\n- [Upstream generated branch (moving output)](https://github.com/finos/traderX/tree/${s.publish.branch})`}\n\n## Change from parent\n\n${isLab?(s.overlayState.kind==='anchor'?'Mirrors upstream 004. No functional changes.':'Adds a reproducibility worksheet after layout generation. Trading behavior is inherited unchanged.'):'Inspect the pinned specification for the architectural delta. This reference does not add the state to the hackday runtime support matrix.'}\n\n${isLab?'Generated branch is planned and unpublished.':''}\n\n[Explore all states](/states) · [Evidence gates](/docs/planning/gates) · [Participant projects](/projects)\n`);
}
doc('specs/index.md','# Lab specifications\n\nSpecs belong to the overlay; upstream contracts are linked at the pinned revision.\n\n'+lab.map(s=>`- [${s.title}](${route(s.featurePack+'/spec.md')}) — [state and provenance](/states/${s.id})`).join('\n')+'\n- [Portal and registry foundation](/specs/lab-foundation/spec)\n- [Reusable portal requirements and playbook](/specs/portal-template/spec)\n\n[Upstream and Lab state explorer](/states)\n');
doc('challenges.md',`# Hackday challenges\n\n## Add an evidence card\n\n**Beginner · documentation transform · starting state: upstream 004**\n\nExplain the baseline, add a reproducibility worksheet after generation, and demonstrate that applying the transform twice produces identical output. Generation, repeat-transform comparison and inherited runtime smoke checks passed in one local rehearsal. Independent newcomer reproduction remains outstanding. [Read the evidence and limitations](/docs/planning/runtime-evidence-2026-11-05).\n\n### Expected evidence\n\n- Exact upstream and overlay revisions.\n- Before/after generated-file comparison.\n- Repeat-transform hash comparison.\n- Inherited runtime and booking checks.\n- Limitations and negative findings.\n\n[Open the experiment](/states/lab-005-evidence-card) · [Learning guide](/docs/learning/lab-005-evidence-card)\n\n## Propose another branch\n\nPrefer a convergence state (004/C0, 007/C1, 009/C2 or 012/C3), which combines exploration tracks into a shared demo/state. Start from another upstream state when your experiment needs a specific capability. Describe one change and its success criteria, record the exact starting state and upstream SHA, and work on a feature branch in your team fork. You do not need to complete the 004 exercise first. Review state-specific prerequisites with operators and record runtime verification separately. See [starting-state setup](/docs/participating#2-choose-your-starting-state).\n\n[Get started](/docs/get-started) · [Project registration contract](/registry)\n`);
doc('registry.md',`# Participant registry contract\n\n[How your team works](/docs/participating) · [Register and update your project](/docs/registration)\n\n[Submit an early registration request](${config.registrationRequestUrl}) — requests can be reviewed now; automated publication remains disabled.\n\n\n\nRegistration links a team repository, exact commit SHA and hackday/project.yaml. It does not merge team code into the Lab.\n\n**Registration is not enabled yet.** This build rejects nonempty registry data until remote revision, manifest, consent and evidence validation are implemented.\n\n## Project and state relationship\n\nA project can introduce multiple namespaced experiment states. Each records its parent, upstream pin, owner, learning guide, spec pack and evidence. The state explorer will link accepted projects to these states.\n\n## Publication levels\n\n- **Registered:** link to reviewed project metadata and the team repository.\n- **Featured snapshot:** preserve approved, bounded documentation and images at a reviewed revision. Never execute participant scripts or MDX.\n\n## Evidence status\n\nExploring → demonstrated → reproducible are evidence claims, not automatic promotion steps. Maintained and archived record lifecycle responsibility. Consent is required for personal profiles.\n\n[Registry JSON](pathname:///source/registry/projects.json) · [Version 1 registration schema](pathname:///source/schemas/registry.schema.json) · [Foundation spec](/specs/lab-foundation/spec)\n`.replaceAll('\\`','`'));
write('src/data.json',JSON.stringify({config,upstream,lab,projects:registry.projects},null,2));
write('static/source/upstream-state-catalog.json',JSON.stringify({upstreamPin:pin,states:upstream},null,2));
write('static/llms.txt',`# TraderX Hackday Lab\n\nIndependent overlay. Upstream pin: ${pin}. Local runtime evidence is recorded for the two Lab examples; other states remain unverified.\n\n- [Operator playbook](/source/docs/operators/index.md)\n- [Participant coaching prompts](/source/docs/operators/prompts.md)\n- [Registration review](/source/docs/operators/review.md)\n- [Reusable portal requirements](/source/specs/portal-template/spec.md)\n- [Acceptance matrix](/source/specs/portal-template/acceptance.md)\n- [Getting started](/source/docs/get-started.md)\n- [Learning graph](/source/docs/learning/index.md)\n- [Lab states](/source/catalog/state-catalog.json)\n- [Pinned upstream states](/source/upstream-state-catalog.json)\n- [Registry schema](/source/schemas/registry.schema.json)\n- [Runtime rehearsal evidence](/source/docs/planning/runtime-evidence-2026-11-05.md)\n- [Evidence gates](/source/docs/planning/gates.md)\n`.replaceAll('](/source/', `](${baseUrl}source/`));
for(const file of fs.readdirSync(path.join(site,'assets/upstream'))) {const dest=path.join(site,'static/img/upstream',file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(site,'assets/upstream',file),dest);}
console.log(`Prepared ${upstream.length} upstream references, ${lab.length} Lab states, ${registry.projects.length} projects`);
