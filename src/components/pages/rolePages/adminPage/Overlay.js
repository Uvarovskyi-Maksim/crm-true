const Overlay = ({ mode, close }) => (
  <div className={`overlay ${mode ? 'active' : ''}`} onClick={close}></div>
);

export default Overlay;