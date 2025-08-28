   const services = [
      { icon: "B12-A5-Emergency-Hotline/assets/emergency.png", name:"National Emergency Number", sub:"National Emergency", number:"999", category:"All" },
      { icon: "B12-A5-Emergency-Hotline/assets/police.png", name:"Police Helpline Number", sub:"Police", number:"999", category:"Police" },
      { icon: "B12-A5-Emergency-Hotline/assets/fire-service.png", name:"Fire Service Number", sub:"Fire Service", number:"999", category:"Fire" },
      { icon: "B12-A5-Emergency-Hotline/assets/ambulance.png", name:"Ambulance Service", sub:"Ambulance", number:"1994-999999", category:"Health" },
      { icon: "B12-A5-Emergency-Hotline/assets/mother.png", name:"Women & Child Helpline", sub:"Women & Child Helpline", number:"109", category:"Help" },
      { icon: "B12-A5-Emergency-Hotline/assets/justice.png", name:"Anti-Corruption Helpline", sub:"Anti-Corruption", number:"106", category:"Govt." },
      { icon: "B12-A5-Emergency-Hotline/assets/fuse-box.png", name:"Electricity Helpline", sub:"Electricity Outage", number:"16216", category:"Electricity" },
      { icon: "B12-A5-Emergency-Hotline/assets/brac.png", name:"Brac Helpline", sub:"Brac", number:"16445", category:"NGO" },
      { icon: "B12-A5-Emergency-Hotline/assets/Bangladesh-Railway.png", name:"Bangladesh Railway Helpline", sub:"Bangladesh Railway", number:"163", category:"Travel" },
    ];

    let favCount = 0;
    let coin = 100;
    let copyCount = 0;

    const favEl = document.getElementById('favCount');
    const coinEl = document.getElementById('coinCount');
    const copyEl = document.getElementById('copyCount');
    const grid = document.getElementById('cardGrid');
    const historyList = document.getElementById('historyList');

    const tpl = document.getElementById('cardTemplate');

    function renderCards(){
      services.forEach(svc => {
        const node = tpl.content.cloneNode(true);
        node.querySelector('[data-role="name"]').textContent = svc.name;
        node.querySelector('[data-role="sub"]').textContent = svc.sub;
        node.querySelector('[data-role="number"]').textContent = svc.number;
        node.querySelector('[data-role="category"]').lastElementChild.textContent = svc.category;
        node.querySelector('.w-10').innerHTML = `<img src="${svc.icon}" alt="Service Icon" class="w-6 h-6">`;
        
        // Apply blue-100 background for Police Helpline icon container
        if (svc.name === "Police Helpline Number") {
          node.querySelector('[data-role="icon-container"]').classList.add('bg-blue-100');
        } else {
          node.querySelector('[data-role="icon-container"]').classList.add('bg-rose-100');
        }

        const favBtn = node.querySelector('[data-role="fav"]');
        favBtn.addEventListener('click', () => {
          const img = favBtn.querySelector('img');
          const isActive = img.classList.contains('text-rose-500');
          if(isActive){
            img.classList.remove('text-rose-500');
            img.classList.add('text-gray-400');
            // favCount = Math.max(0, favCount - 1);
                favCount += 1;
          } else {
            img.classList.remove('text-gray-400');
            img.classList.add('text-rose-500');
            favCount += 1;
          }
          favEl.textContent = favCount;
        });

        node.querySelector('[data-role="copy"]').addEventListener('click', async () => {
          try{
            await navigator.clipboard.writeText(svc.number);
            copyCount += 1; copyEl.textContent = copyCount;
            alert(`Copied ${svc.number} to clipboard`);
          }catch(err){
            alert('Copy failed.');
          }
        });

        node.querySelector('[data-role="call"]').addEventListener('click', () => {
          if(coin < 20){
            alert('Not enough coins (20 required per call).');
            return;
          }
          alert(`Calling ${svc.name} — ${svc.number}`);
          coin -= 20; coinEl.textContent = coin;
          addHistory(svc.name, svc.number);
        });

        grid.appendChild(node);
      });
    }

    function addHistory(name, number){
      const li = document.createElement('li');
      const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      li.className = 'p-3 rounded-xl border border-gray-100 bg-gray-50';
      li.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-sm font-semibold">${name}</div>
            <div class="text-xs text-gray-500">${number}</div>
          </div>
          <div class="text-[11px] text-gray-500 whitespace-nowrap">${time}</div>
        </div>
      `;
      historyList.prepend(li);
    }

    document.getElementById('clearHistory').addEventListener('click', () => {
      historyList.innerHTML = '';
    });

    renderCards();
