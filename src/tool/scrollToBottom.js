export function scrollToBottom() {
    if (isUserNearBottom()) {
        (function smoothscroll() {
            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            const scrollHeight = document.documentElement.scrollHeight;
            if (scrollHeight - 10 > currentScroll + clientHeight) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
            }
        })();
    }
}

function isUserNearBottom() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const threshold = 50; // 可以根据需要自行调整，用于判断用户是否在页面底部附近

    return (scrollHeight - currentScroll - clientHeight) <= threshold;
}
