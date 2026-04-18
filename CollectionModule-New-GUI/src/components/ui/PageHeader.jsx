function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header users-page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle ? <p className="users-page-subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </div>
  )
}

export default PageHeader
