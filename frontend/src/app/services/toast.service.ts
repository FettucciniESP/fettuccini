import {BehaviorSubject} from "rxjs";
import {useToast, UseToastOptions} from "@chakra-ui/react";
import {throws} from "assert";

const defaultOptions: UseToastOptions = {
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
    id: "error-toast",
};

class ToastService {
    private errorValue = new BehaviorSubject<String>("");
    errorValue$ = this.errorValue.asObservable();

    pushError(errorValue: String): void {
        if (!!errorValue) {
            throw this.errorValue.next(errorValue);
        }
    }

    clearError(): void {
        this.errorValue.next("");
    }

    setToastOptions(
        customOptions?: UseToastOptions
    ): UseToastOptions | undefined {
        const toastOptions: UseToastOptions = {
            ...defaultOptions,
            ...customOptions,
        };

        return toastOptions;
    }
}

const toastService = new ToastService();
export {toastService, defaultOptions};
