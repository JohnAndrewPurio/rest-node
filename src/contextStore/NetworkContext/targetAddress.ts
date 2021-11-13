import { createContext, Dispatch, SetStateAction } from 'react';

type TargetAddressContext = [string, Dispatch<SetStateAction<string>>?];

const TargetAddressContext = createContext<TargetAddressContext>([""]);

export default TargetAddressContext;
