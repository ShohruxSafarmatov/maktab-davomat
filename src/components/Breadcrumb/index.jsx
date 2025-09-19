const Breadcrumb = ({ title, paths }) => {
  return (
    <div className="breadcrumb-container">
      <h1 className="breadcrumb-title">{title}</h1>
      <nav className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            return (
              <li className="breadcrumb-item" key={index}>
                {!isLast ? (
                  <a href={path.link} className="breadcrumb-link">
                    {path.label}
                  </a>
                ) : (
                  <span className="breadcrumb-current">{path.label}</span>
                )}
                {!isLast && <span className="breadcrumb-separator">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
