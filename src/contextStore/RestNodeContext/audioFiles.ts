import { createContext } from 'react';
import { filesListInterface } from '../../api/RestNode/POST/sendAudioFilesMetadata';

export type AudioFilesContextType = filesListInterface | null;

// export const sampleAudioFiles = {
//   'Wake Sounds': {
//     'Birds Chirping 15 Min.mp3': {
//       name: 'Birds Chirping 15 Min.mp3',
//       fullPath: 'Wake Sounds/Birds Chirping 15 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Wake%20Sounds%2FBirds%20Chirping%2015%20Min.mp3?alt=media&token=eb142ad5-be14-46ac-944d-9f26e6017d8c',
//     },
//     'Deep Waking Meditation 24 Min.mp3': {
//       name: 'Deep Waking Meditation 24 Min.mp3',
//       fullPath: 'Wake Sounds/Deep Waking Meditation 24 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Wake%20Sounds%2FDeep%20Waking%20Meditation%2024%20Min.mp3?alt=media&token=ce873c11-aa1b-4d70-b4ea-e34853deb425',
//     },
//     'Monk Om 16 Min.mp3': {
//       name: 'Monk Om 16 Min.mp3',
//       fullPath: 'Wake Sounds/Monk Om 16 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Wake%20Sounds%2FMonk%20Om%2016%20Min.mp3?alt=media&token=9acff77d-3005-4b65-b999-4ced74fdacef',
//     },
//     'Morning Flute 17 Min.mp3': {
//       name: 'Morning Flute 17 Min.mp3',
//       fullPath: 'Wake Sounds/Morning Flute 17 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Wake%20Sounds%2FMorning%20Flute%2017%20Min.mp3?alt=media&token=2de3dbff-d01c-4a68-91e0-3b24daecfc7c',
//     },
//     'Spiritual Awakening 13 Min.mp3': {
//       name: 'Spiritual Awakening 13 Min.mp3',
//       fullPath: 'Wake Sounds/Spiritual Awakening 13 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Wake%20Sounds%2FSpiritual%20Awakening%2013%20Min.mp3?alt=media&token=50531348-f290-4c22-b2a1-d4807c730c9d',
//     },
//     'Stream Birds 15 Minutes.mp3': {
//       name: 'Stream Birds 15 Minutes.mp3',
//       fullPath: 'Wake Sounds/Stream Birds 15 Minutes.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Wake%20Sounds%2FStream%20Birds%2015%20Minutes.mp3?alt=media&token=64b5773b-7e90-404b-850c-e3cb0500bba8',
//     },
//   },
//   'Night Sounds': {
//     'Convergence by S.Duncan 12 Hours.mp3': {
//       name: 'Convergence by S.Duncan 12 Hours.mp3',
//       fullPath: 'Night Sounds/Convergence by S.Duncan 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FConvergence%20by%20S.Duncan%2012%20Hours.mp3?alt=media&token=64c75d84-c9ab-4547-b591-b7ff5789f027',
//     },
//     'Deep Serenity by S.Duncan 12 Hours.mp3': {
//       name: 'Deep Serenity by S.Duncan 12 Hours.mp3',
//       fullPath: 'Night Sounds/Deep Serenity by S.Duncan 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FDeep%20Serenity%20by%20S.Duncan%2012%20Hours.mp3?alt=media&token=5172f589-e493-4cec-bf65-574f51f47c4a',
//     },
//     'Nocturnal Crossings by S.Duncan 12 Hour.mp3': {
//       name: 'Nocturnal Crossings by S.Duncan 12 Hour.mp3',
//       fullPath: 'Night Sounds/Nocturnal Crossings by S.Duncan 12 Hour.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FNocturnal%20Crossings%20by%20S.Duncan%2012%20Hour.mp3?alt=media&token=3ce8dbf1-49d8-4aa6-a941-7fb6070121f5',
//     },
//     'Ocean Waves (Big) 12 Hours.mp3': {
//       name: 'Ocean Waves (Big) 12 Hours.mp3',
//       fullPath: 'Night Sounds/Ocean Waves (Big) 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FOcean%20Waves%20(Big)%2012%20Hours.mp3?alt=media&token=9a0abc39-f49b-424c-ab2d-8a6cad963bfa',
//     },
//     'Ponderings by S.Duncan 12 Hours.mp3': {
//       name: 'Ponderings by S.Duncan 12 Hours.mp3',
//       fullPath: 'Night Sounds/Ponderings by S.Duncan 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FPonderings%20by%20S.Duncan%2012%20Hours.mp3?alt=media&token=581b084c-a0c6-48e5-a2dc-d3468eb1ca07',
//     },
//     'Rain (Heavy) 12 Hours.mp3': {
//       name: 'Rain (Heavy) 12 Hours.mp3',
//       fullPath: 'Night Sounds/Rain (Heavy) 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FRain%20(Heavy)%2012%20Hours.mp3?alt=media&token=b929d753-b718-473b-bce0-23afbe77faaf',
//     },
//     'Rain (Light) 12 Hours.mp3': {
//       name: 'Rain (Light) 12 Hours.mp3',
//       fullPath: 'Night Sounds/Rain (Light) 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FRain%20(Light)%2012%20Hours.mp3?alt=media&token=5db61336-e77d-40af-9704-c2a0e540c4d2',
//     },
//     'Refresh by S.Duncan 12 Hours.mp3': {
//       name: 'Refresh by S.Duncan 12 Hours.mp3',
//       fullPath: 'Night Sounds/Refresh by S.Duncan 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FRefresh%20by%20S.Duncan%2012%20Hours.mp3?alt=media&token=0866c16e-825c-4c9d-b98f-7743e6a0bbd3',
//     },
//     'Train Tracks 12 Hours.mp3': {
//       name: 'Train Tracks 12 Hours.mp3',
//       fullPath: 'Night Sounds/Train Tracks 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FTrain%20Tracks%2012%20Hours.mp3?alt=media&token=d27e748e-f61a-452a-95a0-02f243f47dbd',
//     },
//     'Tranquil Calm 12 Hours.mp3': {
//       name: 'Tranquil Calm 12 Hours.mp3',
//       fullPath: 'Night Sounds/Tranquil Calm 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FTranquil%20Calm%2012%20Hours.mp3?alt=media&token=8ed03101-7d61-4b15-9d39-8bd51bd82c98',
//     },
//     'White Noise 12 Hours.mp3': {
//       name: 'White Noise 12 Hours.mp3',
//       fullPath: 'Night Sounds/White Noise 12 Hours.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Night%20Sounds%2FWhite%20Noise%2012%20Hours.mp3?alt=media&token=477f8a32-a504-4a44-862c-c184d422f6e8',
//     },
//   },
//   'Relaxation Sounds': {
//     'Alternate Nose Breathing 4 Min.mp3': {
//       name: 'Alternate Nose Breathing 4 Min.mp3',
//       fullPath: 'Relaxation Sounds/Alternate Nose Breathing 4 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Relaxation%20Sounds%2FAlternate%20Nose%20Breathing%204%20Min.mp3?alt=media&token=b3ca3080-fabb-4e66-82b0-0638ba84a639',
//     },
//     'Box Breathing 3 Min.mp3': {
//       name: 'Box Breathing 3 Min.mp3',
//       fullPath: 'Relaxation Sounds/Box Breathing 3 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Relaxation%20Sounds%2FBox%20Breathing%203%20Min.mp3?alt=media&token=7fe86e09-825e-4bae-bd2f-8a721c053883',
//     },
//     'Breath with Sound 4 Min.mp3': {
//       name: 'Breath with Sound 4 Min.mp3',
//       fullPath: 'Relaxation Sounds/Breath with Sound 4 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Relaxation%20Sounds%2FBreath%20with%20Sound%204%20Min.mp3?alt=media&token=0ded5722-7ae1-410c-8fed-a0953d83e6e5',
//     },
//     'Ferris Wheel Breathing 5 Min.mp3': {
//       name: 'Ferris Wheel Breathing 5 Min.mp3',
//       fullPath: 'Relaxation Sounds/Ferris Wheel Breathing 5 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Relaxation%20Sounds%2FFerris%20Wheel%20Breathing%205%20Min.mp3?alt=media&token=8deafb08-e18a-4ceb-adb1-421b791b05b1',
//     },
//     'iRest 26 Min.mp3': {
//       name: 'iRest 26 Min.mp3',
//       fullPath: 'Relaxation Sounds/iRest 26 Min.mp3',
//       source:
//         'https://firebasestorage.googleapis.com/v0/b/exist-tribe.appspot.com/o/Relaxation%20Sounds%2FiRest%2026%20Min.mp3?alt=media&token=137ada14-28f9-4bda-b139-ccbf7c9dea7a',
//     },
//   },
// };

const AudioFilesContext = createContext<AudioFilesContextType>(null);

export default AudioFilesContext;
