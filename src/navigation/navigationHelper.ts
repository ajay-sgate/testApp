import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();
export function navigate(name: never, params: never): void {
    if (navigationRef.isReady()) {
        /* @ts-ignore */
        navigationRef.navigate(name, params);
    }
}

const toSignin = CommonActions.reset({
    index: 0,
    routes: [{ name: "Signin" }]
});

const toHome = CommonActions.reset({
    index: 0,
    routes: [{ name: "Home" }]
});


export {
    toSignin,
    toHome
}