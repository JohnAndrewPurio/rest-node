const _styles = {
  container: {
    margin: '1em .5em',
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: 700,
  },
  card: {
    height: '22vh',
    width: '120px',
    minWidth: '120px',
    borderRadius: '10px',
    padding: '.3em',
  },
  detailsGrid: {
    fontSize: '.8rem',
    display: 'flex',
  },
  paddingZero: {
    padding: 0,
  },
  favBtn: {
    '--padding-start': '0px',
    '--padding-end': '0px',
    '--padding-top': '0px',
    '--padding-bottom': '0px',
  },
  grid: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridContainer: {
    width: '100%',
    marginTop: '.5em',
  },
  gridPicture: {
    position: 'relative',
    width: '100%',
    height: '80%',
    border: '2px solid var(--ion-color-primary)',
    borderRadius: '10px',
    backgroundColor: 'var(--ion-color-step-100)',
    display: 'flex',
    overflow: 'hidden',
  },
  gridIonPicture: {
    objectFit: 'cover',
  },
  lengthIndicator: {
    position: 'absolute' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.575)',
    color: 'white',
    zIndex: 2,
    bottom: 0,
    left: 0,
    fontWeight: 700,
    fontSize: '.8rem',
    padding: '.5em',
  },
};

export default _styles;
