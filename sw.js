const CACHE = "portfolio-u3-v1";
const ARQUIVOS = ["./", "./index.html"];
self.addEventListener("install", evento => {
evento.waitUntil(
caches.open(CACHE).then(cache => cache.addAll(ARQUIVOS))
);
});
self.addEventListener("activate", evento => {
evento.waitUntil(
caches.keys().then(chaves => Promise.all(
chaves.filter(chave =>
chave.startsWith("portfolio-u3-") && chave !== CACHE
).map(chave => caches.delete(chave))
))
);
});
self.addEventListener("fetch", evento => {
if (evento.request.method !== "GET") return;
if (new URL(evento.request.url).origin !== self.location.origin) return;
evento.respondWith(
caches.match(evento.request).then(resposta =>
resposta || fetch(evento.request)
)
);
});