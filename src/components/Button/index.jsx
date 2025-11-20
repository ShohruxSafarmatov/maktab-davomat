export default function Button({
  classButton,
  onClickButton,
  children,
  disabled,
}) {
  return (
    <button className={classButton} onClick={onClickButton} disabled={disabled}>
      {children}
    </button>
  );
}
