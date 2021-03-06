// HTML fragment that should appear in every page's <head> element
export const everyPageHead = () => `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  body {
    font-family: Georgia, "Times New Roman", serif;
    margin: 0 auto;
    max-width: 42em;
    padding: 1em;
  }
  .distbin-main {
  }
  .distbin-above-fold {
    height: calc(100vh - 3em); /* magic number; height of header */
  }
  pre {
    max-width: 100%;
    overflow-x: auto;
  }
  p a {
    word-wrap: break-word;
  }
  p img {
    max-width: 100%;
  }
  </style>
`

export const aboveFold = (html: string) => `
  <div class="distbin-above-fold">
   ${html}
  </div>
`

// wrap page with common body template for distbin-html (e.g. header/footer)
export const distbinBodyTemplate = (page: string) => `
  <head>
    ${everyPageHead()}
  </head>
  ${header()}
  <div class="distbin-main">
    ${page}
  </div>
`

function header() {
  // todo
  return `
    <style>
    html {
      box-sizing: border-box;
    }
    .distbin-header {
      margin-bottom: 1em;
      width: 100%;
    }
    .distbin-header-inner {
      display: table;
      width: 100%;
    }
      .distbin-header a {
        text-decoration: none;
      }

      .distbin-header-section {
        display: table-cell;
        vertical-align: top;
      }
      .distbin-header-section.right {
        text-align: right;
      }
       .distbin-header-section.right .distbin-header-item {
        margin-left: 0.5em;
      }
      .distbin-header-item {
      }
      .distbin-header .distbin-header-item.name {
        font-weight: bold
      }
    </style>
    <header class="distbin-header">
      <div class="distbin-header-inner">
        <div class="distbin-header-section left">
          <a href="/" class="distbin-header-item name">distbin</a>
        </div>
        <div class="distbin-header-section right">
          <a href="/public" class="distbin-header-item public">public</a>
          <a href="/about" class="distbin-header-item about">about</a>
        </div>
      </div>
    </header>
  `
}
