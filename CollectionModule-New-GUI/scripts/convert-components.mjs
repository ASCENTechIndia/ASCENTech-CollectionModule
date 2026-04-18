import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const sourceDir = 'd:/FlexAdmin-pro/FlexAdmin-pro'
const projectDir = 'd:/FlexAdmin-pro/flexadmin-react'
const outputDir = path.join(projectDir, 'src/pages/components')

const pages = [
  { slug: 'accordion', file: 'components-accordion.html', component: 'ComponentsAccordionPage' },
  { slug: 'alerts', file: 'components-alerts.html', component: 'ComponentsAlertsPage' },
  { slug: 'badges', file: 'components-badges.html', component: 'ComponentsBadgesPage' },
  { slug: 'breadcrumbs', file: 'components-breadcrumbs.html', component: 'ComponentsBreadcrumbsPage' },
  { slug: 'buttons', file: 'components-buttons.html', component: 'ComponentsButtonsPage' },
  { slug: 'cards', file: 'components-cards.html', component: 'ComponentsCardsPage' },
  { slug: 'carousel', file: 'components-carousel.html', component: 'ComponentsCarouselPage' },
  { slug: 'dropdowns', file: 'components-dropdowns.html', component: 'ComponentsDropdownsPage' },
  { slug: 'list-group', file: 'components-list-group.html', component: 'ComponentsListGroupPage' },
  { slug: 'modal', file: 'components-modal.html', component: 'ComponentsModalPage' },
  { slug: 'nav-tabs', file: 'components-nav-tabs.html', component: 'ComponentsNavTabsPage' },
  { slug: 'offcanvas', file: 'components-offcanvas.html', component: 'ComponentsOffcanvasPage' },
  { slug: 'pagination', file: 'components-pagination.html', component: 'ComponentsPaginationPage' },
  { slug: 'popovers', file: 'components-popovers.html', component: 'ComponentsPopoversPage' },
  { slug: 'progress', file: 'components-progress.html', component: 'ComponentsProgressPage' },
  { slug: 'spinners', file: 'components-spinners.html', component: 'ComponentsSpinnersPage' },
  { slug: 'toasts', file: 'components-toasts.html', component: 'ComponentsToastsPage' },
  { slug: 'tooltips', file: 'components-tooltips.html', component: 'ComponentsTooltipsPage' },
]

const widgetPages = [
  { slug: 'widgets-cards', file: 'widgets-cards.html', component: 'WidgetsCardsPage' },
  { slug: 'widgets-banners', file: 'widgets-banners.html', component: 'WidgetsBannersPage' },
  { slug: 'widgets-charts', file: 'widgets-charts.html', component: 'WidgetsChartsPage' },
  { slug: 'widgets-apps', file: 'widgets-apps.html', component: 'WidgetsAppsPage' },
  { slug: 'widgets-data', file: 'widgets-data.html', component: 'WidgetsDataPage' },
]

const toPascal = (slug) => slug
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('')

const indentBlock = (text, spaces) => {
  const pad = ' '.repeat(spaces)
  return text
    .split('\n')
    .map((line) => `${pad}${line}`)
    .join('\n')
}

const normalizeJsx = (jsx) => {
  let out = jsx

  out = out.replace(/(src|href)=("|')assets\//g, '$1=$2/assets/')
  out = out.replace(/href=("|')index\.html\1/g, 'href="#"')
  out = out.replace(/href=("|')#\1/g, 'href="#" onClick={(event) => event.preventDefault()}')

  // Prevent accidental full-page navigation from template anchors.
  out = out.replace(/href=("|')[^"'#][^"']*\1/g, 'href="#" onClick={(event) => event.preventDefault()}')

  // Ensure image alts are valid for React a11y expectations.
  out = out.replace(/<img([^>]*?)\salt=("|')\2([^>]*?)>/g, '<img$1 alt=""$3>')

  return out
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const writtenFiles = []

for (const page of pages) {
  const sourcePath = path.join(sourceDir, page.file)
  const raw = fs.readFileSync(sourcePath, 'utf8')

  const start = raw.indexOf('<div class="main-content')
  const end = raw.indexOf('</main>', start)

  if (start < 0 || end < 0) {
    throw new Error(`Unable to find main-content block in ${sourcePath}`)
  }

  const htmlSnippet = raw.slice(start, end)
  const tempPath = path.join(projectDir, `.tmp-${page.slug}.html`)
  fs.writeFileSync(tempPath, htmlSnippet, 'utf8')

  const convert = spawnSync('npx', ['-y', 'htmltojsx', tempPath], {
    cwd: projectDir,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })

  fs.unlinkSync(tempPath)

  if (convert.status !== 0) {
    throw new Error(`htmltojsx failed for ${page.file}: ${convert.stderr || convert.stdout}`)
  }

  const converted = normalizeJsx(convert.stdout.trim())
  const outputPath = path.join(outputDir, `${page.component}.jsx`)

  const fileContent = `function ${page.component}() {
  return (
${indentBlock(converted, 4)}
  )
}

export default ${page.component}
`

  fs.writeFileSync(outputPath, fileContent, 'utf8')
  writtenFiles.push(outputPath)
}

for (const page of widgetPages) {
  const sourcePath = path.join(sourceDir, page.file)
  const raw = fs.readFileSync(sourcePath, 'utf8')

  const start = raw.indexOf('<div class="main-content')
  const end = raw.indexOf('</main>', start)

  if (start < 0 || end < 0) {
    throw new Error(`Unable to find main-content block in ${sourcePath}`)
  }

  const htmlSnippet = raw.slice(start, end)
  const tempPath = path.join(projectDir, `.tmp-${page.slug}.html`)
  fs.writeFileSync(tempPath, htmlSnippet, 'utf8')

  const convert = spawnSync('npx', ['-y', 'htmltojsx', tempPath], {
    cwd: projectDir,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  })

  fs.unlinkSync(tempPath)

  if (convert.status !== 0) {
    throw new Error(`htmltojsx failed for ${page.file}: ${convert.stderr || convert.stdout}`)
  }

  const converted = normalizeJsx(convert.stdout.trim())
  const outputPath = path.join(projectDir, 'src/pages', `${page.component}.jsx`)

  const fileContent = `function ${page.component}() {
  return (
${indentBlock(converted, 4)}
  )
}

export default ${page.component}
`

  fs.writeFileSync(outputPath, fileContent, 'utf8')
  writtenFiles.push(outputPath)
}

const imports = pages
  .map((page) => `import ${page.component} from './components/${page.component}'`)
  .join('\n')

const widgetImports = widgetPages
  .map((page) => `import ${page.component} from './${page.component}'`)
  .join('\n')

const pageMapEntries = pages
  .map((page) => `  '${page.slug}': ${page.component},`)
  .join('\n')

const widgetMapEntries = widgetPages
  .map((page) => `  '${page.slug}': ${page.component},`)
  .join('\n')

const menuPage = `import { useParams } from 'react-router-dom'
${imports}

const componentPages = {
${pageMapEntries}
}

function ComponentsMenuPage() {
  const { componentPage } = useParams()
  const PageComponent = componentPages[componentPage]

  if (!PageComponent) {
    return (
      <div className="main-content page-components-module">
        <div className="page-header">
          <h1 className="page-title">Components</h1>
          <nav className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-item active">Components</span>
          </nav>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="mb-0 text-muted">Select a Components page from the sidebar.</p>
          </div>
        </div>
      </div>
    )
  }

  return <PageComponent />
}

export default ComponentsMenuPage
`

const widgetMenuPage = `import { useParams } from 'react-router-dom'
${widgetImports}

const widgetPagesMap = {
${widgetMapEntries}
}

function WidgetsMenuPage() {
  const { widgetPage } = useParams()
  const PageComponent = widgetPagesMap[widgetPage]

  if (!PageComponent) {
    return (
      <div className="main-content page-widgets-module">
        <div className="page-header">
          <h1 className="page-title">Widgets</h1>
          <nav className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-item active">Widgets</span>
          </nav>
        </div>
        <div className="card">
          <div className="card-body">
            <p className="mb-0 text-muted">Select a Widgets page from the sidebar.</p>
          </div>
        </div>
      </div>
    )
  }

  return <PageComponent />
}

export default WidgetsMenuPage
`

const menuPagePath = path.join(projectDir, 'src/pages/ComponentsMenuPage.jsx')
fs.writeFileSync(menuPagePath, menuPage, 'utf8')
writtenFiles.push(menuPagePath)

const widgetMenuPagePath = path.join(projectDir, 'src/pages/WidgetsMenuPage.jsx')
fs.writeFileSync(widgetMenuPagePath, widgetMenuPage, 'utf8')
writtenFiles.push(widgetMenuPagePath)

console.log('Generated files:')
for (const file of writtenFiles) {
  console.log(file)
}
