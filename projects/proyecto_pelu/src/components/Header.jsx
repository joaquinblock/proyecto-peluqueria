function Header(props) {
  return (
    <header className="header">
      <div className="header-texts">
        <h1 className="header-title">{props.textTitle}</h1>
        <p className="header-subtitle">{props.textSubtitle}</p>
      </div>
      <div className="header-logo">
      </div>
    </header>
  );
};

export default Header;
