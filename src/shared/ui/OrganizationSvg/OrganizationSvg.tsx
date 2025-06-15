import styles from "./styles.module.scss";

export const OrganizationSvg = () => {
  return (
    <>
      <svg
        className={styles.organizationSvg}
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <path
          d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10
                  10-4.5 10-10S17.5 2 12 2zm0 3c1.1 0 2 .9 2
                  2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm1 14h-2v-2h2v2zm0-4h-2V8h2v7z"
          fill="currentColor"
        />
      </svg>
      <svg
        className={styles.organizationSvg}
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <path
          d="M3 3h18v18H3V3zm2 2v14h14V5H5zm7 2a5 5 0 100 10
                  5 5 0 000-10z"
          fill="currentColor"
        />
      </svg>
      <svg
        className={styles.organizationSvg}
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <path
          d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7
                  13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0
                  9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6
                  6.5 12 6.5s2.5 1.1 2.5 2.5S13.4
                  11.5 12 11.5z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};
