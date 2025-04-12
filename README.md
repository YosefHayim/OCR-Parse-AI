## What I Learned from This Project

This project was more than just code — it was about solving a real problem for my mom and leveling up across the stack. Here's what I took away:

### Technical Skills Gained

1. **Code Formatting**  
   Automated consistent formatting across the project using Prettier:  
   ```bash
   npx prettier . --write
   ```

2. **Package Hygiene**  
   Discovered `sort-package-json` to keep `package.json` organized and readable:  
   ```bash
   npx sort-package-json
   ```

3. **OCR Pipeline**  
   Built an image-based OCR flow that converts PDF pages to PNG and extracts structured text.

4. **OpenAI API Integration**  
   Used hardcoded prompts and the OpenAI API to turn raw OCR text into structured invoice data.

5. **Environment Configuration**  
   Set up dynamic config handling for dev and production using environment variables with Vite and Node.js.

6. **Real-Time Updates**  
   Used Socket.IO to stream live progress updates during file uploads and processing.

7. **Git Hooks with Husky**  
   Added pre-commit checks for formatting and linting to keep the codebase clean and consistent.

8. **End-to-End Testing**  
   Integrated Playwright for testing key user flows to ensure everything runs smoothly.

9. **CI/CD with GitHub Actions**  
   Automated test runs on every push — build, test, commit, repeat.

10. **Technical Docs Pro**  
   Got better at reading and applying docs — especially for Socket.IO, Playwright, Husky, and YAML configs.

11. **UI/UX Improvements**  
   Designed and implemented dynamic tooltips and interactive UI elements for better user experience.

12. **Custom React Hooks**  
   Abstracted shared logic into reusable hooks to keep components clean.

13. **React Context API**  
   Used `createContext` and `useContext` for app-wide state management.

14. **Vite Environment Variables**  
   Learned how to define and consume env variables with Vite the right way.

15. **Docker Awareness**  
   Got introduced to Docker and understood why containerization matters — especially for multi-platform deployments and .NET tooling.

---

## The Problem I Solved

This project was built for my mom to save her time and energy.  
She used to manually read PDF invoices to extract:
- Total Quantity  
- Total Price  
- Supplier Name  

It was time-consuming and error-prone.  
So, I built her an **AI-powered OCR tool** that:
- Converts each PDF page to an image (PNG)
- Sends it to OpenAI with a structured prompt
- Returns clean, structured invoice data — ready to go

---

## Tech Stack

**Frontend:**
- React  
- Tailwind CSS  
- Axios  
- TanStack Query  
- Socket.IO (Client)  
- Playwright (E2E Testing)  
- Husky (Git Hooks)

**Backend:**
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

## Project Timeline

- **Start Date**: 04/04/2025  
- **End Date**: 12/04/2025  
- **Deployed on**: [Render](https://render.com)

---

## Live URLs

- **Backend**: [https://pdf-ocr-data-proccessing-backend.onrender.com](https://pdf-ocr-data-proccessing-backend.onrender.com)  
- **Frontend**: [https://pdf-extractor-data-helping-mom-fronted.onrender.com](https://pdf-extractor-data-helping-mom-fronted.onrender.com)
