export interface ContributorsOptions {
  repository?: string
}

export function renderContributors(options?: ContributorsOptions): string {
  const { repository = "username/project" } = options || {}

  return `<a href="https://github.com/${repository}/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=${repository}" alt="contrib.rocks image" />
</a>`
}
