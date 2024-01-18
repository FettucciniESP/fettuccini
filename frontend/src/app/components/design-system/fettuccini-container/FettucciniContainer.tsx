import {Box} from '@chakra-ui/react'
import styles from './FettucciniContainer.module.scss'
import {VariantStyleEnum} from "@/app/enums/VariantStyle.enum";

export default function FettucciniContainer({
                                                children,
                                                variantStyle,
                                            }: {
    readonly children: React.ReactNode,
    readonly variantStyle?: VariantStyleEnum
}) {
    let className: string = styles.container;

    switch (variantStyle) {
        case VariantStyleEnum.IS_SELECTED:
            className = styles.isSelected;
            break;
        case VariantStyleEnum.BLUR:
            className = styles.blur;
            break;
    }
    return <Box className={className}>{children}</Box>
}
