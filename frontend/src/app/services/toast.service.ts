import { BehaviorSubject } from "rxjs";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { throws } from "assert";

const defaultOptions: UseToastOptions = {
  status: "error",
  position: "top",
  duration: 5000,
  isClosable: true,
};

class ToastService {
  private errorValue = new BehaviorSubject<String>("");
  errorValue$ = this.errorValue.asObservable();

  pushError(errorValue: String): void {
    if (!!errorValue) {
      throw this.errorValue.next(errorValue);
    }
  }

  setToastOptions(
    errorValue: String,
    customOptions?: UseToastOptions
  ): UseToastOptions | undefined {
    if (!errorValue) {
      return;
    }

    const toastOptions: UseToastOptions = {
      title: errorValue,
      ...defaultOptions,
      ...customOptions,
    };

    return toastOptions;
  }
}

const toastService = new ToastService();
export { toastService, defaultOptions };
