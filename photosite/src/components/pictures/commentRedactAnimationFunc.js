export function redactComment(button) {
    const formatButtonSection = button.parentElement;
    const buttonSection = formatButtonSection.parentElement;
    const textarea = buttonSection.parentElement.querySelector('.leavedComments-commentBlock__comment');
    const postChangesButton = buttonSection.querySelector('.leavedComments-commentBlock__postButton');
    textarea.toggleAttribute('readonly');
    textarea.classList.toggle('commentBlockToEdit');
    postChangesButton.classList.toggle('disabledButton');
};
export function redactReplyComment(button) {
    const formatButtonSection = button.parentElement;
    const buttonSection = formatButtonSection.parentElement;
    const textarea = buttonSection.parentElement.querySelector('.leavedReplyComments-replyCommentBlock__replyComment');
    const postChangesButton = buttonSection.querySelector('.replyCommentBlock__buttonsBlock-postButton');
    textarea.toggleAttribute('readonly');
    textarea.classList.toggle('commentBlockToEdit');
    postChangesButton.classList.toggle('disabledButton');
}