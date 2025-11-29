// Lightweight client-side handling for the form. This does NOT send data to a server.
(function(){
  const form = document.getElementById('regForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    // Basic HTML5 constraint validation first
    if (!form.checkValidity()){
      form.reportValidity();
      return;
    }

    // Collect values
    const data = new FormData(form);
    const entries = {};
    for (const [k,v] of data.entries()){
      // handle multiple interests: FormData will include multiple 'interests' keys
      if (k === 'interests') {
        entries.interests = entries.interests || [];
        entries.interests.push(v);
      } else if (k === 'resume') {
        if (v && v.name) entries.resume = v.name;
      } else {
        entries[k] = v;
      }
    }

    // show a simple summary
    result.textContent = 'Form submitted — preview: ' + JSON.stringify(entries, null, 2);
    result.style.whiteSpace = 'pre-wrap';
    // reset after a short delay
    setTimeout(()=>result.textContent = 'Thank you! Your data is processed locally in the browser.', 3200);
  });
})();
