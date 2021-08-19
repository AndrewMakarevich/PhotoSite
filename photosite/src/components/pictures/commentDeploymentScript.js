function deployComment() {
    const commentBlock = document.querySelector('.comments-section__leavedComments');
    commentBlock.addEventListener('click', (e) => {
        if (e.target.classList.contains("leavedComments-scaleComment")) {
            e.target.previousSibling.classList.toggle('fullSize');
        }
    });
}
export default deployComment;