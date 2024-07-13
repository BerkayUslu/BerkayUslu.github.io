document.addEventListener('DOMContentLoaded', function() {
    const emailIcon = document.getElementById('email-icon');
    const emailAddress = document.getElementById('email-address');
    
    emailIcon.addEventListener('click', function(event) {
        event.preventDefault();
        emailAddress.style.display = (emailAddress.style.display === 'none' || emailAddress.style.display === '') ? 'inline' : 'none';
    });

    const toggleButtons = document.querySelectorAll('.toggle-video');

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const projectCard = button.closest('.project-card');
            const videoContainer = projectCard.querySelector('.video-container');
            const imageContainer = projectCard.querySelector('.image-container');
            const video = projectCard.querySelector('.project-video');

            const isVideoVisible = videoContainer.style.display === 'block';
            if (isVideoVisible) {
                videoContainer.style.display = 'none';
                imageContainer.style.display = 'block';
                button.textContent = 'Show Video';

                const videoSrc = video.src;
                video.src = '';
                video.src = videoSrc;
            } else {
                videoContainer.style.display = 'block';
                imageContainer.style.display = 'none';
                button.textContent = 'Hide Video';
            }
        });
    });
});
