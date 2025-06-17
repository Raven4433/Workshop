# Workshop

Website Development Plan: Workshop Item Showcase
Overall Goal: To create a modern, simple, and responsive static website to showcase used workshop items for sale. The site will feature a main header with an image, followed by a list of items with collapsible details and image galleries, designed for easy content updates via Google Jules.
Phase 1: Foundational Design & Technology Choices
•	Technology Stack:
o	HTML: For the basic structure and content.
o	Tailwind CSS: For all styling, ensuring a modern, simple, and fully responsive design.
o	JavaScript: For interactive elements like collapsible sections and the image lightbox.
•	Design Principles:
o	Modern & Simple: Clean lines, ample whitespace, and intuitive layout.
o	Light Mode Default: The primary color scheme will be light.
o	Accent Color: A soft, muted blue (#60A5FA - Tailwind's blue-400 equivalent) will be used for interactive elements, borders, or subtle highlights.
o	Font: "Inter" will be the primary font, loaded via Google Fonts.
o	Fully Responsive: The layout will adapt seamlessly to mobile, tablet, and desktop screens using Tailwind's responsive utilities.
•	Hosting:
o	GitHub Pages: User will create a GitHub repository, push the generated static files, and configure GitHub Pages for deployment.
Phase 2: Core Website Structure (HTML, CSS, JS)
Jules will generate the initial code with placeholder content.
1.	HTML Document Setup (index.html):
o	Standard HTML5 boilerplate.
o	<meta name="viewport" content="width=device-width, initial-scale=1.0"> for responsiveness.
o	Link to Tailwind CSS CDN.
o	Link to Google Fonts for "Inter".
o	Link to the main JavaScript file (script.js) at the end of the <body>.
2.	Main Layout Container:
o	A central, responsive container (max-w-7xl mx-auto p-4 or similar Tailwind classes) to house all content, ensuring good margins on larger screens.
3.	Header Section:
o	Large Hero Image: A placeholder image (https://placehold.co/1200x400/cccccc/000000?text=Workshop+Header) will be used initially. This image will span the full width of the content area.
o	Title: A prominent 'h1' tag with a placeholder title (e.g., "Quality Workshop Tools for Sale").
o	Introduction Text: A brief p tag with a placeholder introductory sentence.
o	Styling: Centered text, appropriate padding, and modern typography.
4.	Workshop Items Section:
o	This section will contain the list of individual items.
o	Each item will be structured as a collapsible component.
5.	Contact Section (Placeholder):
o	A simple section with placeholder text for contact information (e.g., "Contact us to inquire about items.").
6.	Footer Section (Placeholder):
o	A minimal footer with copyright placeholder text.
Phase 3: Interactive Components (JavaScript & HTML Structure per Item)
Jules will implement the necessary JavaScript for interactivity.
1.	Individual Item Structure (HTML):
o	Each item will be enclosed in a div or article element.
o	Collapsed View:
	A header (h2 or h3) for the item title.
	A short, one-liner description (p tag).
	An indicator (e.g., an arrow icon) to show it's collapsible.
	Styling to make the header clickable and visually distinct when collapsed.
o	Expanded View:
	A hidden div that becomes visible when the item is expanded.
	Detailed Description: A longer p tag or multiple p tags.
	Image Gallery:
	A grid or flex container for thumbnails.
	Each thumbnail will be an <img> tag with appropriate width/height and object-cover Tailwind classes.
	Clicking a thumbnail will trigger the lightbox.
2.	JavaScript for Collapsible Sections (script.js):
o	Event listeners attached to each item's header.
o	Function to toggle a CSS class (e.g., hidden or max-h-0 with transition) on the detailed description/gallery container to show/hide it.
o	Logic to rotate an arrow icon to indicate expanded/collapsed state.
3.	JavaScript for Image Lightbox (script.js):
o	A single, reusable modal/overlay element will be created in the HTML (initially hidden).
o	Event listeners on all image thumbnails.
o	When a thumbnail is clicked:
	The full-size image (src) of the clicked thumbnail will be loaded into an <img> tag within the modal.
	The modal will be made visible (e.g., fixed, inset-0, bg-black/75, flex, justify-center, items-center).
	A close mechanism will be implemented (e.g., clicking outside the image in the overlay, or an explicit close button).
	Keyboard support (e.g., Escape key to close).
Phase 4: Initial Content Generation (Placeholders)
Jules will generate the very first version of the site with placeholder content.
•	Header: Placeholder image and text.
•	Items: Create 3-4 distinct placeholder items to demonstrate the structure.
o	Each item will have a generic title (e.g., "Heavy-Duty Wood Lathe", "Industrial Band Saw", "Large Drill Press", "Robust Iron Stand").
o	A short, one-liner description for the collapsed state.
o	A multi-paragraph, detailed description for the expanded state.
o	For each item, include 3-4 placeholder images using https://placehold.co/ URLs with varying sizes/aspect ratios to simulate a real gallery. These will be small thumbnails that enlarge via the lightbox.
Phase 5: Content Management Workflow (Jules as CMS)
This section clearly defines how the user will interact with Jules to update the website's content after the initial generation.
•	User Action: User initiates a request to Jules.
•	Request Types:
o	Add New Item: User provides:
	Item Title (e.g., "My New Item")
	Short Description (e.g., "A versatile tool...")
	Detailed Description (full text, paragraphs)
	List of Image URLs (User must first upload images to their GitHub repo or another public host and provide the full, publicly accessible URLs).
o	Update Existing Item: User specifies:
	Item Title to identify (e.g., "Heavy-Duty Wood Lathe").
	Which field(s) to update (e.g., "new short description," "new detailed description," "new image URLs," "add more images," "remove specific images").
	New content for the specified field(s), including new image URLs if applicable.
o	Delete Item: User specifies the Item Title to be removed from the site.
o	Update Header/Footer/Contact Info: User provides new text or image URL for these sections.
•	Jules' Action:
o	Jules will parse the user's request.
o	Jules will regenerate the complete index.html and script.js files with the requested changes.
o	Jules will provide these updated files in a new immersive code block.
•	User's Deployment Action:
o	User downloads the updated index.html and script.js files from Jules.
o	User uploads these files (along with any newly provided image files) to their GitHub repository.
o	GitHub Pages will automatically rebuild and deploy the updated site.
Phase 6: Deployment Instructions (for User)
Jules will provide concise instructions on how the user can deploy the generated code to GitHub Pages.
1.	Create GitHub Repository: Guide on creating a new public GitHub repository (if not already done).
2.	Upload Files: Instructions to upload index.html, script.js, and all image files to the root of the main branch (or preferred publishing branch).
3.	Configure GitHub Pages: Steps to navigate to the repository settings, find the "Pages" section, select the main branch as the source, and save.
4.	Access Site: Explain that the site will be live at https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/ once deployment is complete.
This plan is comprehensive and ready for execution. I will now proceed to generate the initial HTML, Tailwind CSS, and JavaScript code for your website based on this plan, including placeholder content.

