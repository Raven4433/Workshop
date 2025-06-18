let currentItemImages = [];
let currentImageIndex = 0;
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const lightboxPrevBtn = document.getElementById('lightbox-prev');
const lightboxNextBtn = document.getElementById('lightbox-next');
const lightboxCaption = document.getElementById('lightbox-caption'); // Added

document.addEventListener('DOMContentLoaded', () => {
  const workshopItemsContainer = document.getElementById('workshop-items');

  if (!workshopItemsContainer) {
    console.error('Workshop items container not found!');
    return;
  }

  // Event Listeners for Lightbox Controls
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  } else {
    console.warn('Lightbox close button not found');
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
      }
    });
  } else {
    console.warn('Lightbox previous button not found');
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      if (currentImageIndex < currentItemImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
      }
    });
  } else {
    console.warn('Lightbox next button not found');
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (event) => {
      if (event.target === lightboxModal) { // Check if the click is on the backdrop itself
        closeLightbox();
      }
    });
  } else {
    console.warn('Lightbox modal element not found');
  }

  fetch('data/info/items.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(items => {
      displayItems(items);
    })
    .catch(error => {
      console.error('Error fetching or parsing item data:', error);
      workshopItemsContainer.innerHTML = '<p class="text-red-500">Hiba történt az áruk betöltése közben.</p>';
    });

  function displayItems(items) {
    if (!items || items.length === 0) {
      workshopItemsContainer.innerHTML = '<p>Jelenleg nincsenek megjeleníthető áruk.</p>';
      return;
    }

    items.forEach(item => {
      const itemElement = document.createElement('article');
      itemElement.className = 'bg-white rounded-lg shadow-lg overflow-hidden mb-6'; // Base item styling

      // Format price
      const formattedPrice = item.ar_ft.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0, maximumFractionDigits: 0 });

      // Format darabszam with bold for the number and "db"
      const darabszamText = `Darabszám: <strong>${item.darabszam} db</strong>`;

      // Collapsed View HTML
      itemElement.innerHTML = `
        <div class="item-header p-6 border-b border-gray-200 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div class="flex justify-between items-center"> <!-- Changed items-start to items-center for overall vertical alignment -->
            <div class="flex-grow mr-4"> <!-- Added wrapper for name and short info to control their spacing -->
              <h3 class="text-xl md:text-2xl font-semibold text-gray-900">${item.elnevezes}</h3>
              <p class="text-sm text-gray-500 mt-1">${item.rovid_info}</p> <!-- mt-2 to mt-1 -->
            </div>
            <div class="right-group flex items-center space-x-3 flex-shrink-0"> <!-- New group for qty, price, arrow -->
              <div class="text-right">
                <span class="text-xs sm:text-sm text-gray-500 block">${darabszamText}</span>
                <p class="text-lg sm:text-xl font-bold text-accent">${formattedPrice}</p>
              </div>
              <span class="arrow-icon text-accent text-xl transform transition-transform duration-300">▼</span>
            </div>
          </div>
        </div>
        <div class="item-details p-5 hidden bg-gray-50 border-t border-gray-200">
          <div class="image-gallery-placeholder mb-4 p-4 border border-dashed border-gray-300 rounded-md">
            <!-- Content will be replaced by JS -->
          </div>
          <div class="detailed-description-placeholder p-4 border border-dashed border-gray-300 rounded-md">
            <p class="text-sm text-gray-500 italic">Részletes leírás itt lesz...</p>
            <!-- Detailed description will be populated by JS -->
          </div>
        </div>
      `;

      // --- Start of new code for collapsible functionality ---
      const header = itemElement.querySelector('.item-header');
      const details = itemElement.querySelector('.item-details');
      const arrow = itemElement.querySelector('.arrow-icon');

      if (header && details && arrow) {
        header.addEventListener('click', () => {
          details.classList.toggle('hidden');
          arrow.classList.toggle('rotate-180'); // Tailwind class for 180-degree rotation
        });
      } else {
        console.warn('Could not find header, details, or arrow for an item:', item.elnevezes);
      }
      // --- End of new code for collapsible functionality ---

      // --- Start of new code for image gallery ---
      const galleryPlaceholder = itemElement.querySelector('.image-gallery-placeholder');
      if (galleryPlaceholder) {
        if (item.kepek && item.kepek.length > 0) {
          galleryPlaceholder.innerHTML = ''; // Clear placeholder text
          galleryPlaceholder.className = 'image-gallery grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4'; // Apply grid styling

          item.kepek.forEach((imageSrc, index) => {
            const thumbContainer = document.createElement('div');
            thumbContainer.className = 'aspect-square bg-gray-200 rounded overflow-hidden cursor-pointer hover:opacity-75 transition-opacity';
            const thumbImage = document.createElement('img');
            thumbImage.src = imageSrc;
            thumbImage.alt = `${item.elnevezes} - kép ${index + 1}`;
            thumbImage.className = 'w-full h-full object-cover';

            thumbImage.addEventListener('click', () => {
              openLightbox(item.kepek, index, item.elnevezes);
            });

            thumbContainer.appendChild(thumbImage);
            galleryPlaceholder.appendChild(thumbContainer);
          });
        } else {
          galleryPlaceholder.innerHTML = '<p class="text-sm text-gray-500 italic">Nincsenek képek ehhez az áruhoz.</p>';
          galleryPlaceholder.className = 'image-gallery-placeholder mb-4 p-4 border border-dashed border-gray-300 rounded-md text-center'; // Keep some placeholder styling
        }
      }
      // --- End of new code for image gallery ---

      // --- Start of new code for detailed description ---
      const descriptionPlaceholder = itemElement.querySelector('.detailed-description-placeholder');
      if (descriptionPlaceholder) {
        if (item.reszletes_leiras && item.reszletes_leiras.length > 0) {
          descriptionPlaceholder.innerHTML = ''; // Clear placeholder text
          descriptionPlaceholder.className = 'detailed-description prose prose-sm max-w-none leading-loose'; // Using Tailwind Typography plugin classes

          let htmlContent = '';
          let inList = false;

          item.reszletes_leiras.forEach(line => {
            let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            if (processedLine.trim().startsWith('- ') || processedLine.trim().startsWith('* ')) {
              if (!inList) {
                htmlContent += '<ul>';
                inList = true;
              }
              htmlContent += `<li>${processedLine.trim().substring(2)}</li>`;
            } else {
              if (inList) {
                htmlContent += '</ul>';
                inList = false;
              }
              htmlContent += `<p>${processedLine}</p>`;
            }
          });

          if (inList) { // Close any open list
            htmlContent += '</ul>';
          }
          descriptionPlaceholder.innerHTML = htmlContent;

        } else {
          descriptionPlaceholder.innerHTML = '<p class="text-sm text-gray-500 italic">Nincs részletes leírás ehhez az áruhoz.</p>';
          descriptionPlaceholder.className = 'detailed-description-placeholder p-4 border border-dashed border-gray-300 rounded-md text-center';
        }
      }
      // --- End of new code for detailed description ---
      workshopItemsContainer.appendChild(itemElement);
    });
  }

  function openLightbox(images, index, itemName) {
    currentItemImages = images;
    currentImageIndex = index;
    if (lightboxModal) {
      lightboxModal.classList.remove('hidden');
    } else {
      console.error("Lightbox modal element not found in openLightbox");
      return;
    }
    updateLightboxImage();
    // Add event listener for Escape key
    document.addEventListener('keydown', handleEscapeKey);
  }

  function updateLightboxImage() {
    if (currentItemImages.length === 0 || !lightboxImage || !lightboxCaption || !lightboxPrevBtn || !lightboxNextBtn) {
      console.warn("Lightbox elements not found or no images to display.");
      if (lightboxModal && !currentItemImages.length) lightboxModal.classList.add('hidden'); // Hide modal if no images
      return;
    }
    lightboxImage.src = currentItemImages[currentImageIndex];
    lightboxImage.alt = `Nagyított kép ${currentImageIndex + 1} / ${currentItemImages.length}`; // Alt text update
    lightboxCaption.textContent = `${currentImageIndex + 1} / ${currentItemImages.length}`; // Caption update
    lightboxPrevBtn.classList.toggle('hidden', currentItemImages.length <= 1 || currentImageIndex === 0);
    lightboxNextBtn.classList.toggle('hidden', currentItemImages.length <= 1 || currentImageIndex === currentItemImages.length - 1);
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.add('hidden');
    } else {
      console.error("Lightbox modal element not found in closeLightbox");
    }
    // Remove event listener for Escape key
    document.removeEventListener('keydown', handleEscapeKey);
  }

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  }
});
