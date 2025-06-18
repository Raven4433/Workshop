document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('dynamic-workshop-items');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentItemImages = [];
    let currentImageIndex = 0;

    async function fetchItems() {
        try {
            const response = await fetch('data/info/items.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const items = await response.json();
            renderItems(items);
        } catch (error) {
            console.error("Could not fetch items:", error);
            if (itemsContainer) {
                itemsContainer.innerHTML = '<p class="text-red-500 text-center">Failed to load workshop items. Please try again later.</p>';
            }
        }
    }

    function renderItems(items) {
        if (!itemsContainer) {
            console.error("Items container not found");
            return;
        }
        itemsContainer.innerHTML = ''; // Clear any existing content (e.g., placeholders)

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'bg-white p-6 rounded-lg shadow-xl border border-gray-200 workshop-item';

            // Item Header
            const header = document.createElement('div');
            header.className = 'flex justify-between items-center cursor-pointer item-header';

            const headerText = document.createElement('div');
            headerText.innerHTML = `
                <h3 class="text-2xl font-semibold text-gray-800">${item.elnevezes}</h3>
                <p class="text-gray-700 mt-1 text-sm">${item.darabszam} db - ${item.ar_ft} Ft</p>
            `;

            const arrow = document.createElement('span');
            arrow.className = 'custom-arrow transform transition-transform duration-300';

            header.appendChild(headerText);
            header.appendChild(arrow);

            // Item Content (initially hidden)
            const content = document.createElement('div');
            content.className = 'item-content mt-6 hidden space-y-4';

            // Image Gallery
            if (item.kepek && item.kepek.length > 0) {
                const galleryContainer = document.createElement('div');
                galleryContainer.className = 'image-gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4';
                item.kepek.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src; // Assuming these are thumbnail URLs if different from full
                    img.alt = `${item.elnevezes} - Image ${index + 1}`;
                    img.className = 'w-full h-32 object-cover rounded-md shadow-sm cursor-pointer image-gallery-thumbnail';
                    img.addEventListener('click', () => openLightbox(item.kepek, index));
                    galleryContainer.appendChild(img);
                });
                content.appendChild(galleryContainer);
            }

            // Detailed Description
            if (item.reszletes_leiras && item.reszletes_leiras.length > 0) {
                const descriptionContainer = document.createElement('div');
                descriptionContainer.className = 'text-gray-700 prose max-w-none'; // Tailwind prose for nice typography

                let currentList = null;
                item.reszletes_leiras.forEach(line => {
                    if (line.startsWith('- ') || line.startsWith('* ')) {
                        if (!currentList) {
                            currentList = document.createElement('ul');
                            currentList.className = 'list-disc list-inside';
                            descriptionContainer.appendChild(currentList);
                        }
                        const li = document.createElement('li');
                        li.innerHTML = processBoldText(line.substring(2));
                        currentList.appendChild(li);
                    } else {
                        currentList = null; // Reset list if a non-list item appears
                        const p = document.createElement('p');
                        p.innerHTML = processBoldText(line);
                        descriptionContainer.appendChild(p);
                    }
                });
                content.appendChild(descriptionContainer);
            }

            itemElement.appendChild(header);
            itemElement.appendChild(content);
            itemsContainer.appendChild(itemElement);

            // Collapsible logic
            header.addEventListener('click', () => {
                content.classList.toggle('hidden');
                arrow.classList.toggle('expanded'); // Assumes 'expanded' rotates the arrow
            });
        });
    }

    function processBoldText(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    function openLightbox(images, index) {
        if (!lightbox || !lightboxImage) return;
        currentItemImages = images;
        currentImageIndex = index;
        lightboxImage.src = currentItemImages[currentImageIndex];
        lightbox.classList.add('active');
        updateLightboxNav();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
    }

    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            lightboxImage.src = currentItemImages[currentImageIndex];
            updateLightboxNav();
        }
    }

    function showNextImage() {
        if (currentImageIndex < currentItemImages.length - 1) {
            currentImageIndex++;
            lightboxImage.src = currentItemImages[currentImageIndex];
            updateLightboxNav();
        }
    }

    function updateLightboxNav() {
        if (!lightboxPrev || !lightboxNext) return;
        lightboxPrev.disabled = currentImageIndex === 0;
        lightboxNext.disabled = currentImageIndex === currentItemImages.length - 1;
        lightboxPrev.classList.toggle('opacity-50', currentImageIndex === 0);
        lightboxNext.classList.toggle('opacity-50', currentImageIndex === currentItemImages.length - 1);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Initial fetch and render
    fetchItems();
});
// Force re-save - 2024-03-15T12:00:00.000Z
