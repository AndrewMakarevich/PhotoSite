export function deployComment(button) {
    console.log('Comment scale');
    const formatButtonSection = button.parentElement;
    const buttonSection = formatButtonSection.parentElement;
    const commentTextBlock = buttonSection.previousSibling;
    commentTextBlock.classList.toggle('fullSize');
    if (commentTextBlock.classList.contains('fullSize')) {
        return commentTextBlock.style.height = `${commentTextBlock.scrollHeight}px`;
    }
    return commentTextBlock.style.height = '75px';
}
export function deployReplyComment(button) {
    console.log('Reply comment scale');
    const formatButtonSection = button.parentElement;
    const buttonSection = formatButtonSection.parentElement;
    const replyCommentTextBlock = buttonSection.previousSibling;
    replyCommentTextBlock.classList.toggle('fullSize');
    if (replyCommentTextBlock.classList.contains('fullSize')) {
        return replyCommentTextBlock.style.height = `${replyCommentTextBlock.scrollHeight}px`;
    }
    return replyCommentTextBlock.style.height = '75px';
}