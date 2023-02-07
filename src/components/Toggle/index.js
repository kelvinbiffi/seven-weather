import styles from "./index.module.css";

const Toggle = ({ active, onChange }) => {
  const getToggleClass = () => {
    const togglestyles = [styles.toggle];

    if (active) {
      togglestyles.push(styles.toggleActive);
    }

    return togglestyles.join(" ");
  };

  return (
    <button
      onClick={() => {
        onChange(active);
      }}
      type="button"
      className={getToggleClass()}
    />
  );
};

export default Toggle;
