// 나의 기록 V-log - Service Worker v3 (자동 업데이트 지원)
const CACHE_VERSION = 'v3';
const CACHE_NAME = 'vlog-' + CACHE_VERSION;

// 정적 자산만 미리 캐시 (HTML은 캐시 안 함)
const CORE_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 설치: 새 SW 즉시 활성화 대기 안 함
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting(); // 옛 SW 강제 교체
});

// 활성화: 옛 캐시 모두 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      ),
      self.clients.claim()
    ])
  );
});

// 요청 가로채기: 전략 분기
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Supabase 등 외부 API는 캐시 안 함 (항상 네트워크)
  if (url.hostname.includes('supabase') || url.hostname.includes('kakao')) {
    return;
  }

  // HTML 페이지는 network-first (항상 최신 버전 시도)
  if (event.request.mode === 'navigate' ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('/') ||
      url.pathname === '') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 성공하면 캐시 업데이트
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 정적 자원: stale-while-revalidate (캐시 우선 + 백그라운드 갱신)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});
