document.addEventListener('DOMContentLoaded', function () {
    const posts = document.querySelectorAll('#post-info');
    posts.forEach(function (post) {
        const cover = post.getAttribute('data-cover');
        if (cover) {
            post.style.backgroundImage = `url(${cover})`;
        }
    });
});