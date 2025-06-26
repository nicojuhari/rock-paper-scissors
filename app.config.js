export default defineAppConfig({
    ui: {
        colors: {
            primary: "blue",
            neutral: "gray",
            secondary: "green",
        },
        modal: {
            slots: {
                close: "cursor-pointer",
            },
        },
        icons: {
            close: "i-ph-x-bold",
        },
        card: {
            slots: {
                root: "overflow-hidden",
                body: "p-4 sm:p-4",
                header: "p-4 sm:px-4",
                footer: "p-4 sm:px-4",
            },
        },
        button: {
            slots: {
                base: "cursor-pointer",
            },
            defaultVariants: {
                color: "primary",
                variant: "solid",
                size: "lg",
            },
        },
        input: {
            slots: {
                root: "w-full",
            },
        },
        textarea: {
            slots: {
                root: "w-full",
            },
        },
        drawer: {
            slots: {
                content: "max-h-[90%]",
            },
        },
    },
});
