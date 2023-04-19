import {useRouter} from "vue-router";

export function useGoToHome() {
    const router = useRouter();

    return function () {
        router.push("/");
    };
}
