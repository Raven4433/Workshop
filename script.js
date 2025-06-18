document.addEventListener('DOMContentLoaded', () => {
    const workshopItemsSection = document.getElementById('workshop-items');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxPrevButton = document.getElementById('lightbox-prev');
    const lightboxNextButton = document.getElementById('lightbox-next');
    // const lightboxCloseButton = document.getElementById('lightbox-close'); // Not strictly needed as a global var due to event delegation

    let itemsData = [];
    let currentGalleryImages = [];
    let currentImageIndex = 0;

    function updateLightboxNavButtons() {
        if (!lightboxPrevButton || !lightboxNextButton) return;
        if (currentGalleryImages.length <= 1) {
            lightboxPrevButton.classList.add('hidden');
            lightboxNextButton.classList.add('hidden');
        } else {
            lightboxPrevButton.classList.remove('hidden');
            lightboxNextButton.classList.remove('hidden');
        }
    }

    function showNextImage() {
        if (!currentGalleryImages || currentGalleryImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        lightboxImage.src = currentGalleryImages[currentImageIndex];
    }

    function showPrevImage() {
        if (!currentGalleryImages || currentGalleryImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        lightboxImage.src = currentGalleryImages[currentImageIndex];
    }

    function formatDescription(text) {
        if (!text || text.trim() === '') return '<p></p>';

        let html = text;

        // 1. Handle **bold** text (non-greedy)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 2. Handle lists and paragraphs
        const lines = html.split('\n'); // Newlines from JSON are typically \n
        let outputHtml = '';
        let inList = false;

        for (let i = 0; i < lines.length; i++) {
            let lineContent = lines[i];
            // Regex to match list items like "  - item" or " * item"
            // It captures the indentation, the marker (- or *), and the item content.
            const listMatch = lineContent.match(/^(\s*)([-*])\s+(.*)/);

            if (listMatch) {
                const itemText = listMatch[3]; // Content of the list item
                if (!inList) {
                    outputHtml += '<ul>';
                    inList = true;
                }
                outputHtml += '<li>' + itemText + '</li>';
            } else {
                if (inList) {
                    outputHtml += '</ul>';
                    inList = false;
                }
                // Only wrap non-empty lines (after trimming) in <p> tags
                const trimmedLine = lineContent.trim();
                if (trimmedLine !== '') {
                     outputHtml += '<p>' + trimmedLine + '</p>';
                }
            }
        }

        if (inList) { // Close any unclosed list at the end of the text
            outputHtml += '</ul>';
        }

        if (outputHtml.trim() === '') return '<p></p>'; // If only whitespace lines, return empty p

        return outputHtml;
    }

    function renderWorkshopItems() {
        if (!workshopItemsSection) {
            console.error('Workshop items section not found in DOM.');
            return;
        }

        const templateCommentNode = Array.from(workshopItemsSection.childNodes).find(node => node.nodeType === Node.COMMENT_NODE && node.textContent.includes("ITEM STRUCTURE TEMPLATE"));
        const actualItemsCommentNode = Array.from(workshopItemsSection.childNodes).find(node => node.nodeType === Node.COMMENT_NODE && node.textContent.includes("Actual item listings will be generated here by script.js"));

        workshopItemsSection.innerHTML = '';

        if (templateCommentNode) {
            workshopItemsSection.appendChild(document.createComment(templateCommentNode.textContent.trim()));
        }

        if (!itemsData || itemsData.length === 0) {
            workshopItemsSection.innerHTML = '<p class="text-gray-500 text-center py-10">Jelenleg nincsenek megjeleníthető termékek, vagy hiba történt a betöltés során.</p>';
            if (actualItemsCommentNode) {
                workshopItemsSection.appendChild(document.createComment(actualItemsCommentNode.textContent.trim()));
            }
            return;
        }

        itemsData.forEach(item => {
            const itemArticle = document.createElement('article');
            itemArticle.className = 'mb-6 border border-gray-200 rounded-lg shadow-sm';

            let galleryHtml = '';
            const itemTitleForDataset = item.elnevezes || 'Termék kép';
            if (item.kepek && Array.isArray(item.kepek)) {
                item.kepek.forEach((imgSrc, index) => {
                    galleryHtml += `<img src="${imgSrc}" alt="${itemTitleForDataset} Kép ${index + 1}" data-idx="${index}" data-title="${itemTitleForDataset}" class="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity">`;
                });
            }

            const title = item.elnevezes || "Nincs elnevezés";
            const shortDesc = item.rovid_info || "";
            const rawLongDesc = item.reszletes_leiras || "Nincs részletes leírás.";
            const formattedLongDesc = formatDescription(rawLongDesc);
            const darabszam = item.darabszam; // Retrieve darabszam
            const arFt = item.ar_ft; // Retrieve ar_ft

            itemArticle.innerHTML = `
                <div class="item-header p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center">
                    <div class="flex-grow mr-4">
                        <h3 class="text-xl font-semibold text-gray-700">${title}</h3>
                        ${shortDesc ? `<p class="text-sm text-gray-500">${shortDesc}</p>` : ''}
                    </div>
                    <div class="item-meta text-sm text-gray-600 mr-4 text-right flex-shrink-0">
                        ${(darabszam !== undefined && darabszam !== null) ? `<p><span class="font-semibold">Darabszám:</span> ${darabszam} db</p>` : ''}
                        ${(arFt !== undefined && arFt !== null) ? `<p><span class="font-semibold">Ár:</span> ${new Intl.NumberFormat('hu-HU').format(arFt)} Ft</p>` : ''}
                    </div>
                    <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <div class="item-details p-4 border-t border-gray-200 hidden">
                    <div class="item-gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                        ${galleryHtml}
                    </div>
                    <div class="long-description-container text-gray-600">${formattedLongDesc}</div>
                </div>
            `;
            workshopItemsSection.appendChild(itemArticle);
        });

        if (actualItemsCommentNode) {
             workshopItemsSection.appendChild(document.createComment(actualItemsCommentNode.textContent.trim()));
        }
    }

    fetch('data/info/items.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}, failed to load data/info/items.json\`);
            }
            return response.json();
        })
        .then(data => {
            itemsData = data;
            renderWorkshopItems();
        })
        .catch(error => {
            console.error("Error fetching or parsing items.json:", error);
            itemsData = [];
            renderWorkshopItems();
        });

    if (lightboxPrevButton) lightboxPrevButton.addEventListener('click', showPrevImage);
    if (lightboxNextButton) lightboxNextButton.addEventListener('click', showNextImage);

    if (workshopItemsSection) {
        workshopItemsSection.addEventListener('click', function(event) {
            const itemHeader = event.target.closest('.item-header');
            if (itemHeader) {
                const itemDetails = itemHeader.nextElementSibling;
                const arrowIcon = itemHeader.querySelector('svg');
                if (itemDetails && itemDetails.classList.contains('item-details')) {
                    itemDetails.classList.toggle('hidden');
                    if (arrowIcon) arrowIcon.classList.toggle('rotate-180');
                    return;
                }
            }

            const clickedImage = event.target.closest('.item-gallery img');
            if (clickedImage && clickedImage.dataset.title !== undefined && clickedImage.dataset.idx !== undefined) {
                const itemTitleFromData = clickedImage.dataset.title;
                const imageIdx = parseInt(clickedImage.dataset.idx);

                const currentItem = itemsData.find(item => (item.elnevezes || 'Termék kép') === itemTitleFromData);

                if (currentItem && currentItem.kepek && currentItem.kepek.length > 0) {
                    currentGalleryImages = currentItem.kepek;
                    currentImageIndex = imageIdx;

                    if (currentImageIndex < 0 || currentImageIndex >= currentGalleryImages.length) {
                         currentImageIndex = 0;
                    }

                    lightboxImage.src = currentGalleryImages[currentImageIndex];
                    lightboxModal.classList.remove('hidden');
                    document.body.classList.add('overflow-hidden');
                    updateLightboxNavButtons();
                } else {
                    // Fallback for images not correctly tied via data-attributes (should be rare)
                    lightboxImage.src = clickedImage.src;
                    currentGalleryImages = [clickedImage.src];
                    currentImageIndex = 0;
                    lightboxModal.classList.remove('hidden');
                    document.body.classList.add('overflow-hidden');
                    updateLightboxNavButtons();
                }
            }
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(event) {
            if (event.target === lightboxModal || event.target.closest('#lightbox-close')) {
                lightboxModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
                lightboxImage.src = "";
                currentGalleryImages = [];
                currentImageIndex = 0;
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
            lightboxModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            lightboxImage.src = "";
            currentGalleryImages = [];
            currentImageIndex = 0;
        }
    });
});
