function initEditarNome() {
    // Nome do usuário (mp.html)
    const userName = document.getElementById('user-name');
    if (userName) {
        const savedName = localStorage.getItem('mp_user_name');
        if (savedName) userName.textContent = savedName;
        userName.style.cursor = 'pointer';

        function attachNome(el) {
            el.onclick = function() {
                const cur = el.textContent.trim();
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.value = cur;
                inp.style.cssText = 'font-size:15px;font-weight:600;color:#1A1A1A;background:rgba(255,255,255,0.95);border:2px solid #4361EE;border-radius:6px;padding:2px 6px;outline:none;font-family:Inter,sans-serif;width:120px;';
                el.replaceWith(inp);
                inp.focus(); inp.select();
                function save() {
                    const n = inp.value.trim() || 'Gustavo';
                    localStorage.setItem('mp_user_name', n);
                    const s = document.createElement('span');
                    s.id = 'user-name'; s.style.cursor = 'pointer'; s.textContent = n;
                    inp.replaceWith(s);
                    attachNome(s);
                }
                inp.addEventListener('blur', save);
                inp.addEventListener('keypress', e => { if (e.key === 'Enter') { e.preventDefault(); save(); } });
            };
        }
        attachNome(userName);
    }

    // Contatos PIX (pix.html)
    function iniciais(nome) {
        return nome.trim().split(' ').filter(p => p).slice(0, 2).map(p => p[0].toUpperCase()).join('');
    }

    function attachContato(id) {
        const nameEl = document.getElementById('cn' + id);
        const avEl = document.getElementById('av' + id);
        if (!nameEl || !avEl) return;

        const saved = localStorage.getItem('pix_contact_' + id);
        if (saved) { nameEl.textContent = saved; avEl.textContent = iniciais(saved); }
        nameEl.style.cursor = 'pointer';

        nameEl.onclick = function() {
            const cur = nameEl.textContent.trim();
            const inp = document.createElement('input');
            inp.type = 'text'; inp.value = cur;
            inp.style.cssText = 'font-size:14.5px;font-weight:500;color:#1A1A1A;background:rgba(255,255,255,0.95);border:2px solid #4B52C4;border-radius:6px;padding:2px 8px;outline:none;font-family:Inter,sans-serif;width:200px;';
            nameEl.replaceWith(inp);
            inp.focus(); inp.select();
            function save() {
                const n = inp.value.trim() || cur;
                localStorage.setItem('pix_contact_' + id, n);
                const s = document.createElement('span');
                s.className = 'contact-name'; s.id = 'cn' + id; s.style.cursor = 'pointer'; s.textContent = n;
                inp.replaceWith(s);
                avEl.textContent = iniciais(n);
                attachContato(id);
            }
            inp.addEventListener('blur', save);
            inp.addEventListener('keypress', e => { if (e.key === 'Enter') { e.preventDefault(); save(); } });
        };
    }

    [1, 2, 3].forEach(id => attachContato(id));
}

// Executa imediatamente se DOM já carregou, senão aguarda
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEditarNome);
} else {
    initEditarNome();
}
