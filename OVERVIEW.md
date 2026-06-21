# Substack Automation Project Overview

This document provides a comprehensive overview of all features developed, updated, and configured in the **Substack Automation** application.

---

## 🚀 Core Features

### 1. AI Post Generation & Publishing (Posts Tab)
*   **AI Providers**: Integrated unified interfaces for **Gemini (Google)**, **Groq**, and **OpenAI**.
*   **Drafting & Live Preview**:
    *   Generates a title, subtitle, and article body based on a custom topic and system prompt guidelines.
    *   Live markdown editing panel with side-by-side real-time rendering.
*   **Publishing Control**:
    *   "Save as Draft" Toggle: Saves the post to your Substack draft folder without mailing users.
    *   "Publish to Substack": Publishes live and emails all your publication subscribers instantly (`send: true`).
*   **Session Management**: Connects securely using your Substack `connect.sid` cookie value.

### 2. Comment Automation (Comments Tab) `[NEW]`
*   **Target Parsing**: Accepts user handles (e.g. `@username`), numeric profile IDs, or complete publication URLs (e.g. `https://name.substack.com`) and resolves them automatically.
*   **Post Analysis**: Scans up to 10 recent posts of the target account (using profile lists or the publication public `/api/v1/archive` endpoint).
*   **Deduplication Guard**: Automatically calls `GET /api/v1/post/{postId}/comments` to check if your account has already left a comment on that post. If yes, it skips it to prevent duplicate/spam comments.
*   **AI Semantic Relevance**:
    *   AI analyzes the post context against your specified **Keyword or Match Phrase**.
    *   If matched, AI writes a human-sounding, single-paragraph comment matching the post context and custom guidelines (free of emojis and hashtags).
*   **Posting Comments**: Posts successfully matched comments directly to `POST /api/v1/post/{postId}/comment` using your connected session credentials.
*   **Rate Limit Protection**: Introduces a 2-second sleep delay between operations.
*   **Console Logging Screen**: Monospace visual output panel that displays real-time execution logs (info, match status, success, warning, or errors) with color-coded tags.

### 3. Publication Archive Listing (Newsletters Tab) `[NEW]`
*   **Fetch Newsletters**: Lists the 25 most recent newsletters and drafts from your own publication.
*   **Metadata Details**: Displays the title, publish date, subtitle snippet, and status (draft vs published) of each post.
*   **Quick Redirects**: Direct external link redirection to drafts or published articles on your Substack site.

### 4. SPA Tabbed Routing `[NEW]`
*   **Navigation Pill**: Premium-styled navigation tab selector in the header for switching between **Posts**, **Comments**, and **Newsletters** tabs.
*   **Dynamic Views**: Toggles active panels smoothly in the viewport without browser refreshes or loss of form state.

### 5. Redesigned Toast Notification System `[UPDATED]`
*   **Aesthetics**: Minimalist dark styling using `#09090b` solid backgrounds with status accent borders (green for success, red for error, blue for info).
*   **Display Duration**: Extended timer from 4 seconds to **30 seconds** to give you time to read logs.
*   **Dismissal**: Added a small close button (`&times;`) to manually clear notifications instantly.

---

## 📂 Codebase Structure & File Summary

| File Path | Description | Key Additions / Modifications |
| :--- | :--- | :--- |
| [generate.ts](file:///Users/santhoshpatel/projects/PROJECTS/EL/substack/src/ai/generate.ts) | AI services module | Added `analyzeAndGenerateComment` for keyword analysis and comment creation. |
| [api.ts](file:///Users/santhoshpatel/projects/PROJECTS/EL/substack/src/routes/api.ts) | Backend Express routes | Added connection cookie persistence, `/api/newsletters`, and `/api/comments/automate` routes. |
| [index.html](file:///Users/santhoshpatel/projects/PROJECTS/EL/substack/public/index.html) | Main HTML interface | Added navigation header control, view containers for Comments and Newsletters tabs. |
| [styles.css](file:///Users/santhoshpatel/projects/PROJECTS/EL/substack/public/styles.css) | Custom CSS styles | Added tab button controls, console log styles, and toast pop-up modifications. |
| [app.js](file:///Users/santhoshpatel/projects/PROJECTS/EL/substack/public/app.js) | Frontend script logic | Added tab routing actions, comment automation execution, list fetching, and toast close logic. |
