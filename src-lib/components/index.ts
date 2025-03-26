import { renderBackToTop, renderBackToTopAnchor } from "./back-to-top"
import { renderBr } from "./br"
import { renderContributors } from "./contributors"
import { renderHtml } from "./html"
import { renderImage } from "./image"
import { renderLink } from "./link"
import { renderList } from "./list"
import { renderNav } from "./nav"

export const components = {
  "b2t": renderBackToTop,
  "b2t-anchor": renderBackToTopAnchor,
  "br": renderBr,
  "contributors": renderContributors,
  "html": renderHtml,
  "image": renderImage,
  "link": renderLink,
  "list": renderList,
  "nav": renderNav,
}
