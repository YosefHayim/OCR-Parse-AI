## Project Overview

This project was built to solve a real-world problem for my mom — extracting structured data from PDF invoices.  
She needed a faster, more accurate way to pull out:

- Total Quantity
- Total Price
- Supplier Name

I built an AI-powered OCR tool that:

- Converts PDFs into PNG images
- Sends the images to OpenAI for structured parsing using OCR
- Returns clean, ready-to-use invoice data

---

## Project Timeline

- Start Date: 04/04/2025
- End Date: 12/04/2025
- Deployed On: [Render](https://render.com)

---

## Live URLs

- Frontend: [https://pdf-extractor-data-helping-mom-fronted.onrender.com](https://pdf-extractor-data-helping-mom-fronted.onrender.com)
- Backend: [https://pdf-ocr-data-proccessing-backend.onrender.com](https://pdf-ocr-data-proccessing-backend.onrender.com)

---

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- TanStack Query
- Socket.IO (Client)
- Playwright (End-to-End Testing)
- Husky (Git Hooks)

### Backend

- Node.js with Express
- Axios
- Body Parser
- Multer (File Uploads)
- Sharp (Image Processing)
- Tesseract.js (OCR)
- OpenAI API
- Socket.IO (Server)
- Morgan (Logging)

---

## What I Learned

This project helped sharpen my full-stack skills and introduced me to new tools, practices, and workflows.

### Backend + Infrastructure

- **OCR Pipeline**  
  Converted PDFs to PNGs, extracted text, and cleaned it using AI.

- **OpenAI Integration**  
  Used structured prompts to turn unstructured OCR output into clean JSON data.

- **Environment Configuration**  
  Managed environment variables for both development and production using Vite and Node.js.

- **Real-Time Updates with Socket.IO**  
  Pushed live status updates to the client during file processing.

- **Docker Awareness**  
  Gained an understanding of containerization and its importance for cross-platform consistency.

- **Git Hooks with Husky**  
  Added pre-commit checks for code formatting and linting.

- **CI/CD with GitHub Actions**  
  Set up automated test runs for each push to ensure reliability.

### Frontend Development

- **React Context API**  
  Used for managing global state across components.

- **Custom React Hooks**  
  Extracted shared logic for cleaner, more maintainable code.

- **Interactive UI Elements**  
  Built dynamic tooltips and feedback elements to enhance user experience.

- **End-to-End Testing**  
  Used Playwright to simulate real user flows and validate functionality.

### Developer Workflow

- **Code Formatting with Prettier**  
  Ensured consistency across the codebase:

  ```bash
  npx prettier . --write
  ```

- **Sorted Dependencies with sort-package-json**  
  Kept `package.json` organized and readable:

  ```bash
  npx sort-package-json
  ```