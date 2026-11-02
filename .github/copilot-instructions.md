# Copilot Instructions

## Architecture

- This is a static, single-page portfolio. [index.html](../index.html) contains the About, Resume, and Portfolio sections; [assets/js/script.js](../assets/js/script.js) implements navigation and page interactions; [assets/css/style.css](../assets/css/style.css) defines the visual design and responsive layouts.
- Images, videos, and the downloadable resume are static files under `assets/`. Preserve their relative references from `index.html` when moving or adding assets.

## Build, test, and lint

- No build, test, or lint scripts or dependency manifest are configured.
- Preview locally with `python3 -m http.server 8000`, then open `http://localhost:8000` in VS Code's integrated Simple Browser (Command Palette: **Simple Browser: Show**). Do not launch an external browser for previews.
- There is no automated single-test command. For a browser smoke check, verify section navigation, portfolio category filtering, the sidebar toggle, and video modal open/close behavior.
- Playwright MCP is configured in [.vscode/mcp.json](../.vscode/mcp.json); it requires Node.js 18 or newer.

## Integration conventions

- Treat HTML `data-*` attributes as the interface between markup and `script.js`. When changing a component, keep its selectors and required attributes in sync across both files.
- Navigation labels map to section `data-page` values. Portfolio filters use `data-filter-btn`, `data-select-item`, and `data-filter-item`; each item’s `data-category` may contain multiple pipe-separated categories. Keep the desktop filter buttons and mobile select options aligned.
- Portfolio video links use `data-video` and the page-level video modal; site links use `data-url`. Keep referenced media and destinations valid.
- Shared colors, typography, spacing, and transitions are defined as custom properties at the top of `style.css`; responsive layout changes are organized by media-query breakpoints there.
- Google Fonts and Ionicons are loaded from external URLs in `index.html`; preserve those imports when changing typography or icons.
