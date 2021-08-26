

export function showReplyComments(button) {
    const formatButtonsBlock = button.parentElement;
    const buttonsBlock = formatButtonsBlock.parentElement;
    const replyCommentsBlock = buttonsBlock.nextSibling;
    replyCommentsBlock.classList.toggle('hidden');
}