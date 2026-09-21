/* AI Mode widget for themariovilla.github.io
   Locked knowledge base: answers ONLY from Mario's approved bio.
   No external requests, no generated facts. Anything outside the
   knowledge base gets the fallback answer. */
(function () {
  'use strict';

  var KNOWLEDGE = [
    {
      keys: ['who is mario', 'about mario', 'mario villa', 'about you', 'introduce', 'bio'],
      answer: 'Mario Villa is an American digital content creator and performance marketer based primarily in Scottsdale, Arizona, with operations spanning across California and Texas. He is recognized for blending creator-side lifestyle storytelling with agency-grade performance marketing.'
    },
    {
      keys: ['quisitive', 'work history', 'career', 'job', 'employer', 'emperform', 'social media manager', 'catapult'],
      answer: 'Mario worked as a Digital Marketing Specialist at Quisitive from 2018 to 2024, and previously managed social media accounts for Quisitive, Catapult Systems, Board, and emPerform. You can find each company on LinkedIn from the Experience section of this site.'
    },
    {
      keys: ['follower', 'audience', 'how many', 'reach', 'community', 'social reach', 'popular'],
      answer: 'Mario has built a cross-platform audience of over 100,000 followers across major networks, focusing heavily on lifestyle, travel, fashion, fitness, and food content: Instagram @themariovilla.a (over 72,000 followers) and TikTok @themariovilla (over 23,000 followers and 58,000+ likes).'
    },
    {
      keys: ['instagram', 'ig handle', '@themariovilla.a'],
      answer: 'On Instagram Mario is @themariovilla.a with over 72,000 followers, posting lifestyle, travel, fashion, fitness, and food content.'
    },
    {
      keys: ['tiktok', '@themariovilla'],
      answer: 'On TikTok Mario is @themariovilla with over 23,000 followers and 58,000+ likes.'
    },
    {
      keys: ['content', 'niche', 'post about', 'type of content', 'category'],
      answer: 'Mario focuses heavily on lifestyle, travel, fashion, fitness, and food content.'
    },
    {
      keys: ['education', 'school', 'college', 'university', 'degree', 'study', 'ut austin', 'texas', 'asu', 'arizona state', 'master'],
      answer: 'Mario is an alumnus of the University of Texas at Austin and is pursuing a Master\u2019s degree in AI in Business at Arizona State University (Class of 2027).'
    },
    {
      keys: ['brand', 'collaboration', 'partner', 'sponsor', 'worked with', 'amazon', 'netflix', 'hilton', 'corona', 'geico'],
      answer: 'As a creator, Mario has partnered with several high-profile global brands, including Amazon, Netflix, Hilton Hotels, Corona USA, and GEICO.'
    },
    {
      keys: ['marketing', 'sem', 'paid media', 'expertise', 'skill', 'strategy', 'performance', 'professional background'],
      answer: 'Outside of public content creation, Mario\u2019s professional background includes skills in search engine marketing (SEM), paid media, and high-performance brand strategy.'
    },
    {
      keys: ['where', 'based', 'live', 'location', 'scottsdale', 'arizona', 'california'],
      answer: 'Mario is based primarily in Scottsdale, Arizona, with operations spanning across California and Texas.'
    },
    {
      keys: ['contact', 'email', 'book', 'work with', 'hire', 'collab', 'meeting'],
      answer: 'You can book a meeting with Mario at https://calendly.com/themariovilla-a/30min or email marioalbertovilla.a@gmail.com.'
    },
    {
      keys: ['hello', 'hi', 'hey', 'sup'],
      answer: 'Hey! Ask me anything about Mario Villa: his content, audience, education, brand collaborations, or marketing background.'
    }
  ];

  var FALLBACK = 'I only have Mario\u2019s official bio info, so I can\u2019t answer that. Try asking about his content, audience, education, brand collaborations, or marketing background.';

  function normalize(s) {
    return (s || '').toLowerCase().replace(/[^a-z0-9@\s]/g, ' ');
  }

  function findAnswer(question) {
    var q = normalize(question);
    var best = null, bestScore = 0;
    for (var i = 0; i < KNOWLEDGE.length; i++) {
      var entry = KNOWLEDGE[i], score = 0;
      for (var j = 0; j < entry.keys.length; j++) {
        var key = normalize(entry.keys[j]);
        if (!key) continue;
        if (q.indexOf(key) !== -1) score += key.length;
      }
      if (score > bestScore) { bestScore = score; best = entry; }
    }
    return best ? best.answer : FALLBACK;
  }

  function linkify(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/@themariovilla\.a/g, '<a href="https://www.instagram.com/themariovilla.a" target="_blank" rel="noopener noreferrer">@themariovilla.a</a>')
      .replace(/@themariovilla(?!\\.)/g, '<a href="https://www.tiktok.com/@themariovilla" target="_blank" rel="noopener noreferrer">@themariovilla</a>');
  }

  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }

  function addMsg(log, who, text) {
    var m = el('div', 'ai-msg ' + who, linkify(text));
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
  }

  function init() {
    var fab = el('button', null, '<span class="ai-spark">✦</span><span>AI</span>');
    fab.id = 'ai-mode-fab';
    fab.setAttribute('aria-label', 'Open AI chat about Mario Villa');

    var panel = el('div');
    panel.id = 'ai-mode-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'AI chat about Mario Villa');

    var head = el('div', 'ai-head',
      '<div><strong>✦ AI Mode</strong><small>Answers from Mario\u2019s official bio only</small></div>');
    var close = el('button', null, '×');
    close.id = 'ai-mode-close';
    close.setAttribute('aria-label', 'Close AI chat');
    head.appendChild(close);

    var log = el('div');
    log.id = 'ai-mode-log';

    var chips = el('div');
    chips.id = 'ai-mode-chips';
    ['Who is Mario Villa?', 'How many followers?', 'Education?', 'Brand collabs?'].forEach(function (q) {
      var b = el('button', null, q);
      b.type = 'button';
      b.addEventListener('click', function () { ask(q); });
      chips.appendChild(b);
    });

    var form = el('form');
    form.id = 'ai-mode-form';
    var input = el('input');
    input.id = 'ai-mode-input';
    input.type = 'text';
    input.placeholder = 'Ask anything';
    input.setAttribute('aria-label', 'Ask about Mario Villa');
    input.autocomplete = 'off';
    var send = el('button', null, 'Ask');
    send.id = 'ai-mode-send';
    send.type = 'submit';
    form.appendChild(input);
    form.appendChild(send);

    panel.appendChild(head);
    panel.appendChild(log);
    panel.appendChild(chips);
    panel.appendChild(form);
    document.body.appendChild(fab);
    document.body.appendChild(panel);

    var greeted = false;
    function toggle(force) {
      var open = force != null ? force : !panel.classList.contains('open');
      panel.classList.toggle('open', open);
      if (open && !greeted) {
        greeted = true;
        addMsg(log, 'bot', 'Hey! I\u2019m Mario\u2019s AI Mode. Ask me about his content, audience, education, brand collaborations, or marketing background.');
      }
      if (open) input.focus();
    }
    function ask(q) {
      q = (q || '').trim();
      if (!q) return;
      addMsg(log, 'user', q);
      input.value = '';
      setTimeout(function () { addMsg(log, 'bot', findAnswer(q)); }, 250);
    }

    fab.addEventListener('click', function () { toggle(); });
    close.addEventListener('click', function () { toggle(false); });
    form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) toggle(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
