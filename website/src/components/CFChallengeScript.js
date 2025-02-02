import React, { useEffect } from 'react';

const CFChallengeScript = () => {
  useEffect(() => {
    const jsCode = `
      window['__CF$cv$params'] = {
        r: '7a61f0e95b803814',
        m: 'IBut41gWsGbaLxZRvzIERhrlhydH5q886fv1C1D.5fc-1678518242-0-AWRxl3rXTXtEC9PXzDqjLWNbdQaDaKg9SFkY4S3oK0uP5y8SXG5c0Ghr2LxQ0t3v6IBlTwJgCLFNy3yZTV5mwdjPhU7TNr/7GTJHGwzeJLXSULQlSuH3zk6yHZ87nxcJpyt9T95npVEivvrtf1DUJGqr8GJmKX7LaZhLWDP1/XGu',
        s: [0x7101088741, 0x5093468aa3],
        u: '/cdn-cgi/challenge-platform/h/g'
      };

      var now = Date.now() / 1000,
          offset = 14400,
          ts = '' + (Math.floor(now) - Math.floor(now % offset)),
          _cpo = document.createElement('script');

      _cpo.nonce = '';
      _cpo.src = '../../cdn-cgi/challenge-platform/h/g/scripts/alpha/invisible5615.js?ts=' + ts;
      document.getElementsByTagName('head')[0].appendChild(_cpo);
    `;

    const iframe = document.createElement('iframe');
    iframe.height = 1;
    iframe.width = 1;
    iframe.style.position = 'absolute';
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const handler = () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDoc) {
        const script = iframeDoc.createElement('script');
        script.nonce = '';
        script.innerHTML = jsCode;
        iframeDoc.getElementsByTagName('head')[0].appendChild(script);
      }
    };

    if (document.readyState !== 'loading') {
      handler();
    } else if (window.addEventListener) {
      document.addEventListener('DOMContentLoaded', handler);
    } else {
      const prev = document.onreadystatechange || function () {};
      document.onreadystatechange = function (e) {
        prev(e);
        if (document.readyState !== 'loading') {
          document.onreadystatechange = prev;
          handler();
        }
      };
    }

    return () => {
      // Cleanup the iframe when the component is unmounted
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, []);

  return null;
};

export default CFChallengeScript;
