export default function Button({ clasButton, onClickButton, children }) {
  return (
    <button className={clasButton} onClick={onClickButton}>
      {children}
    </button>
  );
}
