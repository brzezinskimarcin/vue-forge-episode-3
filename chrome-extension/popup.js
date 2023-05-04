window.addEventListener('DOMContentLoaded', async () => {
  const [currentTab] = await chrome.tabs.query({ currentWindow: true, active: true });
  const encodedUrl = encodeURIComponent(currentTab.url);
  const iframe = document.createElement('iframe');
  iframe.height = 500;
  iframe.width = 700;
  iframe.src = `http://localhost:3000/?url=${encodedUrl}&extension=true`;
  document.body.appendChild(iframe);
});
