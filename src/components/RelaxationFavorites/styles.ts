const _styles = {
  container: {
    margin: '1em .5em',
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: 700,
  },
  slider: {
    height: '22vh',
    marginTop: '1em',
  },
  slide: {
    width: '150px',
  },
  card: {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    padding: '0em .3em',
  },
  detailsGrid: {
    fontSize: '.8rem',
    display: 'flex',
    alignItems: 'center',
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
  fullHeight: {
    height: '100%',
  },
  playIcon: {
    fontSize: '4rem',
  },
  playBtn: {
    width: '100%',
    height: '100%',
    '--padding-start': '0px',
    '--padding-end': '0px',
    '--padding-top': '0px',
    '--padding-bottom': '0px',
  },
  sliderPictureContainer: {
    position: 'relative',
    height: '80%',
    border: '2px solid var(--ion-color-primary)',
    borderRadius: '10px',
    backgroundColor: 'var(--ion-color-step-100)',
    display: 'flex',
    overflow: 'hidden',
  },
  sliderIonImage: {
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
  cardPlayBtn: {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.582)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
  },
};

export default _styles;
