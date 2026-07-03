(function () {
    // Se tiver ?premium=true na URL, não mostra marca d'água
    if (new URLSearchParams(window.location.search).get('premium') === 'true') return;

    var style = document.createElement('style');
    style.textContent = `
        #wm-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }
        #wm-overlay span {
            position: absolute;
            font-family: Inter, sans-serif;
            font-size: 15px;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.13);
            white-space: nowrap;
            transform: rotate(-35deg);
            transform-origin: center center;
            user-select: none;
        }
        #wm-banner {
            position: fixed;
            bottom: 70px;
            left: 0; right: 0;
            margin: 0 16px;
            background: rgba(0,0,0,0.82);
            color: #fff;
            font-family: Inter, sans-serif;
            font-size: 13px;
            font-weight: 500;
            text-align: center;
            padding: 10px 16px;
            border-radius: 12px;
            z-index: 10000;
            pointer-events: none;
            letter-spacing: 0.1px;
        }
        #wm-banner strong {
            color: #FFE600;
        }
    `;
    document.head.appendChild(style);

    // Marca d'água de fundo
    var overlay = document.createElement('div');
    overlay.id = 'wm-overlay';
    document.body.appendChild(overlay);

    var text = 'feito por @guhhh_44';
    var stepX = 160;
    var stepY = 80;

    for (var y = -100; y < window.innerHeight + 200; y += stepY) {
        for (var x = -100; x < window.innerWidth + 200; x += stepX) {
            var span = document.createElement('span');
            span.textContent = text;
            span.style.left = x + 'px';
            span.style.top = y + 'px';
            overlay.appendChild(span);
        }
    }

    // Banner inferior
    var banner = document.createElement('div');
    banner.id = 'wm-banner';
    banner.innerHTML = 'Adquira a <strong>versão premium</strong> para liberar sem marca d\'água';
    document.body.appendChild(banner);
})();
