// Script para editar nome do usuário
document.addEventListener('DOMContentLoaded', function() {
    const userName = document.getElementById('user-name');
    if (!userName) return;
    
    // Carrega nome salvo
    const savedName = localStorage.getItem('mp_user_name');
    if (savedName) userName.textContent = savedName;

    // Torna clicável
    userName.style.cursor = 'pointer';

    function attachClickHandler(element) {
        element.addEventListener('click', function() {
            const currentName = element.textContent.trim();
            
            // Cria input
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentName;
            input.style.cssText = 'font-size: 15px; font-weight: 600; color: #1A1A1A; background: rgba(255,255,255,0.95); border: 2px solid #4361EE; border-radius: 6px; padding: 2px 6px; outline: none; font-family: Inter, sans-serif; width: 120px;';
            
            // Substitui span por input
            element.replaceWith(input);
            input.focus();
            input.select();

            function save() {
                const newName = input.value.trim() || 'Gustavo';
                localStorage.setItem('mp_user_name', newName);
                
                // Cria novo span
                const newSpan = document.createElement('span');
                newSpan.id = 'user-name';
                newSpan.style.cursor = 'pointer';
                newSpan.textContent = newName;
                
                // Substitui input por span
                input.replaceWith(newSpan);
                
                // Reanexa o handler
                attachClickHandler(newSpan);
            }

            input.addEventListener('blur', save);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    save();
                }
            });
        });
    }

    attachClickHandler(userName);
});
