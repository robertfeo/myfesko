import { Image } from "@nextui-org/react";

export const MyFeskoLogo = () => {
    return (
        <Image isBlurred
            src="https://app.requestly.io/delay/500/https://i.imgur.com/vjv3Jed.png"
            fallbackSrc="https://via.placeholder.com/300x200"
            alt="MyFesko"
            width={100}
            style={{ pointerEvents: 'none' }}
        />
    );
}
