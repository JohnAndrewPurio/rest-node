const _styles = {
    triangle: {
        // https://www.reddit.com/r/reactjs/comments/87rold/types_of_property_position_are_incompatible_type/
        position: 'absolute' as const,
        width: 0,
        height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '10px solid #86888f',
        transformOrigin: 'center',
    },
    trianglesContainer: {
        width: '85%',
        height: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative' as const,
        zIndex: 2,
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        textAlign: 'center' as const,
    },
    number: {
        position: 'absolute' as const,
        transformOrigin: 'center',
        textAlign: 'center' as const,
        fontWeight: 700,
        fontSize: '.8rem',
        color: '#86888f',
    },
    numbersContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative' as const,
        zIndex: 2,
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        textAlign: 'center' as const,
    },
    circleProgress: {
        fill: 'none',
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
    },
    circleBackground: {
        stroke: 'var(--ion-color-light-shade)',
        fill: 'none',
    },
    circleSVG: {
        position: 'absolute' as const,
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        textAlign: 'center' as const,
    },
    clockContainer: {
        position: 'absolute' as const,
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        border: '2px solid var(--ion-color-light-contrast)',
        borderRadius: '50%',
        boxSizing: 'border-box' as const,
    },
    clockTime: {
        position: 'relative' as const,
        backgroundColor: 'var(--ion-color-light)',
        color: 'var(--ion-color-light-contrast)',
        zIndex: 3,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
    },
    clockHand: {
        position: 'absolute' as const,
        margin: 'auto',
        bottom: '50%',
        right: 0,
        left: 0,
        width: '2px',
        backgroundColor: 'var(--ion-color-light-contrast)',
        zIndex: 2,
        transformOrigin: 'bottom',
    },
};

export default _styles;
