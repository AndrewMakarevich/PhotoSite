function showPictureModal() {
    const pictureList = document.querySelector('.pictureList');
    pictureList.addEventListener('click', (e) => {
        if (e.target.className === "pictureItem-section-modalPointer") {
            const modalWindow = document.querySelector('.picture-modal');
            modalWindow.classList.toggle('hidden');

            modalWindow.addEventListener('click', (e) => {
                if (e.target.className === "modal-mainLayer_block-closeButton") {
                    modalWindow.classList.add('hidden');
                } else if (e.target.className === "modal-mainLayer") {
                    modalWindow.classList.add('hidden');
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                    modalWindow.classList.add('hidden');
                }
            });

        }
    });
}
export default showPictureModal;