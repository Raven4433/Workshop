document.addEventListener('DOMContentLoaded', () => {
    const workshopItemsSection = document.getElementById('workshop-items');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCloseButton = document.getElementById('lightbox-close');

    // Placeholder data for workshop items
    const itemsData = [
        {
            title: "Heavy-Duty Wood Lathe",
            shortDesc: "Versatile lathe for various woodworking projects.",
            longDesc: "This robust wood lathe is perfect for both hobbyists and professionals. It features a powerful motor, variable speed control, and a sturdy cast iron bed. Comes with a set of basic chisels and a faceplate. Lightly used but in excellent working condition.",
            images: [
                "https://placehold.co/300x200/e0e0e0/333333?text=Lathe+View+1",
                "https://placehold.co/300x200/d0d0d0/333333?text=Lathe+View+2",
                "https://placehold.co/300x200/c0c0c0/333333?text=Lathe+View+3"
            ]
        },
        {
            title: "Industrial Band Saw",
            shortDesc: "Cuts through thick stock with ease.",
            longDesc: "A reliable industrial band saw known for its precision and durability. Features a large cutting capacity, tilting table, and blade tension indicator. Ideal for resawing, curve cutting, and general workshop use. Includes three extra blades.",
            images: [
                "https://placehold.co/300x200/e0e0e0/333333?text=Band+Saw+1",
                "https://placehold.co/300x200/d0d0d0/333333?text=Band+Saw+2",
            ]
        },
        {
            title: "Large Drill Press",
            shortDesc: "Precision drilling for wood and metal.",
            longDesc: "Floor-standing drill press with multiple speed settings and a laser guide for accuracy. Heavy-duty construction ensures stability. The worktable can be tilted and raised/lowered. Chuck key included. Excellent condition, minimal use.",
            images: [
                "https://placehold.co/300x200/e0e0e0/333333?text=Drill+Press+1",
                "https://placehold.co/300x200/d0d0d0/333333?text=Drill+Press+2",
                "https://placehold.co/300x200/c0c0c0/333333?text=Drill+Press+3",
                "https://placehold.co/300x200/b0b0b0/333333?text=Drill+Press+4"
            ]
        },
        {
            title: "Robust Iron Stand",
            shortDesc: "Heavy-duty adjustable height iron stand.",
            longDesc: "A very sturdy and heavy iron stand, likely for a grinder or other benchtop tool. Adjustable height mechanism is smooth. Some surface rust but structurally sound. Perfect for a workshop requiring a stable platform.",
            images: [
                "https://placehold.co/300x200/e0e0e0/333333?text=Iron+Stand"
            ]
        }
    ];

    function renderWorkshopItems() {
        if (!workshopItemsSection) return;

        // Clear previous items but keep the template comment if it exists
        const templateComment = Array.from(workshopItemsSection.childNodes).find(node => node.nodeType === Node.COMMENT_NODE && node.textContent.includes("ITEM STRUCTURE TEMPLATE"));
        const actualItemsComment = Array.from(workshopItemsSection.childNodes).find(node => node.nodeType === Node.COMMENT_NODE && node.textContent.includes("Actual item listings will be generated here by script.js"));

        workshopItemsSection.innerHTML = ''; // Clear existing content

        if (templateComment) {
            workshopItemsSection.appendChild(document.createComment(templateComment.textContent)); // Add template comment back
        }


        itemsData.forEach(item => {
            const itemArticle = document.createElement('article');
            itemArticle.className = 'mb-6 border border-gray-200 rounded-lg shadow-sm';

            let galleryHtml = '';
            item.images.forEach(imgSrc => {
                galleryHtml += `<img src="${imgSrc}" alt="${item.title} image" class="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-80">`;
            });

            itemArticle.innerHTML = `
                <div class="item-header p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-t-lg flex justify-between items-center">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-700">${item.title}</h3>
                        <p class="text-sm text-gray-500">${item.shortDesc}</p>
                    </div>
                    <svg class="w-6 h-6 text-gray-500 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <div class="item-details p-4 border-t border-gray-200 hidden">
                    <p class="text-gray-600 mb-4">${item.longDesc}</p>
                    <div class="item-gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        ${galleryHtml}
                    </div>
                </div>
            `;
            workshopItemsSection.appendChild(itemArticle);
        });

        if (actualItemsComment) {
             workshopItemsSection.appendChild(document.createComment(actualItemsComment.textContent)); // Add the "actual items" comment back
        }
    }

    renderWorkshopItems(); // Call the function to display items

    // Event delegation for item headers (collapsible sections)
    if (workshopItemsSection) {
        workshopItemsSection.addEventListener('click', function(event) {
            // Handle collapsible sections
            const itemHeader = event.target.closest('.item-header');
            if (itemHeader) {
                const itemDetails = itemHeader.nextElementSibling;
                const arrowIcon = itemHeader.querySelector('svg');

                if (itemDetails && itemDetails.classList.contains('item-details')) {
                    itemDetails.classList.toggle('hidden');
                    if (arrowIcon) {
                        arrowIcon.classList.toggle('rotate-180');
                    }
                    return;
                }
            }

            // Handle lightbox image clicks
            const clickedImage = event.target.closest('.item-gallery img');
            if (clickedImage && lightboxModal && lightboxImage) {
                lightboxImage.src = clickedImage.src;
                lightboxModal.classList.remove('hidden');
            }
        });
    }

    // Close lightbox
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(event) {
            if (event.target === lightboxModal || event.target === lightboxCloseButton || event.target.closest('#lightbox-close')) {
                lightboxModal.classList.add('hidden');
                lightboxImage.src = "";
            }
        });
    }

    // Keyboard support for lightbox (Escape key)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
            lightboxModal.classList.add('hidden');
            lightboxImage.src = "";
        }
    });
});
