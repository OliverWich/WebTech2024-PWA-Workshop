if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js").then((_registration) => {
        console.log('ServiceWorker registered 🥳');
    })
}
