# Copilot Instructions

## Architecture

- This is a static, single-page scrolling portfolio. [index.html](../index.html) contains the hero, featured work, project collection, strengths, experience, and contact sections; [assets/js/script.js](../assets/js/script.js) implements project filtering and the video dialog; [assets/css/style.css](../assets/css/style.css) defines the visual design and responsive layouts.
- Images, videos, and the downloadable resume are static files under `assets/`. Preserve their relative references from `index.html` when moving or adding assets.

## Build, test, and lint

- No build, test, or lint scripts or dependency manifest are configured.
- Preview locally with `python3 -m http.server 8000`, then open `http://localhost:8000` in VS Code's integrated Simple Browser (Command Palette: **Simple Browser: Show**). Do not launch an external browser for previews.
- There is no automated single-test command. For a browser smoke check, verify anchor navigation, responsive layouts, project filtering, and video playback, close, Escape, and focus restoration.
- Playwright MCP is configured in [.vscode/mcp.json](../.vscode/mcp.json); it requires Node.js 18 or newer.

## Integration conventions

- Treat HTML `data-*` attributes as the interface between markup and `script.js`. When changing a component, keep its selectors and required attributes in sync across both files.
- Navigation uses native anchor links to section IDs. Filters use `data-filter`; each project's `data-categories` contains space-separated tokens. Filtering toggles `hidden` and updates `aria-pressed` and the live result count.
- Video buttons use `data-video` and `data-title` with a native `dialog` and HTML video player. Keep referenced H.264 media and destinations valid.
- Shared colors, typography, spacing, and transitions are defined as custom properties at the top of `style.css`; responsive layout changes are organized by media-query breakpoints there.
- The design uses system fonts and CSS/text icon treatments without external font or icon dependencies.
