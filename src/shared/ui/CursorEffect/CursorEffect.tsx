import styles from "./styles.module.scss";

import { useCursor } from "../../hooks";

export const CursorEffect = () => {
  const { x, y } = useCursor();

  return (
    <>
      <div
        className={styles.spotlight}
        style={
          {
            "--x": `${x}px`,
            "--y": `${y}px`,
          } as React.CSSProperties
        }
      />
      <div
        className={styles.cursorGlow}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
    </>
  );
};
