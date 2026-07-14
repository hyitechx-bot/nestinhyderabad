// AI Property Finder Chat Widget
(function(){
// Project database
var DB=[
{id:"eternia",name:"Candeur Eternia",area:"Bachupally",price:12000000,maxPrice:18000000,bhk:[2,2.5,3],status:"under construction",slug:"candeur-eternia-bachupally.html",tags:["orr","gated community","clubhouse","pool","theatre","restaurant","bachupally","miyapur extension","myron mall"],priceText:"\u20B91.2 Cr onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Candeur%20Eternia"},
{id:"kukatpally",name:"Candeur Kukatpally IDL Lake",area:"Kukatpally",price:8900000,maxPrice:15000000,bhk:[2.5,3],status:"pre launch",slug:"candeur-kukatpally/",tags:["idl lake","kukatpally","kphb","metro","pre-launch","eoi","clubhouse","20 acres"],priceText:"\u20B989L onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Candeur%20Kukatpally"},
{id:"skyline",name:"Candeur Skyline",area:"Financial District",price:90000000,maxPrice:200000000,bhk:[4],status:"under construction",slug:"candeur-skyline/",tags:["ultra luxury","sky villa","financial district","gachibowli","nanakramguda","premium","exclusive"],priceText:"\u20B99 Cr onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Candeur%20Skyline"},
{id:"lakescape",name:"Candeur Lakescape",area:"Kondapur",price:9000000,maxPrice:22000000,bhk:[2,2.5,3,3.5],status:"under construction",slug:"candeur-lakescape/",tags:["lake view","kondapur","hitech city","madhapur","it hub"],priceText:"\u20B990L onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Candeur%20Lakescape"},
{id:"crescent",name:"Candeur Crescent",area:"Gachibowli",price:10000000,maxPrice:25000000,bhk:[2.5,3],status:"ready to move",slug:"candeur-crescent/",tags:["ready to move","handover","gachibowli","serilingampally","immediate","move in"],priceText:"\u20B91 Cr onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Candeur%20Crescent"},
{id:"twins",name:"Candeur Twins",area:"Miyapur",price:12000000,maxPrice:18000000,bhk:[3],status:"under construction",slug:"candeur-twins/",tags:["twin towers","miyapur","metro","47 floors"],priceText:"\u20B91.2 Cr onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Candeur%20Twins"},
{id:"c40",name:"Candeur C40",area:"Miyapur",price:7000000,maxPrice:12000000,bhk:[2,2.5,3],status:"ready to move",slug:"candeur-c40/",tags:["ready to move","completed","affordable","budget","miyapur","metro","compact","value"],priceText:"\u20B970L onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Candeur%20C40"},
{id:"novo",name:"Candeur Novo Gardenia",area:"Varthur (Bengaluru)",price:8000000,maxPrice:15000000,bhk:[2,3],status:"under construction",slug:"candeur-novo-gardenia/",tags:["bengaluru","bangalore","whitefield","green","nature"],priceText:"\u20B980L onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Novo%20Gardenia"},
{id:"jains",name:"Jain's Central Park East",area:"Narapally",price:6000000,maxPrice:15000000,bhk:[2,3],status:"under construction",slug:"jains-central-park-east-hyderabad.html",tags:["narapally","uppal","nh44","eastern"],priceText:"Competitive Pricing",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Jains%20CPE"},
{id:"sattva",name:"Sattva Lago",area:"Kokapet",price:45000000,maxPrice:80000000,bhk:[3,3.5,4],status:"new launch",slug:"sattva-lago/",tags:["luxury","ultra luxury","kokapet","neopolis","sattva","financial district","premium"],priceText:"\u20B94.5 Cr onwards",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Sattva%20Lago"},
{id:"aparna-cyberscape",name:"Aparna Cyberscape",area:"Nallagandla",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["nallagandla","aparna","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Aparna%20Cyberscape"},
{id:"aparna-newlands",name:"Aparna Newlands",area:"Tellapur",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["tellapur","orr","aparna","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Aparna%20Newlands"},
{id:"aparna-zenon-3",name:"Aparna Zenon Phase 3",area:"Puppalaguda",price:0,maxPrice:0,bhk:[2,3],status:"pre launch",slug:"",tags:["puppalaguda","aparna","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Aparna%20Zenon%20Phase%203"},
{id:"brigade-gateway-neopolis",name:"Brigade Gateway Neopolis",area:"Kokapet",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["luxury","kokapet","premium","brigade","rera","neopolis"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Brigade%20Gateway%20Neopolis"},
{id:"godrej-madison-avenue",name:"Godrej Madison Avenue",area:"Kokapet",price:0,maxPrice:0,bhk:[3,4],status:"pre launch",slug:"",tags:["luxury","kokapet","premium","godrej","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Godrej%20Madison%20Avenue"},
{id:"godrej-neopolis",name:"Godrej Neopolis",area:"Kokapet",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["luxury","kokapet","premium","godrej","rera","neopolis"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Godrej%20Neopolis"},
{id:"godrej-regal-pavilion",name:"Godrej Regal Pavilion",area:"Gaganpahad",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["gaganpahad","godrej","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Godrej%20Regal%20Pavilion"},
{id:"mantri-celestia",name:"Mantri Celestia",area:"Hyderabad",price:0,maxPrice:0,bhk:[2,3],status:"ready to move",slug:"",tags:["mantri","rera","completed"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Mantri%20Celestia"},
{id:"mantri-euphoria",name:"Mantri Euphoria",area:"Hyderabad",price:0,maxPrice:0,bhk:[2,3],status:"ready to move",slug:"",tags:["mantri","rera","completed"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Mantri%20Euphoria"},
{id:"my-home-tridasa",name:"My Home Tridasa",area:"Tellapur",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["tellapur","orr","my home","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20My%20Home%20Tridasa"},
{id:"my-home-vanya",name:"My Home Vanya",area:"Near Neopolis",price:0,maxPrice:0,bhk:[3,4],status:"pre launch",slug:"",tags:["luxury","kokapet","premium","my home","rera","neopolis"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20My%20Home%20Vanya"},
{id:"phoenix-equinox",name:"Phoenix Equinox",area:"Hitech City",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["hitech city","it hub","phoenix","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Phoenix%20Equinox"},
{id:"prestige-beverly-hills",name:"Prestige Beverly Hills",area:"Kokapet",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["luxury","kokapet","premium","prestige","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Prestige%20Beverly%20Hills"},
{id:"prestige-clairemont",name:"Prestige Clairemont",area:"Kokapet",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["luxury","kokapet","premium","prestige","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Prestige%20Clairemont"},
{id:"prestige-high-fields",name:"Prestige High Fields",area:"Nanakramguda",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["nanakramguda","financial district","prestige","rera","premium"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Prestige%20High%20Fields"},
{id:"prestige-rainbow-waters",name:"Prestige Vaishnaoi Rainbow Waters",area:"Raidurgam",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["raidurgam","hitech city","prestige","rera","premium"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Prestige%20Rainbow%20Waters"},
{id:"rajapushpa-aurelia",name:"Rajapushpa Aurelia",area:"Tellapur",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["tellapur","orr","rajapushpa","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Rajapushpa%20Aurelia"},
{id:"rajapushpa-lifestyle-city",name:"Rajapushpa Lifestyle City",area:"Tellapur",price:0,maxPrice:0,bhk:[2,3],status:"ready to move",slug:"",tags:["tellapur","orr","rajapushpa","rera","completed"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Rajapushpa%20Lifestyle%20City"},
{id:"rajapushpa-manchirevula",name:"Rajapushpa Manchirevula Project",area:"Manchirevula",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["manchirevula","rajapushpa","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Rajapushpa%20Manchirevula"},
{id:"ramky-nextown",name:"Ramky Nextown",area:"Isnapur",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["isnapur","ramky","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Ramky%20Nextown"},
{id:"ramky-one-odyssey",name:"Ramky One Odyssey",area:"Kokapet",price:0,maxPrice:0,bhk:[3,4],status:"under construction",slug:"",tags:["luxury","kokapet","premium","ramky","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Ramky%20One%20Odyssey"},
{id:"ramky-one-orion",name:"Ramky One Orion",area:"Pocharam/Uppal",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["pocharam","uppal","ramky","rera","eastern"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Ramky%20One%20Orion"},
{id:"ramky-one-symphony",name:"Ramky One Symphony",area:"Patancheru",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["patancheru","ramky","rera"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Ramky%20One%20Symphony"},
{id:"urbanrise-cloud-33",name:"Urbanrise On Cloud 33",area:"Hyderabad",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["urbanrise","hyderabad"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20Urbanrise%20On%20Cloud%2033"},
{id:"prestige-city-hyd",name:"The Prestige City Hyderabad",area:"Hyderabad",price:0,maxPrice:0,bhk:[2,3],status:"under construction",slug:"",tags:["prestige","hyderabad"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20interested%20in%20The%20Prestige%20City%20Hyderabad"},
{id:"crisanto",name:"Crisanto",area:"Ameenpur",price:0,maxPrice:0,bhk:[2,2.5,3,4],status:"new launch",slug:"crisanto/",tags:["ameenpur","chandanagar","avanthika","hmda","ultra luxury","metro","vaastu","sports arena","24 acres"],priceText:"On Request",wa:"https://wa.me/919391954743?text=Hi%2C%20AI%20matched%20Crisanto%20Ameenpur"}
];

var LOC_MAP={"hitech city":["kondapur","kukatpally","madhapur","gachibowli"],"hitec city":["kondapur","kukatpally","madhapur","gachibowli"],"it hub":["kondapur","kukatpally","madhapur","gachibowli","financial district"],"orr":["bachupally","miyapur","kukatpally","kondapur","gachibowli","kokapet"],"metro":["miyapur","kukatpally"],"financial district":["financial district","kokapet","gachibowli"]};

function parseQuery(q){
  q=q.toLowerCase().trim();
  var r={bhk:null,maxBudget:null,locations:[],status:null,tags:[]};
  var bhkM=q.match(/(\d\.?\d?)\s*bhk/);if(bhkM)r.bhk=parseFloat(bhkM[1]);
  var crM=q.match(/(\d+\.?\d*)\s*cr/);var lM=q.match(/(\d+)\s*l(akh|ak)?/);
  if(crM)r.maxBudget=parseFloat(crM[1])*10000000;
  else if(lM)r.maxBudget=parseInt(lM[1])*100000;
  if(!r.maxBudget){var uM=q.match(/under\s*[^0-9]*(\d+\.?\d*)\s*(cr|l)/i);if(uM)r.maxBudget=uM[2]==='cr'?parseFloat(uM[1])*10000000:parseFloat(uM[1])*100000;}
  var areas=["bachupally","miyapur","kukatpally","kondapur","gachibowli","kokapet","financial district","narapally","uppal","varthur","madhapur","kphb","tellapur","nallagandla","puppalaguda","nanakramguda","raidurgam","manchirevula","isnapur","patancheru","pocharam","gaganpahad"];
  areas.forEach(function(a){if(q.indexOf(a)>-1)r.locations.push(a);});
  Object.keys(LOC_MAP).forEach(function(s){if(q.indexOf(s)>-1)r.locations=r.locations.concat(LOC_MAP[s]);});
  r.locations=[...new Set(r.locations)];
  if(q.match(/ready\s*(to)?\s*move|completed|immediate/))r.status="ready to move";
  if(q.match(/pre[\s-]?launch|eoi/))r.status="pre launch";
  if(q.match(/new\s*launch/))r.status="new launch";
  // Builder matching
  var builders=["candeur","sattva","aparna","brigade","godrej","mantri","my home","phoenix","prestige","rajapushpa","ramky","urbanrise","jain"];
  builders.forEach(function(b){if(q.indexOf(b)>-1)r.tags.push(b);});
  ["luxury","ultra luxury","affordable","budget","pool","clubhouse","lake","view","green","metro","premium","compact","value"].forEach(function(f){if(q.indexOf(f)>-1)r.tags.push(f);});
  return r;
}

function score(p,parsed){
  var s=0,reasons=[];
  if(parsed.bhk&&p.bhk.indexOf(parsed.bhk)>-1){s+=30;reasons.push(parsed.bhk+" BHK \u2713");}
  else if(parsed.bhk&&p.bhk.some(function(b){return Math.abs(b-parsed.bhk)<=0.5;})){s+=15;reasons.push("Close BHK match");}
  if(parsed.maxBudget&&p.price>0&&p.price<=parsed.maxBudget){s+=30;reasons.push("Within budget \u2713");}
  else if(parsed.maxBudget&&p.price>0&&p.price<=parsed.maxBudget*1.15){s+=10;reasons.push("Slightly over budget");}
  if(parsed.locations.length>0){
    var al=p.area.toLowerCase();
    if(parsed.locations.indexOf(al)>-1){s+=25;reasons.push(p.area+" \u2713");}
    else if(p.tags.some(function(t){return parsed.locations.some(function(l){return t.indexOf(l)>-1;});})){s+=15;reasons.push("Near preferred area");}
  }
  if(parsed.status&&p.status===parsed.status){s+=20;reasons.push(p.status+" \u2713");}
  parsed.tags.forEach(function(t){
    // Builder match gets higher score
    if(["candeur","sattva","aparna","brigade","godrej","mantri","my home","phoenix","prestige","rajapushpa","ramky","urbanrise","jain"].indexOf(t)>-1){
      if(p.tags.indexOf(t)>-1||p.name.toLowerCase().indexOf(t)>-1){s+=25;reasons.push(t.charAt(0).toUpperCase()+t.slice(1)+" project \u2713");}
    } else {
      if(p.tags.indexOf(t)>-1){s+=8;reasons.push(t);}
    }
  });
  return{score:s,reasons:reasons};
}

// Inject chat widget HTML
var isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';
var isMobile = window.innerWidth <= 768;
var startState = (isHome && !isMobile) ? 'open' : 'minimized';
var chatHTML='<div id="aiChatWidget" class="ai-chat-widget '+startState+'">'+
'<div class="ai-chat-bubble" id="aiChatBubble"><span class="ai-chat-bubble-icon">\ud83e\udd16</span><span class="ai-chat-bubble-text">AI Property Finder</span></div>'+
'<div class="ai-chat-window" id="aiChatWindow">'+
'<div class="ai-chat-header"><span>\ud83e\udd16 AI Property Finder</span><button id="aiChatMin" class="ai-chat-min">&minus;</button></div>'+
'<div class="ai-chat-body" id="aiChatBody">'+
'<div class="ai-msg bot">Hi! \ud83d\udc4b Tell me what you\'re looking for. Example:<br><em>"3 BHK under 1.5 Cr near Hitech City"</em></div>'+
'<div class="ai-chat-suggestions" id="aiSuggestions">'+
'<span class="ai-sug">3 BHK under 1.5 Cr Hitech City</span>'+
'<span class="ai-sug">Ready to move Miyapur under 80L</span>'+
'<span class="ai-sug">Luxury 4 BHK Kokapet</span>'+
'</div>'+
'</div>'+
'<div class="ai-chat-input-wrap"><input type="text" id="aiChatInput" placeholder="Describe your dream home..." /><button id="aiChatSend">\u27a4</button></div>'+
'</div></div>';
document.body.insertAdjacentHTML('beforeend',chatHTML);

// Inject CSS
var chatCSS=document.createElement('style');
chatCSS.textContent=`
.ai-chat-widget{position:fixed;bottom:90px;right:28px;z-index:1000;font-family:'Inter',sans-serif}
.ai-chat-bubble{display:flex;align-items:center;gap:6px;background:linear-gradient(135deg,#1a1a1a,#2a2a2a);color:#E8B84B;padding:10px 16px;border-radius:50px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.25);transition:transform 0.2s,box-shadow 0.2s;border:1.5px solid rgba(232,184,75,0.3)}
.ai-chat-bubble:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(232,184,75,0.2)}
.ai-chat-bubble-icon{font-size:1rem}
.ai-chat-bubble-text{font-size:0.78rem;font-weight:600;color:#fff}
.ai-chat-window{display:none;width:360px;max-width:calc(100vw - 40px);height:480px;max-height:70vh;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.2);flex-direction:column;overflow:hidden;border:1px solid #eee}
.ai-chat-widget.open .ai-chat-bubble{display:none}
.ai-chat-widget.open .ai-chat-window{display:flex}
.ai-chat-widget.minimized .ai-chat-window{display:none}
.ai-chat-widget.minimized .ai-chat-bubble{display:flex}
.ai-chat-header{background:#1a1a1a;color:#fff;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;font-size:0.9rem;font-weight:600}
.ai-chat-min{background:none;border:none;color:rgba(255,255,255,0.7);font-size:1.4rem;cursor:pointer;line-height:1}
.ai-chat-min:hover{color:#E8B84B}
.ai-chat-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
.ai-msg{padding:12px 14px;border-radius:12px;font-size:0.85rem;line-height:1.5;max-width:90%}
.ai-msg.bot{background:#f5f2ec;color:#333;align-self:flex-start;border-bottom-left-radius:4px}
.ai-msg.user{background:#E8B84B;color:#000;align-self:flex-end;border-bottom-right-radius:4px;font-weight:500}
.ai-msg em{font-style:italic;color:#888}
.ai-msg a{color:#E8B84B;font-weight:600;text-decoration:none}
.ai-msg a:hover{text-decoration:underline}
.ai-rc-btns a{color:inherit !important}
.ai-result-card{background:#fff;border:1.5px solid #eee;border-radius:10px;padding:12px;margin-top:6px}
.ai-result-card:hover{border-color:#E8B84B}
.ai-rc-name{font-weight:700;font-size:0.88rem;color:#1a1a1a}
.ai-rc-loc{font-size:0.75rem;color:#888}
.ai-rc-price{font-weight:700;color:#E8B84B;font-size:0.9rem;margin:4px 0}
.ai-rc-match{font-size:0.7rem;color:#15803d;background:rgba(34,197,94,0.1);display:inline-block;padding:2px 8px;border-radius:10px;margin-bottom:6px}
.ai-rc-btns{display:flex;gap:6px;margin-top:8px}
.ai-rc-btns a{padding:6px 12px;border-radius:6px;font-size:0.75rem;font-weight:600;text-decoration:none}
.ai-rc-btn-view{background:#f5f2ec;color:#333}
.ai-rc-btn-wa{background:#25d366;color:#ffffff !important}
.ai-msg .ai-rc-btns a.ai-rc-btn-wa{color:#ffffff !important}
.ai-chat-suggestions{display:flex;flex-wrap:wrap;gap:6px}
.ai-sug{padding:6px 10px;background:#f9f6f0;border:1px solid #ede9e0;border-radius:16px;font-size:0.72rem;color:#666;cursor:pointer;transition:all 0.15s}
.ai-sug:hover{background:#E8B84B;color:#000;border-color:#E8B84B}
.ai-chat-input-wrap{display:flex;gap:0;border-top:1px solid #eee;padding:10px 12px;background:#fafafa}
.ai-chat-input-wrap input{flex:1;padding:10px 12px;border:1.5px solid #e8e4dc;border-radius:8px 0 0 8px;font-size:0.88rem;font-family:inherit;outline:none}
.ai-chat-input-wrap input:focus{border-color:#E8B84B}
.ai-chat-input-wrap button{padding:10px 16px;background:#E8B84B;color:#000;border:none;border-radius:0 8px 8px 0;font-size:1rem;cursor:pointer;font-weight:700}
.ai-chat-input-wrap button:hover{background:#c9a030}
.ai-typing{display:flex;gap:4px;padding:8px 14px;align-self:flex-start}
.ai-typing span{width:8px;height:8px;background:#ccc;border-radius:50%;animation:blink 1.4s infinite}
.ai-typing span:nth-child(2){animation-delay:0.2s}
.ai-typing span:nth-child(3){animation-delay:0.4s}
@keyframes blink{0%,80%,100%{opacity:0.3}40%{opacity:1}}
@media(max-width:480px){.ai-chat-window{width:calc(100vw - 20px);height:60vh;border-radius:12px}.ai-chat-widget{right:10px;bottom:75px}.ai-chat-bubble-text{display:none}.ai-chat-bubble{padding:12px;border-radius:50%}.ai-chat-bubble-icon{font-size:1.1rem}}
`;
document.head.appendChild(chatCSS);

// Chat logic
var body=document.getElementById('aiChatBody');
var input=document.getElementById('aiChatInput');

function addMsg(text,type){
  var div=document.createElement('div');
  div.className='ai-msg '+type;
  div.innerHTML=text;
  body.appendChild(div);
  body.scrollTop=body.scrollHeight;
}

function addTyping(){
  var div=document.createElement('div');
  div.className='ai-typing';
  div.id='typing';
  div.innerHTML='<span></span><span></span><span></span>';
  body.appendChild(div);
  body.scrollTop=body.scrollHeight;
}
function removeTyping(){var t=document.getElementById('typing');if(t)t.remove();}

function processQuery(q){
  addMsg(q,'user');
  // Remove suggestions after first query
  var sug=document.getElementById('aiSuggestions');if(sug)sug.remove();
  addTyping();

  setTimeout(function(){
    removeTyping();
    var parsed=parseQuery(q);
    var results=[];
    DB.forEach(function(p){var s=score(p,parsed);if(s.score>0)results.push({p:p,s:s.score,r:s.reasons});});
    results.sort(function(a,b){return b.s-a.s;});
    var top=results.slice(0,3);

    if(!top.length){
      addMsg("I couldn't find an exact match. Try different keywords, or <a href='https://wa.me/919391954743?text=Hi%2C%20I%20need%20help%20finding%3A%20"+encodeURIComponent(q)+"' target='_blank'>WhatsApp us</a> for personalized help.",'bot');
      return;
    }

    var matchPct=function(s){return Math.min(96,Math.round(s/1.1));};
    addMsg("Found <strong>"+top.length+" projects</strong> matching your needs:",'bot');

    top.forEach(function(r){
      var card='<div class="ai-result-card">'+
        '<div class="ai-rc-match">'+matchPct(r.s)+'% match</div>'+
        '<div class="ai-rc-name">'+r.p.name+'</div>'+
        '<div class="ai-rc-loc">\ud83d\udccd '+r.p.area+'</div>'+
        '<div class="ai-rc-price">'+r.p.priceText+'</div>'+
        '<div style="font-size:0.72rem;color:#666">\u2728 '+r.r.slice(0,3).join(' \u2022 ')+'</div>'+
        '<div class="ai-rc-btns"><a href="/'+r.p.slug+'" class="ai-rc-btn-view">View</a><a href="'+r.p.wa+'" class="ai-rc-btn-wa" target="_blank">WhatsApp</a></div>'+
        '</div>';
      var div=document.createElement('div');
      div.className='ai-msg bot';
      div.innerHTML=card;
      body.appendChild(div);
    });
    body.scrollTop=body.scrollHeight;

    setTimeout(function(){
      addMsg("Want to refine? Just type more details, or <a href='https://wa.me/919391954743' target='_blank'>chat with our expert</a> for personalized guidance.",'bot');
    },500);
  },800);
}

// Event listeners
document.getElementById('aiChatBubble').addEventListener('click',function(){
  document.getElementById('aiChatWidget').classList.remove('minimized');
  document.getElementById('aiChatWidget').classList.add('open');
  input.focus();
});
document.getElementById('aiChatMin').addEventListener('click',function(){
  document.getElementById('aiChatWidget').classList.remove('open');
  document.getElementById('aiChatWidget').classList.add('minimized');
});
document.getElementById('aiChatSend').addEventListener('click',function(){
  var q=input.value.trim();if(q){processQuery(q);input.value='';}
});
input.addEventListener('keydown',function(e){
  if(e.key==='Enter'){var q=input.value.trim();if(q){processQuery(q);input.value='';}}
});
// Suggestion clicks
document.addEventListener('click',function(e){
  if(e.target.classList.contains('ai-sug')){
    processQuery(e.target.textContent);
  }
});

// Auto-open on mobile homepage after 30 seconds
if (isMobile && isHome) {
  setTimeout(function(){
    var widget = document.getElementById('aiChatWidget');
    if (widget && widget.classList.contains('minimized')) {
      widget.classList.remove('minimized');
      widget.classList.add('open');
    }
  }, 30000);
}
})();
