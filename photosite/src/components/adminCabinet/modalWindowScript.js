function toggleModalWindow() {
    const modal = document.querySelector('.AddTypeModalWindow-mainLayer');
    const openButton = document.querySelector('.openAddTypeModalButton');
    const closeButton = modal.querySelector('.closeButton');
    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    openButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
            }
        });
        modal.addEventListener('click', (e) => {
            if (e.target.className === "AddTypeModalWindow-mainLayer") {
                modal.classList.add('hidden');
            }
        });
    });
}
export default toggleModalWindow;