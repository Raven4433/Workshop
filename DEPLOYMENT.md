# Deploying Your Workshop Showcase Website to GitHub Pages

This guide will walk you through deploying your static workshop item showcase website using GitHub Pages.

## Prerequisites

*   A GitHub account.
*   Git installed on your local machine (optional, you can also use GitHub's web interface for uploading).
*   The website files (`index.html`, `script.js`, and any images you've prepared).

## Steps

1.  **Create a New GitHub Repository:**
    *   Log in to your GitHub account.
    *   Click the "+" icon in the top-right corner and select "New repository."
    *   **Repository name:** Choose a name for your repository (e.g., `workshop-showcase` or `my-tools-for-sale`).
    *   **Description:** (Optional) Add a brief description.
    *   **Public/Private:** Select "Public". GitHub Pages for free accounts requires the repository to be public.
    *   Do NOT initialize with a README, .gitignore, or license if you're pushing an existing local folder. If you're starting fresh on GitHub, you can add a README.
    *   Click "Create repository."

2.  **Upload Your Website Files:**

    *   **Option A: Using Git (Recommended)**
        *   Open a terminal or command prompt on your computer.
        *   Navigate to the folder where your `index.html` and `script.js` files are located.
        *   Initialize a Git repository (if you haven't already):
            ```bash
            git init
            ```
        *   Add your files to the staging area:
            ```bash
            git add index.html script.js
            # Add any image folders/files if you have them locally, e.g., git add images/
            ```
        *   Commit your files:
            ```bash
            git commit -m "Initial commit of website files"
            ```
        *   Add the remote repository URL (you can find this on your new GitHub repository page under "HTTPS"):
            ```bash
            git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
            ```
            (Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` accordingly)
        *   Push your files to GitHub:
            ```bash
            git push -u origin main
            # Or 'master' if your default branch is named master
            ```

    *   **Option B: Using GitHub Web Interface**
        *   On your new GitHub repository page, click the "Add file" button and select "Upload files."
        *   Drag and drop your `index.html`, `script.js`, and any image files/folders into the designated area.
        *   Add a commit message (e.g., "Upload website files").
        *   Click "Commit changes."

3.  **Configure GitHub Pages:**
    *   In your GitHub repository, click on the "Settings" tab.
    *   In the left sidebar, scroll down and click on "Pages" (under "Code and automation").
    *   **Source:** Under "Build and deployment," select "Deploy from a branch."
    *   **Branch:**
        *   Select the branch you want to deploy from (usually `main` or `master`).
        *   Select the folder: `/ (root)`.
        *   Click "Save."

4.  **Access Your Live Site:**
    *   GitHub Pages will now build and deploy your website. This might take a few minutes.
    *   Once deployed, the URL for your live site will be displayed at the top of the "Pages" settings section. It will typically be in the format:
        `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`
    *   Visit this URL in your browser to see your workshop item showcase!

## Updating Your Site

*   To update your site, simply make changes to your `index.html`, `script.js`, or image files.
*   If using Git, commit and push the changes to your GitHub repository:
    ```bash
    git add .
    git commit -m "Updated item descriptions" # Or any relevant message
    git push
    ```
*   If using the web interface, upload the changed files to your repository.
*   GitHub Pages will automatically detect the changes and redeploy your site (usually within a minute or two).

## Important Notes for Content Management (Using Jules)

As per the project plan, Jules will help you update the content by regenerating `index.html` and `script.js`.

1.  **Request Changes from Jules:** Ask Jules to add, update, or delete items, or change header/footer text.
2.  **Receive Updated Files:** Jules will provide you with the new `index.html` and `script.js` content.
3.  **Replace Local Files:** Download these files and replace your existing local `index.html` and `script.js`.
4.  **Upload New Images (If Any):** If you added new items with new images, ensure those image files are also added to your local project folder (e.g., in an `images/` directory if you choose to organize them that way) and then uploaded to your GitHub repository along with the updated HTML/JS. **Jules will provide image URLs, but you are responsible for hosting the actual image files.** You can upload them to your GitHub repository in an `images` folder, or use an external image hosting service.
5.  **Commit and Push:** Commit these changes to your GitHub repository as described above. Your site will then update.

By following these steps, you can successfully deploy and maintain your workshop item showcase website.
