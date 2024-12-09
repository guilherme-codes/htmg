# HTMG - Static Site Generator

HTMG is a lightweight static site generator built with Node.js that supports both HTML and Markdown files. It's designed to be a simple, zero-configuration solution for creating static websites.

<p>
  <img src="https://github.com/user-attachments/assets/abd3b49a-3e44-4cec-bfea-48a2343461ac" width="300" />
</p>


## Features

- Simple and easy to use
- Zero configuration needed
- Support for HTML and Markdown files
- Built-in layouts and partials system
- Automatic SEO meta tags generation
- Asset minification
- Sitemap generation
- Hot reload development server

## Quick Start

Make sure you have Node.js installed, then run:

```bash
npx htmg init
```

This will generate a basic template structure. To start developing your site:

```bash
npm run dev
```

## Project Structure

### `/layouts`

Contains HTML layouts and their partials. Each layout should be in its own directory.

Example structure:
```
layouts/
  └── default/
      ├── index.html
      ├── head.html
      └── footer.html
```

Example usage in `index.html`:
```html
<!-- include: head -->
<body>
    <!-- page_content -->
</body>
<!-- include: footer -->
```

### `/assets`

Contains all static files used in your website:
- JavaScript files
- CSS stylesheets
- Images
- Other static resources

### `/pages`

Contains your website content in either HTML or Markdown format. The content will be injected into the specified layout at the `<!-- page_content -->` placeholder.

Pages can include headers to specify metadata:

```html
<!-- 
layout: default
title: What is Markdown?
meta-description: In this article you will know more about Markdown.
meta-locale: auto-generated
meta-type: article
meta-title: Know more about MD!
meta-url: auto-generated
meta-name: My site name
-->
```

Available metadata options:
- `layout`: Specifies which layout to use
- `title`: Page title
- `meta-description`: SEO description
- `meta-locale`: Language/locale information
- `meta-type`: Content type
- `meta-title`: SEO title
- `meta-url`: Page URL (can be auto-generated)
- `meta-name`: Site name

## Building

To build your site for production:

```bash
npm run build
```

The build process:
1. Generates the static site in the `/dist` directory
2. Maintains the same folder structure as defined in `/pages`
3. Minifies all assets and HTML files
4. Generates SEO meta tags based on page metadata
5. Creates a sitemap for better search engine indexing

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).
