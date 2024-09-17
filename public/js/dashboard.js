document.getElementById('show-post-form').addEventListener('click', function () {
    const postForm = document.getElementById('new-post-form');
    const button = document.getElementById('show-post-form');

    if (postForm.style.display === 'none') {
        postForm.style.display = 'block';
        button.textContent = 'Cancel';
    } else {
        postForm.style.display = 'none';
        button.textContent = 'Create a New Blog Post';
    }
})