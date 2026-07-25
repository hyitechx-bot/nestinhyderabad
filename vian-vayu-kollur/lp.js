// Form handling
(function(){
  var form = document.getElementById('sidebarForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('s-name').value.trim();
    var phone = document.getElementById('s-phone').value.trim();
    if(!name || !phone){ alert('Please fill Name and Phone.'); return; }
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch('https://formspree.io/f/mjgpzezo', {
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({name:name, phone:phone, config: document.getElementById('s-config')?.value || '', source:'Elevated Living Kollur 35-Floor Tower'})
    }).then(function(r){
      if(r.ok){
        document.getElementById('sidebarSuccess').hidden = false;
        form.reset();
        btn.textContent = 'Get Project Details';
        btn.disabled = false;
      } else { alert('Error. Please try WhatsApp.'); btn.disabled = false; btn.textContent = 'Get Project Details'; }
    }).catch(function(){ alert('Network error. Please try WhatsApp.'); btn.disabled = false; btn.textContent = 'Get Project Details'; });
  });

  // Header scroll
  var header = document.getElementById('header');
  if(header){
    window.addEventListener('scroll', function(){
      header.style.background = window.scrollY > 50 ? 'rgba(10,10,10,0.98)' : 'rgba(10,10,10,0.95)';
    });
  }
})();
