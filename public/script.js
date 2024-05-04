(function (w, d, s, o, f, js, fjs) {
  w['Simple-Widget'] = o;
  w[o] =
    w[o] ||
    function () {
      (w[o].q = w[o].q || []).push(arguments);
    };
  (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
  js.id = o;
  js.src = f;
  js.async = 1;
  fjs.parentNode.insertBefore(js, fjs);
})(
  window,
  document,
  'script',
  'w1',
  'https://magicform-widget-assets.s3.us-west-2.amazonaws.com/widget.js'
);
w1('init', {
  popUpTimer: 3000,
  imageUrl: 'chatbot.png',
  chatHeight: 'max(431px,30vh)',
  chatWidth: '371px',
  placeholder: 'Type a message...',
  title: 'EngageGPT Bot',
  subtitle: 'Typically Responds in 5 Seconds',
  widgetType: 'bubble',
  targetElementId: 'magicform-root',
  stackId: 'stack_2faa4b81-19a9-4a94-9980-dffec18af460',
  userId: '83ca304d-efcc-41f3-ba02-98baebce184c',
  colors: { main: '', userMessageBubble: '#00335a' },
});

!(function (c, h, i, m, p) {
  (m = c.createElement(h)),
    (p = c.getElementsByTagName(h)[0]),
    (m.async = 1),
    (m.src = i),
    p.parentNode.insertBefore(m, p);
})(
  document,
  'script',
  'https://chimpstatic.com/mcjs-connected/js/users/48b3753daa4f663e09e2e5a3f/c3ecddfc2e066e14ebd231668.js'
);
