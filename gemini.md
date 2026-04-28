# Framework: Monolithic HTML to Modular React Conversion

This document outlines a standardized methodology for modernizing legacy monolithic HTML applications into type-safe, component-based React architectures. 

## 1. Architectural Transformation Patterns

### Deconstruction of the Monolith
The core objective is to identify distinct functional layers within the legacy script and map them to React components.

| Legacy Feature | React Equivalent | Implementation Strategy |
| :--- | :--- | :--- |
| **Inline Styles** | CSS Modules / Styled Components | Extract variables into a global `:root` and scope styles to specific components. |
| **DOM Selectors** | `useState` & `useRef` | Replace `getElementById` with state-driven rendering and refs for direct DOM access (e.g., Canvas). |
| **Script Blocks** | Hooks (`useEffect`, `useMemo`) | Move lifecycle logic and event listeners into functional hooks for predictable behavior. |
| **Global Data** | Context API / Encrypted Streams | Transition from hardcoded strings to secure, typed data structures. |

### Case Study: Periodic Table Visualizer
In the `Elements.html` conversion, we identified four primary components:
1. **The Canvas (`ElementCanvas`)**: Encapsulates the WebGL/Three.js rendering logic.
2. **The Controller (`ElementControls`)**: Centralizes user input and state propagation.
3. **The Data Display (`ElementInfo`)**: A declarative view that reacts to state changes.
4. **The Orchestrator (`Visualizer`)**: Manages the global state and layout.

---

## 2. Advanced Anti-Scraping Framework

Protecting proprietary data and logic is critical when moving to the client-side. The following techniques create multiple layers of defense against automated scrapers.

### Layer 1: Data Encryption (Build-Time)
Sensitive data should never exist in plain text within the bundle. 
- **Technique**: Use a build script (e.g., `encrypt.mjs`) to encrypt JSON payloads using `AES-256-CBC`.
- **Outcome**: Scrapers see a random base64 string instead of valuable data.

### Layer 2: Runtime Decryption (Memory-Only)
Data is decrypted only when the application mounts, using the `Web Crypto API`.
- **Technique**: Fragment the decryption key in the source code to prevent static analysis.
- **Outcome**: The plain-text data exists only in the application's memory during runtime.

### Layer 3: Visual Data Projection (WebGL)
Render core value-add information inside a WebGL canvas using custom shaders.
- **Outcome**: Standard HTML parsers cannot "see" the content, as it is rendered as pixels rather than DOM elements.

### Layer 4: Secure UI Components
Use specialized components for rendering sensitive text:
- **CanvasText**: Renders text into a `<canvas>`, making it unsearchable via `Ctrl+F`.
- **ObfuscatedText**: Fragments strings into multiple spans and reorders them via CSS `order`.
- **Honeypot**: Inserts hidden "traps" that identify and block bot behavior.

---

## 3. Reusability Guide
To apply this framework to a new HTML file:
1. **Isolate State**: Identify what changes in the UI and move it to a parent `useState` hook.
2. **Extract Logic**: Move `<script>` functions into separate utility files with TypeScript interfaces.
3. **Protect**: Wrap sensitive text in `CanvasText` and data-driven loops in `DataLock`.
