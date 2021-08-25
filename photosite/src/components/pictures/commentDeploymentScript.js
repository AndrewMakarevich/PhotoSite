function deployComment() {
    const commentBlock = document.querySelector('.comments-section__leavedComments');
    commentBlock.addEventListener('click', (e) => {
        if (e.target.classList.contains("leavedComments-scaleCommentButton")) {
            const formatButtonSection = e.target.parentElement;
            const buttonSection = formatButtonSection.parentElement;
            const commentTextBlock = buttonSection.previousSibling;
            commentTextBlock.classList.toggle('fullSize');
            if (commentTextBlock.classList.contains('fullSize')) {
                return commentTextBlock.style.height = `${commentTextBlock.scrollHeight}px`;
            }
            return commentTextBlock.style.height = '75px';
        }
    });
}
export default deployComment;