function redactComment(button) {
    const formatButtonSection = button.parentElement;
    const buttonSection = formatButtonSection.parentElement;
    const textarea = buttonSection.parentElement.querySelector('.leavedComments-commentBlock__comment');
    const postChangesButton = buttonSection.querySelector('.leavedComments-commentBlock__postButton');
    textarea.toggleAttribute('readonly');
    textarea.classList.toggle('commentBlockToEdit');
    postChangesButton.classList.toggle('disabledButton');
}
export default redactComment;