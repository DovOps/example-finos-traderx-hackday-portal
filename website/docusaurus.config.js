const config = require('../portal/config.json');
const {url, baseUrl} = require('./site-location.cjs')();
module.exports = {
  title: config.title, tagline: 'Explore upstream. Extend deliberately. Share evidence.',
  url, baseUrl, trailingSlash: true,
  onBrokenLinks: 'throw', favicon: 'img/upstream/favicon-traderX.ico',
  markdown: {format: 'md', mermaid: true, hooks: {onBrokenMarkdownLinks: 'throw'}},
  themes: ['@docusaurus/theme-mermaid'],
  stylesheets: ['https://fonts.googleapis.com/css?family=Overpass:400,400i,700,800'],
  headTags: [{tagName:'meta',attributes:{name:'robots',content:'noindex,nofollow'}}],
  themeConfig: {
    mermaid: {options: {fontFamily: "Arial, sans-serif", flowchart: {htmlLabels: false}}},
    announcementBar: {id:'official-docs',content:'Visit <a href="https://traderx.finos.org">https://traderx.finos.org</a> for official docs.',backgroundColor:'#e4f1f7',textColor:'#12395c',isCloseable:false},
    navbar: {title:'Hackday Lab',logo:{alt:'TraderX',src:'img/upstream/TraderX_Horizontal.svg'},items:[
      {to:'/docs/get-started',label:'Get started',position:'left'},
      {to:'/states',label:'States & learning',position:'left'},
      {to:'/specs',label:'Specs',position:'left'},
      {to:'/challenges',label:'Challenges',position:'left'},
      {to:'/projects',label:'Projects & teams',position:'left'},
      {href:'https://traderx.finos.org',label:'Official TraderX ↗',position:'right'},
      {href:config.repository,label:'Lab GitHub',position:'right'}]},
    footer:{style:'dark',logo:{alt:'FINOS — Fintech Open Source Foundation',src:'img/upstream/finos-white.png',href:'https://www.finos.org'},links:[{title:'Hackday Lab',items:[{label:'Operator playbook',to:'/docs/operators/index'},{label:'Learning graph',to:'/docs/learning/index'},{label:'Evidence gates',to:'/docs/planning/gates'},{label:'Agent-readable content',href:`pathname://${baseUrl}llms.txt`}]},{title:'Upstream TraderX',items:[{label:'Official portal (latest)',href:'https://traderx.finos.org'},{label:'Pinned source · '+config.upstreamPin.slice(0,8),href:'https://github.com/finos/traderX/tree/'+config.upstreamPin}]}],copyright:'TraderX Hackday Lab · Based on FINOS TraderX and the FINOS hackday template. Apache-2.0; attribution retained.'},
    colorMode:{respectPrefersColorScheme:true},
  },
  presets:[['classic',{docs:{path:'content',routeBasePath:'/',sidebarPath:require.resolve('./sidebars.js')},blog:false,theme:{customCss:require.resolve('./src/css/custom.css')}}]],
};
